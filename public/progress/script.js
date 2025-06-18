// Tab Switching
const codingTab = document.getElementById("codingTab");
const animeTab = document.getElementById("animeTab");
const codingSection = document.getElementById("codingSection");
const animeSection = document.getElementById("animeSection");
const body = document.body;

codingTab.addEventListener("click", () => {
  switchTab("coding");
});

animeTab.addEventListener("click", () => {
  switchTab("anime");
});

function switchTab(tab) {
  if (tab === "coding") {
    codingTab.classList.add("active");
    animeTab.classList.remove("active");
    codingSection.classList.add("active");
    animeSection.classList.remove("active");
    body.classList.remove("anime-mode");
    body.classList.add("coding-mode");
    loadDevLogs();
  } else {
    animeTab.classList.add("active");
    codingTab.classList.remove("active");
    animeSection.classList.add("active");
    codingSection.classList.remove("active");
    body.classList.remove("coding-mode");
    body.classList.add("anime-mode");
    loadAnimeLogs();
  }
}

// Dev Log Functions
function saveDev() {
  const title = document.getElementById("codingTitle").value.trim();
  const entry = document.getElementById("codingEntry").value.trim();
  if (entry) {
    let logs = JSON.parse(localStorage.getItem("devLogs") || "[]");
    logs.push({ time: new Date().toLocaleString(), title, entry });
    localStorage.setItem("devLogs", JSON.stringify(logs));
    document.getElementById("codingTitle").value = "";
    document.getElementById("codingEntry").value = "";
    loadDevLogs();
  }
}

function loadDevLogs() {
  const logs = JSON.parse(localStorage.getItem("devLogs") || "[]").reverse();
  const container = document.getElementById("codingLog");
  container.innerHTML = logs.map(log => `
    <div class="entry">
      <strong>${log.time}</strong><br>
      ${log.title ? `<b>${log.title}</b><br>` : ""}
      ${log.entry}
    </div>
  `).join("");
}

// Anime Log Functions
function saveAnime() {
  const title = document.getElementById("animeTitle").value.trim();
  const entry = document.getElementById("animeEntry").value.trim();
  if (title || entry) {
    let logs = JSON.parse(localStorage.getItem("animeLogs") || "[]");
    logs.push({ time: new Date().toLocaleString(), title, entry });
    localStorage.setItem("animeLogs", JSON.stringify(logs));
    document.getElementById("animeTitle").value = "";
    document.getElementById("animeEntry").value = "";
    loadAnimeLogs();
  }
}

function loadAnimeLogs() {
  const logs = JSON.parse(localStorage.getItem("animeLogs") || "[]").reverse();
  const container = document.getElementById("animeLog");
  container.innerHTML = logs.map(log => `
    <div class="entry">
      <strong>${log.time}</strong><br>
      ${log.title ? `<b>${log.title}</b><br>` : ""}
      ${log.entry}
    </div>
  `).join("");
}

// Load default logs on start
loadDevLogs();
