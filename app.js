// ── 車輛票價 ──
const VEHICLE_PRICES = {
  bicycle: {
    kao: { "人隨車乘船": 235, "單獨寄車": 300 },
    phu: { "人隨車乘船": 228, "單獨寄車": 290 },
  },
  motorcycle: {
    "100cc 以下":  { kao: { "人隨車乘船": 596,  "單獨寄車": 782  }, phu: { "人隨車乘船": 575,  "單獨寄車": 761  } },
    "101～150cc": { kao: { "人隨車乘船": 796,  "單獨寄車": 982  }, phu: { "人隨車乘船": 765,  "單獨寄車": 951  } },
    "151～500cc": { kao: { "人隨車乘船": 1346, "單獨寄車": 1532 }, phu: { "人隨車乘船": 1289, "單獨寄車": 1475 } },
    "501cc 以上":  { kao: { "人隨車乘船": 1746, "單獨寄車": 1932 }, phu: { "人隨車乘船": 1670, "單獨寄車": 1856 } },
  },
  car: {
    "2799cc 以下（5人以下）":      { kao: 2244, phu: 2158 },
    "2799cc 以下（6人以上，轎／旅行）": { kao: 2244, phu: 2158 },
    "2799cc 以下（6人以上，廂式）":    { kao: 2939, phu: 2825 },
    "2800cc 以上（全車型）":          { kao: 2939, phu: 2825 },
  },
  truck: {
    "未滿 2 噸": { kao: 2550, phu: 2464 },
    "2～3 噸":  { kao: 3300, phu: 3214 },
    "3～4 噸":  { kao: 4520, phu: 4400 },
    "4～5 噸":  { kao: 5780, phu: 5600 },
    "5～8 噸":  { kao: 7030, phu: 6850 },
    "8～9 噸":  { kao: 8904, phu: 8664 },
  },
  bus: {
    "中型遊覽車（10～25人座）": { kao: 7956, phu: 7656 },
  },
};

// ── 艙等 ──
const CABINS = {
  economy:  { label: "經濟座艙", hint: "一般座位", icon: "💺" },
  business: { label: "商務座艙", hint: "較寬敞座位", icon: "🪑" },
  berth:    { label: "臥鋪艙",   hint: "躺臥休息，可單獨購買", icon: "🛏️" },
  first:    { label: "頭等艙",   hint: "需同時購買4人以上", icon: "⭐" },
  suite:    { label: "特等艙",   hint: "需同時購買2人以上", icon: "👑" },
  vip:      { label: "VIP艙",    hint: "NT$6,000／間，每間限2人", icon: "💎" },
};

// ── 出發地 ──
const DEPARTURES = {
  kaohsiung: { label: "高雄", dest: "澎湖", route: "高雄 → 澎湖", port: "高雄港", arrive: "馬公港" },
  penghu:    { label: "澎湖", dest: "高雄", route: "澎湖 → 高雄", port: "馬公港", arrive: "高雄港" },
};

