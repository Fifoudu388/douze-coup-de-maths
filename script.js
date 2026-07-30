/* ============================================================
   LES 12 COUPS DE MATHS — Script complet du jeu
   ============================================================ */

// =============================================================
// 1. BANQUES DE QUESTIONS
// =============================================================
const questionsCoupEnvoi = [
  { question: "Combien font 7 × 8 ?", choix: ["54", "56"], bonneReponse: "56" },
  { question: "Quel est le résultat de 15 + 27 ?", choix: ["42", "43"], bonneReponse: "42" },
  { question: "Combien font 144 ÷ 12 ?", choix: ["12", "14"], bonneReponse: "12" },
  { question: "Quel est le carré de 9 ?", choix: ["81", "72"], bonneReponse: "81" },
  { question: "Combien font 25 × 4 ?", choix: ["90", "100"], bonneReponse: "100" },
  { question: "Quel est le résultat de 56 + 37 ?", choix: ["93", "83"], bonneReponse: "93" },
  { question: "Combien font 121 − 88 ?", choix: ["33", "43"], bonneReponse: "33" },
  { question: "Quel est le résultat de 6 × 12 ?", choix: ["72", "62"], bonneReponse: "72" },
  { question: "Combien font 200 − 45 ?", choix: ["155", "165"], bonneReponse: "155" },
  { question: "Quel est le résultat de 7 × 9 ?", choix: ["63", "56"], bonneReponse: "63" },
  { question: "Combien font 33 × 3 ?", choix: ["99", "96"], bonneReponse: "99" },
  { question: "Quel est le résultat de 150 ÷ 5 ?", choix: ["25", "30"], bonneReponse: "30" },
  { question: "Combien font 48 + 48 ?", choix: ["96", "86"], bonneReponse: "96" },
  { question: "Quel est le résultat de 13 × 7 ?", choix: ["91", "81"], bonneReponse: "91" },
  { question: "Combien font 64 ÷ 8 ?", choix: ["6", "8"], bonneReponse: "8" }
];

const questionsCoupParCoup = [
  { question: "Parmi ces nombres, lesquels sont des nombres premiers ?", propositions: ["7", "11", "13", "17", "19", "23", "21"], intrus: "21" },
  { question: "Parmi ces nombres, lesquels sont divisibles par 5 ?", propositions: ["10", "15", "20", "25", "30", "35", "22"], intrus: "22" },
  { question: "Parmi ces nombres, lesquels sont des multiples de 3 ?", propositions: ["6", "9", "12", "15", "18", "21", "22"], intrus: "22" },
  { question: "Parmi ces résultats, lesquels sont des carrés parfaits ?", propositions: ["25", "36", "49", "64", "81", "100", "50"], intrus: "50" },
  { question: "Parmi ces nombres, lesquels sont pairs ?", propositions: ["2", "4", "6", "8", "10", "12", "15"], intrus: "15" },
  { question: "Parmi ces calculs, lesquels donnent 100 ?", propositions: ["50+50", "25×4", "200÷2", "10×10", "75+25", "5×20", "30+60"], intrus: "30+60" },
  { question: "Parmi ces nombres, lesquels sont des multiples de 7 ?", propositions: ["14", "21", "28", "35", "42", "49", "45"], intrus: "45" },
  { question: "Parmi ces calculs, lesquels donnent 36 ?", propositions: ["6×6", "30+6", "40−4", "72÷2", "18+18", "9×4", "12×4"], intrus: "12×4" },
  { question: "Parmi ces nombres, lesquels sont des diviseurs de 24 ?", propositions: ["1", "2", "3", "4", "6", "8", "10"], intrus: "10" },
  { question: "Parmi ces nombres, lesquels sont supérieurs à 50 ?", propositions: ["51", "63", "72", "84", "95", "100", "49"], intrus: "49" },
  { question: "Parmi ces résultats, lesquels sont des multiples de 9 ?", propositions: ["9", "18", "27", "36", "45", "54", "48"], intrus: "48" },
  { question: "Parmi ces calculs, lesquels donnent 64 ?", propositions: ["8×8", "70−6", "32+32", "128÷2", "16×4", "56+8", "7×9"], intrus: "7×9" }
];

const questionsCoupFatal = [
  { question: "Combien font 12 × 12 ?", reponse: "144" },
  { question: "Combien font 15 × 8 ?", reponse: "120" },
  { question: "Combien font 99 + 99 ?", reponse: "198" },
  { question: "Combien font 250 − 63 ?", reponse: "187" },
  { question: "Combien font 7 × 11 ?", reponse: "77" },
  { question: "Combien font 36 × 2 ?", reponse: "72" },
  { question: "Combien font 1000 − 456 ?", reponse: "544" },
  { question: "Combien font 45 + 78 ?", reponse: "123" },
  { question: "Combien font 9 × 13 ?", reponse: "117" },
  { question: "Combien font 500 ÷ 4 ?", reponse: "125" },
  { question: "Combien font 17 × 6 ?", reponse: "102" },
  { question: "Combien font 81 ÷ 9 ?", reponse: "9" },
  { question: "Combien font 123 + 456 ?", reponse: "579" },
  { question: "Combien font 25 × 8 ?", reponse: "200" },
  { question: "Combien font 144 − 67 ?", reponse: "77" },
  { question: "Combien font 11 × 11 ?", reponse: "121" },
  { question: "Combien font 60 × 5 ?", reponse: "300" },
  { question: "Combien font 999 + 1 ?", reponse: "1000" },
  { question: "Combien font 16 × 16 ?", reponse: "256" },
  { question: "Combien font 75 + 89 ?", reponse: "164" }
];

// =============================================================
// 2. ÉTAT DU JEU
// =============================================================
const G = {
  players: [],
  currentScreen: 'home',
  currentRound: null,
  usedQuestions: { coupEnvoi: [], coupParCoup: [], coupFatal: [] },
  spectatorMode: false,
  manageTab: 'envoi',
  manageEditing: null,

  turnIndex: 0,
  turnLocked: false,

  envoi: {
    currentQ: null,
    questionCount: 0,
  },

  cpc: {
    currentQ: null,
    questionCount: 0,
    usedProps: [],
    intrusFound: false,
  },

  fatal: {
    activePlayer: 0,
    timers: [60, 60],
    running: false,
    interval: null,
    answered: false,
  },
};

