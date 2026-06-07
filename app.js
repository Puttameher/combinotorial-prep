// CSE357 - Exam Blast Core Application Logic

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initBrandRefresh();
  initRouter();
  initCountdown();
  initRevisionView();
  initQuizSimulator();
  initFlashcardDeck();
  initSortingVisualizer();
  initTopicMapHover();
});

const CHAPTER_CONNECTIONS = {
  os: ["CPU scheduling -> algorithm cost", "Memory pages -> data layout", "Deadlock -> graph cycles"],
  networks: ["Routing -> shortest paths", "TCP state -> OS process state", "DNS tables -> indexed lookup"],
  dbms: ["Indexes -> trees + hashing", "Transactions -> synchronization", "Schema design -> OOP modeling"],
  oop: ["Interfaces -> APIs", "Objects -> records + relations", "Patterns -> algorithm strategy"],
  ds: ["Trees -> DB indexes", "Graphs -> routing + deadlock", "Queues -> OS scheduling"],
  algo: ["Sorting -> visualizer", "Complexity -> DS selection", "Greedy/DP -> optimization"]
};

function initBrandRefresh() {
  document.title = "CSE357 Exam Blast";

  const logoMark = document.querySelector(".nav-logo span");
  if (logoMark) logoMark.textContent = "357";

  const heroMark = document.querySelector(".lock-icon");
  if (heroMark) heroMark.textContent = "CSE357";

  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) heroTitle.innerHTML = "Exam <span>Prep</span> Console";

  const subtitle = document.querySelector(".hero .subtitle");
  if (subtitle) {
    subtitle.textContent = "A connected map of operating systems, networks, DBMS, OOP, data structures, and algorithms, tuned for fast revision.";
  }
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark-mode");
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}

/* ─────────────────────────────────────────────────────────
   1. SPA ROUTER
   ───────────────────────────────────────────────────────── */
function initRouter() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute("data-target");
      switchView(targetId);
      
      // Update active nav state
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
  
  // Listen to hash changes in URL for accessibility
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash;
    if (hash === "#revision") switchView("revision-view");
    if (hash === "#quiz") switchView("quiz-view");
    if (hash === "#flashcards") switchView("flashcards-view");
    if (hash === "#visualizer") switchView("visualizer-view");
    if (hash === "#cheatsheet") switchView("cheatsheet-view");
  });
}

function switchView(targetId) {
  const sections = document.querySelectorAll(".view-section");
  sections.forEach(sec => {
    sec.classList.remove("active");
  });
  
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.classList.add("active");
    window.scrollTo(0, 0);
  }
  
  // Sync tab active states if routing was triggered from external buttons
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    if (tab.getAttribute("data-target") === targetId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

// Allows jumping directly from Dashboard cards to a filtered revision category
function navigateToTab(tabId, filterValue) {
  switchView(tabId);
  if (tabId === "revision-view") {
    const filterSelect = document.getElementById("chapter-filter");
    if (filterSelect) {
      filterSelect.value = filterValue;
      renderRevisionCards(filterValue, "");
    }
  }
}

/* ─────────────────────────────────────────────────────────
   2. COUNTDOWN TIMER
   ───────────────────────────────────────────────────────── */
function initCountdown() {
  const timerDisplay = document.getElementById("countdown-timer");
  let totalSeconds = 36 * 3600; // 36 Hours

  const interval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "00:00:00 - EXAM TIME";
      return;
    }
    
    totalSeconds--;
    
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    timerDisplay.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }, 1000);
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

/* ─────────────────────────────────────────────────────────
   3. REVISION VIEW
   ───────────────────────────────────────────────────────── */
function initRevisionView() {
  const searchInput = document.getElementById("search-bar");
  const filterSelect = document.getElementById("chapter-filter");
  
  if (searchInput && filterSelect) {
    searchInput.addEventListener("input", (e) => {
      renderRevisionCards(filterSelect.value, e.target.value);
    });
    
    filterSelect.addEventListener("change", (e) => {
      renderRevisionCards(e.target.value, searchInput.value);
    });
  }
  
  // Initial draw
  renderRevisionCards("all", "");
}

