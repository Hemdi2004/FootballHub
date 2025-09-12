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
- **Frontend:** Vanilla JS  
- **Database:** Redis (currently only caching; could extend to persistent DB later)  

---

## ⚡ Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Hemdi2004/FootballHub.git
cd FootballHub
