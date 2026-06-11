/* ============================================
   TETRIS TALENT — Interactions
   Scroll system, nav, cursor, marquee, preloader
   ============================================ */

// --- SECTION CONFIG ---
const SECTIONS = [
  { id: 'hero',     number: '00', name: 'home' },
  { id: 'mission',  number: '01', name: 'mission & vision' },
  { id: 'services', number: '02', name: 'what we do' },
  { id: 'approach', number: '03', name: 'how we do it' },
  { id: 'results',  number: '04', name: 'results' },
  { id: 'edge',     number: '05', name: 'our edge' },
  { id: 'contact',  number: '06', name: 'contact' },
];

// --- STATE ---
let currentSectionIndex = 0;

// --- DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initScrollObserver();
  initSectionNav();
  initStationCards();
  initAnimations();
  initApproachAccordion();
  initAgentDashboard();
});

// --- PRELOADER (Tetris pieces fall one-by-one to form TT) ---
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  if (sessionStorage.getItem('tt_preloader_shown')) {
    preloader.style.display = 'none';
    return;
  }

  const canvas = document.getElementById('preloader-canvas');
  const ctx = canvas.getContext('2d');
  const textEl = document.getElementById('preloader-text');
  const dpr = window.devicePixelRatio || 1;

  const CELL = 26;
  const GAP = 2;
  const STRIDE = CELL + GAP;
  const T_COLS = 6;
  const T_ROWS = 8;
  const T_GAP_COLS = 2;
  const TOTAL_COLS = T_COLS * 2 + T_GAP_COLS;
  const TOTAL_ROWS = T_ROWS;

  const gridW = TOTAL_COLS * STRIDE - GAP;
  const gridH = TOTAL_ROWS * STRIDE - GAP;

  canvas.width = gridW * dpr;
  canvas.height = gridH * dpr;
  canvas.style.width = gridW + 'px';
  canvas.style.height = gridH + 'px';
  ctx.scale(dpr, dpr);

  const COLORS = {
    purple: '#7c3aed',
    cyan: '#22d3ee',
    white: 'rgba(255,255,255,0.9)',
  };

  function buildPieces(cx) {
    return [
      { cells: [[6,cx+2],[6,cx+3],[7,cx+2],[7,cx+3]], color: COLORS.cyan },
      { cells: [[4,cx+2],[4,cx+3],[5,cx+2],[5,cx+3]], color: COLORS.purple },
      { cells: [[2,cx+2],[2,cx+3],[3,cx+2],[3,cx+3]], color: COLORS.white },
      { cells: [[1,cx+2],[1,cx+3],[0,cx+4],[0,cx+5]], color: COLORS.purple },
      { cells: [[0,cx+0],[0,cx+1],[0,cx+2],[0,cx+3]], color: COLORS.cyan },
    ];
  }

  const leftPieces  = buildPieces(0);
  const rightPieces = buildPieces(T_COLS + T_GAP_COLS);
  const allPieces = [];
  for (let i = 0; i < leftPieces.length; i++) {
    allPieces.push(leftPieces[i]);
    allPieces.push(rightPieces[i]);
  }

  const DROP_SPEED = 18;
  const PIECE_DELAY = 180;

  const pieces = allPieces.map((p) => {
    const finalMaxRow = Math.max(...p.cells.map(c => c[0]));
    return {
      cells: p.cells,
      color: p.color,
      finalMaxRow,
      yOffset: 0,
      dropDistance: (finalMaxRow + 3) * STRIDE,
      landed: false,
    };
  });

  let currentPiece = 0;
  let pieceStartTime = 0;
  let animStart = null;
  const landedPieces = [];

  function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CELL, CELL);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(x, y, CELL, 2);
    ctx.fillRect(x, y, 2, CELL);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(x + CELL - 2, y, 2, CELL);
    ctx.fillRect(x, y + CELL - 2, CELL, 2);
  }

  function drawPiece(p, yOff) {
    for (const [r, c] of p.cells) {
      const x = c * STRIDE;
      const y = r * STRIDE + yOff;
      if (y + CELL > 0 && y < gridH) {
        drawCell(x, y, p.color);
      }
    }
  }

  function frame(ts) {
    if (!animStart) { animStart = ts; pieceStartTime = ts; }
    ctx.clearRect(0, 0, gridW, gridH);

    for (const lp of landedPieces) {
      drawPiece(lp, 0);
    }

    if (currentPiece < pieces.length) {
      const p = pieces[currentPiece];
      const elapsed = ts - pieceStartTime;
      const cellsTraveled = (elapsed / 1000) * DROP_SPEED;
      const yOff = -p.dropDistance + cellsTraveled * STRIDE;

      if (yOff >= 0) {
        landedPieces.push(p);
        currentPiece++;
        pieceStartTime = ts + 60;
      } else {
        drawPiece(p, yOff);
      }
      requestAnimationFrame(frame);
    } else {
      for (const lp of landedPieces) {
        drawPiece(lp, 0);
      }
      setTimeout(() => {
        if (textEl) textEl.classList.add('visible');
      }, 200);
      setTimeout(() => {
        preloader.classList.add('hidden');
        sessionStorage.setItem('tt_preloader_shown', 'true');
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
      }, 1000);
    }
  }

  requestAnimationFrame(frame);
}