// ── 真實船期表（民國115年 = 西元2026年，5～8月）──
// 格式：{ kao: ["09:00",...], phu: ["16:00",...] }
// kao = 高雄出發時間，phu = 澎湖出發時間
const SCHEDULE = {
  // 5月
  "2026-05-01": { kao: ["23:30"], phu: [] },
  "2026-05-02": { kao: [], phu: ["15:30"] },
  "2026-05-03": { kao: ["09:00"], phu: ["15:30"] },
  "2026-05-04": { kao: ["09:00"], phu: ["16:00"] },
  "2026-05-05": { kao: ["09:00"], phu: [] },
  "2026-05-08": { kao: ["23:30"], phu: ["10:00"] },
  "2026-05-09": { kao: [], phu: ["10:00"] },
  "2026-05-10": { kao: ["09:00"], phu: ["15:30"] },
  "2026-05-11": { kao: ["09:00"], phu: [] },
  "2026-05-12": { kao: [], phu: ["16:00"] },
  "2026-05-13": { kao: ["23:30"], phu: [] },
  "2026-05-14": { kao: [], phu: ["15:30"] },
  "2026-05-15": { kao: ["09:00"], phu: [] },
  "2026-05-17": { kao: [], phu: ["09:00"] },
  "2026-05-18": { kao: ["09:00"], phu: ["16:00"] },
  "2026-05-19": { kao: ["09:00"], phu: [] },
  "2026-05-20": { kao: ["23:30"], phu: ["09:00"] },
  "2026-05-22": { kao: ["23:30"], phu: ["09:00"] },
  "2026-05-24": { kao: [], phu: ["15:30"] },
  "2026-05-25": { kao: ["09:00"], phu: [] },
  "2026-05-26": { kao: [], phu: ["16:00"] },
  "2026-05-27": { kao: ["23:30"], phu: [] },
  "2026-05-29": { kao: ["23:30"], phu: ["09:00"] },
  "2026-05-31": { kao: [], phu: ["15:30"] },
  // 6月
  "2026-06-01": { kao: ["09:00"], phu: ["16:00"] },
  "2026-06-02": { kao: ["09:00"], phu: [] },
  "2026-06-03": { kao: ["23:30"], phu: ["09:00"] },
  "2026-06-05": { kao: ["23:30"], phu: ["09:00"] },
  "2026-06-07": { kao: [], phu: ["15:30"] },
  "2026-06-08": { kao: ["09:00"], phu: [] },
  "2026-06-09": { kao: [], phu: ["16:00"] },
  "2026-06-10": { kao: ["23:30"], phu: [] },
  "2026-06-12": { kao: ["23:30"], phu: ["09:00"] },
  "2026-06-14": { kao: [], phu: ["15:30"] },
  "2026-06-15": { kao: ["09:00"], phu: ["16:00"] },
  "2026-06-16": { kao: ["09:00"], phu: [] },
  "2026-06-17": { kao: [], phu: ["09:00"] },
  "2026-06-18": { kao: ["23:30"], phu: [] },
  "2026-06-19": { kao: ["23:30"], phu: ["13:00"] },
  "2026-06-20": { kao: [], phu: ["15:30"] },
  "2026-06-21": { kao: ["09:00"], phu: ["15:30"] },
  "2026-06-22": { kao: ["09:00"], phu: ["16:00"] },
  "2026-06-24": { kao: ["23:30"], phu: [] },
  "2026-06-26": { kao: ["23:30"], phu: ["09:00"] },
  "2026-06-28": { kao: [], phu: ["15:30"] },
  "2026-06-29": { kao: ["09:00"], phu: ["16:00"] },
  "2026-06-30": { kao: ["09:00"], phu: [] },
  // 7月
  "2026-07-01": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-03": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-05": { kao: [], phu: ["15:30"] },
  "2026-07-06": { kao: ["09:00"], phu: ["16:00"] },
  "2026-07-07": { kao: ["09:00"], phu: [] },
  "2026-07-08": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-10": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-12": { kao: [], phu: ["15:30"] },
  "2026-07-13": { kao: ["09:00"], phu: ["16:00"] },
  "2026-07-14": { kao: ["09:00"], phu: [] },
  "2026-07-15": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-17": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-19": { kao: [], phu: ["15:30"] },
  "2026-07-20": { kao: ["09:00"], phu: ["16:00"] },
  "2026-07-21": { kao: ["09:00"], phu: [] },
  "2026-07-22": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-24": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-26": { kao: [], phu: ["15:30"] },
  "2026-07-27": { kao: ["09:00"], phu: ["16:00"] },
  "2026-07-28": { kao: ["09:00"], phu: [] },
  "2026-07-29": { kao: ["23:30"], phu: ["09:00"] },
  "2026-07-31": { kao: ["23:30"], phu: ["09:00"] },
  // 8月
  "2026-08-02": { kao: [], phu: ["15:30"] },
  "2026-08-03": { kao: ["09:00"], phu: ["16:00"] },
  "2026-08-04": { kao: ["09:00"], phu: [] },
  "2026-08-05": { kao: ["23:30"], phu: ["09:00"] },
  "2026-08-07": { kao: ["23:30"], phu: ["09:00"] },
  "2026-08-09": { kao: [], phu: ["15:30"] },
  "2026-08-10": { kao: ["09:00"], phu: ["16:00"] },
  "2026-08-11": { kao: ["09:00"], phu: [] },
  "2026-08-12": { kao: ["23:30"], phu: ["09:00"] },
  "2026-08-14": { kao: ["23:30"], phu: ["09:00"] },
  "2026-08-16": { kao: [], phu: ["15:30"] },
  "2026-08-17": { kao: ["09:00"], phu: ["16:00"] },
  "2026-08-18": { kao: ["09:00"], phu: [] },
  "2026-08-19": { kao: ["23:30"], phu: ["09:00"] },
  "2026-08-21": { kao: ["23:30"], phu: ["09:00"] },
  "2026-08-23": { kao: [], phu: ["15:30"] },
  "2026-08-24": { kao: ["09:00"], phu: ["16:00"] },
  "2026-08-25": { kao: ["09:00"], phu: [] },
  "2026-08-26": { kao: ["23:30"], phu: ["09:00"] },
  "2026-08-28": { kao: ["23:30"], phu: ["09:00"] },
  "2026-08-30": { kao: [], phu: ["15:30"] },
  "2026-08-31": { kao: ["09:00"], phu: [] },
};