// =============================================================
// 3. RÉFÉRENCES DOM
// =============================================================
const $ = id => document.getElementById(id);

const D = {
  screen:  { home: $('home-screen'), game: $('game-screen'), manage: $('manage-screen') },
  overlay: { transition: $('transition-overlay'), victory: $('victory-overlay') },

  home: {
    cnt:   $('player-count'),
    dec:   $('decrease-count'),
    inc:   $('increase-count'),
    names: $('player-names-container'),
    start: $('start-game-btn'),
    exp:   $('export-btn'),
    imp:   $('import-btn'),
    impFile: $('import-file'),
    manageBtn: $('manage-btn'),
  },

  hdr: {
    title:  $('round-title'),
    remain: $('players-remaining'),
    cards:  $('players-cards'),
    turn:   $('turn-banner'),
    turnP:  $('turn-player'),
    turnL:  $('turn-label'),
  },

  e: {
    view:    $('coup-envoi-view'),
    q:       $('envoi-question'),
    cnt:     $('envoi-counter'),
    a:       document.querySelector('#envoi-choices .choice-a'),
    b:       document.querySelector('#envoi-choices .choice-b'),
    hint:    $('envoi-hint'),
  },

  cpc: {
    view:    $('coup-par-coup-view'),
    q:       $('cpc-question'),
    cnt:     $('cpc-counter'),
    props:   $('cpc-propositions'),
    info:    $('cpc-info'),
    hint:    $('cpc-hint'),
  },

  f: {
    view:   $('coup-fatal-view'),
    p0: { card: $('fatal-player-0'), name: $('fp0-name'), timer: $('fp0-timer'), ind: $('fp0-active') },
    p1: { card: $('fatal-player-1'), name: $('fp1-name'), timer: $('fp1-timer'), ind: $('fp1-active') },
    status: $('fatal-status'),
  },

  tr: {
    overlay: $('transition-overlay'),
    title:   $('transition-title'),
    text:    $('transition-text'),
    btn:     $('transition-btn'),
  },

  vic: {
    overlay: $('victory-overlay'),
    name:    $('winner-name'),
    home:    $('victory-home-btn'),
  },

  result: {
    overlay: $('result-overlay'),
    box:     $('result-box'),
    icon:    $('result-icon'),
    text:    $('result-text'),
    sub:     $('result-sub'),
  },

  reset:   $('reset-btn'),
  homeBtn: $('home-btn'),
  notif:   $('notification'),
  fullscreenBtn: $('fullscreen-btn'),
  spectatorToggle: $('spectator-toggle'),
  confettiCanvas: $('confetti-canvas'),

  manage: {
    back: $('manage-back-btn'),
    exp: $('manage-export-btn'),
    list: $('manage-list'),
    form: $('manage-form'),
    formTitle: $('manage-form-title'),
    formFields: $('manage-form-fields'),
    addBtn: $('manage-add-btn'),
    cancelBtn: $('manage-cancel-btn'),
    count: { envoi: $('mcount-envoi'), cpc: $('mcount-cpc'), fatal: $('mcount-fatal') },
  },
};

// =============================================================
// 4. OUTILS
// =============================================================
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function notif(msg, type = 'info') {
  const n = D.notif;
  n.textContent = msg;
  n.className = 'notification ' + type + ' show';
  clearTimeout(n._t);
  n._t = setTimeout(() => n.classList.remove('show'), 3000);
}
function err(msg) { notif(msg, 'error'); }
function ok(msg) { notif(msg, 'success'); }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  D.screen[id].classList.add('active');
  G.currentScreen = id;
}
function showOver(id) { D.overlay[id].classList.add('active'); }
function hideOver(id) { D.overlay[id].classList.remove('active'); }

function getAlive() { return G.players.filter(p => p.status !== 'red'); }

function pickQ(bank, key) {
  const used = G.usedQuestions[key];
  const avail = bank.map((_, i) => i).filter(i => !used.includes(i));
  if (!avail.length) return null;
  const idx = avail[Math.random() * avail.length | 0];
  return { index: idx, data: bank[idx] };
}
function markUsed(key, idx) { G.usedQuestions[key].push(idx); }

// =============================================================
// 4b. PLEIN ÉCRAN
// =============================================================
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

document.addEventListener('fullscreenchange', () => {
  if (D.fullscreenBtn) {
    D.fullscreenBtn.textContent = document.fullscreenElement ? '⛶' : '⛶';
    D.fullscreenBtn.classList.toggle('active', !!document.fullscreenElement);
  }
});

// =============================================================
// 4c. MODE SPECTATEUR
// =============================================================
function toggleSpectator() {
  G.spectatorMode = !G.spectatorMode;
  document.getElementById('app').classList.toggle('spectator-mode', G.spectatorMode);
  if (D.spectatorToggle) {
    D.spectatorToggle.textContent = G.spectatorMode ? '🎬' : '🎬';
    D.spectatorToggle.classList.toggle('active', G.spectatorMode);
    notif(G.spectatorMode ? 'Mode Public activé' : 'Mode Présentateur activé', 'info');
  }
}

// =============================================================
// 4d. CONFETTIS
// =============================================================
let confettiRunning = false;
let confettiAnimId = null;
let confettiParticles = [];

function startConfetti() {
  const canvas = D.confettiCanvas;
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  confettiRunning = true;
  confettiParticles = [];

  const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#42A5F5', '#FF9800', '#E040FB', '#00BCD4', '#FF4081'];

  for (let i = 0; i < 200; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.random() * colors.length | 0],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 2 + 1,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
    });
  }

  function animate() {
    if (!confettiRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of confettiParticles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.rot += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.min(1, Math.max(0, 1 - (p.y / canvas.height) * 0.3));
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    confettiParticles = confettiParticles.filter(p => p.y < canvas.height + 30);

    if (confettiParticles.length < 250 && Math.random() < 0.4) {
      confettiParticles.push({
        x: Math.random() * canvas.width,
        y: -20,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.random() * colors.length | 0],
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 2 + 1,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
      });
    }

    confettiAnimId = requestAnimationFrame(animate);
  }

  animate();
}

