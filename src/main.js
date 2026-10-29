import { passages, questions, topics } from "./data.js";
import "./style.css";

const app = document.querySelector("#app");
const baseUrl = import.meta.env.BASE_URL;
const questionById = new Map(questions.map((question) => [question.id, question]));
const topicById = new Map(topics.map((topic) => [topic.id, topic]));
const storageKeys = {
  saved: "brightsteps-class3-saved",
  drafts: "brightsteps-class3-writing-drafts",
  stats: "brightsteps-class3-practice-stats",
};

const iconPaths = {
  leaf: '<path d="M20.6 3.4C12.5 3.6 6.9 5.4 4.2 9.1c-2.6 3.6-.8 8.2 3.4 8.2 5.4 0 9.4-5.5 13-13.9Z"/><path d="M4.2 20c2.8-5.5 6.6-8.7 11.3-11.4"/><path d="M8.2 15.9c-.1-2.1-1-3.6-2.9-4.5"/>',
  library: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z"/><path d="M4 5.5v16M8 7h8M8 11h7"/>',
  play: '<path d="m9 6 10 6-10 6z"/>',
  bookmark: '<path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.8L6 21Z"/>',
  sparkles: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9Z"/><path d="m5 3 .7 1.7L7.5 5.5l-1.8.7L5 8l-.7-1.8-1.8-.7 1.8-.8Z"/>',
  vocabulary: '<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5Z"/><path d="M5 5.5v16M9 7h7M9 11h5"/><path d="M16.8 13.2c1.5 0 2.6 1.1 2.6 2.5s-1.1 2.5-2.6 2.5-2.6-1.1-2.6-2.5 1.1-2.5 2.6-2.5Z"/>',
  grammar: '<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5Z"/><path d="M5 5.5v16M9 7h7M9 11h7M9 15h4"/><path d="M17 14v4M15 16h4"/>',
  reading: '<path d="M3.5 5.5c3.2-1.5 6.1-1.1 8.5 1v14c-2.4-2.1-5.3-2.5-8.5-1Z"/><path d="M20.5 5.5c-3.2-1.5-6.1-1.1-8.5 1v14c2.4-2.1 5.3-2.5 8.5-1Z"/><path d="M6 9h3M6 12h3M15 9h3M15 12h3"/>',
  writing: '<path d="m4 16.8-.8 4 4-.8L19.8 7.4a2.1 2.1 0 0 0-3-3Z"/><path d="m14.9 6.3 3 3"/><path d="M12 20h8"/>',
  everyday: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z"/><path d="M4 5.5v16M8 8h8M8 12h6"/><path d="M15 15.5h4m-2-2v4"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m5 12 4.2 4.2L19 6.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  shuffle: '<path d="m18 14 3 3-3 3M3 7h2.5c4.8 0 7.2 10 12 10H21M18 4l3 3-3 3M3 17h2.5c1.5 0 2.8-1.2 4-2.8M14.5 9.8c1-1.5 2-2.8 3-2.8H21"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5Z"/><path d="M4 4.5v17M8 6h8M8 10h7"/>',
  heart: '<path d="M20.8 8.6c0 5.2-8.8 10.3-8.8 10.3S3.2 13.8 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z"/>',
};

