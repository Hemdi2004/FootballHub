// ---------------- ELEMENTS ----------------
const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("matchesTableBody");
const filterContainer = document.getElementById("league-filter");

// ---------------- GLOBAL STATE ----------------
let currentMatches = []; // store last fetched matches

// ---------------- LEAGUES ----------------
const preferredLeagues = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 78, name: "Bundesliga" },
  { id: 135, name: "Serie A" },
  { id: 61, name: "Ligue 1" },
  { id: 3, name: "Eredivisie" },
  { id: 4, name: "Primeira Liga" },
  { id: 2, name: "Champions League" },
  { id: 288, name: "Saudi Pro League" },
  { id: 203, name: "Turkish Super Lig" },
  { id: 200, name: "Botola Pro League" }
]; //39, 140, 78, 135, 61, 3, 4, 2, 94, 253, 313, 200, 288, 203

// ---------------- INIT ----------------
document.addEventListener("DOMContentLoaded", async () => {
  // Render filter checkboxes
  preferredLeagues.forEach(league => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `league-${league.id}`;
    checkbox.value = league.id;
    checkbox.checked = false;
    checkbox.className = "form-checkbox text-blue-600 rounded focus:ring-blue-500";

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.innerText = league.name;
    label.className = "ml-2 text-gray-700";

    filterContainer.appendChild(checkbox);
    filterContainer.appendChild(label);
  });

  // Load today's matches initially
  await loadToday();

  // Listen for nav clicks
  document.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    if (!action) return;
    e.preventDefault();

    if (action === "home") loadToday();
    if (action === "live") loadLive();
    if (action === "schedule") loadSchedule();
  });

  // Listen for filter changes
  filterContainer.addEventListener("change", applyLeagueFilter);
  
  // Show filter List
   showFilterList()
  // Search form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const teamName = searchInput.value.trim();
    if (!teamName) return;

    const matches = await fetchMatches(teamName);
    currentMatches = matches;
    const sortedMatches = matches.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);
    applyLeagueFilter();
  });
});

// toggling filter list

