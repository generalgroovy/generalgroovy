import {
  FEELS,
  MODES,
  NOTES,
  OPTION_GROUPS,
  RHYTHM_ALGORITHMS,
  SCALES,
  THEORY_SYSTEMS,
  TUNINGS,
  TRANSFORMATIONS,
  buildFretOptions,
  generatePattern,
  getTuning
} from "./generator.js";

const $ = (selector) => document.querySelector(selector);

const controls = {};
const controlIds = [
  "mode", "learningGoal", "minutes", "difficulty", "density", "key", "scale",
  "randomizeDepth", "playbackWave", "theorySystem", "transformation",
  "progressionStyle", "chordVoicing", "tuning", "capo", "fretStart", "fretSpan",
  "maxFrets", "positionStrategy", "direction", "allowOpenStrings", "showIntervals",
  "tempo", "tempoRamp", "bars", "meter", "feel", "swing", "rhythmAlgorithm",
  "subdivision", "euclideanPulses", "polymeterSteps", "microtonalCents", "restRate", "picking",
  "articulation", "dynamics", "tone", "includeChords", "includeTheory", "includeTechnique"
];
for (const id of controlIds) controls[id] = $(`#${id}`);

const outputs = {
  patternType: $("#patternType"),
  patternTitle: $("#patternTitle"),
  warning: $("#warning"),
  statusFocus: $("#statusFocus"),
  statusTheory: $("#statusTheory"),
  statusRhythm: $("#statusRhythm"),
  metricSystem: $("#metricSystem"),
  metricTransform: $("#metricTransform"),
  metricTuning: $("#metricTuning"),
  tempoOut: $("#tempoOut"),
  metaGrid: $("#metaGrid"),
  chordChart: $("#chordChart"),
  analysisList: $("#analysisList"),
  tabOutput: $("#tabOutput"),
  fretboard: $("#fretboard"),
  positionLabel: $("#positionLabel"),
  practiceLoop: $("#practiceLoop"),
  variations: $("#variations"),
  exportOutput: $("#exportOutput"),
  stepLane: $("#stepLane"),
  playbackStatus: $("#playbackStatus"),
  playbackProgress: $("#playbackProgress"),
  timerReadout: $("#timerReadout"),
  timerPhase: $("#timerPhase"),
  theoryVisualizer: $("#theoryVisualizer"),
  visualSummary: $("#visualSummary"),
  historyList: $("#historyList")
};

let generationSeed = String(Date.now());
let lastPattern = null;
let audioContext = null;
let playbackTimers = [];
let playing = false;
let focusMode = false;
let compactMode = false;
let sessionHistory = [];
let lastConfigSnapshot = null;
let timerId = null;
let timerRemaining = 0;

const STORAGE_KEYS = {
  config: "generalgroovy.config",
  history: "generalgroovy.history",
  compact: "generalgroovy.compact"
};

const RANDOMIZABLE_CONTROL_IDS = controlIds.filter((id) => !["playbackWave"].includes(id));
const COMMANDS = [
  { label: "Generate new session", detail: "Regenerate with current settings", run: () => $("#generateBtn").click() },
  { label: "Play sequence", detail: "Start audio playback", run: playPattern },
  { label: "Stop playback", detail: "Stop all scheduled notes", run: stopPlayback },
  { label: "Mutate unlocked", detail: "Randomize unlocked controls", run: surprise },
  { label: "Preset Daily", detail: "Balanced everyday practice", run: () => applyPreset("daily") },
  { label: "Preset Outside", detail: "Altered/post-tonal exploration", run: () => applyPreset("outside") },
  { label: "Preset Composer", detail: "Mathematical songwriting seed", run: () => applyPreset("composer") },
  { label: "Morph idea", detail: "Subtly mutate density, rhythm, transform, and tempo", run: morphIdea },
  { label: "Share session", detail: "Copy a URL containing the current configuration", run: shareSession },
  { label: "Download JSON", detail: "Save the current practice config and output", run: downloadJson },
  { label: "Download MIDI text", detail: "Save a DAW-friendly note event list", run: downloadMidiText },
  { label: "Practice timer", detail: "Start or stop the session timer", run: toggleTimer },
  { label: "Toggle compact mode", detail: "Switch dashboard density", run: toggleCompactMode },
  { label: "View Overview", detail: "Show analysis and visualizer", run: () => switchView("overview") },
  { label: "View Playback", detail: "Show sequencer lane", run: () => switchView("playback") },
  { label: "View Tab", detail: "Show tablature", run: () => switchView("tab") },
  { label: "View Neck", detail: "Show fretboard", run: () => switchView("neck") },
  { label: "View Routine", detail: "Show practice plan", run: () => switchView("routine") },
  { label: "View Export", detail: "Show markdown session", run: () => switchView("export") },
  { label: "Toggle focus mode", detail: "Hide controls for practice", run: toggleFocusMode },
  { label: "Lock all", detail: "Freeze all randomization parameters", run: () => setAllLocks(true) },
  { label: "Unlock all", detail: "Allow all randomization parameters", run: () => setAllLocks(false) }
];

