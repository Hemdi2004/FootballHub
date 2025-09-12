import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();
console.log("✅ Connected to Redis");



const app = express();
app.use(cors());
const PORT = 4000;

const API_HEADERS = {
  'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
  'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
};

// Cache for live matches
let liveCache = {
  data: null,
  timestamp: 0
};

const LIVE_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Cache key & duration
const CACHE_KEY = "live_matches";
const LIVE_CACHE_DURATION_IN_SECONDS = 24 * 60 * 60; // 24 hours in seconds


// Cache structure: { [teamId]: { data: [...], timestamp: ms } }
const fixturesCache = {};
const CACHE_DURATION = 60 * 1000; // 1 minute


// Lookup team ID by name
async function getTeamIdByName(name) {
  try {
    const response = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v3/teams?search=${encodeURIComponent(name)}`,
      { headers: API_HEADERS }
    );
    return response.data.response[0]?.team.id || null;
  } catch (error) {
    console.error('Error fetching team ID:', error.response?.data || error.message);
    return null;
  }
}

// Fetch fixtures for a team with caching
async function fetchFixturesByTeamId(teamId) {
  const now = Date.now();

  // Check cache
  if (
    fixturesCache[teamId] &&
    now - fixturesCache[teamId].timestamp < CACHE_DURATION
  ) {
    return fixturesCache[teamId].data;
  }

  try {
    const response = await axios.get(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=2025&team=${teamId}`,
      { headers: API_HEADERS }
    );

    const fixtures = response.data.response;

    // Cache it
    fixturesCache[teamId] = {
      data: fixtures,
      timestamp: now,
    };

    return fixtures;
  } catch (error) {
    console.error('Error fetching fixtures:', error.response?.data || error.message);
    return null;
  }
}


// Fetch live matches (all leagues)
async function fetchLiveMatches() {
  // 1️⃣ Try to get from Redis
  const cached = await redisClient.get(CACHE_KEY);
  if (cached) {
    console.log("⚡ Serving live matches from Redis cache");
    return JSON.parse(cached);
  }

  try {
    // 2️⃣ Fetch fresh data from API
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all",
      { headers: API_HEADERS }
    );
    let matches = response.data.response;

    // Fallback to today's fixtures if no live ones
    // if (!matches || matches.length === 0) {
    //   const today = new Date().toISOString().split("T")[0];
    //   const fallback = await axios.get(
    //     `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${today}`,
    //     { headers: API_HEADERS }
    //   );
    //   matches = fallback.data.response;
    // }

    // 3️⃣ Cache in Redis for 24h
    await redisClient.setEx(CACHE_KEY, 24 * 60 * 60, JSON.stringify(matches));
    console.log("⚡ Fetched fresh live matches and cached in Redis");

    return matches;

  } catch (error) {
    console.error("Error fetching live matches:", error.response?.data || error.message);
    return []; // fallback empty array
  }
}


app.get("/live", async (req, res) => {
  const matches = await fetchLiveMatches();
  res.json(matches);
});


// Main endpoint
app.get('/matches', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Please provide a search query' });
  }

  const cacheKey = `matches:${query.toLowerCase()}`;

  try {
    // 1️⃣ Check Redis cache first
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log(`⚡ Serving matches for "${query}" from cache`);
      return res.json(JSON.parse(cached));
    }

    // 2️⃣ Get team ID (API call)
    const teamId = await getTeamIdByName(query);
    if (!teamId) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // 3️⃣ Fetch fixtures by team ID (API call)
    const fixtures = await fetchFixturesByTeamId(teamId);
    if (!fixtures) {
      return res.status(500).json({ error: 'Failed to fetch fixtures' });
    }

    // 4️⃣ Cache results in Redis for 24 hours (86400 seconds)
    await redisClient.setEx(cacheKey, 86400, JSON.stringify(fixtures));

    console.log(`✅ Cached matches for "${query}" in Redis`);
    res.json(fixtures);

  } catch (error) {
    console.error("Error in /matches endpoint:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});