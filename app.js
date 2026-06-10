const DEPARTURES = {
  kaohsiung: { label: "擃?", dest: "瞉?", route: "擃? ??瞉?", port: "擃?皜? },
  penghu:    { label: "瞉?", dest: "擃?", route: "瞉? ??擃?", port: "擐砍皜? },
};

const MOCK_FLIGHTS = [
  { depart: "08:00", arrive: "12:00", ship: "瞉?頛?, seats: "?雲" },
  { depart: "14:00", arrive: "18:00", ship: "瞉?頛?, seats: "撠?" },
];

const state = {
  tripType: "single",
  departure: "kaohsiung",
  dateGo: null,
  dateBack: null,
  dateTarget: "go",
};

// ?? 撌亙?賢? ??
function formatDateZh(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const weekdays = ["??,"銝","鈭?,"銝?,"??,"鈭?,"??];
  return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} (${weekdays[date.getDay()]})`;
}

function getTodayStr() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;
}

function getMaxDateStr() {
  const m = new Date();
  m.setDate(m.getDate() + 56);
  return `${m.getFullYear()}-${String(m.getMonth()+1).padStart(2,"0")}-${String(m.getDate()).padStart(2,"0")}`;
}

// ?? ??? ??
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.toggle("active", p.id === `page-${pageId}`);
  });
}

// ?? ?湔擐?憿舐內 ??
function updateHomeFields() {
  const dep = DEPARTURES[state.departure];

  document.getElementById("home-departure").textContent = dep.label;
  document.getElementById("home-destination").textContent = dep.dest;

  const dateGoEl = document.getElementById("home-date-go");
  if (dateGoEl) dateGoEl.textContent = state.dateGo ? formatDateZh(state.dateGo) : "隢???;

  const dateBackEl = document.getElementById("home-date-back");
  if (dateBackEl) dateBackEl.textContent = state.dateBack ? formatDateZh(state.dateBack) : "隢???;

  const backBtn = document.getElementById("field-date-back");
  if (backBtn) backBtn.classList.toggle("hidden", state.tripType !== "round");
}

// ?? ?湔?桃?/靘? ??
function updateTripTabs() {
  document.querySelectorAll(".trip-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.trip === state.tripType);
  });
}

// ?? ???交?????
function openDatePage(target) {
  state.dateTarget = target;
  const isBack = target === "back";

  const titleEl = document.getElementById("date-page-title");
  if (titleEl) titleEl.textContent = isBack ? "?豢????交?" : "?豢??餌??交?";

  const bannerEl = document.getElementById("date-route-banner");
  if (bannerEl) bannerEl.textContent = DEPARTURES[state.departure].route;

  const input = document.getElementById("departure-date");
  input.min = isBack && state.dateGo ? state.dateGo : getTodayStr();
  input.max = getMaxDateStr();
  input.value = isBack ? (state.dateBack || "") : (state.dateGo || "");

  const confirmBtn = document.getElementById("btn-date-confirm");
  if (confirmBtn) confirmBtn.disabled = !input.value;

  showPage("date");
}

// ?? 蝣箄??交? ??
function confirmDate() {
  const value = document.getElementById("departure-date").value;
  if (!value) return;
  if (state.dateTarget === "back") {
    state.dateBack = value;
  } else {
    state.dateGo = value;
    if (state.dateBack && state.dateBack < value) state.dateBack = null;
  }
  updateHomeFields();
  showPage("home");
}

// ?? ???芰 ??
function searchFlights() {
  if (!state.dateGo) { openDatePage("go"); return; }
  if (state.tripType === "round" && !state.dateBack) { openDatePage("back"); return; }

  const dep = DEPARTURES[state.departure];
  let summary = `?芰?嚗?{dep.route}??餌?嚗?{formatDateZh(state.dateGo)}`;
  if (state.tripType === "round" && state.dateBack) {
    summary += `???嚗?{formatDateZh(state.dateBack)}`;
  }

  const summaryEl = document.getElementById("search-summary");
  if (summaryEl) summaryEl.textContent = summary;

  const list = document.getElementById("flight-list");
  if (list) {
    list.innerHTML = MOCK_FLIGHTS.map(f => `
      <div class="flight-card">
        <div class="flight-time">
          <span class="time">${f.depart}</span>
          <span class="arrow">??/span>
          <span class="time">${f.arrive}</span>
        </div>
        <div class="flight-meta">
          <span>${dep.port} ??${dep.dest}</span>
          <span>${f.ship} 繚 摨找?${f.seats}</span>
        </div>
        <a href="https://tnc-kao.com.tw/booking" class="btn btn-primary" target="_blank" rel="noopener"
           style="display:block;padding:12px;text-align:center;border-radius:8px;margin-top:12px;">
          ??摰雯閮巨
        </a>
      </div>
    `).join("");
  }

  showPage("results");
}

// ?? 鈭辣蝬? ??

// ?桃?/靘???
document.querySelectorAll(".trip-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    state.tripType = tab.dataset.trip;
    if (state.tripType === "single") state.dateBack = null;
    updateTripTabs();
    updateHomeFields();
  });
});

// ?交?甈?
const fieldDateGo = document.getElementById("field-date-go");
if (fieldDateGo) fieldDateGo.addEventListener("click", () => openDatePage("go"));

const fieldDateBack = document.getElementById("field-date-back");
if (fieldDateBack) fieldDateBack.addEventListener("click", () => openDatePage("back"));

// ?箇?啣???route-row嚗?const fieldDeparture = document.getElementById("field-departure");
if (fieldDeparture) fieldDeparture.addEventListener("click", () => showPage("route"));

// 頝舐??∠??豢?
document.querySelectorAll(".route-card").forEach(card => {
  card.addEventListener("click", () => {
    state.departure = card.dataset.departure;
    updateHomeFields();
    showPage("home");
  });
});

// ?交?頛詨?寡?
const departureDateInput = document.getElementById("departure-date");
if (departureDateInput) {
  departureDateInput.addEventListener("change", e => {
    const confirmBtn = document.getElementById("btn-date-confirm");
    if (confirmBtn) confirmBtn.disabled = !e.target.value;
  });
}

// 蝣箄??交?
const btnDateConfirm = document.getElementById("btn-date-confirm");
if (btnDateConfirm) btnDateConfirm.addEventListener("click", confirmDate);

// ???芰
const btnSearch = document.getElementById("btn-search");
if (btnSearch) btnSearch.addEventListener("click", searchFlights);

// 餈???
document.querySelectorAll(".btn-back").forEach(btn => {
  btn.addEventListener("click", () => showPage("home"));
});

// Tab Bar 閮巨??
document.querySelectorAll(".tab-item[data-nav]").forEach(tab => {
  tab.addEventListener("click", () => showPage("home"));
});

// ?? ??????
updateTripTabs();
updateHomeFields();