function showFilterList() {
  // ---------------- COLLAPSIBLE FILTER ----------------
const toggleBtn = document.getElementById("toggleFilterBtn");
const filterWrapper = document.getElementById("filterWrapper");
const filterBtnText = document.getElementById("filterBtnText");

toggleBtn.addEventListener("click", () => {
  const isHidden = filterWrapper.classList.contains("hidden");

  if (isHidden) {
    filterWrapper.classList.remove("hidden");
    filterBtnText.innerText = "Hide Filters";
  } else {
    filterWrapper.classList.add("hidden");
    filterBtnText.innerText = "Show Filters";
  }
});

}
// ---------------- FETCH HELPERS ----------------
async function fetchMatches(query) {
  if (!query) return [];

  try {
    const response = await fetch(`http://localhost:4000/matches?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Failed to fetch team matches");
    return await response.json();
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
}

async function loadToday() {
  try {
    const res = await fetch("http://localhost:4000/today");
    if (!res.ok) throw new Error("Failed to fetch today's matches");
    const matches = await res.json();
    currentMatches = matches;
    applyLeagueFilter();
    return matches;
  } catch (err) {
    console.error("Error in loadToday:", err);
    return [];
  }
}

async function loadLive() {
  try {
    const res = await fetch("http://localhost:4000/live");
    if (!res.ok) throw new Error("Failed to fetch live matches");
    const matches = await res.json();
    currentMatches = matches;
    applyLeagueFilter();
    return matches;
  } catch (err) {
    console.error("Error in loadLive:", err);
    return [];
  }
}

async function loadSchedule() {
  try {
    const res = await fetch("http://localhost:4000/schedule");
    if (!res.ok) throw new Error("Failed to fetch schedule");
    const matches = await res.json();
    currentMatches = matches;
    applyLeagueFilter();
    return matches;
  } catch (err) {
    console.error("Error in loadSchedule:", err);
    return [];
  }
}

// ---------------- LEAGUE FILTER ----------------

function applyLeagueFilter() {
  const checkedLeagues = Array.from(
    filterContainer.querySelectorAll("input[type='checkbox']:checked")
  ).map(cb => parseInt(cb.value));

  let filtered;
  if (checkedLeagues.length === 0) {
    // Fallback: show all matches if nothing is checked
    filtered = currentMatches;
  } else {
    filtered = currentMatches.filter(match =>
      checkedLeagues.includes(match.league.id)
    );
  }

  populateTable(filtered);
}

// ---------------- TABLE RENDERING ----------------
function populateTable(matches) {
  if (!matches || matches.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="10" class="text-center py-4 text-gray-500">No matches available</td></tr>';
    return;
  }

  const grouped = groupMatchesByLeague(matches);
  tableBody.innerHTML = "";

  Object.keys(grouped).forEach(leagueKey => {
    // League header
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <td colspan="10" class="bg-gray-100 font-bold py-2 px-6 text-left">
        ${leagueKey}
      </td>
    `;
    tableBody.appendChild(headerRow);

    // Matches
    grouped[leagueKey].forEach(match => {
      const row = document.createElement("tr");
      row.className = "border-b hover:bg-blue-100 cursor-pointer h-20";
      row.onclick = () => location.href = "index.html";

      row.innerHTML = `
        <td class="py-3 px-6 text-center"><img src="${match.league.logo}" alt="league-logo" class="w-8 h-8 object-contain"/></td>
        <td class="py-3 px-6 whitespace-nowrap">
          <div class="flex items-center gap-3">
            <img src="${match.teams.home.logo}" alt="${match.teams.home.name}" class="w-12 h-12 object-contain" />
            <span>${match.teams.home.name}</span>
          </div>
        </td>
        <td class="py-3 px-6 whitespace-nowrap">
          <div class="flex items-center gap-3">
            <img src="${match.teams.away.logo}" alt="${match.teams.away.name}" class="w-12 h-12 object-contain" />
            <span>${match.teams.away.name}</span>
          </div>
        </td>
        <td class="py-3 px-6 text-center">${formatMatchDate(match.fixture.date)}</td>
        <td class="py-3 px-6 text-center">${match.fixture.status.long}</td>
        <td class="py-3 px-6 text-center font-bold">${renderMinutes(match.fixture.status)}</td>
        <td class="py-3 px-6 text-center font-bold">${getMatchScore(match.score)}</td>
        <td class="py-3 px-6 text-center">${match.fixture.venue?.name || "-"}</td>
      `;
      tableBody.appendChild(row);
    });
  });
}

// ---------------- UTILITIES ----------------
function formatMatchDate(isoString) {
  const dateObj = new Date(isoString);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function getMatchScore(score) {
  if (score.penalty.home != null || score.penalty.away != null) {
    return `${score.penalty.home} - ${score.penalty.away} (PEN)`;
  } else if (score.extratime.home != null || score.extratime.away != null) {
    return `${score.extratime.home} - ${score.extratime.away} (ET)`;
  } else if (score.fulltime.home != null || score.fulltime.away != null) {
    return `${score.fulltime.home} - ${score.fulltime.away}`;
  } else if (score.halftime.home != null || score.halftime.away != null) {
    return `${score.halftime.home} - ${score.halftime.away} (HT)`;
  }
  return "—";
}

function renderMinutes(status) {
  if (status.elapsed == null) return "-";
  return status.extra != null ? `${status.elapsed}+${status.extra}'` : `${status.elapsed}'`;
}

function groupMatchesByLeague(matches) {
  return matches.reduce((acc, match) => {
    const leagueKey = `${match.league.country} - ${match.league.name}`;
    if (!acc[leagueKey]) acc[leagueKey] = [];
    acc[leagueKey].push(match);
    return acc;
  }, {});
}
