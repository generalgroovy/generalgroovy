import {
  FEELS,
  MODES,
  NOTES,
  OPTION_GROUPS,
  SCALES,
  TUNINGS,
  buildFretOptions,
  generatePattern,
  getTuning
} from "./generator.js";

const $ = (selector) => document.querySelector(selector);

const controls = {};
const controlIds = [
  "mode", "learningGoal", "minutes", "difficulty", "density", "key", "scale",
  "progressionStyle", "chordVoicing", "tuning", "capo", "fretStart", "fretSpan",
  "maxFrets", "positionStrategy", "direction", "allowOpenStrings", "showIntervals",
  "tempo", "tempoRamp", "bars", "meter", "feel", "swing", "restRate", "picking",
  "articulation", "dynamics", "tone", "includeChords", "includeTheory", "includeTechnique"
];
for (const id of controlIds) controls[id] = $(`#${id}`);

const outputs = {
  patternType: $("#patternType"),
  patternTitle: $("#patternTitle"),
  warning: $("#warning"),
  tempoOut: $("#tempoOut"),
  metaGrid: $("#metaGrid"),
  chordChart: $("#chordChart"),
  analysisList: $("#analysisList"),
  tabOutput: $("#tabOutput"),
  fretboard: $("#fretboard"),
  positionLabel: $("#positionLabel"),
  practiceLoop: $("#practiceLoop"),
  variations: $("#variations"),
  exportOutput: $("#exportOutput")
};

let generationSeed = String(Date.now());
let lastPattern = null;

function init() {
  fillSelect(controls.mode, MODES);
  fillSelect(controls.learningGoal, labelsFromValues(OPTION_GROUPS.learningGoal));
  fillSelect(controls.key, labelsFromValues(NOTES));
  fillSelect(controls.scale, Object.fromEntries(Object.entries(SCALES).map(([key, value]) => [key, value.label])));
  fillSelect(controls.progressionStyle, labelsFromValues(OPTION_GROUPS.progressionStyle));
  fillSelect(controls.chordVoicing, labelsFromValues(OPTION_GROUPS.chordVoicing));
  fillSelect(controls.tuning, Object.fromEntries(Object.entries(TUNINGS).map(([key, value]) => [key, value.label])));
  fillSelect(controls.positionStrategy, labelsFromValues(OPTION_GROUPS.positionStrategy));
  fillSelect(controls.direction, labelsFromValues(OPTION_GROUPS.sequence));
  fillSelect(controls.feel, Object.fromEntries(Object.entries(FEELS).map(([key, value]) => [key, value.label])));
  fillSelect(controls.picking, labelsFromValues(OPTION_GROUPS.picking));
  fillSelect(controls.articulation, labelsFromValues(OPTION_GROUPS.articulation));
  fillSelect(controls.dynamics, labelsFromValues(OPTION_GROUPS.dynamics));
  fillSelect(controls.tone, labelsFromValues(OPTION_GROUPS.tone));

  controls.key.value = "A";
  controls.scale.value = "minorPentatonic";
  controls.mode.value = "mixed";
  controls.feel.value = "straight8";
  controls.progressionStyle.value = "diatonic";
  controls.chordVoicing.value = "triads";
  controls.learningGoal.value = "timing";
  controls.tuning.value = "standard";
  controls.positionStrategy.value = "box";
  controls.direction.value = "linear";
  controls.picking.value = "alternate";
  controls.articulation.value = "let-ring";
  controls.dynamics.value = "even";
  controls.tone.value = "clean";

  renderStringPicker();
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

  controls.tuning.addEventListener("change", () => {
    renderStringPicker();
    render();
  });

  document.addEventListener("input", (event) => {
    if (event.target === controls.difficulty) $("#difficultyLabel").textContent = controls.difficulty.value;
    if (event.target === controls.density) $("#densityLabel").textContent = controls.density.value;
    if (event.target === controls.restRate) $("#restRateLabel").textContent = controls.restRate.value;
    if (event.target.matches("input, select")) render();
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

function getConfig() {
  const strings = [...document.querySelectorAll("#stringPicker input:checked")].map((input) => Number(input.value));
  return {
    mode: controls.mode.value,
    learningGoal: controls.learningGoal.value,
    minutes: Number(controls.minutes.value),
    difficulty: Number(controls.difficulty.value),
    density: Number(controls.density.value),
    key: controls.key.value,
    scale: controls.scale.value,
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
  outputs.patternType.textContent = pattern.typeLabel;
  outputs.patternTitle.textContent = pattern.title;
  outputs.warning.textContent = pattern.warning;
  outputs.tempoOut.textContent = pattern.config.tempo;
  outputs.positionLabel.textContent = pattern.positionLabel;
  outputs.tabOutput.textContent = pattern.tab;
  outputs.chordChart.textContent = pattern.chordChart;
  outputs.exportOutput.textContent = pattern.exportText;
  outputs.practiceLoop.innerHTML = pattern.practiceLoop.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  outputs.variations.innerHTML = pattern.variations.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  outputs.analysisList.innerHTML = pattern.analysis.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  renderMeta(pattern);
  renderFretboard(pattern);
}

function renderMeta(pattern) {
  const config = pattern.config;
  const meta = [
    ["Focus", pattern.typeLabel],
    ["Theory", `${config.key} ${SCALES[config.scale].label}`],
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

function surprise() {
  generationSeed = String(Date.now() + Math.random());
  setRandom("mode", Object.keys(MODES));
  setRandom("learningGoal", OPTION_GROUPS.learningGoal);
  setRandom("key", NOTES);
  setRandom("scale", Object.keys(SCALES));
  setRandom("progressionStyle", OPTION_GROUPS.progressionStyle);
  setRandom("chordVoicing", OPTION_GROUPS.chordVoicing);
  setRandom("tuning", Object.keys(TUNINGS));
  renderStringPicker();
  setRandom("positionStrategy", OPTION_GROUPS.positionStrategy);
  setRandom("direction", OPTION_GROUPS.sequence);
  setRandom("feel", Object.keys(FEELS));
  setRandom("picking", OPTION_GROUPS.picking);
  setRandom("articulation", OPTION_GROUPS.articulation);
  setRandom("dynamics", OPTION_GROUPS.dynamics);
  setRandom("tone", OPTION_GROUPS.tone);
  controls.fretStart.value = Math.floor(Math.random() * 10);
  controls.fretSpan.value = 3 + Math.floor(Math.random() * 8);
  controls.difficulty.value = 1 + Math.floor(Math.random() * 10);
  controls.density.value = 1 + Math.floor(Math.random() * 10);
  controls.tempo.value = 55 + Math.floor(Math.random() * 115);
  controls.tempoRamp.value = Math.floor(Math.random() * 18);
  controls.bars.value = 2 + Math.floor(Math.random() * 7);
  controls.minutes.value = 8 + Math.floor(Math.random() * 22);
  controls.swing.value = Math.floor(Math.random() * 45);
  controls.restRate.value = Math.floor(Math.random() * 30);
  $("#difficultyLabel").textContent = controls.difficulty.value;
  $("#densityLabel").textContent = controls.density.value;
  $("#restRateLabel").textContent = controls.restRate.value;
  const stringInputs = [...document.querySelectorAll("#stringPicker input")];
  const start = Math.floor(Math.random() * Math.max(1, stringInputs.length - 2));
  stringInputs.forEach((input, index) => {
    input.checked = index >= start && index < start + Math.min(4, stringInputs.length);
  });
  render();
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
  controls[id].value = values[Math.floor(Math.random() * values.length)];
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
