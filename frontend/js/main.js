const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('matchesTableBody');
const defaultMatches = [
  {
    "fixture": {
      "id": 1377400,
      "referee": "João Pedro Silva Pinheiro",
      "timezone": "UTC",
      "date": "2025-08-13T19:00:00+00:00",
      "timestamp": 1755111600,
      "periods": {
        "first": null,
        "second": null
      },
      "venue": {
        "id": 20416,
        "name": "Bluenergy Stadium",
        "city": "Udine"
      },
      "status": {
        "long": "Not Started",
        "short": "NS",
        "elapsed": null,
        "extra": null
      }
    },
    "league": {
      "id": 531,
      "name": "UEFA Super Cup",
      "country": "World",
      "logo": "https://media.api-sports.io/football/leagues/531.png",
      "flag": null,
      "season": 2025,
      "round": "Final",
      "standings": false
    },
    "teams": {
      "home": {
        "id": 85,
        "name": "Paris Saint Germain",
        "logo": "https://media.api-sports.io/football/teams/85.png",
        "winner": null
      },
      "away": {
        "id": 47,
        "name": "Tottenham",
        "logo": "https://media.api-sports.io/football/teams/47.png",
        "winner": null
      }
    },
    "goals": {
      "home": null,
      "away": null
    },
    "score": {
      "halftime": {
        "home": null,
        "away": null
      },
      "fulltime": {
        "home": null,
        "away": null
      },
      "extratime": {
        "home": null,
        "away": null
      },
      "penalty": {
        "home": null,
        "away": null
      }
    }
  },
   {
    "fixture": {
      "id": 1377400,
      "referee": "João Pedro Silva Pinheiro",
      "timezone": "UTC",
      "date": "2025-08-13T19:00:00+00:00",
      "timestamp": 1755111600,
      "periods": {
        "first": null,
        "second": null
      },
      "venue": {
        "id": 20416,
        "name": "Bluenergy Stadium",
        "city": "Udine"
      },
      "status": {
        "long": "Not Started",
        "short": "NS",
        "elapsed": null,
        "extra": null
      }
    },
    "league": {
      "id": 531,
      "name": "UEFA Super Cup",
      "country": "World",
      "logo": "https://media.api-sports.io/football/leagues/531.png",
      "flag": null,
      "season": 2025,
      "round": "Final",
      "standings": false
    },
    "teams": {
      "home": {
        "id": 85,
        "name": "Paris Saint Germain",
        "logo": "https://media.api-sports.io/football/teams/85.png",
        "winner": null
      },
      "away": {
        "id": 47,
        "name": "Tottenham",
        "logo": "https://media.api-sports.io/football/teams/47.png",
        "winner": null
      }
    },
    "goals": {
      "home": null,
      "away": null
    },
    "score": {
      "halftime": {
        "home": null,
        "away": null
      },
      "fulltime": {
        "home": null,
        "away": null
      },
      "extratime": {
        "home": null,
        "away": null
      },
      "penalty": {
        "home": null,
        "away": null
      }
    }
  },
   {
    "fixture": {
      "id": 1377400,
      "referee": "João Pedro Silva Pinheiro",
      "timezone": "UTC",
      "date": "2025-08-13T19:00:00+00:00",
      "timestamp": 1755111600,
      "periods": {
        "first": null,
        "second": null
      },
      "venue": {
        "id": 20416,
        "name": "Bluenergy Stadium",
        "city": "Udine"
      },
      "status": {
        "long": "Not Started",
        "short": "NS",
        "elapsed": null,
        "extra": null
      }
    },
    "league": {
      "id": 531,
      "name": "UEFA Super Cup",
      "country": "World",
      "logo": "https://media.api-sports.io/football/leagues/531.png",
      "flag": null,
      "season": 2025,
      "round": "Final",
      "standings": false
    },
    "teams": {
      "home": {
        "id": 85,
        "name": "Paris Saint Germain",
        "logo": "https://media.api-sports.io/football/teams/85.png",
        "winner": null
      },
      "away": {
        "id": 47,
        "name": "Tottenham",
        "logo": "https://media.api-sports.io/football/teams/47.png",
        "winner": null
      }
    },
    "goals": {
      "home": null,
      "away": null
    },
    "score": {
      "halftime": {
        "home": null,
        "away": null
      },
      "fulltime": {
        "home": null,
        "away": null
      },
      "extratime": {
        "home": null,
        "away": null
      },
      "penalty": {
        "home": null,
        "away": null
      }
    }
  },
   {
    "fixture": {
      "id": 1377400,
      "referee": "João Pedro Silva Pinheiro",
      "timezone": "UTC",
      "date": "2025-08-13T19:00:00+00:00",
      "timestamp": 1755111600,
      "periods": {
        "first": null,
        "second": null
      },
      "venue": {
        "id": 20416,
        "name": "Bluenergy Stadium",
        "city": "Udine"
      },
      "status": {
        "long": "Not Started",
        "short": "NS",
        "elapsed": null,
        "extra": null
      }
    },
    "league": {
      "id": 531,
      "name": "UEFA Super Cup",
      "country": "World",
      "logo": "https://media.api-sports.io/football/leagues/531.png",
      "flag": null,
      "season": 2025,
      "round": "Final",
      "standings": false
    },
    "teams": {
      "home": {
        "id": 85,
        "name": "Paris Saint Germain",
        "logo": "https://media.api-sports.io/football/teams/85.png",
        "winner": null
      },
      "away": {
        "id": 47,
        "name": "Tottenham",
        "logo": "https://media.api-sports.io/football/teams/47.png",
        "winner": null
      }
    },
    "goals": {
      "home": null,
      "away": null
    },
    "score": {
      "halftime": {
        "home": null,
        "away": null
      },
      "fulltime": {
        "home": null,
        "away": null
      },
      "extratime": {
        "home": null,
        "away": null
      },
      "penalty": {
        "home": null,
        "away": null
      }
    }
  },
   {
    "fixture": {
      "id": 1377400,
      "referee": "João Pedro Silva Pinheiro",
      "timezone": "UTC",
      "date": "2025-08-13T19:00:00+00:00",
      "timestamp": 1755111600,
      "periods": {
        "first": null,
        "second": null
      },
      "venue": {
        "id": 20416,
        "name": "Bluenergy Stadium",
        "city": "Udine"
      },
      "status": {
        "long": "Not Started",
        "short": "NS",
        "elapsed": null,
        "extra": null
      }
    },
    "league": {
      "id": 531,
      "name": "UEFA Super Cup",
      "country": "World",
      "logo": "https://media.api-sports.io/football/leagues/531.png",
      "flag": null,
      "season": 2025,
      "round": "Final",
      "standings": false
    },
    "teams": {
      "home": {
        "id": 85,
        "name": "Paris Saint Germain",
        "logo": "https://media.api-sports.io/football/teams/85.png",
        "winner": null
      },
      "away": {
        "id": 47,
        "name": "Tottenham",
        "logo": "https://media.api-sports.io/football/teams/47.png",
        "winner": null
      }
    },
    "goals": {
      "home": null,
      "away": null
    },
    "score": {
      "halftime": {
        "home": null,
        "away": null
      },
      "fulltime": {
        "home": null,
        "away": null
      },
      "extratime": {
        "home": null,
        "away": null
      },
      "penalty": {
        "home": null,
        "away": null
      }
    }
  },
   {
    "fixture": {
      "id": 1377400,
      "referee": "João Pedro Silva Pinheiro",
      "timezone": "UTC",
      "date": "2025-08-13T19:00:00+00:00",
      "timestamp": 1755111600,
      "periods": {
        "first": null,
        "second": null
      },
      "venue": {
        "id": 20416,
        "name": "Bluenergy Stadium",
        "city": "Udine"
      },
      "status": {
        "long": "Not Started",
        "short": "NS",
        "elapsed": null,
        "extra": null
      }
    },
    "league": {
      "id": 531,
      "name": "UEFA Super Cup",
      "country": "World",
      "logo": "https://media.api-sports.io/football/leagues/531.png",
      "flag": null,
      "season": 2025,
      "round": "Final",
      "standings": false
    },
    "teams": {
      "home": {
        "id": 85,
        "name": "Paris Saint Germain",
        "logo": "https://media.api-sports.io/football/teams/85.png",
        "winner": null
      },
      "away": {
        "id": 47,
        "name": "Tottenham",
        "logo": "https://media.api-sports.io/football/teams/47.png",
        "winner": null
      }
    },
    "goals": {
      "home": null,
      "away": null
    },
    "score": {
      "halftime": {
        "home": null,
        "away": null
      },
      "fulltime": {
        "home": null,
        "away": null
      },
      "extratime": {
        "home": null,
        "away": null
      },
      "penalty": {
        "home": null,
        "away": null
      }
    }
  }
];