function renderRevisionCards(chapterFilter, searchVal) {
  const container = document.getElementById("revision-cards-container");
  if (!container) return;
  
  container.innerHTML = "";
  const query = searchVal.trim().toLowerCase();
  
  CURRICULUM.chapters.forEach(chapter => {
    // Filter by Chapter Selection
    if (chapterFilter !== "all" && chapter.id !== chapterFilter) {
      return;
    }
    
    // Filter topics matching Search Query
    const matchedTopics = chapter.topics.filter(topic => {
      if (!query) return true;
      const titleMatch = topic.title.toLowerCase().includes(query);
      const descMatch = topic.desc.toLowerCase().includes(query);
      const keyPointsMatch = topic.keyPoints.some(kp => kp.toLowerCase().includes(query));
      return titleMatch || descMatch || keyPointsMatch;
    });
    
    // If no matching topics, skip rendering this chapter heading
    if (matchedTopics.length === 0) {
      return;
    }
    
    // Render Chapter Block
    const chapterBlock = document.createElement("div");
    chapterBlock.className = "chapter-block";
    const connections = CHAPTER_CONNECTIONS[chapter.id] || [];
    const connectionHTML = connections.map(item => `<span>${item}</span>`).join("");
    chapterBlock.innerHTML = `
      <div class="chapter-heading">
        <span class="chapter-number-badge ch-${chapter.id}">${chapter.num}</span>
        <div>
          <h2>${chapter.name}</h2>
          <div class="chapter-connection-strip">${connectionHTML}</div>
        </div>
      </div>
      <div class="topics-grid" id="grid-${chapter.id}"></div>
    `;
    
    container.appendChild(chapterBlock);
    
    const grid = document.getElementById(`grid-${chapter.id}`);
    matchedTopics.forEach(topic => {
      const card = document.createElement("div");
      card.className = `topic-card ${chapter.theme}`;
      
      // Construct Key Points List
      let kpHTML = "";
      if (topic.keyPoints && topic.keyPoints.length > 0) {
        kpHTML = `<div class="key-points">`;
        topic.keyPoints.forEach(kp => {
          kpHTML += `<span class="kp-badge">${kp}</span>`;
        });
        kpHTML += `</div>`;
      }
      
      card.innerHTML = `
        <h3><span>${topic.icon}</span> ${topic.title}</h3>
        <p class="desc">${topic.desc}</p>
        <div class="topic-expanded-content">
          ${topic.htmlContent}
        </div>
        ${kpHTML}
      `;
      
      grid.appendChild(card);
    });
  });
  
  // Handle empty search results state
  if (container.innerHTML === "") {
    container.innerHTML = `
      <div style="text-align:center; padding:4rem; color:var(--text-dim);">
        <p style="font-size:1.2rem; margin-bottom:0.5rem;">🔍 No topics match your search criteria</p>
        <p style="font-size:0.9rem;">Try selecting a different filter or clearing keywords.</p>
      </div>
    `;
  }
}

/* ─────────────────────────────────────────────────────────
   4. MCQ EXAM SIMULATOR
   ───────────────────────────────────────────────────────── */
let activeQuizState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  timerInterval: null,
  timeElapsed: 0,
  selectedOption: null,
  isAnswerChecked: false
};

function initQuizSimulator() {
  const startBtn = document.getElementById("start-quiz-btn");
  const nextBtn = document.getElementById("quiz-next-btn");
  const restartBtn = document.getElementById("restart-quiz-btn");
  const selectorButtons = document.querySelectorAll(".quiz-opt-btn");
  
  // Set up selection logic
  selectorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectorButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  
  startBtn.addEventListener("click", () => {
    const activeBtn = document.querySelector(".quiz-opt-btn.active");
    const scope = activeBtn ? activeBtn.getAttribute("data-scope") : "all";
    launchQuiz(scope);
  });
  
  nextBtn.addEventListener("click", () => {
    if (!activeQuizState.isAnswerChecked) {
      verifySelectedAnswer();
    } else {
      advanceQuizQuestion();
    }
  });
  
  restartBtn.addEventListener("click", () => {
    document.getElementById("quiz-summary").style.display = "none";
    document.getElementById("quiz-welcome").style.display = "block";
  });
}