function stopConfetti() {
  confettiRunning = false;
  if (confettiAnimId) {
    cancelAnimationFrame(confettiAnimId);
    confettiAnimId = null;
  }
  const canvas = D.confettiCanvas;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

window.addEventListener('resize', () => {
  const canvas = D.confettiCanvas;
  if (canvas && confettiRunning) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

// =============================================================
// 4e. EXPORT / IMPORT QUESTIONS
// =============================================================
function exportQuestions() {
  const data = {
    questionsCoupEnvoi,
    questionsCoupParCoup,
    questionsCoupFatal,
    exportedAt: new Date().toISOString(),
    total: questionsCoupEnvoi.length + questionsCoupParCoup.length + questionsCoupFatal.length,
  };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'questions-12-coups-de-maths.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  ok('Questions exportées !');
}

function importQuestions(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      if (!data.questionsCoupEnvoi || !data.questionsCoupParCoup || !data.questionsCoupFatal) {
        err('Format de fichier invalide. Structure attendue : questionsCoupEnvoi, questionsCoupParCoup, questionsCoupFatal');
        return;
      }

      if (!Array.isArray(data.questionsCoupEnvoi) || !Array.isArray(data.questionsCoupParCoup) || !Array.isArray(data.questionsCoupFatal)) {
        err('Les questions doivent être des tableaux.');
        return;
      }

      // Validation basique
      for (const q of data.questionsCoupEnvoi) {
        if (!q.question || !q.choix || !q.bonneReponse) {
          err('Question Coup d\'Envoi invalide : ' + JSON.stringify(q));
          return;
        }
      }
      for (const q of data.questionsCoupParCoup) {
        if (!q.question || !q.propositions || !q.intrus) {
          err('Question Coup par Coup invalide : ' + JSON.stringify(q));
          return;
        }
      }
      for (const q of data.questionsCoupFatal) {
        if (!q.question || !q.reponse) {
          err('Question Coup Fatal invalide : ' + JSON.stringify(q));
          return;
        }
      }

      // Remplacer les banques
      questionsCoupEnvoi.length = 0;
      questionsCoupParCoup.length = 0;
      questionsCoupFatal.length = 0;
      questionsCoupEnvoi.push(...data.questionsCoupEnvoi);
      questionsCoupParCoup.push(...data.questionsCoupParCoup);
      questionsCoupFatal.push(...data.questionsCoupFatal);

      ok(data.total + ' questions importées !');
    } catch (err_) {
      err('Erreur de lecture du fichier : ' + err_.message);
    }
  };
  reader.readAsText(file);
}

// =============================================================
// 5. AFFICHAGE JOUEURS
// =============================================================
let turnAnnounceTimeout = null;
const playerStateAnnounceTimeouts = new Map();

function renderCards() {
  D.hdr.cards.innerHTML = '';
  G.players.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'player-card status-' + p.status;
    div.dataset.playerIndex = i;
    const stateAnnouncement = playerStateAnnounceTimeouts.get(i);
    if (stateAnnouncement) {
      div.classList.add('state-announcing');
      if (stateAnnouncement.shrinking) {
        div.classList.add('state-shrinking');
      }
    }
    if (i === G.activePlayerIndex && p.status !== 'red') {
      div.classList.add('active-player');
    }
    const dot = document.createElement('span');
    dot.className = 'player-status-dot';
    const name = document.createElement('span');
    name.className = 'player-name';
    name.textContent = p.name;
    const info = document.createElement('span');
    info.className = 'player-errors';
    if (p.status === 'red') info.textContent = '✖ Éliminé';
    else if (p.status === 'orange') info.textContent = '⚠ 1 faute';
    else info.textContent = '✓ 0 faute';
    div.append(dot, name, info);
    D.hdr.cards.appendChild(div);
  });
}

function announcePlayerState(player, duration = 10000) {
  const index = G.players.indexOf(player);
  if (index === -1) return;

  const existing = playerStateAnnounceTimeouts.get(index);
  if (existing) {
    clearTimeout(existing.shrinkTimeout);
    clearTimeout(existing.removeTimeout);
  }

  const stateAnnouncement = {
    shrinking: false,
    shrinkTimeout: null,
    removeTimeout: null,
  };

  stateAnnouncement.shrinkTimeout = setTimeout(() => {
    stateAnnouncement.shrinking = true;
    const card = D.hdr.cards.querySelector('[data-player-index="' + index + '"]');
    if (card) card.classList.add('state-shrinking');
    else renderCards();
    stateAnnouncement.removeTimeout = setTimeout(() => {
      playerStateAnnounceTimeouts.delete(index);
      renderCards();
    }, 700);
  }, duration);

  playerStateAnnounceTimeouts.set(index, stateAnnouncement);
  renderCards();
}

function clearPlayerStateAnnouncements() {
  playerStateAnnounceTimeouts.forEach(stateAnnouncement => {
    clearTimeout(stateAnnouncement.shrinkTimeout);
    clearTimeout(stateAnnouncement.removeTimeout);
  });
  playerStateAnnounceTimeouts.clear();
}

function updRemain() {
  D.hdr.remain.textContent = 'Joueurs : ' + getAlive().length + '/' + G.players.length;
}

function setTitle(t) { D.hdr.title.textContent = t; }

function showTurn(name) {
  clearTimeout(turnAnnounceTimeout);
  D.hdr.turnP.textContent = name;
  D.hdr.turn.classList.remove('active', 'turn-announcing');
  void D.hdr.turn.offsetWidth;
  D.hdr.turn.classList.add('active', 'turn-announcing');
  turnAnnounceTimeout = setTimeout(() => {
    D.hdr.turn.classList.remove('turn-announcing');
  }, 2000);
}

function hideTurn() {
  clearTimeout(turnAnnounceTimeout);
  D.hdr.turn.classList.remove('active');
  D.hdr.turn.classList.remove('turn-announcing');
}