function icon(name, size = 20, className = "") {
  return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.sparkles}</svg>`;
}

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The app still works if browser storage is unavailable.
  }
}

const savedIds = readStorage(storageKeys.saved, []);
const state = {
  mode: "all",
  topic: "all",
  query: "",
  page: 1,
  pageSize: 6,
  saved: new Set(Array.isArray(savedIds) ? savedIds : []),
  drafts: readStorage(storageKeys.drafts, {}),
  questionAttempts: {},
  shownSamples: new Set(),
  shuffledIds: null,
  stats: {
    attempts: Number(readStorage(storageKeys.stats, {}).attempts) || 0,
    bestScore: Number(readStorage(storageKeys.stats, {}).bestScore) || 0,
    lastScore: Number(readStorage(storageKeys.stats, {}).lastScore) || 0,
  },
  quiz: null,
};

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function renderShell() {
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar" aria-label="Main navigation">
        <a class="brand" href="#top" aria-label="BrightSteps home">
          <span class="brand-mark">${icon("leaf", 21)}</span>
          <span class="brand-copy"><strong>BrightSteps</strong><small>LEARNING SPACE</small></span>
        </a>

        <div class="class-switcher">
          <span class="mini-label">YOUR CLASS</span>
          <div class="class-switcher-row">
            <span class="class-number">03</span>
            <span class="class-copy"><strong>Class Three</strong><small>English · 2026 edition</small></span>
            <span class="class-caret">${icon("chevronRight", 15)}</span>
          </div>
        </div>

        <div class="nav-group-label">LEARN</div>
        <nav class="main-nav">
          <button class="nav-item active" type="button" data-action="nav-bank" aria-current="page">
            <span class="nav-icon">${icon("library", 19)}</span><span>Question bank</span><span class="nav-counter">${questions.length}</span>
          </button>
          <button class="nav-item" type="button" data-action="start-practice">
            <span class="nav-icon">${icon("target", 19)}</span><span>Quick practice</span><span class="nav-arrow">${icon("arrowUpRight", 15)}</span>
          </button>
          <button class="nav-item" type="button" data-action="nav-saved">
            <span class="nav-icon">${icon("bookmark", 19)}</span><span>Saved questions</span><span class="nav-counter" id="savedNavCount">${state.saved.size}</span>
          </button>
          <a class="nav-item teacher-nav-item" href="${baseUrl}teacher-test.html">
            <span class="nav-icon">${icon("target", 19)}</span><span>Teacher readiness</span><span class="nav-counter">30m</span>
          </a>
        </nav>

        <div class="sidebar-note">
          <span class="sidebar-note-icon">${icon("sparkles", 18)}</span>
          <span class="sidebar-note-label">A little note</span>
          <strong>More subjects, soon.</strong>
          <p>English is our first step. This space is ready to grow with you.</p>
          <span class="note-progress"><span></span></span>
        </div>

        <div class="sidebar-bottom">
          <span class="learner-avatar">L</span>
          <span class="learner-copy"><strong>Young learner</strong><small>Keep curious ✦</small></span>
          <span class="learner-menu">•••</span>
        </div>
      </aside>

      <button class="sidebar-scrim" type="button" data-action="close-menu" aria-label="Close navigation"></button>

      <div class="main-column" id="top">
        <header class="topbar">
          <button class="mobile-menu-button" type="button" data-action="toggle-menu" aria-label="Open navigation">${icon("menu", 22)}</button>
          <div class="breadcrumbs"><span>Learning space</span><span class="crumb-slash">/</span><strong>Class 3 English · 2026</strong></div>
          <div class="topbar-tools">
            <label class="search-box" for="searchInput">
              ${icon("search", 18)}
              <input id="searchInput" type="search" placeholder="Search your questions" autocomplete="off" aria-label="Search questions" />
              <span class="search-hint">⌕</span>
            </label>
            <span class="topbar-divider"></span>
            <span class="subject-chip"><span class="subject-dot"></span> English <span class="subject-class">CLASS 3 · 2026</span></span>
            <span class="top-avatar" aria-label="Learner profile">L</span>
          </div>
        </header>

        <main class="page-content">
          <section class="page-intro" aria-labelledby="page-title">
            <div>
              <div class="eyebrow"><span class="eyebrow-dot"></span> NCTB ENGLISH FOR TODAY · 2026 EDITION</div>
              <h1 id="page-title">English for Today<span class="title-period">.</span></h1>
              <p>Class 3 practice organised around the book's eight units, lesson activities and language skills.</p>
            </div>
            <div class="page-intro-aside">
              <span class="class-pill">CLASS <strong>03</strong></span>
              <span class="intro-aside-caption">Made for curious minds</span>
            </div>
          </section>

          <section class="hero-card" aria-label="Start practising">
            <div class="hero-copy">
              <span class="hero-kicker"><span>${icon("sparkles", 15)}</span> CLASS 3 · NCTB · 2026</span>
              <h2>Know the book.<br /><em>Teach with confidence.</em></h2>
              <p>Check a teacher's preparation with a 30-minute assessment based on the eight units and activities.</p>
              <div class="hero-action-row">
                <a class="hero-button" href="${baseUrl}teacher-test.html">Start the 30-minute check ${icon("arrowRight", 17)}</a>
                <span class="time-note">${icon("clock", 15)} 30 marks · 30 minutes</span>
              </div>
            </div>
            <div class="hero-art" aria-hidden="true">
              <span class="hero-orbit hero-orbit-one"></span>
              <span class="hero-orbit hero-orbit-two"></span>
              <span class="hero-star hero-star-one">✦</span>
              <span class="hero-star hero-star-two">✧</span>
              <div class="hero-book-wrap">
                <svg class="hero-book" viewBox="0 0 250 175" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28 42c29-10 58-5 97 12v91c-39-17-68-22-97-12V42Z" fill="#FFFDF5" stroke="#174B3D" stroke-width="5" stroke-linejoin="round" />
                  <path d="M222 42c-29-10-58-5-97 12v91c39-17 68-22 97-12V42Z" fill="#F2F7DE" stroke="#174B3D" stroke-width="5" stroke-linejoin="round" />
                  <path d="M125 55v90" stroke="#174B3D" stroke-width="4" />
                  <path d="M48 65c19-4 38 0 57 8M48 83c19-4 38 0 57 8M48 101c19-4 38 0 57 8M202 65c-19-4-38 0-57 8M202 83c-19-4-38 0-57 8M202 101c-19-4-38 0-57 8" stroke="#6EAA8D" stroke-width="4" stroke-linecap="round" />
                  <path d="M116 33c0-9 7-16 16-16 8 0 14 6 14 14 0 10-14 19-14 19s-16-8-16-17Z" fill="#F7C95C" stroke="#174B3D" stroke-width="3" />
                  <path d="m30 30 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7ZM217 117l2.3 5.7L225 125l-5.7 2.3L217 133l-2.3-5.7L209 125l5.7-2.3 2.3-5.7Z" fill="#F6C34F" />
                </svg>
              </div>
              <div class="hero-float-card"><span class="float-check">${icon("check", 15)}</span><span><strong>Every try counts</strong><small>Keep going at your pace</small></span></div>
              <span class="hero-scribble">English is an adventure!</span>
            </div>
          </section>

          <section class="metrics-grid" aria-label="Question bank summary">
            <article class="metric-card metric-questions">
              <span class="metric-icon">${icon("library", 19)}</span><div class="metric-copy"><span>QUESTIONS READY</span><strong>${questions.length}</strong><small>Made for Class 3</small></div><span class="metric-corner">✳</span>
            </article>
            <article class="metric-card metric-topics">
              <span class="metric-icon">${icon("sparkles", 19)}</span><div class="metric-copy"><span>BOOK UNITS</span><strong>${topics.length}</strong><small>Follow the 2026 unit sequence</small></div><span class="metric-corner">✳</span>
            </article>
            <article class="metric-card metric-saved">
              <span class="metric-icon">${icon("bookmark", 19)}</span><div class="metric-copy"><span>YOUR SAVED SET</span><strong id="savedMetric">${state.saved.size}</strong><small>Keep favourites close</small></div><span class="metric-corner">✳</span>
            </article>
            <article class="metric-card metric-practice">
              <span class="metric-icon">${icon("target", 19)}</span><div class="metric-copy"><span>PRACTICE SESSIONS</span><strong id="attemptMetric">${state.stats.attempts}</strong><small id="attemptSubtext">${state.stats.attempts ? `Best score ${state.stats.bestScore}/5` : "Ready when you are"}</small></div><span class="metric-corner">✳</span>
            </article>
          </section>

          <section class="topics-section" aria-labelledby="topics-title">
            <div class="section-heading">
              <div><span class="section-kicker">THE TEXTBOOK ROADMAP</span><h2 id="topics-title">Explore by unit</h2><p>Choose one of the eight units in English for Today.</p></div>
              <button class="text-button" type="button" data-action="show-all">See all questions ${icon("arrowRight", 16)}</button>
            </div>
            <div class="topics-grid" id="topicsGrid"></div>
          </section>

          <section class="bank-section" id="question-bank" aria-labelledby="bank-title">
            <div class="section-heading bank-heading">
              <div><span class="section-kicker">TEXTBOOK-BASED PRACTICE</span><h2 id="bank-title">Question bank</h2><p id="bankDescription">Questions follow the units and activity styles of NCTB English for Today.</p></div>
              <button class="shuffle-button" type="button" data-action="shuffle-questions">${icon("shuffle", 17)} <span>Mix it up</span></button>
            </div>
            <div class="bank-toolbar">
              <div class="topic-filters" id="topicFilters" role="group" aria-label="Filter by book unit"></div>
              <div class="bank-tabs" role="tablist" aria-label="Question collection">
                <button class="bank-tab active" type="button" role="tab" aria-selected="true" data-action="set-mode" data-mode="all">All questions <span id="allTabCount">${questions.length}</span></button>
                <button class="bank-tab" type="button" role="tab" aria-selected="false" data-action="set-mode" data-mode="saved">Saved <span id="savedTabCount">${state.saved.size}</span></button>
              </div>
            </div>
            <div class="question-list" id="questionList" aria-live="polite"></div>
            <div class="pagination-wrap" id="pagination"></div>
          </section>

          <footer class="page-footer"><span class="footer-logo">${icon("leaf", 16)} BrightSteps</span><span>Class 3 · English for Today · 2026</span><span class="footer-class">NCTB UNIT PRACTICE</span></footer>
        </main>
      </div>
    </div>
    <div class="dialog-host" id="dialogHost"></div>
  `;
}

