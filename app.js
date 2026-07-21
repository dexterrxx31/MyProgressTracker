/* 30-Day Study Tracker — OS / DBMS / CN / OOPs
 * Plain JS, no dependencies. State persisted in localStorage + JSON export/import.
 */

// ---------------------------------------------------------------------------
// Curriculum data
// ---------------------------------------------------------------------------
// Weekdays (Mon–Fri, 2h) rotate through subjects with focused subtopics.
// Weekends (Sat–Sun, 5h) are longer revision / practice / numericals sessions.
const SUBJECTS = {
  OS: { name: "Operating Systems", color: "#e0567a" },
  DBMS: { name: "DBMS", color: "#5b8def" },
  CN: { name: "Computer Networks", color: "#2bb673" },
  OOP: { name: "OOPs", color: "#f0932b" },
  MIX: { name: "Revision", color: "#9b59b6" },
};

const PLAN = [
  // ---- Week 1 ----
  { day: 1, weekday: "Mon", type: "weekday", subject: "OS",
    topics: ["Intro to OS & types of OS", "Process vs Program, user vs kernel mode"],
    fact: "The term 'bug' comes from a real moth found stuck in the Harvard Mark II computer in 1947." },
  { day: 2, weekday: "Tue", type: "weekday", subject: "DBMS",
    topics: ["What is a DBMS, DBMS vs File system", "ER model: entities, attributes, relationships"],
    fact: "The word 'database' first appeared in the 1960s; SQL was originally called SEQUEL." },
  { day: 3, weekday: "Wed", type: "weekday", subject: "CN",
    topics: ["Intro to networks & the OSI 7-layer model", "TCP/IP model & layer mapping"],
    fact: "The first message ever sent over ARPANET (1969) was meant to be 'LOGIN' — it crashed after 'LO'." },
  { day: 4, weekday: "Thu", type: "weekday", subject: "OOP",
    topics: ["4 pillars of OOP (overview)", "Classes & Objects, constructors"],
    fact: "The first true object-oriented language, Simula, was created in 1967 to run simulations." },
  { day: 5, weekday: "Fri", type: "weekday", subject: "OS",
    topics: ["Process states & the PCB", "Context switching & schedulers"],
    fact: "A context switch can cost thousands of CPU cycles — which is why they're minimized." },
  { day: 6, weekday: "Sat", type: "weekend", subject: "MIX",
    topics: ["Revise Week-1 OS notes", "Revise OSI & TCP/IP models", "Practice: draw 2 ER diagrams", "Write a class in your language of choice", "Flashcards for OS/DBMS terms"],
    fact: "Spaced repetition — reviewing on day 1, 3, 7 — can double long-term retention." },
  { day: 7, weekday: "Sun", type: "weekend", subject: "MIX",
    topics: ["Process scheduling warm-up numericals", "SQL: SELECT / WHERE / ORDER BY practice", "Subnetting basics practice", "OOP concepts self-quiz", "Weekly recap notes"],
    fact: "Teaching a topic out loud (the Feynman technique) exposes gaps faster than re-reading." },

  // ---- Week 2 ----
  { day: 8, weekday: "Mon", type: "weekday", subject: "OS",
    topics: ["CPU scheduling: FCFS & SJF", "Preemptive vs non-preemptive"],
    fact: "Shortest-Job-First gives provably minimum average waiting time — but needs the future." },
  { day: 9, weekday: "Tue", type: "weekday", subject: "DBMS",
    topics: ["Relational model & keys (primary, foreign, candidate)", "Normalization: 1NF & 2NF"],
    fact: "Normalization was introduced by Edgar F. Codd, who also won a Turing Award for it." },
  { day: 10, weekday: "Wed", type: "weekday", subject: "CN",
    topics: ["Physical layer & transmission media", "Data link layer, framing & MAC"],
    fact: "Fiber-optic cables carry data as pulses of light — near the speed of light in glass." },
  { day: 11, weekday: "Thu", type: "weekday", subject: "OOP",
    topics: ["Encapsulation & access modifiers", "Abstraction & abstract data types"],
    fact: "Encapsulation is why you can drive a car without knowing how the engine works." },
  { day: 12, weekday: "Fri", type: "weekday", subject: "OS",
    topics: ["Round Robin & Priority scheduling", "Solve 3 scheduling numericals"],
    fact: "Round Robin's time quantum is a balancing act: too small = overhead, too large = FCFS." },
  { day: 13, weekday: "Sat", type: "weekend", subject: "MIX",
    topics: ["Normalization deep dive: 3NF & BCNF", "SQL JOINS practice (inner/outer)", "Full scheduling problem set", "OOP: types of inheritance", "Revise Week-2 notes"],
    fact: "BCNF is stricter than 3NF — every determinant must be a candidate key." },
  { day: 14, weekday: "Sun", type: "weekend", subject: "MIX",
    topics: ["ACID properties & transactions", "Error detection: parity, checksum, CRC", "Polymorphism: overloading vs overriding", "Mixed MCQ practice", "Weekly recap notes"],
    fact: "The 'D' in ACID (Durability) is why databases survive power loss mid-transaction." },

  // ---- Week 3 ----
  { day: 15, weekday: "Mon", type: "weekday", subject: "OS",
    topics: ["Process synchronization & race conditions", "Critical section problem"],
    fact: "The classic 'Dining Philosophers' problem models deadlock with five hungry thinkers." },
  { day: 16, weekday: "Tue", type: "weekday", subject: "DBMS",
    topics: ["SQL DDL vs DML", "Aggregate functions & GROUP BY / HAVING"],
    fact: "HAVING filters groups after aggregation; WHERE filters rows before it." },
  { day: 17, weekday: "Wed", type: "weekday", subject: "CN",
    topics: ["Network layer & IP addressing (IPv4)", "Routing algorithms overview"],
    fact: "The world officially ran out of new IPv4 addresses in 2011 — hence IPv6." },
  { day: 18, weekday: "Thu", type: "weekday", subject: "OOP",
    topics: ["Inheritance in depth", "Polymorphism in depth (dynamic dispatch)"],
    fact: "Virtual functions use a hidden 'vtable' to pick the right method at runtime." },
  { day: 19, weekday: "Fri", type: "weekday", subject: "OS",
    topics: ["Semaphores & mutex", "Deadlock: conditions & intro"],
    fact: "Dijkstra invented semaphores in 1965 — 'P' and 'V' come from Dutch words." },
  { day: 20, weekday: "Sat", type: "weekend", subject: "MIX",
    topics: ["Deadlock: prevention & avoidance (Banker's algorithm)", "DBMS concurrency control & locks", "Subnetting & CIDR practice", "OOP: abstract classes vs interfaces", "Revise Week-3 notes"],
    fact: "The Banker's algorithm is named after how a bank never lends more than it can cover." },
  { day: 21, weekday: "Sun", type: "weekend", subject: "MIX",
    topics: ["Banker's algorithm numericals", "Indexing: B-tree vs B+ tree", "Transport layer: TCP vs UDP", "SOLID principles", "Weekly recap notes"],
    fact: "B+ trees keep all data in the leaves so range scans are fast — used by most databases." },

  // ---- Week 4 ----
  { day: 22, weekday: "Mon", type: "weekday", subject: "OS",
    topics: ["Memory management basics", "Paging & segmentation"],
    fact: "Paging eliminates external fragmentation by using fixed-size frames." },
  { day: 23, weekday: "Tue", type: "weekday", subject: "DBMS",
    topics: ["Indexing & hashing", "Query optimization basics"],
    fact: "A missing index can turn a millisecond query into a full-table scan of millions of rows." },
  { day: 24, weekday: "Wed", type: "weekday", subject: "CN",
    topics: ["Transport layer deep: TCP 3-way handshake", "Flow control & congestion control"],
    fact: "TCP's 3-way handshake (SYN, SYN-ACK, ACK) sets up a reliable connection before data flows." },
  { day: 25, weekday: "Thu", type: "weekday", subject: "OOP",
    topics: ["Association, aggregation & composition", "Intro to design patterns"],
    fact: "Composition is often preferred over inheritance — 'favor composition' is a core OOP maxim." },
  { day: 26, weekday: "Fri", type: "weekday", subject: "OS",
    topics: ["Virtual memory & demand paging", "Page replacement: FIFO, LRU, Optimal & thrashing"],
    fact: "Belady's anomaly: with FIFO, adding more frames can sometimes cause MORE page faults." },
  { day: 27, weekday: "Sat", type: "weekend", subject: "MIX",
    topics: ["Page-replacement numericals (FIFO/LRU/Optimal)", "Application layer: HTTP, DNS, DHCP", "DBMS: deadlock & recovery", "Design patterns: Singleton & Factory", "Revise Week-4 notes"],
    fact: "Every website visit triggers a DNS lookup — the internet's phone book — in milliseconds." },
  { day: 28, weekday: "Sun", type: "weekend", subject: "MIX",
    topics: ["Disk scheduling: FCFS, SCAN, C-SCAN", "SQL vs NoSQL trade-offs", "Network security basics (TLS, firewalls)", "Full OOPs revision", "Weekly recap notes"],
    fact: "The 'elevator algorithm' (SCAN) for disks works exactly like a building elevator." },

  // ---- Final revision ----
  { day: 29, weekday: "Mon", type: "weekday", subject: "MIX",
    topics: ["Full OS revision + mock questions", "Full DBMS revision + mock questions"],
    fact: "Mixing subjects while revising ('interleaving') beats blocking one topic for hours." },
  { day: 30, weekday: "Tue", type: "weekday", subject: "MIX",
    topics: ["Full CN revision + mock questions", "Full OOPs revision + interview Qs"],
    fact: "You made it — 30 days of consistency beats one heroic all-nighter every time. 🎉" },
];