// =============================================================
// 6. RÉSULTAT POP-UP
// =============================================================
let resultTimeout = null;

function showResult(icon, text, sub, cssClass, duration = 2000) {
  if (G.spectatorMode) return;
  clearTimeout(resultTimeout);
  const r = D.result;
  r.icon.textContent = icon;
  r.text.textContent = text;
  r.sub.textContent = sub || '';
  r.box.className = 'result-box ' + cssClass;
  r.overlay.classList.add('active');
  resultTimeout = setTimeout(() => r.overlay.classList.remove('active'), duration);
}

function hideResult() {
  clearTimeout(resultTimeout);
  D.result.overlay.classList.remove('active');
}

// =============================================================
// 7. COUP D'ENVOI — TOUR AUTOMATIQUE
// =============================================================
function startEnvoi() {
  G.currentRound = 'coupEnvoi';
  clearPlayerStateAnnouncements();
  G.turnIndex = 0;
  G.turnLocked = false;
  G.envoi.questionCount = 0;

  D.e.view.classList.add('active');
  D.cpc.view.classList.remove('active');
  D.f.view.classList.remove('active');

  if (D.e.hint) D.e.hint.style.display = '';
  if (D.cpc.hint) D.cpc.hint.style.display = 'none';

  setTitle('⚔ Coup d\'Envoi');
  renderCards();
  updRemain();
  envoiNextTurn();
}

function envoiNextTurn() {
  const alive = getAlive();
  if (alive.length <= 3) { finishEnvoi(); return; }

  if (G.turnIndex >= alive.length) G.turnIndex = 0;

  const player = alive[G.turnIndex];
  G.activePlayerIndex = G.players.indexOf(player);
  renderCards();
  showTurn(player.name);

  const q = pickQ(questionsCoupEnvoi, 'coupEnvoi');
  if (!q) { err('Plus de questions disponibles.'); return; }

  G.envoi.currentQ = q;
  G.envoi.questionCount++;
  G.turnLocked = false;

  D.e.q.textContent = q.data.question;
  D.e.cnt.textContent = 'Question ' + G.envoi.questionCount + '/' + questionsCoupEnvoi.length;

  const mix = shuffle([0, 1]);
  D.e.a.textContent = (mix[0] === 0 ? 'A' : 'B') + ' : ' + (mix[0] === 0 ? q.data.choix[0] : q.data.choix[1]);
  D.e.b.textContent = (mix[1] === 0 ? 'A' : 'B') + ' : ' + (mix[1] === 0 ? q.data.choix[0] : q.data.choix[1]);

  D.e.a.className = 'choice-btn choice-a';
  D.e.b.className = 'choice-btn choice-b';
  D.e.a.disabled = false;
  D.e.b.disabled = false;
}

D.e.a.addEventListener('click', () => envoiEvaluate(D.e.a));
D.e.b.addEventListener('click', () => envoiEvaluate(D.e.b));

function envoiEvaluate(btn) {
  if (G.turnLocked || !G.envoi.currentQ) return;

  D.e.a.disabled = true;
  D.e.b.disabled = true;
  G.turnLocked = true;

  const q = G.envoi.currentQ;
  const val = btn.textContent.replace(/^[AB] : /, '');
  const isCorrect = (val === q.data.bonneReponse);

  const player = getAlive()[G.turnIndex];
  const playerName = player.name;

  if (isCorrect) {
    btn.classList.add('selected-correct');
    const other = (btn === D.e.a) ? D.e.b : D.e.a;
    const otherVal = other.textContent.replace(/^[AB] : /, '');
    if (otherVal === q.data.bonneReponse) other.classList.add('selected-correct');

    showResult('✅', 'BONNE RÉPONSE !', playerName, 'result-good', 1500);
    markUsed('coupEnvoi', q.index);

    setTimeout(() => {
      G.turnIndex++;
      envoiNextTurn();
    }, 1600);
  } else {
    btn.classList.add('selected-wrong');
    const other = (btn === D.e.a) ? D.e.b : D.e.a;
    const otherVal = other.textContent.replace(/^[AB] : /, '');
    if (otherVal === q.data.bonneReponse) other.classList.add('selected-correct');

    player.errors++;
    const wasGreen = player.status === 'green';
    if (player.errors >= 2) {
      player.status = 'red';
      markUsed('coupEnvoi', q.index);
      showResult('❌', 'MAUVAISE RÉPONSE !', playerName + ' est éliminé !', 'result-red', 2500);
    } else {
      player.status = 'orange';
      markUsed('coupEnvoi', q.index);
      showResult('⚠️', 'MAUVAISE RÉPONSE !', playerName + ' passe en orange', 'result-orange', 2200);
    }

    announcePlayerState(player);
    updRemain();

    setTimeout(() => {
      G.turnIndex++;
      envoiNextTurn();
    }, wasGreen ? 2500 : 2800);
  }
}

function finishEnvoi() {
  hideTurn();
  const qualif = getAlive().slice(0, 3);
  if (qualif.length < 3) { err('Pas assez de joueurs !'); return; }

  D.tr.title.textContent = '🏆 Coup d\'Envoi terminé !';
  D.tr.text.innerHTML = 'Les <strong>3 joueurs qualifiés</strong> passent au Coup par Coup :<br><br>' +
    qualif.map(p => '⭐ ' + p.name).join('<br>');
  D.tr.btn.textContent = 'Passer au Coup par Coup';
  D.tr.btn.onclick = () => { hideOver('transition'); startCPC(); };
  showOver('transition');
}

// =============================================================
// 8. COUP PAR COUP — TOUR AUTOMATIQUE
// =============================================================
function startCPC() {
  G.currentRound = 'coupParCoup';
  clearPlayerStateAnnouncements();
  G.turnIndex = 0;
  G.turnLocked = false;
  G.cpc.questionCount = 0;

  getAlive().forEach(p => { p.status = 'green'; p.errors = 0; });

  D.e.view.classList.remove('active');
  D.cpc.view.classList.add('active');
  D.f.view.classList.remove('active');

  if (D.e.hint) D.e.hint.style.display = 'none';
  if (D.cpc.hint) D.cpc.hint.style.display = '';

  setTitle('🎯 Coup par Coup');
  renderCards();
  updRemain();
  cpcNextTurn();
}

