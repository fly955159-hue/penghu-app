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

// ── 搜尋航班 ──
function searchFlights() {
  if (!state.dateGo) { openDatePage("go"); return; }
  if (state.tripType === "round" && !state.dateBack) { openDatePage("back"); return; }

  const dep = DEPARTURES[state.departure];
  const cabin = CABINS[state.cabin];

  // 計算票價
  const prices = PRICES[state.cabin];
  let totalNote = "";
  if (state.cabin === "vip") {
    totalNote = "VIP艙 NT$6,000／間（每間限2人）";
  } else {
    const parts = [];
    Object.entries(state.passengers).forEach(([type, count]) => {
      if (count > 0 && prices[type] > 0) {
        parts.push(`${TICKET_LABELS[type]}×${count} NT$${prices[type] * count}`);
      } else if (count > 0 && type === "infant") {
        parts.push(`嬰保票×${count} NT$100`);
      }
    });
    if (parts.length) totalNote = parts.join("　");
  }

  let summary = `${dep.route}　去程：${formatDateZh(state.dateGo)}\n艙等：${cabin.label}`;
  if (state.tripType === "round" && state.dateBack) {
    summary += `　回程：${formatDateZh(state.dateBack)}`;
  }

  const summaryEl = document.getElementById("search-summary");
  if (summaryEl) summaryEl.innerHTML = summary.replace("\n","<br>") + (totalNote ? `<br><span style="color:#163bc0;font-weight:600">${totalNote}</span>` : "");

  // 查詢班次
  const direction = state.departure === "kaohsiung" ? "kao" : "phu";
  const dayData = SCHEDULE[state.dateGo];
  const times = dayData ? dayData[direction] : [];

  const list = document.getElementById("flight-list");
  if (list) {
    if (times.length === 0) {
      list.innerHTML = `
        <div class="no-flight-card">
          <div class="no-flight-icon">⚓</div>
          <div class="no-flight-text">本日無班次</div>
          <div class="no-flight-hint">請選擇其他日期，或以現場公告為準</div>
        </div>`;
    } else {
      list.innerHTML = times.map(t => {
        const [h, m] = t.split(":");
        const arrHour = (parseInt(h) + 4) % 24;
        const arrTime = `${String(arrHour).padStart(2,"0")}:${m}`;
        const nextDay = parseInt(h) >= 21 ? "（翌日抵達）" : "";
        return `
          <div class="flight-card">
            <div class="flight-time">
              <div class="flight-port">
                <span class="port-name">${dep.port}</span>
                <span class="time">${t}</span>
              </div>
              <div class="flight-arrow">→<br><span class="duration">約4小時</span></div>
              <div class="flight-port" style="text-align:right">
                <span class="port-name">${dep.arrive}</span>
                <span class="time">${arrTime}${nextDay}</span>
              </div>
            </div>
            <div class="flight-meta">
              <span>澎湖輪　${cabin.label}</span>
            </div>
            <a href="https://tnc-kao.com.tw/booking" class="btn btn-primary" target="_blank" rel="noopener"
               style="display:block;padding:12px;text-align:center;border-radius:8px;margin-top:12px;text-decoration:none;">
              前往官網訂票
            </a>
          </div>`;
      }).join("");
    }
  }

  showPage("results");
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
  if (el) el.textContent = VEHICLE_LABELS[state.vehicle];
}

// 車輛按鈕
const fieldVehicle = document.getElementById("field-vehicle");
if (fieldVehicle) fieldVehicle.addEventListener("click", () => { updateVehicleField(); showPage("vehicle"); });

// 車輛卡片點選
document.querySelectorAll(".option-card[data-vehicle]").forEach(card => {
  card.addEventListener("click", () => {
    state.vehicle = card.dataset.vehicle;
    updateVehicleField();
    showPage("home");
  });
});

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

// ── 初始化 ──
updateTripTabs();
updateHomeFields();
updateCabinField();
updatePassengersField();
updateVehicleField();
