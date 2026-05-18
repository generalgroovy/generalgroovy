import { NOTES, SCALES, STANDARD_TUNING, buildFretOptions, generatePattern } from "./generator.js";

const $ = (selector) => document.querySelector(selector);

const controls = {
  mode: $("#mode"),
  key: $("#key"),
  scale: $("#scale"),
  fretStart: $("#fretStart"),
  fretSpan: $("#fretSpan"),
  difficulty: $("#difficulty"),
  tempo: $("#tempo"),
  bars: $("#bars"),
  feel: $("#feel"),
  includeChords: $("#includeChords"),
  includeTechnique: $("#includeTechnique")
};

const outputs = {
  sessionPill: $("#sessionPill"),
  patternType: $("#patternType"),
  patternTitle: $("#patternTitle"),
  tempoOut: $("#tempoOut"),
  metaGrid: $("#metaGrid"),
  tabOutput: $("#tabOutput"),
  fretboard: $("#fretboard"),
  positionLabel: $("#positionLabel"),
  practiceLoop: $("#practiceLoop"),
  variation: $("#variation")
};

let generationSeed = String(Date.now());

function init() {
  controls.key.innerHTML = NOTES.map((note) => `<option value="${note}">${note}</option>`).join("");
  controls.key.value = "A";
  $("#stringPicker").innerHTML = STANDARD_TUNING.map((string, index) => `
    <label title="${string.name} string">
      <input type="checkbox" value="${index}" checked>
      ${string.name}
    </label>
  `).join("");

  document.addEventListener("input", (event) => {
    if (event.target === controls.difficulty) {
      $("#difficultyLabel").textContent = controls.difficulty.value;
    }
  });

  $("#generateBtn").addEventListener("click", () => {
    generationSeed = String(Date.now() + Math.random());
    render();
  });
  $("#randomizeBtn").addEventListener("click", surprise);
  $("#copyTabBtn").addEventListener("click", copyTab);
  render();
}

function getConfig() {
  const strings = [...document.querySelectorAll("#stringPicker input:checked")].map((input) => Number(input.value));
  return {
    mode: controls.mode.value,
    key: controls.key.value,
    scale: controls.scale.value,
    strings,
    fretStart: Number(controls.fretStart.value),
    fretSpan: Number(controls.fretSpan.value),
    difficulty: Number(controls.difficulty.value),
    tempo: Number(controls.tempo.value),
    bars: Number(controls.bars.value),
    feel: controls.feel.value,
    includeChords: controls.includeChords.checked,
    includeTechnique: controls.includeTechnique.checked,
    seed: generationSeed
  };
}

function render() {
  const pattern = generatePattern(getConfig());
  outputs.sessionPill.textContent = `${pattern.config.key} ${SCALES[pattern.config.scale].label} at ${pattern.config.tempo} BPM`;
  outputs.patternType.textContent = pattern.typeLabel;
  outputs.patternTitle.textContent = pattern.title;
  outputs.tempoOut.textContent = pattern.config.tempo;
  outputs.positionLabel.textContent = pattern.positionLabel;
  outputs.tabOutput.textContent = pattern.tab;
  outputs.variation.textContent = pattern.variation;
  outputs.practiceLoop.innerHTML = pattern.practiceLoop.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  renderMeta(pattern);
  renderFretboard(pattern);
}

function renderMeta(pattern) {
  const meta = [
    ["Scale", SCALES[pattern.config.scale].label],
    ["Strings", pattern.config.strings.map((index) => STANDARD_TUNING[index].name).join(" ")],
    ["Progression", pattern.progression.join(" - ")],
    ["Constraint", pattern.technique]
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
  const allScalePositions = buildFretOptions(config);
  const played = new Set(pattern.notes.map((note) => `${note.stringIndex}:${note.fret}`));
  const frets = Array.from({ length: 13 }, (_, index) => config.fretStart + index);
  const cells = [`<div class="fret-cell string-name">#</div>`];

  for (const fret of frets) {
    cells.push(`<div class="fret-cell">${fret}</div>`);
  }

  for (const [stringIndex, string] of STANDARD_TUNING.entries()) {
    cells.push(`<div class="fret-cell string-name">${string.name}</div>`);
    for (const fret of frets) {
      const scaleNote = allScalePositions.find((note) => note.stringIndex === stringIndex && note.fret === fret);
      const isPlayed = played.has(`${stringIndex}:${fret}`);
      const classes = ["fret-cell"];
      if (isPlayed) classes.push("active");
      if (scaleNote?.isRoot) classes.push("root");
      if (pattern.mode === "chords" && isPlayed) classes.push("chord");
      cells.push(`<div class="${classes.join(" ")}" data-note="${scaleNote?.note || ""}"></div>`);
    }
  }

  outputs.fretboard.innerHTML = cells.join("");
}

function surprise() {
  generationSeed = String(Date.now() + Math.random());
  controls.mode.value = pick(["mixed", "picking", "riff", "chords", "ear"]);
  controls.key.value = pick(NOTES);
  controls.scale.value = pick(Object.keys(SCALES));
  controls.fretStart.value = Math.floor(Math.random() * 10);
  controls.fretSpan.value = 3 + Math.floor(Math.random() * 6);
  controls.difficulty.value = 1 + Math.floor(Math.random() * 5);
  controls.tempo.value = 70 + Math.floor(Math.random() * 70);
  controls.bars.value = 2 + Math.floor(Math.random() * 5);
  controls.feel.value = pick(["straight", "sixteenths", "triplet", "syncopated", "shuffle"]);
  $("#difficultyLabel").textContent = controls.difficulty.value;
  const stringInputs = [...document.querySelectorAll("#stringPicker input")];
  const start = Math.floor(Math.random() * 3);
  stringInputs.forEach((input, index) => {
    input.checked = index >= start && index < start + 4;
  });
  render();
}

async function copyTab() {
  await navigator.clipboard.writeText(outputs.tabOutput.textContent);
  const button = $("#copyTabBtn");
  button.textContent = "Copied";
  window.setTimeout(() => {
    button.textContent = "Copy";
  }, 900);
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

init();