function launchQuiz(scope) {
  // Get and filter questions
  let sourceQuestions = [];
  if (scope === "all") {
    sourceQuestions = [...CURRICULUM.quizzes];
    // Shuffle and pick 20
    shuffleArray(sourceQuestions);
    sourceQuestions = sourceQuestions.slice(0, 20);
    document.getElementById("quiz-context-title").textContent = "FULL MIXED EXAM";
  } else {
    sourceQuestions = CURRICULUM.quizzes.filter(q => q.chapter === scope);
    const chName = CURRICULUM.chapters.find(c => c.id === scope).name;
    document.getElementById("quiz-context-title").textContent = chName.toUpperCase();
  }
  
  if (sourceQuestions.length === 0) return;
  
  // Initialize State
  activeQuizState.questions = sourceQuestions;
  activeQuizState.currentIndex = 0;
  activeQuizState.score = 0;
  activeQuizState.timeElapsed = 0;
  activeQuizState.selectedOption = null;
  activeQuizState.isAnswerChecked = false;
  
  // Swap UI Panels
  document.getElementById("quiz-welcome").style.display = "none";
  document.getElementById("quiz-workspace").style.display = "block";
  
  // Setup timer
  const clock = document.getElementById("quiz-timer-clock");
  clock.textContent = "00:00";
  if (activeQuizState.timerInterval) clearInterval(activeQuizState.timerInterval);
  activeQuizState.timerInterval = setInterval(() => {
    activeQuizState.timeElapsed++;
    const m = Math.floor(activeQuizState.timeElapsed / 60);
    const s = activeQuizState.timeElapsed % 60;
    clock.textContent = `${pad(m)}:${pad(s)}`;
  }, 1000);
  
  drawQuizQuestion();
}

function drawQuizQuestion() {
  const q = activeQuizState.questions[activeQuizState.currentIndex];
  activeQuizState.selectedOption = null;
  activeQuizState.isAnswerChecked = false;
  
  // Update Next Button label
  const nextBtn = document.getElementById("quiz-next-btn");
  nextBtn.textContent = "Verify Answer";
  nextBtn.disabled = true;
  
  // Update progress bar
  const percent = (activeQuizState.currentIndex / activeQuizState.questions.length) * 100;
  document.getElementById("quiz-progress-bar").style.width = `${percent}%`;
  
  // Inject Question Text
  document.getElementById("quiz-question-text").innerHTML = `
    <span style="font-family:'JetBrains Mono',monospace; color:var(--accent1); font-size:0.95rem; display:block; margin-bottom:0.5rem;">Q. ${activeQuizState.currentIndex + 1} of ${activeQuizState.questions.length}</span>
    ${q.question}
  `;
  
  // Clear and inject options
  const container = document.getElementById("quiz-options-container");
  container.innerHTML = "";
  document.getElementById("quiz-explanation-container").style.display = "none";
  
  q.options.forEach((opt, idx) => {
    const div = document.createElement("div");
    div.className = "quiz-option";
    div.innerHTML = `
      <div class="quiz-option-letter">${String.fromCharCode(65 + idx)}</div>
      <div class="quiz-option-text">${opt}</div>
    `;
    
    div.addEventListener("click", () => {
      if (activeQuizState.isAnswerChecked) return; // Freeze clicks after verification
      
      // Toggle selection state
      document.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
      div.classList.add("selected");
      
      activeQuizState.selectedOption = idx;
      nextBtn.disabled = false;
    });
    
    container.appendChild(div);
  });
}

function verifySelectedAnswer() {
  activeQuizState.isAnswerChecked = true;
  const q = activeQuizState.questions[activeQuizState.currentIndex];
  const selectedIdx = activeQuizState.selectedOption;
  const correctIdx = q.correct;
  
  const options = document.querySelectorAll(".quiz-option");
  const nextBtn = document.getElementById("quiz-next-btn");
  
  // Mark correct option
  options[correctIdx].classList.add("correct");
  
  if (selectedIdx === correctIdx) {
    activeQuizState.score++;
  } else {
    options[selectedIdx].classList.add("incorrect");
  }
  
  // Display explanation box
  const explBox = document.getElementById("quiz-explanation-container");
  const explText = document.getElementById("quiz-explanation-text");
  explText.textContent = q.explanation;
  explBox.style.display = "block";
  
  // Freeze interaction & update button
  options.forEach(o => o.style.pointerEvents = "none");
  
  if (activeQuizState.currentIndex === activeQuizState.questions.length - 1) {
    nextBtn.textContent = "Finish Exam";
  } else {
    nextBtn.textContent = "Next Question";
  }
}

function advanceQuizQuestion() {
  activeQuizState.currentIndex++;
  if (activeQuizState.currentIndex < activeQuizState.questions.length) {
    drawQuizQuestion();
  } else {
    completeQuizSession();
  }
}

function completeQuizSession() {
  clearInterval(activeQuizState.timerInterval);
  
  document.getElementById("quiz-workspace").style.display = "none";
  document.getElementById("quiz-summary").style.display = "block";
  
  const finalScore = activeQuizState.score;
  const total = activeQuizState.questions.length;
  const percent = Math.round((finalScore / total) * 100);
  
  // Inject summary items
  document.getElementById("summary-score-percent").textContent = `${percent}%`;
  document.getElementById("summary-stat-correct").textContent = `${finalScore} / ${total}`;
  
  const m = Math.floor(activeQuizState.timeElapsed / 60);
  const s = activeQuizState.timeElapsed % 60;
  document.getElementById("summary-stat-time").textContent = `${pad(m)}:${pad(s)}`;
}