function init() {
  fillSelect(controls.mode, MODES);
  fillSelect(controls.learningGoal, labelsFromValues(OPTION_GROUPS.learningGoal));
  fillSelect(controls.key, labelsFromValues(NOTES));
  fillSelect(controls.scale, Object.fromEntries(Object.entries(SCALES).map(([key, value]) => [key, value.label])));
  fillSelect(controls.theorySystem, THEORY_SYSTEMS);
  fillSelect(controls.transformation, TRANSFORMATIONS);
  fillSelect(controls.progressionStyle, labelsFromValues(OPTION_GROUPS.progressionStyle));
  fillSelect(controls.chordVoicing, labelsFromValues(OPTION_GROUPS.chordVoicing));
  fillSelect(controls.tuning, Object.fromEntries(Object.entries(TUNINGS).map(([key, value]) => [key, value.label])));
  fillSelect(controls.positionStrategy, labelsFromValues(OPTION_GROUPS.positionStrategy));
  fillSelect(controls.direction, labelsFromValues(OPTION_GROUPS.sequence));
  fillSelect(controls.feel, Object.fromEntries(Object.entries(FEELS).map(([key, value]) => [key, value.label])));
  fillSelect(controls.rhythmAlgorithm, RHYTHM_ALGORITHMS);
  fillSelect(controls.picking, labelsFromValues(OPTION_GROUPS.picking));
  fillSelect(controls.articulation, labelsFromValues(OPTION_GROUPS.articulation));
  fillSelect(controls.dynamics, labelsFromValues(OPTION_GROUPS.dynamics));
  fillSelect(controls.tone, labelsFromValues(OPTION_GROUPS.tone));

  controls.key.value = "A";
  controls.scale.value = "minorPentatonic";
  controls.mode.value = "mixed";
  controls.feel.value = "straight8";
  controls.progressionStyle.value = "diatonic";
  controls.theorySystem.value = "tonal";
  controls.transformation.value = "none";
  controls.chordVoicing.value = "triads";
  controls.learningGoal.value = "timing";
  controls.tuning.value = "standard";
  controls.positionStrategy.value = "box";
  controls.direction.value = "linear";
  controls.picking.value = "alternate";
  controls.articulation.value = "let-ring";
  controls.dynamics.value = "even";
  controls.tone.value = "clean";
  controls.rhythmAlgorithm.value = "grid";

  renderStringPicker();
  renderLockGrid();
  restoreState();
  wireEvents();
  render();
}

function wireEvents() {
  $("#generateBtn").addEventListener("click", () => {
    generationSeed = String(Date.now() + Math.random());
    render();
  });
  $("#randomizeBtn").addEventListener("click", surprise);
  $("#copyTabBtn").addEventListener("click", () => copyText(outputs.tabOutput.textContent, $("#copyTabBtn"), "Copy Tab"));
  $("#copyExportBtn").addEventListener("click", () => copyText(lastPattern?.exportText || "", $("#copyExportBtn"), "Copy Session"));
  $("#copyExportInlineBtn").addEventListener("click", () => copyText(lastPattern?.exportText || "", $("#copyExportInlineBtn"), "Copy"));
  $("#playBtn").addEventListener("click", playPattern);
  $("#playInlineBtn").addEventListener("click", playPattern);
  $("#railPlayBtn").addEventListener("click", playPattern);
  $("#stopBtn").addEventListener("click", stopPlayback);
  $("#stopInlineBtn").addEventListener("click", stopPlayback);
  $("#lockAllBtn").addEventListener("click", () => setAllLocks(true));
  $("#unlockAllBtn").addEventListener("click", () => setAllLocks(false));
  $("#railLockBtn").addEventListener("click", () => setAllLocks(true));
  $("#railUnlockBtn").addEventListener("click", () => setAllLocks(false));
  $("#railMutateBtn").addEventListener("click", surprise);
  $("#railMorphBtn").addEventListener("click", morphIdea);
  $("#shareBtn").addEventListener("click", shareSession);
  $("#railShareBtn").addEventListener("click", shareSession);
  $("#downloadJsonBtn").addEventListener("click", downloadJson);
  $("#downloadMidiBtn").addEventListener("click", downloadMidiText);
  $("#importConfigBtn").addEventListener("click", importConfig);
  $("#timerBtn").addEventListener("click", toggleTimer);
  $("#commandBtn").addEventListener("click", openCommandPalette);
  $("#railCommandBtn").addEventListener("click", openCommandPalette);
  $("#focusModeBtn").addEventListener("click", toggleFocusMode);
  $("#densityBtn").addEventListener("click", toggleCompactMode);
  $("#clearHistoryBtn").addEventListener("click", clearHistory);
  $("#closeCommandBtn").addEventListener("click", closeCommandPalette);
  $("#commandSearch").addEventListener("input", renderCommandList);
  $("#expandAllBtn").addEventListener("click", () => setDetailsOpen(true));
  $("#collapseAllBtn").addEventListener("click", () => setDetailsOpen(false));
  $("#controlSearch").addEventListener("input", filterControls);
  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => applyPreset(button.dataset.preset));
  });
  document.addEventListener("keydown", handleKeys);

  controls.tuning.addEventListener("change", () => {
    renderStringPicker();
    render();
  });

  document.addEventListener("input", (event) => {
    if (event.target === controls.difficulty) $("#difficultyLabel").textContent = controls.difficulty.value;
    if (event.target === controls.density) $("#densityLabel").textContent = controls.density.value;
    if (event.target === controls.randomizeDepth) $("#randomizeDepthLabel").textContent = controls.randomizeDepth.value;
    if (event.target === controls.restRate) $("#restRateLabel").textContent = controls.restRate.value;
    if (event.target.matches("input, select") && !event.target.closest("#lockGrid")) render();
  });

  document.querySelectorAll(".view-tabs button").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
}

