import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 4000;

const API_HEADERS = {
  'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
  'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
};


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
  try {
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all",
      { headers: API_HEADERS }
    );
    return response.data.response;
  } catch (error) {
    console.error("Error fetching live matches:", error.response?.data || error.message);
    return [];
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

  // 1. Get team ID
  const teamId = await getTeamIdByName(query);
  if (!teamId) {
    return res.status(404).json({ error: 'Team not found' });
  }

  // 2. Fetch fixtures for that team
  const fixtures = await fetchFixturesByTeamId(teamId);
  if (!fixtures) {
    return res.status(500).json({ error: 'Failed to fetch fixtures' });
  }

  // 3. Return fixtures as JSON
  res.json(fixtures);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



// the second way @
// async function searchFixturesByTeamName(name) {
//   // 1. Get team ID
//   const teamRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?search=${name}`, {
//     headers: {
//       'x-rapidapi-key': API_KEY,
//       'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
//     }
//   });
//   const teamJson = await teamRes.json();
//   const teamId = teamJson.response[0]?.team.id;
//   if (!teamId) return console.error('Team not found');

//   // 2. Get fixtures
//   const fixturesRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${teamId}&season=2025`, {
//     headers: {
//       'x-rapidapi-key': API_KEY,
//       'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
//     }
//   });
//   const fixturesJson = await fixturesRes.json();
//   console.log(fixturesJson);
// }





// const API_URL = "https://api-football-v1.p.rapidapi.com/v3/fixtures?season=2025&team=${teamId}";
// const API_HEADERS = {
//   'x-rapidapi-key': process.env.API_FOOTBALL_KEY,
//   'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
// };

// app.use(cors());

// let cachedMatches = null;
// let lastFetchTime = 0;
// const CACHE_DURATION = 60 * 1000; // 1 minute

// async function fetchMatches() {
//   const now = Date.now();

//   if (cachedMatches && (now - lastFetchTime) < CACHE_DURATION) {
//     return cachedMatches;
//   }

//   try {
//     const response = await axios.get(API_URL, { headers: API_HEADERS });

//     cachedMatches = response.data.response; // API-Sports stores matches in .response
//     console.log(response.data.response); // testing the response
//     lastFetchTime = now;
//     console.log('Fetched fresh data at', new Date().toLocaleTimeString());
//     return cachedMatches;

//   } catch (error) {
//     console.error('Error fetching matches:', error.response?.data || error.message);
//     return cachedMatches;
//   }
// }


// app.get('/matches', async (req, res) => {
//   const matches = await fetchMatches();

//   if (!matches) {
//     return res.status(500).json({ error: 'Unable to fetch matches right now' });
//   }

//   const userInput = req.query.query || ''; // get search input from query string

//   if (!userInput) {
//     // No filter, return an error
//     return res.status(400).json({ error: 'Please provide a search query' });
//   }

//   const filteredMatches = filterMatches(matches, userInput);

//   res.json(filteredMatches);
// });


// // filtering logic

// function filterMatches(matches, query) {
//   const q = query.toLowerCase().trim();
  
//   // Check if query looks like a date (YYYY-MM-DD)
//   const isDate = /^\d{4}-\d{2}-\d{2}$/.test(q);

//   return matches.filter(match => {
//     if (isDate) {
//       // filter by fixture date slice(0,10)
//       return match.fixture.date.slice(0,10) === q;
//     } else {
//       // filter by country OR home team OR away team includes q
//       const country = (match.league.country || '').toLowerCase();
//       const home = (match.teams.home.name || '').toLowerCase();
//       const away = (match.teams.away.name || '').toLowerCase();

//       return country.includes(q) || home.includes(q) || away.includes(q);
//     }
//   });
// }

// app.listen(PORT, () => {
//   console.log(`Backend server running on http://localhost:${PORT}`);
// });