function filteredQuestions() {
  let result = questions.filter((question) => {
    const matchesMode = state.mode === "all" || state.saved.has(question.id);
    const matchesTopic = state.topic === "all" || question.topic === state.topic;
    const passageText = question.passageId ? passages[question.passageId]?.text || "" : "";
    const haystack = `${question.prompt} ${(question.options || []).join(" ")} ${passageText}`.toLowerCase();
    const matchesSearch = !state.query || haystack.includes(state.query.toLowerCase());
    return matchesMode && matchesTopic && matchesSearch;
  });

  if (state.shuffledIds) {
    const order = new Map(state.shuffledIds.map((id, index) => [id, index]));
    result = result.sort((first, second) => (order.get(first.id) ?? 999) - (order.get(second.id) ?? 999));
  }
  return result;
}

function renderTopics() {
  const container = document.querySelector("#topicsGrid");
  if (!container) return;
  container.innerHTML = topics.map((topic) => {
    const count = questions.filter((question) => question.topic === topic.id).length;
    const active = state.topic === topic.id ? " is-selected" : "";
    return `
      <button class="topic-card topic-${topic.tone}${active}" type="button" data-action="set-topic" data-topic="${topic.id}" aria-pressed="${state.topic === topic.id}">
        <span class="topic-card-top"><span class="topic-icon">${icon(topic.icon, 21)}</span><span class="topic-count">${count} Q${count === 1 ? "" : "s"}</span></span>
        <strong>${escapeHTML(topic.name)}</strong><span class="topic-description">${escapeHTML(topic.description)}</span>
        <span class="topic-arrow">${icon("arrowUpRight", 16)}</span>
      </button>
    `;
  }).join("");
}