// --- ACCORDION (shared, scoped to parent section) ---
function initAccordion(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.querySelectorAll('.phase-step-header').forEach(header => {
    header.addEventListener('click', () => {
      const step = header.parentElement;
      const isOpen = step.classList.contains('open');
      // Close all within this section only
      section.querySelectorAll('.phase-step').forEach(s => s.classList.remove('open'));
      if (!isOpen) step.classList.add('open');
    });
  });
}

function initApproachAccordion() {
  initAccordion('approach');
  initAccordion('results');
}

// --- CUSTOM CURSOR ---
function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  // Don't run the cursor animation on touch/mobile devices — it gets stuck
  const isTouchDevice = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
  if (isTouchDevice) {
    cursor.style.display = 'none';
    return;
  }

  // Hide default cursor only if custom cursor is visible
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Hover state for interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .station-card, .section-nav-item, .edge-item');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

// --- SCROLL OBSERVER (updates nav + badge) ---
function initScrollObserver() {
  const scrollContainer = document.querySelector('.scroll-container');
  if (!scrollContainer) return;

  const sectionEls = scrollContainer.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const id = entry.target.id;
          const idx = SECTIONS.findIndex(s => s.id === id);
          if (idx !== -1 && idx !== currentSectionIndex) {
            currentSectionIndex = idx;
            updateNav(idx);
            updateBadge(idx);
            triggerSectionAnimations(entry.target);
          }
        }
      });
    },
    {
      root: scrollContainer,
      threshold: 0.5,
    }
  );

  sectionEls.forEach(section => observer.observe(section));
}

// --- SECTION NAV ---
function initSectionNav() {
  const navItems = document.querySelectorAll('.section-nav-item');
  navItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Set initial state
  updateNav(0);
  updateBadge(0);
}

function updateNav(activeIndex) {
  const nav = document.querySelector('.section-nav');
  const navItems = document.querySelectorAll('.section-nav-item');

  // Dim nav on hero (index 0), full opacity on section 01+
  if (nav) nav.classList.toggle('hero-active', activeIndex === 0);

  navItems.forEach((item, i) => {
    // Nav items correspond to sections 1-8 (skipping hero at index 0)
    const sectionIndex = i + 1;
    item.classList.toggle('active', sectionIndex === activeIndex);
  });
}

function updateBadge(index) {
  const badgeNumber = document.querySelector('.section-badge-number');
  const badgeName = document.querySelector('.section-badge-name');
  if (!badgeNumber || !badgeName) return;

  const section = SECTIONS[index];
  if (section) {
    badgeNumber.textContent = section.number;
    badgeName.textContent = section.name;
  }
}

// --- STATION CARDS (Service Tab Switching) ---
function initStationCards() {
  const cards = document.querySelectorAll('.station-card');
  const details = document.querySelectorAll('.station-detail');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const target = card.dataset.station;

      // Update active card
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // Show corresponding detail
      details.forEach(d => {
        d.style.display = d.dataset.station === target ? 'block' : 'none';
      });
    });
  });
}