/* ─────────────────────────────────────────────────────────
   5. FLASHCARD SYSTEM
   ───────────────────────────────────────────────────────── */
let activeDeckState = {
  cards: [],
  currentIndex: 0,
  mastered: 0,
  needsReview: 0
};

function initFlashcardDeck() {
  const cardFilter = document.getElementById("flashcard-chapter-filter");
  const cardContainer = document.getElementById("flashcard-card");
  const btnWrong = document.getElementById("fc-btn-wrong");
  const btnCorrect = document.getElementById("fc-btn-correct");
  const restartBtn = document.getElementById("fc-restart-btn");
  
  cardFilter.addEventListener("change", () => {
    loadFlashcardDeck(cardFilter.value);
  });
  
  cardContainer.addEventListener("click", () => {
    cardContainer.classList.toggle("flipped");
  });
  
  btnWrong.addEventListener("click", () => {
    activeDeckState.needsReview++;
    advanceFlashcard();
  });
  
  btnCorrect.addEventListener("click", () => {
    activeDeckState.mastered++;
    advanceFlashcard();
  });
  
  restartBtn.addEventListener("click", () => {
    document.getElementById("flashcard-summary").style.display = "none";
    document.querySelector(".flashcards-workspace").style.display = "flex";
    loadFlashcardDeck(cardFilter.value);
  });
  
  // Initial setup
  loadFlashcardDeck("all");
}

function loadFlashcardDeck(chapterFilter) {
  let deck = [];
  if (chapterFilter === "all") {
    deck = [...CURRICULUM.flashcards];
  } else {
    deck = CURRICULUM.flashcards.filter(fc => fc.chapter === chapterFilter);
  }
  
  shuffleArray(deck);
  
  activeDeckState.cards = deck;
  activeDeckState.currentIndex = 0;
  activeDeckState.mastered = 0;
  activeDeckState.needsReview = 0;
  
  document.getElementById("fc-total-count").textContent = deck.length;
  document.getElementById("flashcard-summary").style.display = "none";
  document.querySelector(".flashcards-workspace").style.display = "flex";
  
  drawFlashcard();
}

function drawFlashcard() {
  if (activeDeckState.cards.length === 0) {
    document.getElementById("fc-term-text").textContent = "No cards";
    document.getElementById("fc-def-text").textContent = "Try changing filters.";
    return;
  }
  
  const card = activeDeckState.cards[activeDeckState.currentIndex];
  
  document.getElementById("fc-current-index").textContent = activeDeckState.currentIndex + 1;
  
  // Sync card contents
  document.getElementById("fc-term-text").textContent = card.term;
  document.getElementById("fc-def-text").textContent = card.definition;
  
  // Set chapter badges
  const chInfo = CURRICULUM.chapters.find(c => c.id === card.chapter);
  const chName = chInfo ? chInfo.name : card.chapter.toUpperCase();
  document.getElementById("fc-chapter-badge").textContent = chName;
  document.getElementById("fc-chapter-badge-back").textContent = chName;
  
  // Apply chapter-specific theme border
  const cardElement = document.getElementById("flashcard-card");
  cardElement.className = `flashcard-container fc-${card.chapter}`;
}

function advanceFlashcard() {
  activeDeckState.currentIndex++;
  if (activeDeckState.currentIndex < activeDeckState.cards.length) {
    drawFlashcard();
  } else {
    completeFlashcardDeck();
  }
}

function completeFlashcardDeck() {
  document.querySelector(".flashcards-workspace").style.display = "none";
  document.getElementById("flashcard-summary").style.display = "block";
  
  document.getElementById("fc-stat-mastered").textContent = activeDeckState.mastered;
  document.getElementById("fc-stat-reviewed").textContent = activeDeckState.needsReview;
}

/* ─────────────────────────────────────────────────────────
   6. SORTING VISUALIZER
   ───────────────────────────────────────────────────────── */
let activeVisualizerState = {
  array: [],
  algo: "bubble",
  isPlaying: false,
  generator: null,
  size: 30,
  speed: 100,
  playbackInterval: null
};