function renderTopicFilters() {
  const container = document.querySelector("#topicFilters");
  if (!container) return;
  const allCount = state.mode === "saved" ? state.saved.size : questions.length;
  const filters = [{ id: "all", name: "All units", count: allCount }, ...topics.map((topic) => ({
    id: topic.id,
    name: topic.name,
    count: questions.filter((question) => question.topic === topic.id && (state.mode !== "saved" || state.saved.has(question.id))).length,
  }))];
  container.innerHTML = filters.map((filter) => `
    <button class="filter-chip${state.topic === filter.id ? " active" : ""}" type="button" data-action="set-topic" data-topic="${filter.id}" aria-pressed="${state.topic === filter.id}">
      ${escapeHTML(filter.name)} <span>${filter.count}</span>
    </button>
  `).join("");
}

function renderQuestionFeedback(question, attempt) {
  if (!attempt?.checked || question.type !== "choice") return "";
  const correct = attempt.selected === question.answer;
  const correctText = question.options[question.answer];
  if (correct) {
    return `<div class="answer-feedback is-correct"><span class="feedback-icon">${icon("check", 16)}</span><div><strong>That's right!</strong><p>${escapeHTML(question.explanation)}</p></div></div>`;
  }
  return `<div class="answer-feedback is-incorrect"><span class="feedback-icon">${icon("close", 16)}</span><div><strong>Not quite — the answer is “${escapeHTML(correctText)}.”</strong><p>${escapeHTML(question.explanation)}</p></div></div>`;
}

function renderQuestionCard(question) {
  const topic = topicById.get(question.topic);
  const questionNumber = questions.indexOf(question) + 1;
  const saved = state.saved.has(question.id);
  const attempt = state.questionAttempts[question.id];
  const answered = Boolean(attempt?.checked);
  const typeLabel = question.type === "writing" ? "Writing prompt" : "Multiple choice";
  const lessonLabel = question.lesson ? ` · ${escapeHTML(question.lesson)}` : "";
  const options = question.type === "choice"
    ? `<div class="answer-options">${question.options.map((option, index) => {
      const selected = attempt?.selected === index;
      const correct = answered && index === question.answer;
      const incorrect = answered && selected && index !== question.answer;
      const stateClass = `${selected ? " is-selected" : ""}${correct ? " is-correct" : ""}${incorrect ? " is-incorrect" : ""}`;
      return `<button class="answer-option${stateClass}" type="button" data-action="select-answer" data-question-id="${question.id}" data-index="${index}" ${answered ? "disabled" : ""} aria-pressed="${selected}"><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(option)}</span>${correct ? `<span class="option-check">${icon("check", 15)}</span>` : ""}</button>`;
    }).join("")}</div>`
    : `<div class="writing-response"><label class="sr-only" for="draft-${question.id}">Your answer</label><textarea id="draft-${question.id}" data-writing-id="${question.id}" rows="3" placeholder="Write your answer here…">${escapeHTML(state.drafts[question.id] || "")}</textarea><span class="writing-hint">Your answer can be different from the sample.</span></div>`;

  const sampleShown = state.shownSamples.has(question.id);
  const writingFeedback = question.type === "writing" && sampleShown
    ? `<div class="answer-feedback is-sample"><span class="feedback-icon">${icon("sparkles", 16)}</span><div><strong>One possible answer</strong><p>${escapeHTML(question.sampleAnswer)}</p><small>${escapeHTML(question.tip)}</small></div></div>`
    : "";
  const feedback = question.type === "choice" ? renderQuestionFeedback(question, attempt) : writingFeedback;
  const buttonLabel = question.type === "writing" ? (sampleShown ? "Hide sample answer" : "See a sample answer") : (answered ? "Try again" : "Check answer");
  const buttonAction = question.type === "writing" ? "toggle-sample" : (answered ? "retry-question" : "check-question");

  return `
    <article class="question-card" data-question-card="${question.id}">
      <div class="question-card-head">
        <div class="question-id">Q${String(questionNumber).padStart(2, "0")}</div>
        <div class="question-labels"><span class="topic-label topic-label-${topic?.tone || "mint"}">${escapeHTML(topic?.name || "English")}</span><span class="question-type">${typeLabel}${lessonLabel}</span></div>
        <button class="save-button${saved ? " is-saved" : ""}" type="button" data-action="toggle-save" data-question-id="${question.id}" aria-label="${saved ? "Remove from saved questions" : "Save question"}" aria-pressed="${saved}">${icon("bookmark", 18)}</button>
      </div>
      <div class="question-card-body">
        <span class="prompt-overline">THINK IT THROUGH</span>
        <h3>${escapeHTML(question.prompt)}</h3>
        ${options}
        ${feedback}
      </div>
      <div class="question-card-foot">
        <span class="gentle-reminder">${question.type === "writing" ? `${icon("writing", 15)} Take your time` : `${icon("sparkles", 15)} Give it your best try`}</span>
        <button class="check-button${answered && question.type === "choice" ? " is-retry" : ""}" type="button" data-action="${buttonAction}" data-question-id="${question.id}">${buttonLabel}${question.type === "writing" && !sampleShown ? icon("arrowRight", 15) : ""}</button>
      </div>
    </article>
  `;
}