function cpcNextTurn() {
  const alive = getAlive();
  if (alive.length <= 2) { finishCPC(); return; }

  if (G.turnIndex >= alive.length) G.turnIndex = 0;

  const player = alive[G.turnIndex];
  G.activePlayerIndex = G.players.indexOf(player);
  renderCards();
  showTurn(player.name);

  const q = pickQ(questionsCoupParCoup, 'coupParCoup');
  if (!q) { err('Plus de questions disponibles.'); return; }

  G.cpc.currentQ = q;
  G.cpc.questionCount++;
  G.cpc.usedProps = [];
  G.cpc.intrusFound = false;
  G.turnLocked = false;

  D.cpc.q.textContent = q.data.question;
  D.cpc.cnt.textContent = 'Question ' + G.cpc.questionCount + '/' + questionsCoupParCoup.length;
  D.cpc.info.textContent = player.name + ' choisit une proposition. Attention à l\'intrus !';

  D.cpc.props.innerHTML = '';
  shuffle([...q.data.propositions]).forEach((v, i) => {
    const btn = document.createElement('button');
    btn.className = 'prop-btn';
    btn.textContent = (i + 1) + '. ' + v;
    btn.dataset.val = v;
    btn.dataset.key = i + 1;
    btn.addEventListener('click', () => cpcEvaluate(btn));
    D.cpc.props.appendChild(btn);
  });
}

function cpcEvaluate(btn) {
  if (G.turnLocked || G.cpc.intrusFound) return;

  const alive = getAlive();
  const player = alive[G.turnIndex];
  if (!player) return;

  const q = G.cpc.currentQ;
  if (!q) return;

  const val = btn.dataset.val;
  if (G.cpc.usedProps.includes(val)) return;

  G.cpc.usedProps.push(val);
  btn.disabled = true;

  if (val === q.data.intrus) {
    btn.classList.add('selected-intrus');
    G.cpc.intrusFound = true;
    G.turnLocked = true;

    D.cpc.props.querySelectorAll('.prop-btn:not(:disabled)').forEach(b => b.disabled = true);

    player.errors++;
    const wasGreen = player.status === 'green';
    if (player.errors >= 2) {
      player.status = 'red';
      showResult('❌', 'INTRUS !', player.name + ' est éliminé !', 'result-red', 2500);
    } else {
      player.status = 'orange';
      showResult('⚠️', 'INTRUS !', player.name + ' passe en orange', 'result-orange', 2200);
    }

    markUsed('coupParCoup', q.index);
    announcePlayerState(player);
    updRemain();

    setTimeout(() => {
      G.turnIndex++;
      cpcNextTurn();
    }, wasGreen ? 2500 : 2800);
  } else {
    btn.classList.add('selected-correct');
    ok('Proposition correcte !');

    const remaining = [...D.cpc.props.querySelectorAll('.prop-btn:not(:disabled)')];
    if (remaining.length === 1 && remaining[0].dataset.val === q.data.intrus) {
      D.cpc.info.textContent = 'Plus que l\'intrus ! Question terminée.';
      G.turnLocked = true;
      markUsed('coupParCoup', q.index);
      setTimeout(() => {
        G.turnIndex++;
        cpcNextTurn();
      }, 1200);
    } else {
      D.cpc.info.textContent = 'Proposition correcte ! Au suivant.';
      G.turnIndex = (G.turnIndex + 1) % alive.length;
      setTimeout(() => {
        const aliveNow = getAlive();
        if (aliveNow.length <= 2) { finishCPC(); return; }
        if (G.turnIndex >= aliveNow.length) G.turnIndex = 0;
        const next = aliveNow[G.turnIndex];
        G.activePlayerIndex = G.players.indexOf(next);
        renderCards();
        showTurn(next.name);
        D.cpc.info.textContent = next.name + ' choisit une proposition. Attention à l\'intrus !';
        G.turnLocked = false;
      }, 800);
    }
  }
}

function finishCPC() {
  hideTurn();
  const final = getAlive().slice(0, 2);
  if (final.length < 2) { err('Pas assez de joueurs !'); return; }

  D.tr.title.textContent = '🎯 Coup par Coup terminé !';
  D.tr.text.innerHTML = 'Les <strong>2 finalistes</strong> s\'affrontent dans le Coup Fatal :<br><br>' +
    '🔥 ' + final[0].name + '<br>🔥 ' + final[1].name;
  D.tr.btn.textContent = 'Passer au Coup Fatal';
  D.tr.btn.onclick = () => { hideOver('transition'); startFatal(); };
  showOver('transition');
}

// =============================================================
// 9. COUP FATAL — RACCOURCIS CLAVIER
// =============================================================
function startFatal() {
  G.currentRound = 'coupFatal';
  clearPlayerStateAnnouncements();
  G.activePlayerIndex = null;
  G.fatal.activePlayer = 0;
  G.fatal.timers = [60.00, 60.00];
  G.fatal.running = false;
  G.fatal.interval = null;
  G.fatal.answered = false;

  const final = getAlive().slice(0, 2);
  if (final.length < 2) { err('Il faut 2 finalistes !'); return; }
  final.forEach(p => { p.status = 'green'; p.errors = 0; });

  D.e.view.classList.remove('active');
  D.cpc.view.classList.remove('active');
  D.f.view.classList.add('active');

  D.f.p0.name.textContent = final[0].name;
  D.f.p1.name.textContent = final[1].name;
  D.f.p0.timer.textContent = '60.00';
  D.f.p1.timer.textContent = '60.00';
  D.f.p0.timer.classList.remove('danger');
  D.f.p1.timer.classList.remove('danger');

  setTitle('💀 Coup Fatal');
  renderCards();
  updRemain();
  hideTurn();

  D.f.status.textContent = 'Prêt ? Top avec la touche T';
  D.f.status.className = 'fatal-status';
  fatalRefreshUI();
}