// Tracing Pseudocode & Info for Visualizer
const ALGO_METRICS = {
  bubble: {
    desc: "Bubble Sort continuously steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This simple pass is repeated until the list is fully sorted.",
    code: `
<div class="vis-trace-line" data-line="0"><span class="kw">function</span> <span class="fn">bubbleSort</span>(arr) {</div>
<div class="vis-trace-line" data-line="1">  <span class="kw">for</span> (i = 0; i &lt; n - 1; i++) {</div>
<div class="vis-trace-line" data-line="2">    <span class="kw">for</span> (j = 0; j &lt; n - i - 1; j++) {</div>
<div class="vis-trace-line" data-line="3">      <span class="kw">if</span> (arr[j] &gt; arr[j+1]) {</div>
<div class="vis-trace-line" data-line="4">        <span class="fn">swap</span>(arr[j], arr[j+1]);</div>
<div class="vis-trace-line" data-line="5">      }</div>
<div class="vis-trace-line" data-line="6">    }</div>
<div class="vis-trace-line" data-line="7">  }</div>
<div class="vis-trace-line" data-line="8">}</div>`
  },
  selection: {
    desc: "Selection Sort divides the array into sorted and unsorted segments. It repeatedly finds the minimum element in the unsorted segment and swaps it to the front, building the sorted array sequentially.",
    code: `
<div class="vis-trace-line" data-line="0"><span class="kw">function</span> <span class="fn">selectionSort</span>(arr) {</div>
<div class="vis-trace-line" data-line="1">  <span class="kw">for</span> (i = 0; i &lt; n - 1; i++) {</div>
<div class="vis-trace-line" data-line="2">    min_idx = i;</div>
<div class="vis-trace-line" data-line="3">    <span class="kw">for</span> (j = i + 1; j &lt; n; j++) {</div>
<div class="vis-trace-line" data-line="4">      <span class="kw">if</span> (arr[j] &lt; arr[min_idx]) min_idx = j;</div>
<div class="vis-trace-line" data-line="5">    }</div>
<div class="vis-trace-line" data-line="6">    <span class="fn">swap</span>(arr[i], arr[min_idx]);</div>
<div class="vis-trace-line" data-line="7">  }</div>
<div class="vis-trace-line" data-line="8">}</div>`
  },
  insertion: {
    desc: "Insertion Sort builds a sorted array one item at a time. Elements from the unsorted segment are shifted and 'inserted' back into their correct positions in the sorted segment.",
    code: `
<div class="vis-trace-line" data-line="0"><span class="kw">function</span> <span class="fn">insertionSort</span>(arr) {</div>
<div class="vis-trace-line" data-line="1">  <span class="kw">for</span> (i = 1; i &lt; n; i++) {</div>
<div class="vis-trace-line" data-line="2">    key = arr[i]; j = i - 1;</div>
<div class="vis-trace-line" data-line="3">    <span class="kw">while</span> (j &gt;= 0 && arr[j] &gt; key) {</div>
<div class="vis-trace-line" data-line="4">      arr[j + 1] = arr[j];</div>
<div class="vis-trace-line" data-line="5">      j--;</div>
<div class="vis-trace-line" data-line="6">    }</div>
<div class="vis-trace-line" data-line="7">    arr[j + 1] = key;</div>
<div class="vis-trace-line" data-line="8">  }</div>
<div class="vis-trace-line" data-line="9">}</div>`
  },
  quick: {
    desc: "Quick Sort is a Divide & Conquer algorithm. It selects a pivot value and partitions the array into lower and higher value segments, recursively sorting each side. Average: O(N log N); Worst: O(N^2).",
    code: `
<div class="vis-trace-line" data-line="0"><span class="kw">function</span> <span class="fn">quickSort</span>(arr, low, high) {</div>
<div class="vis-trace-line" data-line="1">  <span class="kw">if</span> (low &lt; high) {</div>
<div class="vis-trace-line" data-line="2">    pivot_idx = <span class="fn">partition</span>(arr, low, high);</div>
<div class="vis-trace-line" data-line="3">    <span class="fn">quickSort</span>(arr, low, pivot_idx - 1);</div>
<div class="vis-trace-line" data-line="4">    <span class="fn">quickSort</span>(arr, pivot_idx + 1, high);</div>
<div class="vis-trace-line" data-line="5">  }</div>
<div class="vis-trace-line" data-line="6">}</div>`
  },
  merge: {
    desc: "Merge Sort is a stable Divide & Conquer algorithm. It splits the array in half recursively, sorts each subtree, and then merges the sorted halves back together. Requires O(N) auxiliary memory.",
    code: `
<div class="vis-trace-line" data-line="0"><span class="kw">function</span> <span class="fn">mergeSort</span>(arr, l, r) {</div>
<div class="vis-trace-line" data-line="1">  <span class="kw">if</span> (l &lt; r) {</div>
<div class="vis-trace-line" data-line="2">    m = l + (r - l) / 2;</div>
<div class="vis-trace-line" data-line="3">    <span class="fn">mergeSort</span>(arr, l, m);</div>
<div class="vis-trace-line" data-line="4">    <span class="fn">mergeSort</span>(arr, m + 1, r);</div>
<div class="vis-trace-line" data-line="5">    <span class="fn">merge</span>(arr, l, m, r);</div>
<div class="vis-trace-line" data-line="6">  }</div>
<div class="vis-trace-line" data-line="7">}</div>`
  }
};