function renderPassageCard(passage) {
  return `
    <aside class="passage-card" aria-label="Reading passage">
      <div class="passage-illustration">${icon("reading", 22)}</div>
      <div class="passage-content"><span class="passage-label">${escapeHTML(passage.unitLabel || "READ THE TEXT FIRST")}</span><h3>${escapeHTML(passage.title)}</h3><p>${escapeHTML(passage.text)}</p></div>
      <span class="passage-sparkle">✦</span>
    </aside>
  `;
}

function renderQuestionList() {
  const list = document.querySelector("#questionList");
  const pagination = document.querySelector("#pagination");
  if (!list || !pagination) return;

  const matched = filteredQuestions();
  const pageCount = Math.max(1, Math.ceil(matched.length / state.pageSize));
  state.page = Math.min(state.page, pageCount);
  const start = (state.page - 1) * state.pageSize;
  const pageQuestions = matched.slice(start, start + state.pageSize);

  if (!matched.length) {
    const savedEmpty = state.mode === "saved" && state.saved.size === 0;
    const title = savedEmpty ? "Your saved set is waiting" : "No questions found";
    const description = savedEmpty ? "Tap the bookmark on any question to keep it here for later." : "Try a different word or clear one of your filters.";
    list.innerHTML = `<div class="empty-state"><span class="empty-icon">${icon(savedEmpty ? "bookmark" : "search", 24)}</span><h3>${title}</h3><p>${description}</p><button type="button" class="text-button" data-action="show-all">Browse all questions ${icon("arrowRight", 16)}</button></div>`;
    pagination.innerHTML = "";
    return;
  }

  const seenPassages = new Set();
  const questionMarkup = pageQuestions.map((question) => {
    let passageMarkup = "";
    if (question.passageId && !seenPassages.has(question.passageId)) {
      const passage = passages[question.passageId];
      if (passage) passageMarkup = renderPassageCard(passage);
      seenPassages.add(question.passageId);
    }
    return `${passageMarkup}${renderQuestionCard(question)}`;
  }).join("");
  list.innerHTML = questionMarkup;

  const from = start + 1;
  const to = Math.min(start + state.pageSize, matched.length);
  const pageButtons = Array.from({ length: pageCount }, (_, index) => {
    const page = index + 1;
    if (pageCount > 6 && page > 3 && page < pageCount - 1 && Math.abs(page - state.page) > 1) {
      if (page === 4 || page === pageCount - 2) return `<span class="page-ellipsis">…</span>`;
      return "";
    }
    return `<button class="page-number${state.page === page ? " active" : ""}" type="button" data-action="go-page" data-page="${page}" aria-label="Page ${page}" aria-current="${state.page === page ? "page" : "false"}">${page}</button>`;
  }).join("");
  pagination.innerHTML = `
    <span class="results-count">Showing <strong>${from}–${to}</strong> of <strong>${matched.length}</strong> questions</span>
    <div class="pagination-controls">
      <button class="page-arrow" type="button" data-action="go-page" data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""} aria-label="Previous page">${icon("chevronLeft", 17)}</button>
      ${pageButtons}
      <button class="page-arrow" type="button" data-action="go-page" data-page="${state.page + 1}" ${state.page === pageCount ? "disabled" : ""} aria-label="Next page">${icon("chevronRight", 17)}</button>
    </div>
  `;
}

