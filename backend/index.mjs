import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import cors from "cors";
import { createClient } from "redis";

const app = express();
app.use(cors());
const PORT = 4000;

const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));
await redisClient.connect();

console.log("✅ Connected to Redis");

const API_HEADERS = {
  "x-rapidapi-key": process.env.API_FOOTBALL_KEY,
  "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
};

// ---------------- CACHE DURATIONS ----------------
const TTL_TODAY =  24 * 60 * 60; // 24h
const TTL_LIVE = 60*1; // 1 min
const TTL_SCHEDULE = 12 * 60 * 60; // 12h
const TTL_MATCHES = 30 * 60; // 30 min

// ---------------- HELPERS ----------------
async function getFromCacheOrFetch(cacheKey, ttl, fetchFn) {
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log(`⚡ Serving from cache: ${cacheKey}`);
    return JSON.parse(cached);
  }
  const fresh = await fetchFn();
  if (fresh) {
    await redisClient.setEx(cacheKey, ttl, JSON.stringify(fresh));
    console.log(`✅ Cached: ${cacheKey}`);
  }
  return fresh || [];
}



// ---------------- TEAM LOOKUP ----------------
async function getTeamIdByName(name) {
  try {
    const res = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v3/teams?search=${encodeURIComponent(name)}`,
      { headers: API_HEADERS }
    );
    return res.data.response[0]?.team.id || null;
  } catch (err) {
    console.error("Error fetching team ID:", err.response?.data || err.message);
    return null;
  }
}

// ---------------- ROUTES ----------------

// 🔴 Live matches (refresh every 1 min)
app.get("/live", async (req, res) => {
  const cacheKey = "live:all";
  const matches = await getFromCacheOrFetch(cacheKey, TTL_LIVE, async () => {
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=39-140-135-78-61-3-4-2-94-203-200-313",
      { headers: API_HEADERS }
    );
    return response.data.response;
  });
  res.json(matches);
});

// 🟢 Today’s matches (cached 24h)
app.get("/today", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const cacheKey = `today:${today}`;
  const matches = await getFromCacheOrFetch(cacheKey, TTL_TODAY, async () => {
    const response = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`,
      { headers: API_HEADERS }
    );
    return response.data.response;
  });
  const filteredMatches = filterPreferredLeagues(matches)
  res.json(filteredMatches);
});
// filtering matches
function filterPreferredLeagues(matches) { // 39-140-135-78-61-3-4-2-94
  const preferredLeagues = [39, 140, 78, 135, 61, 3, 4, 2, 94, 253, 313, 200, 203, 8];
  return matches.filter(match => preferredLeagues.includes(match.league.id));
}


// 🟡 Tomorrow’s schedule (cached 12h)
app.get("/schedule", async (req, res) => {
  const tomorrow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const cacheKey = `schedule:${tomorrow}`;
  const matches = await getFromCacheOrFetch(cacheKey, TTL_SCHEDULE, async () => {
    const response = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${tomorrow}`,
      { headers: API_HEADERS }
    );
    return response.data.response;
  });
  const filteredMatches = filterPreferredLeagues(matches)
  res.json(filteredMatches);
});

// 🔍 Search fixtures by team name (cached 30m)
app.get("/matches", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Please provide a team name" });

  const cacheKey = `matches:${query.toLowerCase()}`;
  const matches = await getFromCacheOrFetch(cacheKey, TTL_MATCHES, async () => {
    const teamId = await getTeamIdByName(query);
    if (!teamId) return null;
    const response = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=2025&team=${teamId}`,
      { headers: API_HEADERS }
    );
    return response.data.response;
  });

  if (!matches || matches.length === 0) {
    return res.status(404).json({ error: "No matches found" });
  }

  res.json(matches);
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