function initSortingVisualizer() {
  const tabs = document.querySelectorAll(".visualizer-tab-btn");
  const sizeSlider = document.getElementById("vis-size-slider");
  const speedSlider = document.getElementById("vis-speed-slider");
  const btnStart = document.getElementById("vis-btn-start");
  const btnStep = document.getElementById("vis-btn-step");
  const btnReset = document.getElementById("vis-btn-reset");
  
  // Set up Tabs
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      if (activeVisualizerState.isPlaying) stopVisualizerLoop();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      activeVisualizerState.algo = tab.getAttribute("data-algo");
      resetVisualizerState();
    });
  });
  
  // Set up Sliders
  sizeSlider.addEventListener("input", (e) => {
    activeVisualizerState.size = parseInt(e.target.value);
    if (!activeVisualizerState.isPlaying) {
      resetVisualizerState();
    }
  });
  
  speedSlider.addEventListener("input", (e) => {
    activeVisualizerState.speed = parseInt(e.target.value);
    if (activeVisualizerState.isPlaying) {
      // Restart loop with new speed configuration
      stopVisualizerLoop();
      startVisualizerLoop();
    }
  });
  
  // Button Handlers
  btnReset.addEventListener("click", () => {
    if (activeVisualizerState.isPlaying) stopVisualizerLoop();
    resetVisualizerState();
  });
  
  btnStart.addEventListener("click", () => {
    if (activeVisualizerState.isPlaying) {
      stopVisualizerLoop();
    } else {
      startVisualizerLoop();
    }
  });
  
  btnStep.addEventListener("click", () => {
    triggerVisualizerStep();
  });
  
  // Initial Draw
  resetVisualizerState();
}

function resetVisualizerState() {
  // Regenerate random array
  const canvas = document.getElementById("visualizer-canvas");
  canvas.innerHTML = "";
  
  activeVisualizerState.array = [];
  for (let i = 0; i < activeVisualizerState.size; i++) {
    // Generate heights ranging between 20px and 280px
    const val = Math.floor(Math.random() * 250) + 30;
    activeVisualizerState.array.push({ val: val, state: "normal" });
  }
  
  // Clear any existing generator
  activeVisualizerState.generator = null;
  document.getElementById("vis-btn-step").disabled = false;
  document.getElementById("vis-btn-start").textContent = "▶ Sort Array";
  
  // Inject PseudoCode & descriptions
  const info = ALGO_METRICS[activeVisualizerState.algo];
  document.getElementById("vis-trace-code-box").innerHTML = info.code;
  document.getElementById("vis-trace-description-text").textContent = info.desc;
  
  drawArrayBars();
}

function drawArrayBars() {
  const canvas = document.getElementById("visualizer-canvas");
  canvas.innerHTML = "";
  
  activeVisualizerState.array.forEach(item => {
    const bar = document.createElement("div");
    bar.className = `vis-array-bar ${item.state}`;
    bar.style.height = `${item.val}px`;
    canvas.appendChild(bar);
  });
}

function startVisualizerLoop() {
  activeVisualizerState.isPlaying = true;
  document.getElementById("vis-btn-start").textContent = "⏸ Pause";
  document.getElementById("vis-btn-step").disabled = true;
  
  // Create generator if it doesn't exist yet
  if (!activeVisualizerState.generator) {
    activeVisualizerState.generator = getSortingGenerator();
  }
  
  runVisualizerTimer();
}

function stopVisualizerLoop() {
  activeVisualizerState.isPlaying = false;
  document.getElementById("vis-btn-start").textContent = "▶ Resume Sort";
  document.getElementById("vis-btn-step").disabled = false;
  
  if (activeVisualizerState.playbackInterval) {
    clearTimeout(activeVisualizerState.playbackInterval);
  }
}