// ── 票價（高雄出發單程，澎湖方向相同）──
const PRICES = {
  suite:    { adult: 1700, child: 850,  senior: 850, disabled: 850, companion: 850, penghu: 1190, infant: 0 },
  first:    { adult: 1300, child: 650,  senior: 650, disabled: 650, companion: 650, penghu: 910,  infant: 0 },
  berth:    { adult: 980,  child: 490,  senior: 490, disabled: 490, companion: 490, penghu: 686,  infant: 100 },
  business: { adult: 980,  child: 490,  senior: 490, disabled: 490, companion: 490, penghu: 686,  infant: 0 },
  economy:  { adult: 860,  child: 430,  senior: 430, disabled: 430, companion: 430, penghu: 602,  infant: 0 },
  vip:      { adult: 6000, child: 6000, senior: 6000, disabled: 6000, companion: 6000, penghu: 6000, infant: 0 },
};

const TICKET_LABELS = {
  adult: "全票", child: "兒童票", senior: "敬老票",
  disabled: "愛心票", companion: "陪同票", penghu: "澎湖縣民票", infant: "嬰保票",
};

// ── 狀態 ──
const state = {
  tripType: "single",
  departure: "kaohsiung",
  dateGo: null,
  dateBack: null,
  dateTarget: "go",
  timeGo: null,
  timeBack: null,
  vehicle: "none",
  vehicleSub: null,
  vehicleMode: null,
  vehiclePrice: 0,
  vehicleLabel: "不加購",
  selectedFlight: null,
  customer: { name: "", phone: "", id: "", email: "" },
  cabin: "economy",
  passengers: { adult: 1, child: 0, senior: 0, disabled: 0, companion: 0, penghu: 0, infant: 0 },
};

// ── 工具函式 ──
function formatDateZh(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const weekdays = ["日","一","二","三","四","五","六"];
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

// ── 頁面切換 ──
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.toggle("active", p.id === `page-${pageId}`);
  });
}

// ── 更新首頁 ──
function updateHomeFields() {
  const dep = DEPARTURES[state.departure];
  document.getElementById("home-departure").textContent = dep.label;
  document.getElementById("home-destination").textContent = dep.dest;

  const dateGoEl = document.getElementById("home-date-go");
  if (dateGoEl) dateGoEl.textContent = state.dateGo ? formatDateZh(state.dateGo) : "請選擇日期";

  const dateBackEl = document.getElementById("home-date-back");
  if (dateBackEl) dateBackEl.textContent = state.dateBack ? formatDateZh(state.dateBack) : "請選擇日期";

  const backBtn = document.getElementById("field-date-back");
  if (backBtn) backBtn.classList.toggle("hidden", state.tripType !== "round");
}

// ── 更新單程/來回 ──
function updateTripTabs() {
  document.querySelectorAll(".trip-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.trip === state.tripType);
  });
}

// ── 更新艙等顯示 ──
function updateCabinField() {
  document.querySelectorAll(".option-card[data-cabin]").forEach(card => {
    const check = card.querySelector(".option-check");
    if (check) check.textContent = card.dataset.cabin === state.cabin ? "✓" : "";
  });
  const el = document.querySelector("#field-cabin .field-row-value");
  if (el) el.textContent = CABINS[state.cabin].label;
}

// ── 更新乘客顯示 ──
function updatePassengersField() {
  Object.keys(state.passengers).forEach(type => {
    const el = document.getElementById(`count-${type}`);
    if (el) el.textContent = state.passengers[type];
  });

  const parts = [];
  Object.entries(state.passengers).forEach(([type, count]) => {
    if (count > 0) parts.push(`${TICKET_LABELS[type]} ${count}`);
  });
  const el = document.querySelector("#field-passengers .field-row-value");
  if (el) el.textContent = parts.length ? parts.join("、") : "請選擇人數";
}

// ── 日曆 ──
let calYear = 0, calMonth = 0, calSelected = null, calMin = "", calMax = "", calSelectedTime = null;