// when the DOM contents loaded

document.addEventListener("DOMContentLoaded", async () => {
  // Instead of showing static defaultMatches, fetch live ones
  const liveMatches = await fetchLiveMatches();
  console.log(liveMatches)
  if (liveMatches.length > 0) {
    populateTable(liveMatches);
  } else {
    populateTable(defaultMatches); // fallback if no live games
  }

  // search form handler stays the same
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const teamName = searchInput.value.trim();
    if (!teamName) return;

    const matches = await fetchMatches(teamName);
    const sortedMatches = matches.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);
    populateTable(sortedMatches);
  });
});



async function fetchMatches(query) {
  // If the query is empty, don't bother making a network request.
  if (!query) {
    return []; // Return an empty array to clear the table.
  }

  try {
    const response = await fetch(`http://localhost:4000/matches?query=${encodeURIComponent(query)}`);
    
    // Check if the request was successful
    if (!response.ok) {
      // Throw an error to be caught by the catch block
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    // Parse the JSON data and return it
    const matches = await response.json();
    return matches;

  } catch (error) {
    console.error('Error fetching matches:', error);
    // Return an empty array on error so the app doesn't crash.
    return []; 
  }
}

async function fetchLiveMatches() {
  try {
    const response = await fetch("http://localhost:4000/live");
    if (!response.ok) throw new Error("Failed to fetch live matches");
    return await response.json();
  } catch (error) {
    console.error("Error fetching live matches:", error);
    return [];
  }
}



function populateTable(matches) {
  const grouped = groupMatchesByLeague(matches);

  tableBody.innerHTML = '';
  


    Object.keys(grouped).forEach(leagueKey => {
    // League header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <td colspan="10" class="bg-gray-100 font-bold py-2 px-6 text-left">
        ${leagueKey}
      </td>
    `;
    tableBody.appendChild(headerRow);

    // Matches rows
    grouped[leagueKey].forEach(match => {
      const row = document.createElement('tr');
      row.className = "border-b hover:bg-blue-100 cursor-pointer h-20 ";
      row.onclick = () => { location.href = 'index.html'; };

      row.innerHTML = `
        <td class="py-3 px-6 text-center text-green-600 font-semibold whitespace-nowrap"><img src="${match.league.logo}" alt="league-logo" class="w-8 h-8 object-contain flex-shrink-0"/></td>
        <td class="py-3 px-6 whitespace-nowrap">
          <div class="flex items-center gap-3">
            <img src="${match.teams.home.logo}" alt="${match.teams.home.name}" class="w-12 h-12 object-contain flex-shrink-0" />
            <span>${match.teams.home.name}</span>
          </div>
        </td>
        <td class="py-3 px-6 whitespace-nowrap">
          <div class="flex items-center gap-3">
            <img src="${match.teams.away.logo}" alt="${match.teams.away.name}" class="w-12 h-12 object-contain flex-shrink-0" />
            <span>${match.teams.away.name}</span>
          </div>
        </td>
        <td class="py-3 px-6 text-center text-green-600 font-semibold whitespace-nowrap">${formatMatchDate(match.fixture.date)}</td>
        <td class="py-3 px-6 text-center text-green-600 font-semibold whitespace-nowrap">${match.fixture.status.long}</td>
        <td class="py-3 px-6 text-center font-bold whitespace-nowrap">${renderMinutes(match.fixture.status)}</td>
        <td class="py-3 px-6 text-center font-bold whitespace-nowrap">${getMatchScore(match.score)}</td>
        <td class="py-3 px-6 text-center font-bold whitespace-nowrap">${match.fixture.venue?.name || '-'}</td>
      `;

      tableBody.appendChild(row);
    });
  });


  // tableBody.innerHTML = matches.map(match => `
  //     <tr class="border-b hover:bg-gray-100 cursor-pointer h-20" onclick="location.href='match1.html'" >
  //            <td class="py-3 px-6 text-center font-bold whitespace-nowrap">${match.league.name}</td>
  //           <td class="py-3 px-6 whitespace-nowrap">
  //          <div class="flex items-center gap-3">
  //            <img src="${match.teams.home.logo}"
  //                 alt="${match.teams.home.name}"
  //                 class="w-12 h-12 object-contain flex-shrink-0" />
  //            <span>${match.teams.home.name}</span>
  //          </div>
  //        </td>
  //            <td class="py-3 px-6 whitespace-nowrap">
  //          <div class="flex items-center gap-3">
  //            <img src="${match.teams.away.logo}"
  //                 alt="${match.teams.away.name}"
  //                 class="w-12 h-12 object-contain flex-shrink-0" />
  //            <span>${match.teams.away.name}</span>
  //          </div>
  //        </td>
  //           <td class="py-3 px-6 text-center text-green-600 font-semibold whitespace-nowrap">${match.fixture.status.long}</td>
  //           <td class="py-3 px-6 text-center font-bold whitespace-nowrap">${renderMinutes(match.fixture.status)}</td>
  //           <td class="py-3 px-6 text-center font-bold whitespace-nowrap">${getMatchScore(match.score)}</td>
  //           <td class="py-3 px-6 text-center font-bold whitespace-nowrap">${match.fixture.venue.name}</td>
  //      </tr>
  // `).join("");
}
function formatMatchDate(isoString) {
  const dateObj = new Date(isoString);

  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 0-indexed
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


function getMatchScore(score) {
  if (score.penalty.home !== null || score.penalty.away !== null) {
    return `${score.penalty.home} - ${score.penalty.away} (PEN)`;
  } else if (score.extratime.home !== null || score.extratime.away !== null) {
    return `${score.extratime.home} - ${score.extratime.away} (ET)`;
  } else if (score.fulltime.home !== null || score.fulltime.away !== null) {
    return `${score.fulltime.home} - ${score.fulltime.away}`;
  } else if (score.halftime.home !== null || score.halftime.away !== null) {
    return `${score.halftime.home} - ${score.halftime.away} (HT)`;
  }
  return "—"; // No score yet
}

function renderMinutes(status) {
  if (status.elapsed == null) return "-"; // match not started yet

  if (status.extra != null) {
    return `${status.elapsed}+${status.extra}'`;
  }
  return `${status.elapsed}'`;
}

function groupMatchesByLeague(matches) {
  const grouped = {};

  matches.forEach(match => {
    const leagueKey = `${match.league.country} - ${match.league.name}`;
    if (!grouped[leagueKey]) grouped[leagueKey] = [];
    grouped[leagueKey].push(match);
  });

  return grouped;
}