function runVisualizerTimer() {
  if (!activeVisualizerState.isPlaying) return;
  
  const step = triggerVisualizerStep();
  if (step.done) {
    // End sorting
    stopVisualizerLoop();
    document.getElementById("vis-btn-start").textContent = "▶ Sort Array";
    document.getElementById("vis-btn-step").disabled = false;
    activeVisualizerState.generator = null;
    
    // Mark all elements as sorted
    activeVisualizerState.array.forEach(item => item.state = "sorted");
    drawArrayBars();
    return;
  }
  
  activeVisualizerState.playbackInterval = setTimeout(() => {
    runVisualizerTimer();
  }, activeVisualizerState.speed);
}

function triggerVisualizerStep() {
  if (!activeVisualizerState.generator) {
    activeVisualizerState.generator = getSortingGenerator();
  }
  
  const result = activeVisualizerState.generator.next();
  if (!result.done && result.value) {
    const val = result.value;
    
    // Reset states before marking comparisons
    activeVisualizerState.array.forEach(item => {
      if (item.state !== "sorted") item.state = "normal";
    });
    
    // Apply state changes
    if (val.compares) {
      val.compares.forEach(idx => {
        if (activeVisualizerState.array[idx]) activeVisualizerState.array[idx].state = "compare";
      });
    }
    if (val.swaps) {
      val.swaps.forEach(idx => {
        if (activeVisualizerState.array[idx]) activeVisualizerState.array[idx].state = "swap";
      });
    }
    if (val.sortedIndices) {
      val.sortedIndices.forEach(idx => {
        if (activeVisualizerState.array[idx]) activeVisualizerState.array[idx].state = "sorted";
      });
    }
    
    // Highlight corresponding Pseudocode line
    highlightTraceLine(val.line);
    
    drawArrayBars();
  }
  return result;
}

function highlightTraceLine(lineNum) {
  document.querySelectorAll(".vis-trace-line").forEach(l => {
    l.classList.remove("active-line");
    if (l.getAttribute("data-line") == lineNum) {
      l.classList.add("active-line");
    }
  });
}

function getSortingGenerator() {
  const type = activeVisualizerState.algo;
  const arr = activeVisualizerState.array.map(item => item.val);
  
  if (type === "bubble") return bubbleSortGenerator(arr);
  if (type === "selection") return selectionSortGenerator(arr);
  if (type === "insertion") return insertionSortGenerator(arr);
  if (type === "quick") return quickSortGenerator(arr);
  if (type === "merge") return mergeSortGenerator(arr);
}

/* ─────────────────────────────────────────────────────────
   7. GENERATOR-BASED SORTING ALGORITHMS
   ───────────────────────────────────────────────────────── */

// 1. Bubble Sort Generator
function* bubbleSortGenerator(arr) {
  const n = arr.length;
  yield { line: 0, compares: [], swaps: [] };
  
  for (let i = 0; i < n - 1; i++) {
    yield { line: 1, compares: [], swaps: [] };
    for (let j = 0; j < n - i - 1; j++) {
      yield { line: 2, compares: [j, j + 1] };
      yield { line: 3, compares: [j, j + 1] };
      
      if (arr[j] > arr[j + 1]) {
        // Swap values in visualizer array representation
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        
        activeVisualizerState.array[j].val = arr[j];
        activeVisualizerState.array[j + 1].val = arr[j + 1];
        
        yield { line: 4, swaps: [j, j + 1] };
      }
    }
    // Element at n - i - 1 is now sorted
    activeVisualizerState.array[n - i - 1].state = "sorted";
  }
  // The first element is sorted automatically
  activeVisualizerState.array[0].state = "sorted";
}

// 2. Selection Sort Generator
function* selectionSortGenerator(arr) {
  const n = arr.length;
  yield { line: 0 };
  
  for (let i = 0; i < n - 1; i++) {
    yield { line: 1 };
    let minIdx = i;
    yield { line: 2, compares: [minIdx] };
    
    for (let j = i + 1; j < n; j++) {
      yield { line: 3, compares: [j, minIdx] };
      yield { line: 4, compares: [j, minIdx] };
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      
      activeVisualizerState.array[i].val = arr[i];
      activeVisualizerState.array[minIdx].val = arr[minIdx];
      
      yield { line: 6, swaps: [i, minIdx] };
    }
    
    activeVisualizerState.array[i].state = "sorted";
  }
  activeVisualizerState.array[n - 1].state = "sorted";
}