const TOTAL_TOPICS = PLAN.reduce((n, d) => n + d.topics.length, 0);
const STORAGE_KEY = "progressTracker.v1";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let state = { checked: {}, notes: {}, lastActiveDate: null, streak: 0 };

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = {
        checked: parsed.checked || {},
        notes: parsed.notes || {},
        lastActiveDate: parsed.lastActiveDate || null,
        streak: parsed.streak || 0,
      };
    }
  } catch (e) {
    console.warn("Could not load saved progress:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save progress:", e);
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function todayStr() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (local-ish)
}

function daysBetween(a, b) {
  const ms = new Date(b + "T00:00:00") - new Date(a + "T00:00:00");
  return Math.round(ms / 86400000);
}

// Called whenever the user checks a topic. Advances the streak once per day.
function markActivityToday() {
  const today = todayStr();
  if (state.lastActiveDate === today) return; // already counted today
  if (state.lastActiveDate && daysBetween(state.lastActiveDate, today) === 1) {
    state.streak += 1; // consecutive day
  } else {
    state.streak = 1; // first activity or a gap → restart
  }
  state.lastActiveDate = today;
}

function anyCheckedToday() {
  return Object.values(state.checked).some(Boolean);
}

function computeProgress() {
  const per = {}; // subject -> {done, total}
  let done = 0;
  for (const key of Object.keys(SUBJECTS)) per[key] = { done: 0, total: 0 };

  for (const d of PLAN) {
    per[d.subject].total += d.topics.length;
    for (let i = 0; i < d.topics.length; i++) {
      if (state.checked[`${d.day}-${i}`]) {
        per[d.subject].done += 1;
        done += 1;
      }
    }
  }
  return { done, total: TOTAL_TOPICS, per };
}