function renderStringPicker() {
  const tuning = getTuning(controls.tuning.value).strings;
  $("#stringPicker").innerHTML = tuning.map((string, index) => `
    <label title="${string.name} string">
      <input type="checkbox" value="${index}" checked>
      ${string.name}
    </label>
  `).join("");
}

function restoreState() {
  try {
    compactMode = localStorage.getItem(STORAGE_KEYS.compact) === "true";
    document.body.classList.toggle("compact-mode", compactMode);
    $("#densityBtn").textContent = compactMode ? "Comfort" : "Compact";
    sessionHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || "[]");
    const shared = parseSharedHash();
    const saved = shared || JSON.parse(localStorage.getItem(STORAGE_KEYS.config) || "null");
    if (!saved) return;
    for (const [key, value] of Object.entries(saved)) {
      if (!controls[key]) continue;
      if (controls[key].type === "checkbox") controls[key].checked = Boolean(value);
      else controls[key].value = value;
    }
    if (saved.tuning) renderStringPicker();
    if (Array.isArray(saved.strings)) {
      document.querySelectorAll("#stringPicker input").forEach((input) => {
        input.checked = saved.strings.includes(Number(input.value));
      });
    }
  } catch {
    sessionHistory = [];
  }
}

function persistConfig(config) {
  localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config));
}

function parseSharedHash() {
  if (!location.hash.startsWith("#gg=")) return null;
  try {
    return JSON.parse(decodeURIComponent(atob(location.hash.slice(4))));
  } catch {
    return null;
  }
}

function encodeConfig(config) {
  return btoa(encodeURIComponent(JSON.stringify(config)));
}

function getConfig() {
  const strings = [...document.querySelectorAll("#stringPicker input:checked")].map((input) => Number(input.value));
  return {
    mode: controls.mode.value,
    learningGoal: controls.learningGoal.value,
    minutes: Number(controls.minutes.value),
    difficulty: Number(controls.difficulty.value),
    density: Number(controls.density.value),
    randomizeDepth: Number(controls.randomizeDepth.value),
    key: controls.key.value,
    scale: controls.scale.value,
    theorySystem: controls.theorySystem.value,
    transformation: controls.transformation.value,
    progressionStyle: controls.progressionStyle.value,
    chordVoicing: controls.chordVoicing.value,
    tuning: controls.tuning.value,
    capo: Number(controls.capo.value),
    strings,
    fretStart: Number(controls.fretStart.value),
    fretSpan: Number(controls.fretSpan.value),
    maxFrets: Number(controls.maxFrets.value),
    positionStrategy: controls.positionStrategy.value,
    direction: controls.direction.value,
    allowOpenStrings: controls.allowOpenStrings.checked,
    showIntervals: controls.showIntervals.checked,
    tempo: Number(controls.tempo.value),
    tempoRamp: Number(controls.tempoRamp.value),
    bars: Number(controls.bars.value),
    meter: controls.meter.value,
    feel: controls.feel.value,
    swing: Number(controls.swing.value),
    rhythmAlgorithm: controls.rhythmAlgorithm.value,
    subdivision: Number(controls.subdivision.value),
    euclideanPulses: Number(controls.euclideanPulses.value),
    polymeterSteps: Number(controls.polymeterSteps.value),
    microtonalCents: Number(controls.microtonalCents.value),
    restRate: Number(controls.restRate.value),
    picking: controls.picking.value,
    articulation: controls.articulation.value,
    dynamics: controls.dynamics.value,
    tone: controls.tone.value,
    includeChords: controls.includeChords.checked,
    includeTheory: controls.includeTheory.checked,
    includeTechnique: controls.includeTechnique.checked,
    seed: generationSeed
  };
}