function renderCalendar() {
  const title = document.getElementById("cal-title");
  const grid = document.getElementById("cal-grid");
  if (!title || !grid) return;

  title.textContent = `${calYear}年 ${calMonth + 1}月`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const todayStr = getTodayStr();
  const direction = state.departure === "kaohsiung" ? "kao" : "phu";

  let html = "";
  for (let i = 0; i < firstDay; i++) html += `<span class="cal-day empty"></span>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const dow = new Date(calYear, calMonth, d).getDay();
    const isDisabled = dateStr < calMin || dateStr > calMax;
    const isToday = dateStr === todayStr;
    const isSelected = dateStr === calSelected;
    const dayData = SCHEDULE[dateStr];
    const hasVoyage = dayData && dayData[direction] && dayData[direction].length > 0;

    let cls = "cal-day";
    if (dow === 0) cls += " sunday";
    if (dow === 6) cls += " saturday";
    if (isToday) cls += " today";
    if (isSelected) cls += " selected";
    if (isDisabled) cls += " disabled";
    if (hasVoyage) cls += " has-voyage";

    html += `<button class="${cls}" data-date="${dateStr}">${d}</button>`;
  }
  grid.innerHTML = html;

  grid.querySelectorAll(".cal-day[data-date]").forEach(btn => {
    btn.addEventListener("click", () => {
      calSelected = btn.dataset.date;
      calSelectedTime = null;
      renderCalendar();
      renderTimeSlots();
    });
  });
}

function renderTimeSlots() {
  const wrap = document.getElementById("time-slots-wrap");
  const slotsEl = document.getElementById("time-slots");
  const confirmBtn = document.getElementById("btn-date-confirm");
  if (!wrap || !slotsEl) return;

  if (!calSelected) { wrap.classList.add("hidden"); return; }

  const direction = state.departure === "kaohsiung" ? "kao" : "phu";
  const dayData = SCHEDULE[calSelected];
  const times = dayData ? dayData[direction] : [];

  if (times.length === 0) {
    wrap.classList.remove("hidden");
    slotsEl.innerHTML = `<div class="no-time-slot">本日無班次，請選擇其他日期</div>`;
    if (confirmBtn) confirmBtn.disabled = true;
    return;
  }

  wrap.classList.remove("hidden");
  slotsEl.innerHTML = times.map(t => {
    const [h, m] = t.split(":");
    const arrHour = (parseInt(h) + 4) % 24;
    const arrTime = `${String(arrHour).padStart(2,"0")}:${m}`;
    const nextDay = parseInt(h) >= 21 ? " 翌日" : "";
    const isSelected = t === calSelectedTime;
    return `
      <button class="time-slot${isSelected ? " selected" : ""}" data-time="${t}">
        <div class="time-slot-depart">${t} 出發</div>
      </button>`;
  }).join("");

  slotsEl.querySelectorAll(".time-slot[data-time]").forEach(btn => {
    btn.addEventListener("click", () => {
      calSelectedTime = btn.dataset.time;
      if (confirmBtn) confirmBtn.disabled = false;
      renderTimeSlots();
    });
  });

  if (confirmBtn) confirmBtn.disabled = !calSelectedTime;
}

function openDatePage(target) {
  state.dateTarget = target;
  const isBack = target === "back";

  const titleEl = document.getElementById("date-page-title");
  if (titleEl) titleEl.textContent = isBack ? "選擇回程日期" : "選擇去程日期";

  const bannerEl = document.getElementById("date-route-banner");
  if (bannerEl) bannerEl.textContent = DEPARTURES[state.departure].route;

  calMin = isBack && state.dateGo ? state.dateGo : getTodayStr();
  calMax = getMaxDateStr();
  calSelected = isBack ? (state.dateBack || null) : (state.dateGo || null);

  const initDate = calSelected ? new Date(calSelected + "T00:00:00") : new Date();
  calYear = initDate.getFullYear();
  calMonth = initDate.getMonth();

  calSelectedTime = null;

  renderCalendar();
  renderTimeSlots();

  const prevBtn = document.getElementById("cal-prev");
  const nextBtn = document.getElementById("cal-next");
  if (prevBtn) prevBtn.onclick = () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  };
  if (nextBtn) nextBtn.onclick = () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  };

  showPage("date");
}

// ── 確認日期 ──
function confirmDate() {
  const value = calSelected;
  if (!value) return;
  if (state.dateTarget === "back") {
    state.dateBack = value;
    state.timeBack = calSelectedTime;
  } else {
    state.dateGo = value;
    state.timeGo = calSelectedTime;
    if (state.dateBack && state.dateBack < value) { state.dateBack = null; state.timeBack = null; }
  }
  updateHomeFields();
  showPage("home");
}

// ── 計算總票價 ──
function calcTotal() {
  const prices = PRICES[state.cabin];
  let total = 0;
  if (state.cabin === "vip") {
    total = 6000;
  } else {
    Object.entries(state.passengers).forEach(([type, count]) => {
      if (count > 0) total += (prices[type] || 0) * count;
    });
  }
  total += state.vehiclePrice || 0;
  return total;
}

// ── 搜尋航班 ──
function searchFlights() {
  if (!state.dateGo) { openDatePage("go"); return; }
  if (state.tripType === "round" && !state.dateBack) { openDatePage("back"); return; }

  state.selectedFlight = null;
  const dep = DEPARTURES[state.departure];
  const cabin = CABINS[state.cabin];
  const direction = state.departure === "kaohsiung" ? "kao" : "phu";
  const dayData = SCHEDULE[state.dateGo];
  const times = dayData ? dayData[direction] : [];

  const summaryEl = document.getElementById("search-summary");
  if (summaryEl) summaryEl.innerHTML = `${dep.route}　${formatDateZh(state.dateGo)}<br>艙等：${cabin.label}`;

  const nextBtn = document.getElementById("btn-next-info");
  if (nextBtn) nextBtn.disabled = true;

  const list = document.getElementById("flight-list");
  if (!list) { showPage("results"); return; }

  if (times.length === 0) {
    list.innerHTML = `<div class="no-flight-card"><div class="no-flight-icon">⚓</div><div class="no-flight-text">本日無班次</div><div class="no-flight-hint">請選擇其他日期，或以現場公告為準</div></div>`;
    showPage("results"); return;
  }

  list.innerHTML = times.map(t => {
    const [h, m] = t.split(":");
    const arrHour = (parseInt(h) + 4) % 24;
    const arrTime = `${String(arrHour).padStart(2,"0")}:${m}`;
    return `
      <button class="flight-card selectable" data-time="${t}">
        <div class="flight-time">
          <div class="flight-port"><span class="port-name">${dep.port}</span><span class="time">${t}</span></div>
          <div class="flight-arrow">→<br><span class="duration">約4小時</span></div>
          <div class="flight-port" style="text-align:right"><span class="port-name">${dep.arrive}</span><span class="time">${arrTime}</span></div>
        </div>
        <div class="flight-meta"><span>澎湖輪　${cabin.label}</span><span class="flight-select-hint">點選此班次</span></div>
      </button>`;
  }).join("");

  list.querySelectorAll(".flight-card.selectable").forEach(card => {
    card.addEventListener("click", () => {
      list.querySelectorAll(".flight-card.selectable").forEach(c => { c.classList.remove("selected"); c.querySelector(".flight-select-hint").textContent = "點選此班次"; });
      card.classList.add("selected");
      state.selectedFlight = card.dataset.time;
      card.querySelector(".flight-select-hint").textContent = "✓ 已選擇";
      if (nextBtn) nextBtn.disabled = false;
    });
  });

  showPage("results");
}

// ── 旅客資料頁 ──
function openInfoPage() {
  if (!state.selectedFlight) return;
  showPage("info");
}

// ── 確認訂單頁 ──
function openConfirmPage() {
  const name = document.getElementById("info-name")?.value.trim();
  const phone = document.getElementById("info-phone")?.value.trim();
  const id = document.getElementById("info-id")?.value.trim();
  if (!name || !phone || !id) { alert("請填寫姓名、手機、身分證字號"); return; }
  state.customer = {
    name, phone, id,
    email: document.getElementById("info-email")?.value.trim() || ""
  };

  const dep = DEPARTURES[state.departure];
  const cabin = CABINS[state.cabin];
  const prices = PRICES[state.cabin];

  let passengerRows = "";
  let passengerTotal = 0;
  if (state.cabin === "vip") {
    passengerRows = `<div class="confirm-row"><span>VIP艙</span><span>NT$6,000</span></div>`;
    passengerTotal = 6000;
  } else {
    Object.entries(state.passengers).forEach(([type, count]) => {
      if (count > 0) {
        const price = (prices[type] || 0) * count;
        passengerTotal += price;
        passengerRows += `<div class="confirm-row"><span>${TICKET_LABELS[type]} × ${count}</span><span>NT$${price.toLocaleString()}</span></div>`;
      }
    });
  }

  const vehicleRow = state.vehicle !== "none"
    ? `<div class="confirm-row"><span>${state.vehicleLabel}</span><span>NT$${state.vehiclePrice.toLocaleString()}</span></div>`
    : `<div class="confirm-row"><span>不加購車輛</span><span>—</span></div>`;

  const total = passengerTotal + (state.vehiclePrice || 0);

  const content = document.getElementById("confirm-content");
  if (content) content.innerHTML = `
    <div class="confirm-section">
      <div class="confirm-section-title">航程資訊</div>
      <div class="confirm-row"><span>路線</span><span>${dep.route}</span></div>
      <div class="confirm-row"><span>去程日期</span><span>${formatDateZh(state.dateGo)}</span></div>
      <div class="confirm-row"><span>出發時間</span><span>${state.selectedFlight}</span></div>
      <div class="confirm-row"><span>艙等</span><span>${cabin.label}</span></div>
      ${state.tripType === "round" && state.dateBack ? `<div class="confirm-row"><span>回程日期</span><span>${formatDateZh(state.dateBack)}</span></div>` : ""}
    </div>
    <div class="confirm-section">
      <div class="confirm-section-title">旅客資料</div>
      <div class="confirm-row"><span>姓名</span><span>${state.customer.name}</span></div>
      <div class="confirm-row"><span>手機</span><span>${state.customer.phone}</span></div>
      <div class="confirm-row"><span>身分證</span><span>${state.customer.id}</span></div>
    </div>
    <div class="confirm-section">
      <div class="confirm-section-title">費用明細</div>
      ${passengerRows}
      ${vehicleRow}
    </div>`;

  const totalEl = document.getElementById("confirm-total");
  if (totalEl) totalEl.innerHTML = `<div class="confirm-total-row"><span>合計</span><span class="confirm-total-price">NT$${total.toLocaleString()}</span></div>`;

  showPage("confirm");
}

// ── 送出訂單 ──
function submitOrder() {
  const dep = DEPARTURES[state.departure];
  const orderNo = "PH" + Date.now().toString().slice(-8);
  const order = {
    orderNo,
    route: dep.route,
    date: state.dateGo,
    time: state.selectedFlight,
    cabin: CABINS[state.cabin].label,
    customer: state.customer.name,
    total: calcTotal(),
    createdAt: new Date().toLocaleDateString("zh-TW"),
  };

  // 儲存到 localStorage
  const orders = JSON.parse(localStorage.getItem("penghu_orders") || "[]");
  orders.unshift(order);
  localStorage.setItem("penghu_orders", JSON.stringify(orders));

  const doneNo = document.getElementById("done-order-no");
  if (doneNo) doneNo.textContent = `訂單編號：${orderNo}`;

  const doneSummary = document.getElementById("done-summary");
  if (doneSummary) doneSummary.innerHTML = `
    <div class="confirm-section" style="margin-top:12px">
      <div class="confirm-row"><span>路線</span><span>${order.route}</span></div>
      <div class="confirm-row"><span>日期</span><span>${formatDateZh(order.date)}</span></div>
      <div class="confirm-row"><span>出發時間</span><span>${order.time}</span></div>
      <div class="confirm-row"><span>艙等</span><span>${order.cabin}</span></div>
      <div class="confirm-row"><span>合計</span><span style="color:var(--blue);font-weight:700">NT$${order.total.toLocaleString()}</span></div>
    </div>`;

  showPage("done");
}

// ── 我的車票 ──
function openTicketsPage() {
  const orders = JSON.parse(localStorage.getItem("penghu_orders") || "[]");
  const list = document.getElementById("tickets-list");
  if (!list) return;

  if (orders.length === 0) {
    list.innerHTML = `<div class="no-flight-card"><div class="no-flight-icon">🎫</div><div class="no-flight-text">尚無訂單記錄</div><div class="no-flight-hint">完成訂票流程後，訂單會顯示在這裡</div></div>`;
  } else {
    list.innerHTML = orders.map(o => `
      <div class="ticket-card">
        <div class="ticket-header">
          <span class="ticket-route">${o.route}</span>
          <span class="ticket-date">${formatDateZh(o.date)}</span>
        </div>
        <div class="ticket-body">
          <div class="ticket-row"><span>出發時間</span><span>${o.time}</span></div>
          <div class="ticket-row"><span>艙等</span><span>${o.cabin}</span></div>
          <div class="ticket-row"><span>訂票人</span><span>${o.customer}</span></div>
          <div class="ticket-row"><span>合計</span><span class="ticket-price">NT$${o.total.toLocaleString()}</span></div>
        </div>
        <div class="ticket-footer">
          <span class="ticket-order-no">${o.orderNo}</span>
          <a href="https://tnc-kao.com.tw/booking" target="_blank" rel="noopener" class="ticket-pay-btn">前往官網付款</a>
        </div>
      </div>`).join("");
  }
  showPage("tickets");
}

// ── 事件綁定 ──

// 單程/來回
document.querySelectorAll(".trip-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    state.tripType = tab.dataset.trip;
    if (state.tripType === "single") state.dateBack = null;
    updateTripTabs();
    updateHomeFields();
  });
});

// 日期欄位
const fieldDateGo = document.getElementById("field-date-go");
if (fieldDateGo) fieldDateGo.addEventListener("click", () => openDatePage("go"));

const fieldDateBack = document.getElementById("field-date-back");
if (fieldDateBack) fieldDateBack.addEventListener("click", () => openDatePage("back"));

// 出發地
const fieldDeparture = document.getElementById("field-departure");
if (fieldDeparture) fieldDeparture.addEventListener("click", () => showPage("route"));

// 路線卡片
document.querySelectorAll(".route-card").forEach(card => {
  card.addEventListener("click", () => {
    state.departure = card.dataset.departure;
    updateHomeFields();
    showPage("home");
  });
});

// 確認日期
const btnDateConfirm = document.getElementById("btn-date-confirm");
if (btnDateConfirm) btnDateConfirm.addEventListener("click", confirmDate);

// 搜尋航班
const btnSearch = document.getElementById("btn-search");
if (btnSearch) btnSearch.addEventListener("click", searchFlights);

// ── 更新車輛顯示 ──
const VEHICLE_LABELS = {
  none:       "不加購",
  bicycle:    "腳踏車",
  motorcycle: "機車",
  car:        "小客車／客貨車",
  truck:      "貨車",
  bus:        "中型遊覽車",
};

function updateVehicleField() {
  document.querySelectorAll(".option-card[data-vehicle]").forEach(card => {
    const check = card.querySelector(".option-check");
    if (check) check.textContent = card.dataset.vehicle === state.vehicle ? "✓" : "";
  });
  const el = document.querySelector("#field-vehicle .field-row-value");
  if (el) el.textContent = state.vehicleLabel;
}

// 車輛按鈕
const fieldVehicle = document.getElementById("field-vehicle");
if (fieldVehicle) fieldVehicle.addEventListener("click", () => { updateVehicleField(); showPage("vehicle"); });

// 車輛卡片點選 → 若不加購直接回首頁，否則進細項
document.querySelectorAll(".option-card[data-vehicle]").forEach(card => {
  card.addEventListener("click", () => {
    const type = card.dataset.vehicle;
    state.vehicle = type;
    state.vehicleSub = null;
    state.vehicleMode = null;
    state.vehiclePrice = 0;
    if (type === "none") {
      state.vehicleLabel = "不加購";
      updateVehicleField();
      showPage("home");
    } else {
      openVehicleSubPage(type);
    }
  });
});

// ── 車輛細項頁面 ──
function openVehicleSubPage(type) {
  const titles = { bicycle:"腳踏車細項", motorcycle:"機車排氣量", car:"小客車車型", truck:"貨車重量", bus:"遊覽車確認" };
  const titleEl = document.getElementById("vehicle-sub-title");
  if (titleEl) titleEl.textContent = titles[type] || "選擇細項";

  const container = document.getElementById("vehicle-sub-options");
  if (!container) return;

  const dir = state.departure === "kaohsiung" ? "kao" : "phu";
  let html = "";

  if (type === "bicycle" || type === "motorcycle") {
    const subKeys = type === "bicycle" ? [null] : Object.keys(VEHICLE_PRICES.motorcycle);
    if (type === "motorcycle") {
      html += `<p class="section-label">選擇排氣量</p><div class="option-cards" id="veh-sub-list">`;
      subKeys.forEach(k => {
        html += `<button class="option-card" data-sub="${k}"><div class="option-card-left"><span class="option-icon">🏍️</span><div class="option-info"><span class="option-name">${k}</span></div></div><span class="option-check" id="vcheck-${k.replace(/\s/g,'')}"></span></button>`;
      });
      html += `</div><div id="veh-mode-wrap" class="hidden" style="margin-top:16px">`;
    } else {
      html += `<div id="veh-mode-wrap">`;
    }
    html += `<p class="section-label" style="margin-top:8px">乘車方式</p><div class="option-cards">`;
    ["人隨車乘船","單獨寄車"].forEach(mode => {
      const priceData = type === "bicycle" ? VEHICLE_PRICES.bicycle[dir][mode] : null;
      const priceStr = priceData ? ` NT$${priceData}` : "";
      html += `<button class="option-card" data-mode="${mode}"><div class="option-card-left"><span class="option-icon">${mode==="人隨車乘船"?"🧑‍✈️":"📦"}</span><div class="option-info"><span class="option-name">${mode}</span><span class="option-hint">${priceStr}</span></div></div><span class="option-check" id="mcheck-${mode}"></span></button>`;
    });
    html += `</div></div>`;
  } else if (type === "car" || type === "truck" || type === "bus") {
    const subKeys = Object.keys(VEHICLE_PRICES[type]);
    html += `<p class="section-label">選擇項目</p><div class="option-cards" id="veh-sub-list">`;
    subKeys.forEach(k => {
      const price = VEHICLE_PRICES[type][k][dir];
      html += `<button class="option-card" data-sub="${k}"><div class="option-card-left"><span class="option-icon">${type==="car"?"🚗":type==="truck"?"🚛":"🚌"}</span><div class="option-info"><span class="option-name">${k}</span><span class="option-hint">NT$${price}</span></div></div><span class="option-check" id="vcheck-${k.replace(/\s/g,'')}"></span></button>`;
    });
    html += `</div>`;
  }

  container.innerHTML = html;

  const confirmBtn = document.getElementById("btn-vehicle-sub-confirm");
  if (confirmBtn) confirmBtn.disabled = true;

  // 排氣量選擇（機車）
  container.querySelectorAll(".option-card[data-sub]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.vehicleSub = btn.dataset.sub;
      container.querySelectorAll(".option-card[data-sub] .option-check").forEach(c => c.textContent = "");
      btn.querySelector(".option-check").textContent = "✓";

      if (type === "motorcycle") {
        const wrap = document.getElementById("veh-mode-wrap");
        if (wrap) wrap.classList.remove("hidden");
        // update mode prices
        container.querySelectorAll(".option-card[data-mode]").forEach(mb => {
          const mode = mb.dataset.mode;
          const p = VEHICLE_PRICES.motorcycle[state.vehicleSub]?.[dir]?.[mode];
          const hintEl = mb.querySelector(".option-hint");
          if (hintEl && p) hintEl.textContent = `NT$${p}`;
        });
      } else {
        state.vehicleMode = null;
        const price = VEHICLE_PRICES[type][state.vehicleSub][dir];
        state.vehiclePrice = price;
        state.vehicleLabel = `${VEHICLE_LABELS[type]}・${state.vehicleSub}`;
        if (confirmBtn) confirmBtn.disabled = false;
      }
    });
  });

  // 乘車方式選擇
  container.querySelectorAll(".option-card[data-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.vehicleMode = btn.dataset.mode;
      container.querySelectorAll(".option-card[data-mode] .option-check").forEach(c => c.textContent = "");
      btn.querySelector(".option-check").textContent = "✓";
      const sub = state.vehicleSub;
      let price = 0;
      if (type === "bicycle") {
        price = VEHICLE_PRICES.bicycle[dir][state.vehicleMode];
        state.vehicleLabel = `腳踏車・${state.vehicleMode}`;
      } else if (type === "motorcycle" && sub) {
        price = VEHICLE_PRICES.motorcycle[sub][dir][state.vehicleMode];
        state.vehicleLabel = `機車・${sub}・${state.vehicleMode}`;
      }
      state.vehiclePrice = price;
      if ((type === "bicycle" || (type === "motorcycle" && sub)) && confirmBtn) confirmBtn.disabled = false;
    });
  });

  const backBtn = document.getElementById("btn-vehicle-sub-back");
  if (backBtn) backBtn.onclick = () => showPage("vehicle");

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      updateVehicleField();
      showPage("home");
    };
  }

  showPage("vehicle-sub");
}

// 艙等按鈕
const fieldCabin = document.getElementById("field-cabin");
if (fieldCabin) fieldCabin.addEventListener("click", () => { updateCabinField(); showPage("cabin"); });

// 乘客人數按鈕
const fieldPassengers = document.getElementById("field-passengers");
if (fieldPassengers) fieldPassengers.addEventListener("click", () => { updatePassengersField(); showPage("passengers"); });

// 艙等卡片點選
document.querySelectorAll(".option-card[data-cabin]").forEach(card => {
  card.addEventListener("click", () => {
    state.cabin = card.dataset.cabin;
    updateCabinField();
    showPage("home");
  });
});

// 人數加減
document.querySelectorAll(".counter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const action = btn.dataset.action;
    const min = type === "adult" ? 1 : 0;
    if (action === "plus") {
      state.passengers[type]++;
    } else {
      if (state.passengers[type] > min) state.passengers[type]--;
    }
    updatePassengersField();
  });
});

// 確認人數
const btnPassengersConfirm = document.getElementById("btn-passengers-confirm");
if (btnPassengersConfirm) btnPassengersConfirm.addEventListener("click", () => {
  updatePassengersField();
  showPage("home");
});

// 返回按鈕
document.querySelectorAll(".btn-back").forEach(btn => {
  btn.addEventListener("click", () => showPage("home"));
});

// Tab Bar
document.querySelectorAll(".tab-item[data-nav]").forEach(tab => {
  tab.addEventListener("click", () => showPage("home"));
});

// 結果頁 → 旅客資料
const btnNextInfo = document.getElementById("btn-next-info");
if (btnNextInfo) btnNextInfo.addEventListener("click", openInfoPage);

// 旅客資料 → 確認訂單
const btnNextConfirm = document.getElementById("btn-next-confirm");
if (btnNextConfirm) btnNextConfirm.addEventListener("click", openConfirmPage);

// 送出訂單
const btnSubmitOrder = document.getElementById("btn-submit-order");
if (btnSubmitOrder) btnSubmitOrder.addEventListener("click", submitOrder);

// 查看我的車票（訂單完成頁）
const btnViewTickets = document.getElementById("btn-view-tickets");
if (btnViewTickets) btnViewTickets.addEventListener("click", openTicketsPage);

// 我的車票 Tab
const tabTickets = document.getElementById("tab-tickets");
if (tabTickets) tabTickets.addEventListener("click", openTicketsPage);

// 其他 Tab
const tabOther = document.getElementById("tab-other");
if (tabOther) tabOther.addEventListener("click", () => showPage("other"));

// 使用導覽
const btnGuide = document.getElementById("btn-other-guide");
if (btnGuide) btnGuide.addEventListener("click", () => showPage("guide"));

// 關於這個 App
const btnAbout = document.getElementById("btn-other-about");
if (btnAbout) btnAbout.addEventListener("click", () => showPage("about"));

// 返回按鈕（含新頁面）
document.querySelectorAll(".btn-back[data-nav]").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.dataset.nav));
});

// ── 初始化 ──
updateTripTabs();
updateHomeFields();
updateCabinField();
updatePassengersField();
updateVehicleField();