// 3. Insertion Sort Generator
function* insertionSortGenerator(arr) {
  const n = arr.length;
  yield { line: 0 };
  activeVisualizerState.array[0].state = "sorted";
  
  for (let i = 1; i < n; i++) {
    yield { line: 1 };
    let key = arr[i];
    let j = i - 1;
    yield { line: 2, compares: [i, j] };
    
    while (j >= 0 && arr[j] > key) {
      yield { line: 3, compares: [j] };
      arr[j + 1] = arr[j];
      activeVisualizerState.array[j + 1].val = arr[j + 1];
      yield { line: 4, swaps: [j, j + 1] };
      j--;
    }
    
    arr[j + 1] = key;
    activeVisualizerState.array[j + 1].val = key;
    yield { line: 7, swaps: [j + 1] };
    
    // All elements up to i are considered sorted relatively
    for (let k = 0; k <= i; k++) {
      activeVisualizerState.array[k].state = "sorted";
    }
  }
}

// 4. Quick Sort Generator
function* quickSortGenerator(arr) {
  yield { line: 0 };
  yield* quickSortHelper(arr, 0, arr.length - 1);
}

function* quickSortHelper(arr, low, high) {
  yield { line: 1 };
  if (low < high) {
    // Partition operation
    let pivot = arr[high];
    let i = low - 1;
    yield { line: 2, compares: [high] };
    
    for (let j = low; j < high; j++) {
      yield { line: 2, compares: [j, high] };
      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        
        activeVisualizerState.array[i].val = arr[i];
        activeVisualizerState.array[j].val = arr[j];
        yield { line: 2, swaps: [i, j] };
      }
    }
    
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    activeVisualizerState.array[i + 1].val = arr[i + 1];
    activeVisualizerState.array[high].val = arr[high];
    yield { line: 2, swaps: [i + 1, high] };
    
    let pivotIdx = i + 1;
    // Mark pivot element as sorted
    activeVisualizerState.array[pivotIdx].state = "sorted";
    
    yield* quickSortHelper(arr, low, pivotIdx - 1);
    yield* quickSortHelper(arr, pivotIdx + 1, high);
  } else if (low >= 0 && low < arr.length) {
    activeVisualizerState.array[low].state = "sorted";
  }
}

// 5. Merge Sort Generator
function* mergeSortGenerator(arr) {
  yield { line: 0 };
  yield* mergeSortHelper(arr, 0, arr.length - 1);
}

function* mergeSortHelper(arr, l, r) {
  yield { line: 1 };
  if (l < r) {
    let m = l + Math.floor((r - l) / 2);
    yield { line: 2 };
    yield* mergeSortHelper(arr, l, m);
    yield { line: 3 };
    yield* mergeSortHelper(arr, m + 1, r);
    yield { line: 4 };
    
    // Merge operation
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = [];
    let R = [];
    for (let x = 0; x < n1; x++) L.push(arr[l + x]);
    for (let y = 0; y < n2; y++) R.push(arr[m + 1 + y]);
    
    let idx = 0, jdx = 0, kdx = l;
    while (idx < n1 && jdx < n2) {
      yield { line: 5, compares: [l + idx, m + 1 + jdx] };
      if (L[idx] <= R[jdx]) {
        arr[kdx] = L[idx];
        idx++;
      } else {
        arr[kdx] = R[jdx];
        jdx++;
      }
      activeVisualizerState.array[kdx].val = arr[kdx];
      yield { line: 5, swaps: [kdx] };
      kdx++;
    }
    
    while (idx < n1) {
      arr[kdx] = L[idx];
      activeVisualizerState.array[kdx].val = arr[kdx];
      yield { line: 5, swaps: [kdx] };
      idx++;
      kdx++;
    }
    while (jdx < n2) {
      arr[kdx] = R[jdx];
      activeVisualizerState.array[kdx].val = arr[kdx];
      yield { line: 5, swaps: [kdx] };
      jdx++;
      kdx++;
    }
  }
}

/* ─────────────────────────────────────────────────────────
   8. UTILITY FUNCTIONS
   ───────────────────────────────────────────────────────── */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function initTopicMapHover() {
  const hoverConfig = [
    { selector: ".node-os", pathId: "path-os" },
    { selector: ".node-net", pathId: "path-net" },
    { selector: ".node-dbms", pathId: "path-dbms" },
    { selector: ".node-oop", pathId: "path-oop" },
    { selector: ".node-ds", pathId: "path-ds" },
    { selector: ".node-algo", pathId: "path-algo" }
  ];

  hoverConfig.forEach(item => {
    const nodeBtn = document.querySelector(item.selector);
    const connectionPath = document.getElementById(item.pathId);
    if (nodeBtn && connectionPath) {
      nodeBtn.addEventListener("mouseenter", () => {
        connectionPath.classList.add("hovered-path");
      });
      nodeBtn.addEventListener("mouseleave", () => {
        connectionPath.classList.remove("hovered-path");
      });
    }
  });
}