function render() {
  lastPattern = generatePattern(getConfig());
  const pattern = lastPattern;
  persistConfig(pattern.config);
  pushHistory(pattern);
  if (!timerId) timerRemaining = pattern.config.minutes * 60;
  outputs.patternType.textContent = pattern.typeLabel;
  outputs.patternTitle.textContent = pattern.title;
  outputs.warning.textContent = pattern.warning;
  outputs.statusFocus.textContent = pattern.typeLabel;
  outputs.statusTheory.textContent = `${pattern.config.key} ${SCALES[pattern.config.scale].label}`;
  outputs.statusRhythm.textContent = `${FEELS[pattern.config.feel].label} / ${pattern.config.meter}`;
  outputs.metricSystem.textContent = THEORY_SYSTEMS[pattern.config.theorySystem];
  outputs.metricTransform.textContent = TRANSFORMATIONS[pattern.config.transformation];
  outputs.metricTuning.textContent = TUNINGS[pattern.config.tuning].label;
  outputs.tempoOut.textContent = pattern.config.tempo;
  outputs.timerReadout.textContent = formatTime(pattern.config.minutes * 60);
  outputs.timerPhase.textContent = timerId ? "Running" : "Ready";
  outputs.positionLabel.textContent = pattern.positionLabel;
  outputs.tabOutput.textContent = pattern.tab;
  outputs.chordChart.textContent = pattern.chordChart;
  outputs.exportOutput.textContent = pattern.exportText;
  outputs.practiceLoop.innerHTML = pattern.practiceLoop.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  outputs.variations.innerHTML = pattern.variations.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  outputs.analysisList.innerHTML = pattern.analysis.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  renderMeta(pattern);
  renderFretboard(pattern);
  renderStepLane(pattern);
  renderTheoryVisualizer(pattern);
  renderHistory();
}

function renderMeta(pattern) {
  const config = pattern.config;
  const meta = [
    ["Focus", pattern.typeLabel],
    ["Theory", `${config.key} ${SCALES[config.scale].label}`],
    ["System", `${THEORY_SYSTEMS[config.theorySystem]} / ${TRANSFORMATIONS[config.transformation]}`],
    ["Instrument", `${TUNINGS[config.tuning].label}, capo ${config.capo}`],
    ["Neck", `${stringNames(config).join(" ")} / ${config.positionStrategy}`],
    ["Rhythm", `${FEELS[config.feel].label}, ${config.meter}`],
    ["Technique", pattern.techniques.join(", ") || "neutral"],
    ["Harmony", pattern.progression.map((item) => item.chord).join(" - ")],
    ["Goal", config.learningGoal]
  ];
  outputs.metaGrid.innerHTML = meta.map(([label, value]) => `
    <div class="meta-item">
      <b>${label}</b>
      <span>${escapeHtml(value)}</span>
    </div>
  `).join("");
}

function pushHistory(pattern) {
  const fingerprint = `${pattern.title}|${pattern.config.seed}`;
  if (sessionHistory[0]?.fingerprint === fingerprint) return;
  sessionHistory = [
    {
      fingerprint,
      title: pattern.title,
      mode: pattern.typeLabel,
      theory: `${pattern.config.key} ${SCALES[pattern.config.scale].label}`,
      rhythm: FEELS[pattern.config.feel].label,
      tempo: pattern.config.tempo,
      config: pattern.config
    },
    ...sessionHistory
  ].slice(0, 8);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(sessionHistory));
}

function renderHistory() {
  outputs.historyList.innerHTML = sessionHistory.map((item, index) => `
    <button type="button" data-history="${index}">
      <b>${escapeHtml(item.title)}</b>
      <span>${escapeHtml(item.mode)} / ${escapeHtml(item.theory)} / ${escapeHtml(item.rhythm)} / ${item.tempo} BPM</span>
    </button>
  `).join("");
  outputs.historyList.querySelectorAll("[data-history]").forEach((button) => {
    button.addEventListener("click", () => restoreHistoryItem(Number(button.dataset.history)));
  });
}

function restoreHistoryItem(index) {
  const item = sessionHistory[index];
  if (!item) return;
  applyConfig(item.config);
  generationSeed = item.config.seed || String(Date.now());
  render();
}

function applyConfig(config) {
  for (const [key, value] of Object.entries(config)) {
    if (!controls[key]) continue;
    if (controls[key].type === "checkbox") controls[key].checked = Boolean(value);
    else controls[key].value = value;
  }
  renderStringPicker();
  if (Array.isArray(config.strings)) {
    document.querySelectorAll("#stringPicker input").forEach((input) => {
      input.checked = config.strings.includes(Number(input.value));
    });
  }
}

