# FootballHub

**FootballHub** is a web application that provides live and upcoming football match information using the Football API. Matches are cached in Redis to reduce API requests and improve performance. The application supports team search, live match tracking, and progressive features that will be added over time.  

---

## 📝 Features

- **Live Matches:** Fetch and display all currently live matches.  
- **Team Search:** Search for a team and get its fixtures.  
- **Caching with Redis:** All data is cached to minimize API calls and improve response time.  
- **Fallback Mechanism:** If no live matches are found, today’s fixtures are served.  
- **Progressive Features:** Future features will include:
  - League-specific fixtures  
  - Match statistics and player lineups  
  - Notifications for favorite teams  

---

## 💻 Tech Stack

- **Backend:** Node.js, Express.js  
- **API:** Football API via RapidAPI  
- **Caching:** Redis (for live matches and team fixtures)  
- **Frontend:** vanilla js 
- **Database:** Redis (currently only caching; could extend to persistent DB later)  

---

## ⚡ Installation

1. Clone the repository:
```bash
git clone https://github.com/Hemdi2004/FootballHub.git
cd FootballHub

2. Install dependencies
```bash

npm install

3. Set up environment variables:  
Create a `.env` file in the root and add your keys:

```env
API_FOOTBALL_KEY=your_rapidapi_key
REDIS_URL=redis://default:your_redis_password@your_redis_host:port

4. Run the server

```bash

npm start


🗄 Caching & API Quota Management

Live matches and team fixtures are cached in Redis to reduce API requests.

TTL (time-to-live) for cached data: 24 hours.

Redis ensures data persists even if the server is restarted.

Cache is automatically used if available, reducing the need for repeated API calls.