function pct(done, total) {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
function render() {
  renderDays();
  renderSummary();
}

function renderDays() {
  const container = document.getElementById("days");
  container.innerHTML = "";

  for (const d of PLAN) {
    const subj = SUBJECTS[d.subject];
    const card = document.createElement("section");
    card.className = "day-card" + (d.type === "weekend" ? " weekend" : "");
    card.style.setProperty("--subject-color", subj.color);

    // Header
    const header = document.createElement("div");
    header.className = "day-header";
    const doneCount = d.topics.filter((_, i) => state.checked[`${d.day}-${i}`]).length;
    header.innerHTML = `
      <div class="day-title">
        <span class="day-num">Day ${d.day}</span>
        <span class="weekday">${d.weekday}</span>
      </div>
      <div class="badges">
        <span class="subject-chip" style="background:${subj.color}">${subj.name}</span>
        <span class="hours-badge">${d.type === "weekend" ? "5h" : "2h"}</span>
      </div>`;
    card.appendChild(header);

    // Topics
    const list = document.createElement("ul");
    list.className = "topics";
    d.topics.forEach((topic, i) => {
      const key = `${d.day}-${i}`;
      const li = document.createElement("li");
      const id = `t-${key}`;
      const checked = !!state.checked[key];
      li.innerHTML = `
        <label class="topic ${checked ? "checked" : ""}" for="${id}">
          <input type="checkbox" id="${id}" ${checked ? "checked" : ""}>
          <span>${topic}</span>
        </label>`;
      li.querySelector("input").addEventListener("change", (e) => {
        toggleTopic(d.day, i, e.target.checked);
      });
      list.appendChild(li);
    });
    card.appendChild(list);

    // Per-day progress meter
    const meter = document.createElement("div");
    meter.className = "day-progress";
    meter.textContent = `${doneCount}/${d.topics.length} done`;
    card.appendChild(meter);

    // Fun fact
    const fact = document.createElement("div");
    fact.className = "fact";
    fact.innerHTML = `<span class="fact-icon">💡</span> ${d.fact}`;
    card.appendChild(fact);

    // Notes
    const notesWrap = document.createElement("div");
    notesWrap.className = "notes";
    const ta = document.createElement("textarea");
    ta.placeholder = "Notes for the day…";
    ta.value = state.notes[d.day] || "";
    ta.addEventListener("input", (e) => saveNote(d.day, e.target.value));
    notesWrap.appendChild(ta);
    card.appendChild(notesWrap);

    container.appendChild(card);
  }
}

function renderSummary() {
  const { done, total, per } = computeProgress();
  const overall = pct(done, total);

  document.getElementById("overall-pct").textContent = `${overall}%`;
  document.getElementById("overall-bar").style.width = `${overall}%`;
  document.getElementById("overall-count").textContent = `${done} / ${total} topics`;
  document.getElementById("streak").textContent = `🔥 ${state.streak} day${state.streak === 1 ? "" : "s"}`;

  const subjWrap = document.getElementById("subject-bars");
  subjWrap.innerHTML = "";
  for (const [key, subj] of Object.entries(SUBJECTS)) {
    const p = pct(per[key].done, per[key].total);
    const row = document.createElement("div");
    row.className = "subject-row";
    row.innerHTML = `
      <span class="subject-label">${subj.name}</span>
      <div class="bar"><div class="bar-fill" style="width:${p}%;background:${subj.color}"></div></div>
      <span class="subject-pct">${p}%</span>`;
    subjWrap.appendChild(row);
  }
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function toggleTopic(day, i, isChecked) {
  const key = `${day}-${i}`;
  if (isChecked) {
    state.checked[key] = true;
    markActivityToday();
  } else {
    delete state.checked[key];
    // If nothing is checked anymore, drop the streak so it doesn't linger.
    if (!anyCheckedToday()) {
      state.streak = 0;
      state.lastActiveDate = null;
    }
  }
  saveState();
  render();
}

let noteTimer = null;
function saveNote(day, text) {
  if (text.trim() === "") delete state.notes[day];
  else state.notes[day] = text;
  clearTimeout(noteTimer);
  noteTimer = setTimeout(saveState, 300); // debounce writes
}

function resetAll() {
  if (!confirm("Reset ALL progress and notes? This cannot be undone.")) return;
  state = { checked: {}, notes: {}, lastActiveDate: null, streak: 0 };
  saveState();
  render();
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tracker-progress-${todayStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (typeof data !== "object" || data === null || typeof data.checked !== "object") {
        throw new Error("Invalid file format");
      }
      state = {
        checked: data.checked || {},
        notes: data.notes || {},
        lastActiveDate: data.lastActiveDate || null,
        streak: data.streak || 0,
      };
      saveState();
      render();
      alert("Progress imported successfully.");
    } catch (e) {
      alert("Could not import file: " + e.message);
    }
  };
  reader.readAsText(file);
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  render();

  document.getElementById("reset-btn").addEventListener("click", resetAll);
  document.getElementById("export-btn").addEventListener("click", exportJSON);

  const importInput = document.getElementById("import-input");
  document.getElementById("import-btn").addEventListener("click", () => importInput.click());
  importInput.addEventListener("change", (e) => {
    if (e.target.files[0]) importJSON(e.target.files[0]);
    e.target.value = ""; // allow re-importing same file
  });
});