function renderFretboard(pattern) {
  const config = pattern.config;
  const tuning = getTuning(config.tuning).strings;
  const allScalePositions = buildFretOptions(config);
  const active = new Set(pattern.notes.map((note) => `${note.stringIndex}:${note.fret}`));
  const fretEnd = Math.min(config.maxFrets, config.fretStart + config.fretSpan);
  const frets = Array.from({ length: fretEnd - config.fretStart + 1 }, (_, index) => config.fretStart + index);
  if (config.allowOpenStrings && !frets.includes(0)) frets.unshift(0);
  const cells = [`<div class="fret-cell string-name">#</div>`];

  for (const fret of frets) cells.push(`<div class="fret-cell fret-number">${fret}</div>`);

  for (const [stringIndex, string] of tuning.entries()) {
    cells.push(`<div class="fret-cell string-name">${string.name}</div>`);
    for (const fret of frets) {
      const scaleNote = allScalePositions.find((note) => note.stringIndex === stringIndex && note.fret === fret);
      const isPlayed = active.has(`${stringIndex}:${fret}`);
      const classes = ["fret-cell"];
      if (scaleNote) classes.push("scale");
      if (isPlayed) classes.push("active");
      if (scaleNote?.isRoot) classes.push("root");
      const label = scaleNote ? (config.showIntervals ? scaleNote.degreeName : scaleNote.note) : "";
      cells.push(`<div class="${classes.join(" ")}" data-note="${escapeHtml(label)}"></div>`);
    }
  }

  outputs.fretboard.style.setProperty("--fret-count", frets.length);
  outputs.fretboard.innerHTML = cells.join("");
}

function switchView(view) {
  document.querySelectorAll(".view-tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("active", section.id === `view-${view}`);
  });
}

function openCommandPalette() {
  $("#commandDialog").showModal();
  $("#commandSearch").value = "";
  renderCommandList();
  $("#commandSearch").focus();
}

function closeCommandPalette() {
  $("#commandDialog").close();
}

function renderCommandList() {
  const query = $("#commandSearch").value?.trim().toLowerCase() || "";
  const matches = COMMANDS.filter((command) => `${command.label} ${command.detail}`.toLowerCase().includes(query));
  $("#commandList").innerHTML = matches.map((command, index) => `
    <button type="button" data-command="${index}">
      <b>${escapeHtml(command.label)}</b>
      <span>${escapeHtml(command.detail)}</span>
    </button>
  `).join("");
  $("#commandList").querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      matches[Number(button.dataset.command)].run();
      closeCommandPalette();
    });
  });
}

function handleKeys(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
  }
  if (event.key === "Escape" && $("#commandDialog").open) closeCommandPalette();
}

function toggleFocusMode() {
  focusMode = !focusMode;
  document.body.classList.toggle("focus-mode", focusMode);
  $("#focusModeBtn").textContent = focusMode ? "Exit Focus" : "Focus";
}

function toggleCompactMode() {
  compactMode = !compactMode;
  document.body.classList.toggle("compact-mode", compactMode);
  $("#densityBtn").textContent = compactMode ? "Comfort" : "Compact";
  localStorage.setItem(STORAGE_KEYS.compact, String(compactMode));
}

function renderLockGrid() {
  const labels = {
    mode: "Focus", learningGoal: "Goal", minutes: "Minutes", difficulty: "Difficulty",
    density: "Density", randomizeDepth: "Random depth", key: "Key", scale: "Scale",
    theorySystem: "Theory", transformation: "Transform", progressionStyle: "Progression",
    chordVoicing: "Voicing", tuning: "Tuning", capo: "Capo", strings: "Strings",
    fretStart: "Fret start", fretSpan: "Fret span", maxFrets: "Max frets",
    positionStrategy: "Position", direction: "Shape", allowOpenStrings: "Open strings",
    showIntervals: "Intervals", tempo: "Tempo", tempoRamp: "Ramp", bars: "Bars",
    meter: "Meter", feel: "Feel", swing: "Swing", rhythmAlgorithm: "Rhythm algorithm",
    subdivision: "Steps", euclideanPulses: "Pulses", polymeterSteps: "Poly step",
    microtonalCents: "Cents", restRate: "Rests", picking: "Picking",
    articulation: "Articulation", dynamics: "Dynamics", tone: "Tone",
    includeChords: "Harmony", includeTheory: "Analysis", includeTechnique: "Technique"
  };
  $("#lockGrid").innerHTML = ["strings", ...RANDOMIZABLE_CONTROL_IDS]
    .map((id) => `<label><input type="checkbox" data-lock="${id}"> ${labels[id] || titleCase(id)}</label>`)
    .join("");
}

function isLocked(id) {
  return Boolean(document.querySelector(`[data-lock="${id}"]`)?.checked);
}

function setAllLocks(locked) {
  document.querySelectorAll("[data-lock]").forEach((input) => {
    input.checked = locked;
  });
}

function setDetailsOpen(open) {
  document.querySelectorAll(".controls details").forEach((details) => {
    details.open = open;
  });
}

function filterControls() {
  const query = $("#controlSearch").value.trim().toLowerCase();
  document.querySelectorAll(".controls details").forEach((details) => {
    const matches = !query || details.textContent.toLowerCase().includes(query);
    details.hidden = !matches;
    if (query && matches) details.open = true;
  });
}