function fatalRefreshUI() {
  const a = G.fatal.activePlayer;
  D.f.p0.card.classList.toggle('active', a === 0);
  D.f.p1.card.classList.toggle('active', a === 1);
  D.f.p0.ind.textContent = a === 0 ? '▶ En cours' : 'En attente';
  D.f.p1.ind.textContent = a === 1 ? '▶ En cours' : 'En attente';
  D.f.p0.ind.className = 'fatal-indicator' + (a === 0 ? ' active-indicator' : '');
  D.f.p1.ind.className = 'fatal-indicator' + (a === 1 ? ' active-indicator' : '');
  D.f.p0.timer.textContent = G.fatal.timers[0].toFixed(2);
  D.f.p1.timer.textContent = G.fatal.timers[1].toFixed(2);
  D.f.p0.timer.classList.toggle('danger', G.fatal.timers[0] <= 10.00);
  D.f.p1.timer.classList.toggle('danger', G.fatal.timers[1] <= 10.00);
}

function fatalStartTimer() {
  if (G.fatal.interval) clearInterval(G.fatal.interval);
  let last = performance.now();
  G.fatal.interval = setInterval(() => {
    if (!G.fatal.running) return;
    const now = performance.now();
    const dt = (now - last) / 1000;
    last = now;
    const ap = G.fatal.activePlayer;
    G.fatal.timers[ap] = Math.max(0, G.fatal.timers[ap] - dt);
    if (G.fatal.timers[ap] <= 0) {
      G.fatal.timers[ap] = 0;
      clearInterval(G.fatal.interval);
      G.fatal.interval = null;
      G.fatal.running = false;
      fatalRefreshUI();
      finishFatal(ap);
      return;
    }
    fatalRefreshUI();
  }, 10);
}

// =============================================================
// 10. RACCOURCIS CLAVIER (toutes phases)
// =============================================================
document.addEventListener('keydown', (evt) => {
  const key = evt.key;

  if (G.currentRound === 'coupEnvoi' && D.e.view.classList.contains('active')) {
    const k = key.toUpperCase();
    if (k === 'A' || k === '1') { evt.preventDefault(); D.e.a.click(); }
    else if (k === 'B' || k === '2') { evt.preventDefault(); D.e.b.click(); }
  }

  else if (G.currentRound === 'coupParCoup' && D.cpc.view.classList.contains('active')) {
    const num = parseInt(key);
    if (num >= 1 && num <= 7) {
      const btn = D.cpc.props.querySelector(`[data-key="${num}"]`);
      if (btn && !btn.disabled) { evt.preventDefault(); btn.click(); }
    }
  }

  else if (G.currentRound === 'coupFatal' && D.f.view.classList.contains('active')) {
    const k = key.toUpperCase();
    if (k === 'T') { evt.preventDefault(); fatalTop(); }
    else if (k === 'Y') fatalCorrect();
    else if (k === 'N') fatalWrong();
  }
});

function fatalTop() {
  if (G.fatal.running) {
    G.fatal.running = false;
    clearInterval(G.fatal.interval);
    G.fatal.interval = null;
    D.f.status.textContent = '⏸ Pause. T pour reprendre.';
    D.f.status.className = 'fatal-status info';
    return;
  }

  G.fatal.running = true;
  G.fatal.answered = false;

  const name = getAlive().slice(0, 2)[G.fatal.activePlayer]?.name || 'Joueur';
  D.f.status.textContent = '▶ Chrono de ' + name + ' lancé !';
  D.f.status.className = 'fatal-status';
  fatalStartTimer();
}

function fatalCorrect() {
  if (!G.fatal.running) return;
  G.fatal.answered = true;

  clearInterval(G.fatal.interval);
  G.fatal.interval = null;
  G.fatal.running = false;

  showResult('✅', 'BONNE RÉPONSE !', '', 'result-good', 1000);
  D.f.status.textContent = 'Joueur suivant. T pour lancer le chrono.';
  D.f.status.className = 'fatal-status';

  G.fatal.activePlayer = G.fatal.activePlayer === 0 ? 1 : 0;
  fatalRefreshUI();
}

function fatalWrong() {
  if (!G.fatal.running) return;
  G.fatal.answered = true;

  showResult('❌', 'MAUVAISE RÉPONSE !', '', 'result-bad', 1000);
  D.f.status.textContent = 'Chrono continue. Y si la réponse est finalement acceptée.';
  D.f.status.className = 'fatal-status error';
}

function fatalStop() {
  if (!G.fatal.running) return;
  G.fatal.running = false;
  clearInterval(G.fatal.interval);
  G.fatal.interval = null;

  D.f.status.textContent = '⏸ Chrono en pause. T → Reprendre';
  D.f.status.className = 'fatal-status';
}

function finishFatal(loserIdx) {
  clearInterval(G.fatal.interval);
  G.fatal.interval = null;
  G.fatal.running = false;

  const final = getAlive().slice(0, 2);
  if (final.length < 2) {
    const w = G.players.find(p => p.status !== 'red');
    if (w) showVictory(w);
    return;
  }

  const loser = final[loserIdx];
  const winner = final[loserIdx === 0 ? 1 : 0];

  if (loserIdx === 0) D.f.p0.card.classList.add('loser');
  else D.f.p1.card.classList.add('loser');

  D.f.status.textContent = '⏰ ' + loser.name + ' a épuisé son temps !';
  D.f.status.className = 'fatal-status error';
  setTimeout(() => showVictory(winner), 1500);
}

// =============================================================
// 11. VICTOIRE
// =============================================================
function showVictory(p) {
  D.vic.name.textContent = p.name;
  showOver('victory');
  D.f.view.classList.remove('active');
  startConfetti();
}

D.vic.home.addEventListener('click', () => { hideOver('victory'); goHome(); });