// --- AGENT DASHBOARD ---
function initAgentDashboard() {
  const container = document.getElementById('agent-dashboard');
  if (!container) return;

  const DASH_CATS = {
    sourcing:   { label: 'Sourcing & Pipeline',  color: '#7c3aed' },
    ats:        { label: 'ATS / CRM',            color: '#22d3ee' },
    scheduling: { label: 'Scheduling',           color: '#3b82f6' },
    candidate:  { label: 'Candidate Experience', color: '#a78bfa' },
    reporting:  { label: 'Reporting & Insights', color: '#34d399' },
    system:     { label: 'System Health',        color: '#f472b6' },
  };

  const DASH_TOOLTIPS = {
    1:  'Syncs candidate stages, requisition status, and activity logs from Greenhouse every 30 minutes.',
    2:  'Monitors active JuiceBox searches for new profile matches and flags high-signal candidates automatically.',
    3:  'Scans client email threads for status updates and auto-logs decisions directly into the ATS.',
    4:  'Health check on Breezy / Lever CRM: stale records flagged, missing fields surfaced.',
    5:  'Tracks every candidate\'s stage across all open roles. Alerts on anything stuck for 48+ hours.',
    6:  'Enriches ~350 sourced profiles overnight — company history, role seniority, and geo signals from multiple sources.',
    7:  'Generates a tailored interview prep PDF for every candidate interviewing that day, sent 24 hours before their call.',
    8:  'Delivers a Slack digest of new candidate matches, pipeline movements, and pending actions for the day.',
    9:  'Checks for missing data fields, duplicate records, and sync errors across all connected platforms.',
    10: 'Re-scores the full candidate pipeline against each role\'s scorecard and re-ranks the shortlist by fit.',
    11: 'Tracks pending hiring manager scorecards and sends escalating Slack nudges until every interview is logged.',
    12: 'Scans for candidates with no activity in 5+ days and flags for follow-up or archival.',
    13: 'Live snapshot of every active role: candidates in process, time-in-stage, and projected close date.',
    14: 'Checks the Calendly queue for unconfirmed interviews and sends reminders to candidates and interviewers.',
    15: 'Monitors all offers extended — pending signatures, counter flags, and acceptance timelines tracked automatically.',
    16: 'Surfaces new roles opened, headcount approvals, or req changes made in the ATS overnight.',
    17: 'Aggregates all inbound client messages into a prioritized digest so nothing slips between calls.',
    18: 'Calculates ROI by source: JuiceBox, LinkedIn, referral, inbound — ranked by conversion rate this month.',
    19: 'Syncs data bidirectionally between Lever and Greenhouse where clients run parallel systems.',
    20: 'Pulls live comp benchmarks and talent supply/demand signals for every active role.',
    21: 'Full pipeline breakdown every Monday: roles by stage, velocity, and projected time-to-fill.',
    22: 'Re-scores and re-engages candidates who were strong but passed — timing and market conditions change.',
    23: 'Bi-weekly recalibration of the full candidate pool against updated role requirements and comp ranges.',
    24: 'Which sources delivered the most hires, fastest time-to-fill, and highest offer acceptance this week.',
    25: 'Weekly talent market brief: hiring velocity by sector, compensation movement, competitor headcount signals.',
  };

  const DASH_SECTIONS = [
    {
      label: 'CONTINUOUS · EVERY 30 MIN',
      rows: [{ time: 'Continuous', jobs: [
        { id: 1,  label: 'Greenhouse ATS Sync',         cat: 'ats' },
        { id: 2,  label: 'JuiceBox Pipeline Monitor',   cat: 'sourcing' },
        { id: 3,  label: 'Email Inbox Scanner',         cat: 'system' },
        { id: 4,  label: 'Breezy / Lever Health Check', cat: 'ats' },
        { id: 5,  label: 'Candidate Stage Tracker',     cat: 'sourcing' },
      ]}],
    },
    {
      label: 'MORNING BURST · 5AM – 11AM',
      rows: [
        { time: '5:30 AM', jobs: [
          { id: 6, label: 'Candidate Data Enrichment (~350 profiles)', cat: 'sourcing' },
        ]},
        { time: '7:00 AM', jobs: [
          { id: 7,  label: 'Interview Prep Pack Generator', cat: 'candidate' },
          { id: 8,  label: 'Daily Sourcing Digest → Slack', cat: 'sourcing' },
          { id: 9,  label: 'Data Quality Monitor',          cat: 'system' },
        ]},
        { time: '7:30 AM', jobs: [
          { id: 10, label: 'Candidate Heat Scoring',  cat: 'sourcing' },
          { id: 11, label: 'Feedback Loop Monitor',   cat: 'candidate' },
          { id: 12, label: 'Stale Candidate Scan',    cat: 'ats' },
        ]},
        { time: '8:00 AM', jobs: [
          { id: 13, label: 'Pipeline Tracker',        cat: 'reporting' },
          { id: 14, label: 'Calendly Queue Check',    cat: 'scheduling' },
          { id: 15, label: 'Offer Stage Monitor',     cat: 'ats' },
        ]},
        { time: '9–11 AM', jobs: [
          { id: 16, label: 'Active Role Monitor',     cat: 'ats' },
          { id: 17, label: 'Client Update Digest',    cat: 'reporting' },
          { id: 18, label: 'Source ROI Dashboard',    cat: 'reporting' },
          { id: 19, label: 'Lever → Greenhouse Sync', cat: 'ats' },
          { id: 20, label: 'Market Rate Intelligence', cat: 'sourcing' },
        ]},
      ],
    },
    {
      label: 'WEEKLY INTELLIGENCE',
      rows: [{ time: 'Weekly', jobs: [
        { id: 21, label: 'Weekly Pipeline Breakdown',           cat: 'reporting' },
        { id: 22, label: 'Candidate Reengagement Scoring',      cat: 'sourcing' },
        { id: 23, label: 'Talent Pool Calibration (bi-weekly)', cat: 'sourcing' },
        { id: 24, label: 'Source Performance Report',           cat: 'reporting' },
        { id: 25, label: 'Market Intelligence Digest',          cat: 'sourcing' },
      ]}],
    },
  ];

  const ALL_DASH_JOBS = DASH_SECTIONS.flatMap(s => s.rows.flatMap(r => r.jobs));
  const FEED_VERBS = ['completed', 'synced', 'triggered', 'processed', 'dispatched'];
  let jobCount = 312;

  // ── Build HTML ──────────────────────────────────────────────────────────
  function buildScheduleHTML() {
    return DASH_SECTIONS.map((sec, si) => `
      <div class="dash-group">
        <div class="dash-group-label">${sec.label}</div>
        ${sec.rows.map(row => `
          <div class="dash-row">
            <span class="dash-time">${row.time}</span>
            <div class="dash-pills">
              ${row.jobs.map(job => {
                const cat = DASH_CATS[job.cat];
                return `<div class="dash-pill" data-job-id="${job.id}" style="--pill-color:${cat.color}; border-color:${cat.color}28; background:${cat.color}0d;">
                  <span class="dash-pill-dot" style="background:${cat.color};"></span>
                  ${job.label}
                </div>`;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  function buildLegendHTML() {
    return Object.entries(DASH_CATS).map(([, cat]) => `
      <div class="dash-legend-item">
        <span class="dash-legend-dot" style="background:${cat.color};"></span>
        ${cat.label}
      </div>
    `).join('');
  }

  container.innerHTML = `
    <div class="dash-inner">
      <div class="dash-eyebrow">TETRIS TALENT · AUTOMATION LAYER</div>
      <div class="dash-title-row">
        <div class="dash-title">
          <h3>Your Company <span>While You Sleep</span></h3>
          <p>A talent process running 24/7 to identify the best talent for your role.</p>
        </div>
        <div class="dash-stats">
          <div class="dash-stat"><span class="dash-stat-value">12</span><span class="dash-stat-label">ACTIVE ROLES</span></div>
          <div class="dash-stat"><span class="dash-stat-value">24/7</span><span class="dash-stat-label">ALWAYS ON</span></div>
          <div class="dash-stat"><span class="dash-stat-value" id="dash-job-count">${jobCount}</span><span class="dash-stat-label">RUNS TODAY</span></div>
          <div class="dash-stat"><span class="dash-stat-value">30m</span><span class="dash-stat-label">HEARTBEAT</span></div>
        </div>
      </div>
    </div>
    <div class="dash-divider"></div>
    <div class="dash-body">
      <div class="dash-schedule">${buildScheduleHTML()}</div>
      <div class="dash-feed">
        <div class="dash-feed-label">LIVE ACTIVITY</div>
        <div id="dash-feed-items"><div class="dash-feed-item dim">initializing...</div></div>
      </div>
    </div>
    <div class="dash-footer">
      <div class="dash-legend">${buildLegendHTML()}</div>
      <div class="dash-live">
        <div class="dash-live-indicator">
          <span class="dash-live-dot"></span>
          LIVE NOW
        </div>
        <span class="dash-live-url">TETRIS TALENT · TETRISTALENT.CO</span>
      </div>
    </div>
  `;

  // ── Tooltip ─────────────────────────────────────────────────────────────
  const tooltip = document.createElement('div');
  tooltip.className = 'dash-tooltip';
  document.body.appendChild(tooltip);

  container.querySelectorAll('.dash-pill').forEach(pill => {
    const id = parseInt(pill.dataset.jobId);
    pill.addEventListener('mouseenter', e => {
      if (!DASH_TOOLTIPS[id]) return;
      tooltip.textContent = DASH_TOOLTIPS[id];
      tooltip.style.display = 'block';
      const r = pill.getBoundingClientRect();
      tooltip.style.top  = Math.max(8, r.top - tooltip.offsetHeight - 8) + 'px';
      tooltip.style.left = Math.min(r.left, window.innerWidth - 278) + 'px';
    });
    pill.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
  });

  // ── Animation ───────────────────────────────────────────────────────────
  const jobCountEl = document.getElementById('dash-job-count');
  const feedEl     = document.getElementById('dash-feed-items');

  setInterval(() => {
    const count = Math.random() < 0.35 ? 2 : 1;
    const feedItems = [];

    for (let i = 0; i < count; i++) {
      const job  = ALL_DASH_JOBS[Math.floor(Math.random() * ALL_DASH_JOBS.length)];
      const cat  = DASH_CATS[job.cat];
      const verb = FEED_VERBS[Math.floor(Math.random() * FEED_VERBS.length)];

      // Light up pill
      const pill = container.querySelector(`.dash-pill[data-job-id="${job.id}"]`);
      if (pill) {
        pill.style.background    = cat.color + '22';
        pill.style.borderColor   = cat.color + '66';
        pill.style.color         = '#fff';
        pill.style.boxShadow     = `0 0 12px ${cat.color}44`;
        pill.querySelector('.dash-pill-dot').style.boxShadow = `0 0 6px ${cat.color}`;
        setTimeout(() => {
          pill.style.background  = cat.color + '0d';
          pill.style.borderColor = cat.color + '28';
          pill.style.color       = '';
          pill.style.boxShadow   = '';
          pill.querySelector('.dash-pill-dot').style.boxShadow = '';
        }, 750);
      }

      feedItems.push({ text: `✓ ${job.label} ${verb}`, color: cat.color });
    }

    // Update counter
    jobCount += count;
    if (jobCountEl) jobCountEl.textContent = jobCount.toLocaleString();

    // Update feed
    if (feedEl) {
      feedItems.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'dash-feed-item';
        div.textContent = item.text;
        div.style.borderLeftColor = item.color + 'bb';
        feedEl.insertBefore(div, feedEl.firstChild);
      });
      // Keep max 7 items, dim older ones
      const items = feedEl.querySelectorAll('.dash-feed-item');
      items.forEach((el, i) => {
        el.classList.toggle('dim', i > 0);
        if (i >= 7) el.remove();
      });
    }
  }, 980);
}

// --- SECTION ENTRY ANIMATIONS ---
function initAnimations() {
  // Initial: make first section visible
  const hero = document.getElementById('hero');
  if (hero) {
    triggerSectionAnimations(hero);
  }
}

function triggerSectionAnimations(section) {
  const animatables = section.querySelectorAll('.animate-in');
  animatables.forEach((el, i) => {
    // Stagger the animations
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 80);
  });
}