function applyPreset(preset) {
  const presets = {
    daily: {
      mode: "mixed", learningGoal: "timing", scale: "minorPentatonic", theorySystem: "tonal",
      transformation: "none", rhythmAlgorithm: "grid", picking: "alternate", articulation: "let-ring",
      dynamics: "accent-downbeats", tone: "clean", tempo: 92, bars: 4, density: 5, difficulty: 5
    },
    outside: {
      mode: "riff", learningGoal: "outside-playing", scale: "altered", theorySystem: "postTonal",
      transformation: "retrogradeInversion", progressionStyle: "chromatic-mediants",
      rhythmAlgorithm: "euclidean", subdivision: 16, euclideanPulses: 7, articulation: "slides",
      dynamics: "question-answer", tone: "edge-of-breakup", tempo: 118, density: 8, difficulty: 8
    },
    composer: {
      mode: "songwriting", learningGoal: "composition", scale: "allIntervalTetrachord",
      theorySystem: "mathematical", transformation: "rotation", progressionStyle: "set-class-cycle",
      rhythmAlgorithm: "isorhythm", chordVoicing: "quartal", tone: "ambient", tempo: 76,
      density: 6, difficulty: 7, bars: 8
    }
  };
  const selected = presets[preset];
  for (const [key, value] of Object.entries(selected)) {
    if (controls[key] && !isLocked(key)) controls[key].value = value;
  }
  generationSeed = String(Date.now() + Math.random());
  render();
}

function morphIdea() {
  lastConfigSnapshot = getConfig();
  generationSeed = String(Date.now() + Math.random());
  nudgeNumber("density", -2, 2, 1, 10);
  nudgeNumber("difficulty", -1, 2, 1, 10);
  nudgeNumber("tempo", -12, 16, 30, 260);
  nudgeNumber("swing", -12, 18, 0, 75);
  nudgeNumber("restRate", -8, 12, 0, 60);
  if (!isLocked("transformation")) setRandom("transformation", Object.keys(TRANSFORMATIONS));
  if (!isLocked("rhythmAlgorithm") && Math.random() > 0.45) setRandom("rhythmAlgorithm", Object.keys(RHYTHM_ALGORITHMS));
  if (!isLocked("direction") && Math.random() > 0.45) setRandom("direction", OPTION_GROUPS.sequence);
  render();
}

function nudgeNumber(id, minDelta, maxDelta, min, max) {
  if (isLocked(id)) return;
  const current = Number(controls[id].value || 0);
  const delta = minDelta + Math.round(Math.random() * (maxDelta - minDelta));
  controls[id].value = Math.min(max, Math.max(min, current + delta));
}

function clearHistory() {
  sessionHistory = [];
  localStorage.removeItem(STORAGE_KEYS.history);
  renderHistory();
}

async function shareSession() {
  const config = getConfig();
  const url = `${location.origin}${location.pathname}#gg=${encodeConfig(config)}`;
  await navigator.clipboard.writeText(url);
  pulseStatus("Share URL copied");
}

function importConfig() {
  const raw = $("#importConfigInput").value.trim();
  if (!raw) return;
  let config = null;
  try {
    const hash = raw.includes("#gg=") ? raw.split("#gg=")[1] : raw.replace(/^#gg=/, "");
    config = JSON.parse(decodeURIComponent(atob(hash)));
  } catch {
    try {
      config = JSON.parse(raw);
    } catch {
      pulseStatus("Import failed");
      return;
    }
  }
  applyConfig(config);
  generationSeed = config.seed || String(Date.now());
  render();
  pulseStatus("Imported");
}

function downloadJson() {
  const payload = {
    config: lastPattern.config,
    title: lastPattern.title,
    tab: lastPattern.tab,
    chordChart: lastPattern.chordChart,
    analysis: lastPattern.analysis,
    practiceLoop: lastPattern.practiceLoop,
    variations: lastPattern.variations
  };
  downloadText(`${slug(lastPattern.title)}.json`, JSON.stringify(payload, null, 2), "application/json");
}

function downloadMidiText() {
  const stepMs = stepDurationMs(lastPattern.config);
  const rows = lastPattern.notes.map((note) => {
    const seconds = ((note.step * stepMs) / 1000).toFixed(3);
    return [seconds, note.midi, note.note, note.string, note.fret, note.accent ? "accent" : ""].join("\t");
  });
  downloadText(`${slug(lastPattern.title)}-events.tsv`, ["time\tmidi\tnote\tstring\tfret\tmark", ...rows].join("\n"), "text/tab-separated-values");
}

function downloadText(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function toggleTimer() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
    outputs.timerPhase.textContent = "Paused";
    return;
  }
  timerRemaining = timerRemaining || lastPattern.config.minutes * 60;
  outputs.timerPhase.textContent = "Running";
  timerId = window.setInterval(() => {
    timerRemaining = Math.max(0, timerRemaining - 1);
    outputs.timerReadout.textContent = formatTime(timerRemaining);
    if (timerRemaining === 0) {
      window.clearInterval(timerId);
      timerId = null;
      outputs.timerPhase.textContent = "Complete";
      clickSoundSafe();
    }
  }, 1000);
}