// =============================================================
// 12. ACCUEIL ET RÉINITIALISATION
// =============================================================
function goHome() {
  stopConfetti();
  if (G.fatal.interval) { clearInterval(G.fatal.interval); G.fatal.interval = null; }
  G.fatal.running = false;
  hideResult();
  hideTurn();
  hideOver('victory');
  hideOver('transition');
  clearPlayerStateAnnouncements();

  G.players = [];
  G.currentRound = null;
  G.usedQuestions = { coupEnvoi: [], coupParCoup: [], coupFatal: [] };
  G.turnIndex = 0;
  G.turnLocked = false;
  G.activePlayerIndex = null;
  G.spectatorMode = false;
  document.getElementById('app').classList.remove('spectator-mode');
  if (D.spectatorToggle) D.spectatorToggle.classList.remove('active');
  G.envoi = { currentQ: null, questionCount: 0 };
  G.cpc = { currentQ: null, questionCount: 0, usedProps: [], intrusFound: false };
  G.fatal = { activePlayer: 0, timers: [60, 60], running: false, interval: null, answered: false };

  showScreen('home');
  initHome();
}

D.reset.addEventListener('click', () => { if (confirm('Réinitialiser la partie ?')) goHome(); });
D.homeBtn.addEventListener('click', goHome);

// --- Page d'accueil ---
let playerCount = 4;

function initHome() { updCount(); genInputs(); }

function updCount() { D.home.cnt.textContent = playerCount; }

function genInputs() {
  D.home.names.innerHTML = '';
  for (let i = 0; i < playerCount; i++) {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'player-name-input';
    inp.placeholder = 'Joueur ' + (i + 1);
    D.home.names.appendChild(inp);
  }
}

D.home.dec.addEventListener('click', () => { if (playerCount > 4) { playerCount--; updCount(); genInputs(); } });
D.home.inc.addEventListener('click', () => { if (playerCount < 24) { playerCount++; updCount(); genInputs(); } });

D.home.start.addEventListener('click', () => {
  const inputs = D.home.names.querySelectorAll('.player-name-input');
  const names = [];
  let empty = false;

  inputs.forEach((inp, i) => {
    const v = inp.value.trim();
    if (v === '') { empty = true; names.push('Joueur ' + (i + 1)); }
    else names.push(v);
  });

  if (empty) notif('Des noms par défaut ont été attribués.', 'info');

  const uniq = new Set(names.map(n => n.toLowerCase()));
  if (uniq.size !== names.length) { err('Deux joueurs ne peuvent pas avoir le même nom !'); return; }

  G.players = names.map(n => ({ name: n, status: 'green', errors: 0 }));
  showScreen('game');
  startEnvoi();
});

// Boutons export/import
if (D.home.exp) D.home.exp.addEventListener('click', exportQuestions);
if (D.home.imp) D.home.imp.addEventListener('click', () => D.home.impFile.click());
if (D.home.impFile) D.home.impFile.addEventListener('change', (e) => {
  if (e.target.files.length) {
    importQuestions(e.target.files[0]);
    e.target.value = '';
  }
});

// Fullscreen
if (D.fullscreenBtn) D.fullscreenBtn.addEventListener('click', toggleFullscreen);

// Spectateur
if (D.spectatorToggle) D.spectatorToggle.addEventListener('click', toggleSpectator);

// =============================================================
// 12b. GESTION DES QUESTIONS
// =============================================================
function showManage() {
  G.currentScreen = 'manage';
  G.manageTab = 'envoi';
  G.manageEditing = null;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  D.screen.manage.classList.add('active');
  renderManage();
}

function getManageBank() {
  if (G.manageTab === 'envoi') return questionsCoupEnvoi;
  if (G.manageTab === 'cpc') return questionsCoupParCoup;
  return questionsCoupFatal;
}

function renderManage() {
  renderManageTabs();
  renderManageList();
  renderManageForm();
}

function renderManageTabs() {
  document.querySelectorAll('.manage-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === G.manageTab);
  });
  D.manage.count.envoi.textContent = questionsCoupEnvoi.length;
  D.manage.count.cpc.textContent = questionsCoupParCoup.length;
  D.manage.count.fatal.textContent = questionsCoupFatal.length;
}

function renderManageList() {
  const bank = getManageBank();
  const list = D.manage.list;
  list.innerHTML = '';

  if (!bank.length) {
    list.innerHTML = '<p class="manage-empty">Aucune question dans cette catégorie.</p>';
    return;
  }

  bank.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'manage-card' + (G.manageEditing === i ? ' editing' : '');
    card.dataset.index = i;

    if (G.manageEditing === i) {
      const fields = getManageFormFields(q);
      fields.forEach(f => {
        const row = document.createElement('div');
        row.className = 'manage-field-row';
        row.innerHTML = '<label>' + f.label + '</label>';
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'manage-input';
        inp.value = f.value;
        inp.dataset.field = f.key;
        row.appendChild(inp);
        card.appendChild(row);
      });
      const actions = document.createElement('div');
      actions.className = 'manage-card-actions';
      const saveBtn = document.createElement('button');
      saveBtn.className = 'btn btn-green btn-small';
      saveBtn.textContent = '💾 Sauver';
      saveBtn.addEventListener('click', () => saveManageQuestion(i));
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'btn btn-dark btn-small';
      cancelBtn.textContent = 'Annuler';
      cancelBtn.addEventListener('click', () => { G.manageEditing = null; renderManageList(); });
      actions.append(saveBtn, cancelBtn);
      card.appendChild(actions);
    } else {
      const info = document.createElement('div');
      info.className = 'manage-card-info';
      info.textContent = q.question;
      const meta = document.createElement('div');
      meta.className = 'manage-card-meta';
      if (G.manageTab === 'envoi') meta.textContent = 'Choix: ' + q.choix.join(', ') + ' | Bonne réponse: ' + q.bonneReponse;
      else if (G.manageTab === 'cpc') meta.textContent = 'Intrus: ' + q.intrus + ' | Propositions: ' + q.propositions.length;
      else meta.textContent = 'Réponse: ' + q.reponse;
      const actions = document.createElement('div');
      actions.className = 'manage-card-actions';
      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-small btn-blue';
      editBtn.textContent = '✎';
      editBtn.title = 'Modifier';
      editBtn.addEventListener('click', () => { G.manageEditing = i; renderManageList(); renderManageForm(); });
      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-small btn-red';
      delBtn.textContent = '✕';
      delBtn.title = 'Supprimer';
      delBtn.addEventListener('click', () => deleteManageQuestion(i));
      actions.append(editBtn, delBtn);
      card.append(info, meta, actions);
    }

    list.appendChild(card);
  });
}