function renderBankMeta() {
  const allTabCount = document.querySelector("#allTabCount");
  const savedTabCount = document.querySelector("#savedTabCount");
  const savedNavCount = document.querySelector("#savedNavCount");
  const savedMetric = document.querySelector("#savedMetric");
  const attemptMetric = document.querySelector("#attemptMetric");
  const attemptSubtext = document.querySelector("#attemptSubtext");
  const bankDescription = document.querySelector("#bankDescription");
  if (allTabCount) allTabCount.textContent = questions.length;
  if (savedTabCount) savedTabCount.textContent = state.saved.size;
  if (savedNavCount) savedNavCount.textContent = state.saved.size;
  if (savedMetric) savedMetric.textContent = state.saved.size;
  if (attemptMetric) attemptMetric.textContent = state.stats.attempts;
  if (attemptSubtext) attemptSubtext.textContent = state.stats.attempts ? `Best score ${state.stats.bestScore}/5` : "Ready when you are";
  if (bankDescription) {
    bankDescription.textContent = state.mode === "saved"
      ? "Your own little collection of book-based questions to revisit."
      : "Questions follow the units and activity styles of NCTB English for Today.";
  }
  document.querySelectorAll("[data-action='set-mode']").forEach((button) => {
    const active = button.dataset.mode === state.mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-action='nav-bank']").forEach((button) => button.classList.toggle("active", state.mode === "all"));
  document.querySelectorAll("[data-action='nav-saved']").forEach((button) => button.classList.toggle("active", state.mode === "saved"));
  const practiceNav = document.querySelector("[data-action='start-practice']");
  if (practiceNav) practiceNav.classList.remove("active");
}

function refreshBank() {
  renderBankMeta();
  renderTopics();
  renderTopicFilters();
  renderQuestionList();
}

function updateSearch(value) {
  state.query = value.trim();
  state.page = 1;
  state.shuffledIds = null;
  renderQuestionList();
}

function setTopic(topicId, shouldScroll = false, mode = state.mode) {
  state.topic = topicId;
  state.mode = mode;
  state.page = 1;
  state.shuffledIds = null;
  refreshBank();
  closeMobileMenu();
  if (shouldScroll) document.querySelector("#question-bank")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setMode(mode) {
  state.mode = mode;
  state.topic = "all";
  state.page = 1;
  state.shuffledIds = null;
  refreshBank();
  closeMobileMenu();
  document.querySelector("#question-bank")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openPractice() {
  const pool = questions.filter((question) => question.type === "choice");
  const picked = shuffle(pool).slice(0, 5);
  state.quiz = {
    questions: picked,
    index: 0,
    selected: null,
    checked: false,
    answers: {},
    screen: "question",
  };
  renderPracticeModal();
  closeMobileMenu();
}

function closePractice() {
  state.quiz = null;
  const host = document.querySelector("#dialogHost");
  if (host) host.innerHTML = "";
}

function renderQuizResult() {
  const quiz = state.quiz;
  const score = Object.values(quiz.answers).filter((answer) => answer.correct).length;
  const total = quiz.questions.length;
  const heading = score === total ? "Brilliant work!" : score >= 3 ? "You’re doing great!" : "Nice work showing up!";
  const message = score === total
    ? "A perfect round. Keep that curious mind going!"
    : score >= 3
      ? "Every question you try helps your English grow. Ready for another round?"
      : "Practice is how we learn. Give yourself a high five and keep going!";
  return `
    <div class="quiz-result-view">
      <span class="result-sparkle result-sparkle-a">✦</span><span class="result-sparkle result-sparkle-b">✧</span>
      <div class="score-ring" style="--score-angle:${(score / total) * 360}deg"><div><strong>${score}</strong><span>/${total}</span></div></div>
      <span class="quiz-eyebrow">PRACTICE COMPLETE</span>
      <h2>${heading}</h2>
      <p>${message}</p>
      <div class="result-summary"><span>${icon("check", 16)} ${score} correct</span><span>${icon("clock", 16)} 5 questions</span></div>
      <div class="result-actions"><button class="quiz-primary-button" type="button" data-action="quiz-restart">Try another set ${icon("arrowRight", 17)}</button><button class="quiz-secondary-button" type="button" data-action="close-practice">Back to question bank</button></div>
    </div>
  `;
}

function renderPracticeModal() {
  const host = document.querySelector("#dialogHost");
  if (!host || !state.quiz) return;
  const quiz = state.quiz;

  if (quiz.screen === "result") {
    host.innerHTML = `<div class="modal-backdrop" data-action="close-practice"><section class="quiz-modal quiz-result-modal" role="dialog" aria-modal="true" aria-label="Practice results">${renderQuizResult()}</section></div>`;
    return;
  }

  const question = quiz.questions[quiz.index];
  const topic = topicById.get(question.topic);
  const progress = ((quiz.index + 1) / quiz.questions.length) * 100;
  const options = question.options.map((option, index) => {
    const selected = quiz.selected === index;
    const wasChecked = quiz.checked;
    const correct = wasChecked && index === question.answer;
    const incorrect = wasChecked && selected && index !== question.answer;
    const status = `${selected ? " is-selected" : ""}${correct ? " is-correct" : ""}${incorrect ? " is-incorrect" : ""}`;
    return `<button class="quiz-option${status}" type="button" data-action="quiz-select" data-index="${index}" ${wasChecked ? "disabled" : ""} aria-pressed="${selected}"><span class="quiz-option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(option)}</span>${correct ? `<span class="quiz-option-check">${icon("check", 16)}</span>` : ""}</button>`;
  }).join("");
  const checkedFeedback = quiz.checked
    ? `<div class="quiz-feedback ${quiz.selected === question.answer ? "is-correct" : "is-incorrect"}"><span>${icon(quiz.selected === question.answer ? "check" : "sparkles", 17)}</span><div><strong>${quiz.selected === question.answer ? "That's right!" : `The answer is “${escapeHTML(question.options[question.answer])}.”`}</strong><p>${escapeHTML(question.explanation)}</p></div></div>`
    : "";
  const isLast = quiz.index === quiz.questions.length - 1;
  const actionButton = quiz.checked
    ? `<button class="quiz-primary-button" type="button" data-action="quiz-next">${isLast ? "See my result" : "Next question"} ${icon("arrowRight", 17)}</button>`
    : `<button class="quiz-primary-button" type="button" data-action="quiz-check" ${quiz.selected === null ? "disabled" : ""}>Check answer ${icon("arrowRight", 17)}</button>`;

  host.innerHTML = `
    <div class="modal-backdrop" data-action="close-practice">
      <section class="quiz-modal" role="dialog" aria-modal="true" aria-label="Quick English practice">
        <div class="quiz-topline"><div class="quiz-brand-mark">${icon("leaf", 18)}</div><span>BRIGHTSTEPS <i>·</i> QUICK PRACTICE</span><button class="quiz-close" type="button" data-action="close-practice" aria-label="Close practice">${icon("close", 19)}</button></div>
        <div class="quiz-progress-row"><span>QUESTION <strong>${String(quiz.index + 1).padStart(2, "0")}</strong> <i>of</i> ${String(quiz.questions.length).padStart(2, "0")}</span><span>${Math.round(progress)}% complete</span></div>
        <div class="quiz-progress-track"><span style="width:${progress}%"></span></div>
        <div class="quiz-question-content">
          <span class="quiz-topic-label topic-label-${topic?.tone || "mint"}">${escapeHTML(topic?.name || "English")}</span>
          <h2>${escapeHTML(question.prompt)}</h2>
          <p class="quiz-instruction">Pick the answer you think is right.</p>
          <div class="quiz-options">${options}</div>
          ${checkedFeedback}
        </div>
        <div class="quiz-footer"><button class="quiz-exit-link" type="button" data-action="close-practice">${icon("chevronLeft", 16)} Leave practice</button>${actionButton}</div>
      </section>
    </div>
  `;
}

function completePractice() {
  const quiz = state.quiz;
  const score = Object.values(quiz.answers).filter((answer) => answer.correct).length;
  state.stats.attempts += 1;
  state.stats.lastScore = score;
  state.stats.bestScore = Math.max(state.stats.bestScore, score);
  writeStorage(storageKeys.stats, state.stats);
  quiz.screen = "result";
  renderPracticeModal();
  renderBankMeta();
}

function chooseQuestionAnswer(button) {
  const questionId = button.dataset.questionId;
  const card = button.closest("[data-question-card]");
  if (!card || state.questionAttempts[questionId]?.checked) return;
  const selected = Number(button.dataset.index);
  state.questionAttempts[questionId] = { selected, checked: false };
  card.querySelectorAll(".answer-option").forEach((option) => {
    const isSelected = Number(option.dataset.index) === selected;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
  const checkButton = card.querySelector('[data-action="check-question"]');
  if (checkButton) checkButton.classList.add("is-ready");
}

function handleQuestionAction(action, button) {
  const questionId = button.dataset.questionId;
  const question = questionById.get(questionId);
  if (!question) return;
  if (action === "check-question") {
    const current = state.questionAttempts[questionId];
    const feedbackHost = button.closest(".question-card")?.querySelector(".question-card-body");
    if (!current || current.selected === undefined) {
      let note = feedbackHost?.querySelector(".select-reminder");
      if (!note && feedbackHost) {
        note = document.createElement("p");
        note.className = "select-reminder";
        note.textContent = "Choose an answer first, then check it.";
        feedbackHost.append(note);
      }
      return;
    }
    state.questionAttempts[questionId] = { ...current, checked: true };
    renderQuestionList();
  } else if (action === "retry-question") {
    delete state.questionAttempts[questionId];
    renderQuestionList();
  } else if (action === "toggle-sample") {
    if (state.shownSamples.has(questionId)) state.shownSamples.delete(questionId);
    else state.shownSamples.add(questionId);
    renderQuestionList();
    document.querySelector(`#draft-${questionId}`)?.focus({ preventScroll: true });
  }
}

function closeMobileMenu() {
  document.querySelector("#sidebar")?.classList.remove("mobile-open");
  document.body.classList.remove("menu-open");
}

function handleAction(event, button) {
  const action = button.dataset.action;
  if (!action) return;

  if (action === "toggle-menu") {
    const sidebar = document.querySelector("#sidebar");
    const opening = !sidebar?.classList.contains("mobile-open");
    sidebar?.classList.toggle("mobile-open", opening);
    document.body.classList.toggle("menu-open", opening);
  } else if (action === "close-menu") {
    closeMobileMenu();
  } else if (action === "nav-bank" || action === "show-all") {
    state.mode = "all";
    state.topic = "all";
    state.page = 1;
    state.query = "";
    state.shuffledIds = null;
    const searchInput = document.querySelector("#searchInput");
    if (searchInput) searchInput.value = "";
    refreshBank();
    closeMobileMenu();
    if (action === "show-all") document.querySelector("#question-bank")?.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (action === "nav-saved") {
    setMode("saved");
  } else if (action === "start-practice") {
    openPractice();
  } else if (action === "set-mode") {
    setMode(button.dataset.mode);
  } else if (action === "set-topic") {
    const mode = button.classList.contains("topic-card") ? "all" : state.mode;
    setTopic(button.dataset.topic, true, mode);
  } else if (action === "toggle-save") {
    const id = button.dataset.questionId;
    if (state.saved.has(id)) state.saved.delete(id);
    else state.saved.add(id);
    writeStorage(storageKeys.saved, [...state.saved]);
    renderBankMeta();
    renderTopicFilters();
    renderQuestionList();
  } else if (action === "select-answer") {
    chooseQuestionAnswer(button);
  } else if (["check-question", "retry-question", "toggle-sample"].includes(action)) {
    handleQuestionAction(action, button);
  } else if (action === "go-page") {
    const requestedPage = Number(button.dataset.page);
    const maxPage = Math.max(1, Math.ceil(filteredQuestions().length / state.pageSize));
    if (requestedPage >= 1 && requestedPage <= maxPage) {
      state.page = requestedPage;
      renderQuestionList();
      document.querySelector("#question-bank")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else if (action === "shuffle-questions") {
    state.shuffledIds = shuffle(filteredQuestions().map((question) => question.id));
    state.page = 1;
    renderQuestionList();
    button.classList.add("is-shuffled");
    window.setTimeout(() => button.classList.remove("is-shuffled"), 450);
  } else if (action === "quiz-select") {
    if (state.quiz && !state.quiz.checked) {
      state.quiz.selected = Number(button.dataset.index);
      renderPracticeModal();
    }
  } else if (action === "quiz-check") {
    if (state.quiz && state.quiz.selected !== null) {
      const question = state.quiz.questions[state.quiz.index];
      state.quiz.answers[question.id] = {
        selected: state.quiz.selected,
        correct: state.quiz.selected === question.answer,
      };
      state.quiz.checked = true;
      renderPracticeModal();
    }
  } else if (action === "quiz-next") {
    if (state.quiz?.index === state.quiz.questions.length - 1) {
      completePractice();
    } else if (state.quiz) {
      state.quiz.index += 1;
      state.quiz.selected = null;
      state.quiz.checked = false;
      renderPracticeModal();
    }
  } else if (action === "quiz-restart") {
    openPractice();
  } else if (action === "close-practice") {
    closePractice();
  }
}

renderShell();
renderTopics();
renderTopicFilters();
renderQuestionList();
renderBankMeta();

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (button) handleAction(event, button);
});

app.addEventListener("input", (event) => {
  if (event.target.id === "searchInput") {
    updateSearch(event.target.value);
  } else if (event.target.matches("[data-writing-id]")) {
    const questionId = event.target.dataset.writingId;
    state.drafts[questionId] = event.target.value;
    writeStorage(storageKeys.drafts, state.drafts);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (state.quiz) closePractice();
    closeMobileMenu();
  }
});