function clickSoundSafe() {
  if (!audioContext) return;
  clickSound(1200, 0.08, 0.2);
}

function pulseStatus(text) {
  outputs.playbackStatus.textContent = text;
  window.setTimeout(() => {
    if (!playing) outputs.playbackStatus.textContent = "Stopped";
  }, 1200);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "generalgroovy";
}

function surprise() {
  generationSeed = String(Date.now() + Math.random());
  setRandom("mode", Object.keys(MODES));
  setRandom("learningGoal", OPTION_GROUPS.learningGoal);
  setRandom("key", NOTES);
  setRandom("scale", Object.keys(SCALES));
  setRandom("theorySystem", Object.keys(THEORY_SYSTEMS));
  setRandom("transformation", Object.keys(TRANSFORMATIONS));
  setRandom("progressionStyle", OPTION_GROUPS.progressionStyle);
  setRandom("chordVoicing", OPTION_GROUPS.chordVoicing);
  setRandom("tuning", Object.keys(TUNINGS));
  renderStringPicker();
  setRandom("positionStrategy", OPTION_GROUPS.positionStrategy);
  setRandom("direction", OPTION_GROUPS.sequence);
  setRandom("feel", Object.keys(FEELS));
  setRandom("rhythmAlgorithm", Object.keys(RHYTHM_ALGORITHMS));
  setRandom("picking", OPTION_GROUPS.picking);
  setRandom("articulation", OPTION_GROUPS.articulation);
  setRandom("dynamics", OPTION_GROUPS.dynamics);
  setRandom("tone", OPTION_GROUPS.tone);
  setNumber("fretStart", 0, 12);
  setNumber("fretSpan", 3, 12);
  setNumber("difficulty", 1, 10);
  setNumber("density", 1, 10);
  setNumber("randomizeDepth", 1, 10);
  setNumber("tempo", 45, 190);
  setNumber("tempoRamp", 0, 24);
  setNumber("bars", 1, 12);
  setNumber("minutes", 5, 45);
  setNumber("swing", 0, 60);
  setNumber("restRate", 0, 45);
  setNumber("subdivision", 4, 32);
  setNumber("euclideanPulses", 1, Math.max(1, Number(controls.subdivision.value)));
  setNumber("polymeterSteps", 2, 17);
  setNumber("microtonalCents", -30, 30);
  if (!isLocked("allowOpenStrings")) controls.allowOpenStrings.checked = Math.random() > 0.55;
  if (!isLocked("includeChords")) controls.includeChords.checked = Math.random() > 0.15;
  if (!isLocked("includeTheory")) controls.includeTheory.checked = Math.random() > 0.08;
  if (!isLocked("includeTechnique")) controls.includeTechnique.checked = Math.random() > 0.08;
  if (!isLocked("showIntervals")) controls.showIntervals.checked = Math.random() > 0.2;
  $("#difficultyLabel").textContent = controls.difficulty.value;
  $("#densityLabel").textContent = controls.density.value;
  $("#randomizeDepthLabel").textContent = controls.randomizeDepth.value;
  $("#restRateLabel").textContent = controls.restRate.value;
  const stringInputs = [...document.querySelectorAll("#stringPicker input")];
  const start = Math.floor(Math.random() * Math.max(1, stringInputs.length - 2));
  stringInputs.forEach((input, index) => {
    if (!isLocked("strings")) input.checked = index >= start && index < start + Math.min(4, stringInputs.length);
  });
  render();
}

function renderStepLane(pattern) {
  const steps = Math.min(64, Math.max(pattern.notes.length, pattern.rhythm.length));
  const byStep = new Map(pattern.notes.map((note) => [note.step, note]));
  outputs.stepLane.innerHTML = Array.from({ length: steps }, (_, step) => {
    const note = byStep.get(step);
    const rhythm = pattern.rhythm[step];
    const label = note ? `${note.note}${note.fret}` : rhythm?.rest ? "x" : "-";
    const classes = ["step-chip"];
    if (rhythm?.accent) classes.push("accent");
    if (rhythm?.rest) classes.push("rest");
    if (note?.isRoot) classes.push("root");
    return `<span class="${classes.join(" ")}" data-step="${step}">${escapeHtml(label)}</span>`;
  }).join("");
}

