const DEPARTURES = {
  kaohsiung: {
    label: "高雄",
    route: "高雄 → 澎湖",
    port: "高雄港",
    dest: "澎湖",
  },
  penghu: {
    label: "澎湖",
    route: "澎湖 → 高雄",
    port: "馬公港",
    dest: "高雄",
  },
};

const MOCK_FLIGHTS = [
  { depart: "08:00", arrive: "12:00", ship: "澎湖輪", seats: "充足" },
  { depart: "14:00", arrive: "18:00", ship: "澎湖輪", seats: "少量" },
];

const state = {
  tripType: "single",
  departure: "kaohsiung",
  dateGo: null,
  dateBack: null,
  addVehicle: false,
  dateTarget: "go",
};

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === `page-${pageId}`);
  });
  closeMenu();
}

function formatDateZh(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  return `${date.getMonth() + 1}月${date.getDate()}日週${weekdays[date.getDay()]}`;
}

function getTodayStr() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMaxDateStr() {
  const max = new Date();
  max.setDate(max.getDate() + 56);
  const y = max.getFullYear();
  const m = String(max.getMonth() + 1).padStart(2, "0");
  const d = String(max.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function updateHomeFields() {
  const dep = DEPARTURES[state.departure];
  document.getElementById("home-departure").textContent = dep.label;
  document.getElementById("home-date-go").textContent = state.dateGo
    ? formatDateZh(state.dateGo)
    : "請選擇日期";
  document.getElementById("home-date-back").textContent = state.dateBack
    ? formatDateZh(state.dateBack)
    : "請選擇日期";

  document.getElementById("field-date-back").classList.toggle(
    "hidden",
    state.tripType !== "round"
  );
}

function updateTripTabs() {
  document.querySelectorAll(".trip-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.trip === state.tripType);
  });
}

function updateRouteCards() {
  document.querySelectorAll(".route-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.departure === state.departure);
  });
}

function openDatePage(target) {
  state.dateTarget = target;
  const isBack = target === "back";
  document.getElementById("date-page-title").textContent = isBack
    ? "選擇回程日期"
    : "選擇去程日期";
  document.getElementById("date-field-label").textContent = isBack
    ? "選擇回程日期"
    : "選擇出發日期";

  const dep = DEPARTURES[state.departure];
  document.getElementById("date-route-banner").textContent = dep.route;

  const input = document.getElementById("departure-date");
  input.min = isBack && state.dateGo ? state.dateGo : getTodayStr();
  input.max = getMaxDateStr();
  input.value = isBack ? state.dateBack || "" : state.dateGo || "";

  document.getElementById("btn-date-confirm").disabled = !input.value;
  showPage("date");
}

function selectDeparture(key) {
  state.departure = key;
  updateRouteCards();
  updateHomeFields();
  showPage("home");
}

function confirmDate() {
  const value = document.getElementById("departure-date").value;
  if (!value) return;

  if (state.dateTarget === "back") {
    state.dateBack = value;
  } else {
    state.dateGo = value;
    if (state.dateBack && state.dateBack < value) {
      state.dateBack = null;
    }
  }

  updateHomeFields();
  showPage("home");
}

function searchFlights() {
  if (!state.dateGo) {
    openDatePage("go");
    return;
  }
  if (state.tripType === "round" && !state.dateBack) {
    openDatePage("back");
    return;
  }

  const dep = DEPARTURES[state.departure];
  const vehicleText = state.addVehicle ? "是" : "否";
  let summary = `航程：${dep.route}\n去程：${formatDateZh(state.dateGo)}`;
  if (state.tripType === "round" && state.dateBack) {
    summary += `\n回程：${formatDateZh(state.dateBack)}`;
  }
  summary += `\n加購車輛：${vehicleText}`;

  document.getElementById("search-summary").textContent = summary;

  const list = document.getElementById("flight-list");
  list.innerHTML = MOCK_FLIGHTS.map(
    (f) => `
    <div class="flight-card">
      <div class="flight-time">
        <span class="time">${f.depart}</span>
        <span class="arrow">→</span>
        <span class="time">${f.arrive}</span>
      </div>
      <div class="flight-meta">
        <span>${dep.port} → ${dep.dest}</span>
        <span>${f.ship} · 座位${f.seats}</span>
      </div>
      <a href="https://tnc-kao.com.tw/booking" class="btn btn-primary" target="_blank" rel="noopener">
        前往官網訂票
      </a>
    </div>
  `
  ).join("");

  showPage("results");
}

function openMenu() {
  document.getElementById("side-menu").classList.add("open");
  document.getElementById("menu-overlay").classList.add("open");
  document.getElementById("side-menu").setAttribute("aria-hidden", "false");
}

function closeMenu() {
  document.getElementById("side-menu").classList.remove("open");
  document.getElementById("menu-overlay").classList.remove("open");
  document.getElementById("side-menu").setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-nav]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const nav = el.dataset.nav;
    if (nav === "date-back") {
      e.preventDefault();
      openDatePage("back");
      return;
    }
    if (nav === "date") {
      e.preventDefault();
      openDatePage("go");
      return;
    }
    if (nav) {
      e.preventDefault();
      showPage(nav);
    }
  });
});

document.querySelectorAll(".trip-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    state.tripType = tab.dataset.trip;
    if (state.tripType === "single") {
      state.dateBack = null;
    }
    updateTripTabs();
    updateHomeFields();
  });
});

document.querySelectorAll(".route-card").forEach((card) => {
  card.addEventListener("click", () => selectDeparture(card.dataset.departure));
});

document.getElementById("departure-date").addEventListener("change", (e) => {
  document.getElementById("btn-date-confirm").disabled = !e.target.value;
});

document.getElementById("btn-date-confirm").addEventListener("click", confirmDate);
document.getElementById("btn-search").addEventListener("click", searchFlights);

document.getElementById("add-vehicle").addEventListener("change", (e) => {
  state.addVehicle = e.target.checked;
});

document.getElementById("btn-menu").addEventListener("click", openMenu);
document.getElementById("btn-close-menu").addEventListener("click", closeMenu);
document.getElementById("menu-overlay").addEventListener("click", closeMenu);

updateTripTabs();
updateHomeFields();
updateRouteCards();