function getManageFormFields(data) {
  const isEdit = !!data;
  if (G.manageTab === 'envoi') {
    const d = isEdit ? data : { question: '', choix: ['', ''], bonneReponse: '' };
    return [
      { key: 'question', label: 'Question', value: d.question },
      { key: 'choix0', label: 'Choix A', value: d.choix[0] },
      { key: 'choix1', label: 'Choix B', value: d.choix[1] },
      { key: 'bonneReponse', label: 'Bonne réponse', value: d.bonneReponse },
    ];
  }
  if (G.manageTab === 'cpc') {
    const d = isEdit ? data : { question: '', propositions: ['','','','','','',''], intrus: '' };
    return [
      { key: 'question', label: 'Question', value: d.question },
      ...d.propositions.map((v, i) => ({ key: 'p' + i, label: 'Proposition ' + (i + 1), value: v })),
      { key: 'intrus', label: 'Intrus', value: d.intrus },
    ];
  }
  const d = isEdit ? data : { question: '', reponse: '' };
  return [
    { key: 'question', label: 'Question', value: d.question },
    { key: 'reponse', label: 'Réponse', value: d.reponse },
  ];
}

function renderManageForm() {
  const fields = D.manage.formFields;
  const isEditing = G.manageEditing !== null && G.manageEditing < getManageBank().length;

  D.manage.formTitle.textContent = isEditing ? 'Modifier la question' : 'Ajouter une question';
  D.manage.addBtn.textContent = isEditing ? '💾 Enregistrer' : '➕ Ajouter';
  D.manage.cancelBtn.style.display = isEditing ? 'inline-flex' : 'none';

  fields.innerHTML = '';
  const empty = G.manageEditing !== null && G.manageEditing < getManageBank().length
    ? getManageBank()[G.manageEditing] : null;
  const formFields = getManageFormFields(empty);

  formFields.forEach(f => {
    const row = document.createElement('div');
    row.className = 'manage-field-row';
    row.innerHTML = '<label>' + f.label + '</label>';
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'manage-input';
    inp.value = f.value;
    inp.dataset.field = f.key;
    row.appendChild(inp);
    fields.appendChild(row);
  });
}

function collectManageForm() {
  const inputs = D.manage.formFields.querySelectorAll('.manage-input');
  const data = {};
  inputs.forEach(inp => { data[inp.dataset.field] = inp.value; });
  return data;
}

function addManageQuestion() {
  const data = collectManageForm();
  if (!data.question || !data.question.trim()) { err('La question est vide.'); return; }

  if (G.manageTab === 'envoi') {
    if (!data.choix0 || !data.choix1) { err('Les deux choix sont requis.'); return; }
    if (!data.bonneReponse) { err('Indiquez la bonne réponse.'); return; }
    if (data.bonneReponse !== data.choix0 && data.bonneReponse !== data.choix1) { err('La bonne réponse doit être l\'un des deux choix.'); return; }
    getManageBank().push({ question: data.question, choix: [data.choix0, data.choix1], bonneReponse: data.bonneReponse });
  } else if (G.manageTab === 'cpc') {
    const props = [];
    for (let i = 0; i < 7; i++) {
      if (!data['p' + i]) { err('Toutes les propositions sont requises.'); return; }
      props.push(data['p' + i]);
    }
    if (!data.intrus) { err('Indiquez l\'intrus.'); return; }
    getManageBank().push({ question: data.question, propositions: props, intrus: data.intrus });
  } else {
    if (!data.reponse) { err('Indiquez la réponse.'); return; }
    getManageBank().push({ question: data.question, reponse: data.reponse });
  }

  G.manageEditing = null;
  renderManage();
  ok('Question ajoutée !');
}

function saveManageQuestion(index) {
  const data = collectManageForm();
  if (!data.question || !data.question.trim()) { err('La question est vide.'); return; }

  if (G.manageTab === 'envoi') {
    if (!data.choix0 || !data.choix1) { err('Les deux choix sont requis.'); return; }
    questionsCoupEnvoi[index] = { question: data.question, choix: [data.choix0, data.choix1], bonneReponse: data.bonneReponse };
  } else if (G.manageTab === 'cpc') {
    const props = [];
    for (let i = 0; i < 7; i++) {
      if (!data['p' + i]) { err('Toutes les propositions sont requises.'); return; }
      props.push(data['p' + i]);
    }
    questionsCoupParCoup[index] = { question: data.question, propositions: props, intrus: data.intrus };
  } else {
    questionsCoupFatal[index] = { question: data.question, reponse: data.reponse };
  }

  G.manageEditing = null;
  renderManage();
  ok('Question mise à jour !');
}

function deleteManageQuestion(index) {
  if (!confirm('Supprimer cette question ?')) return;
  getManageBank().splice(index, 1);
  if (G.manageEditing === index) G.manageEditing = null;
  else if (G.manageEditing > index) G.manageEditing--;
  renderManage();
  ok('Question supprimée.');
}

document.querySelectorAll('.manage-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    G.manageTab = tab.dataset.tab;
    G.manageEditing = null;
    renderManage();
  });
});

D.manage.back.addEventListener('click', () => {
  showScreen('home');
  initHome();
});

D.manage.exp.addEventListener('click', exportQuestions);

D.manage.addBtn.addEventListener('click', () => {
  if (G.manageEditing !== null) {
    saveManageQuestion(G.manageEditing);
  } else {
    addManageQuestion();
  }
});

D.manage.cancelBtn.addEventListener('click', () => {
  G.manageEditing = null;
  renderManage();
});

if (D.home.manageBtn) D.home.manageBtn.addEventListener('click', showManage);

// =============================================================
// 13. DÉMARRAGE
// =============================================================
document.addEventListener('DOMContentLoaded', () => { initHome(); showScreen('home'); });