function renderTheoryVisualizer(pattern) {
  const pitchClasses = [...new Set(pattern.notes.map((note) => note.pitch).filter(Number.isInteger))];
  const activeSteps = new Set(pattern.rhythm.filter((step) => !step.rest).map((step) => step.step % 16));
  const cells = [];
  for (let pitch = 0; pitch < 12; pitch += 1) {
    const isActive = pitchClasses.includes(pitch);
    const isRoot = NOTES[pitch] === pattern.config.key;
    cells.push(`<span class="pitch-node ${isActive ? "active" : ""} ${isRoot ? "root" : ""}" style="--i:${pitch}">${NOTES[pitch]}</span>`);
  }
  const rhythmCells = Array.from({ length: 16 }, (_, step) => `<span class="rhythm-node ${activeSteps.has(step) ? "active" : ""}">${step + 1}</span>`).join("");
  outputs.visualSummary.textContent = `${pitchClasses.length} pitch classes / ${activeSteps.size} active rhythm cells`;
  outputs.theoryVisualizer.innerHTML = `
    <div class="pitch-orbit">${cells.join("")}<b>${escapeHtml(pattern.config.key)}</b></div>
    <div class="rhythm-orbit">${rhythmCells}</div>
  `;
}

async function playPattern() {
  if (!lastPattern) render();
  stopPlayback();
  audioContext = audioContext || new AudioContext();
  if (audioContext.state === "suspended") await audioContext.resume();
  playing = true;
  outputs.playbackStatus.textContent = "Playing";
  const stepMs = stepDurationMs(lastPattern.config);
  const volume = Number($("#playbackVolume").value || 42) / 100;
  const wave = controls.playbackWave.value;
  const byStep = new Map(lastPattern.notes.map((note) => [note.step, note]));
  const totalSteps = Math.min(96, Math.max(lastPattern.rhythm.length, lastPattern.notes.length));

  for (let step = 0; step < totalSteps; step += 1) {
    const timer = window.setTimeout(() => {
      if (!playing) return;
      highlightStep(step);
      const rhythm = lastPattern.rhythm[step];
      const note = byStep.get(step);
      if (rhythm?.accent) clickSound(950, 0.025, volume * 0.35);
      if (note && !rhythm?.rest) playNote(note.midi, stepMs / 1000 * 0.72, volume, wave, lastPattern.config.microtonalCents);
      if (step === totalSteps - 1) {
        if ($("#playbackLoop").checked && playing) {
          playbackTimers.push(window.setTimeout(playPattern, stepMs));
        } else {
          stopPlayback();
        }
      }
    }, step * stepMs);
    playbackTimers.push(timer);
  }
}

function stopPlayback() {
  playbackTimers.forEach((timer) => window.clearTimeout(timer));
  playbackTimers = [];
  playing = false;
  if (outputs.playbackStatus) outputs.playbackStatus.textContent = "Stopped";
  if (outputs.playbackProgress) outputs.playbackProgress.style.width = "0%";
  document.querySelectorAll(".step-chip.playing").forEach((chip) => chip.classList.remove("playing"));
}

function playNote(midi, duration, volume, wave, cents) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = wave;
  oscillator.frequency.value = 440 * 2 ** ((midi - 69 + cents / 100) / 12);
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), audioContext.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration + 0.02);
}

function clickSound(frequency, duration, volume) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "square";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function highlightStep(step) {
  document.querySelectorAll(".step-chip.playing").forEach((chip) => chip.classList.remove("playing"));
  document.querySelector(`[data-step="${step}"]`)?.classList.add("playing");
  if (lastPattern && outputs.playbackProgress) {
    const total = Math.max(lastPattern.rhythm.length, lastPattern.notes.length, 1);
    outputs.playbackProgress.style.width = `${Math.min(100, ((step + 1) / total) * 100)}%`;
  }
}

function stepDurationMs(config) {
  const base = 60000 / config.tempo;
  if (config.feel === "straight16" || config.feel === "funk16") return base / 4;
  if (config.feel === "triplet") return base / 3;
  return base / 2;
}

async function copyText(text, button, resetLabel) {
  await navigator.clipboard.writeText(text);
  button.textContent = "Copied";
  window.setTimeout(() => {
    button.textContent = resetLabel;
  }, 900);
}

function fillSelect(select, options) {
  select.innerHTML = Object.entries(options)
    .map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`)
    .join("");
}

function labelsFromValues(values) {
  return Object.fromEntries(values.map((value) => [value, titleCase(value)]));
}

function setRandom(id, values) {
  if (isLocked(id)) return;
  controls[id].value = values[Math.floor(Math.random() * values.length)];
}

function setNumber(id, min, max) {
  if (isLocked(id)) return;
  const depth = Number(controls.randomizeDepth.value || 5) / 10;
  const spread = Math.max(1, Math.round((max - min) * depth));
  const localMin = Math.max(min, Number(controls[id].value || min) - spread);
  const localMax = Math.min(max, Number(controls[id].value || min) + spread);
  controls[id].value = Math.round(localMin + Math.random() * (localMax - localMin));
}

function stringNames(config) {
  const tuning = getTuning(config.tuning).strings;
  return config.strings.map((index) => tuning[index]?.name).filter(Boolean);
}

function titleCase(value) {
  return String(value)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

init();
