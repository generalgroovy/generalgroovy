import assert from "node:assert/strict";
import {
  FEELS,
  MODES,
  NOTES,
  OPTION_GROUPS,
  SCALES,
  TUNINGS,
  buildFretOptions,
  generatePattern,
  normalizeConfig,
  seededRandom
} from "./generator.js";

const baseConfig = {
  mode: "riff",
  key: "E",
  scale: "minorPentatonic",
  tuning: "dropD",
  capo: 0,
  strings: [2, 3, 4, 5],
  fretStart: 0,
  fretSpan: 5,
  maxFrets: 24,
  difficulty: 5,
  density: 6,
  tempo: 100,
  tempoRamp: 10,
  bars: 4,
  minutes: 16,
  feel: "straight16",
  meter: "4/4",
  picking: "alternate",
  articulation: "palm-muted",
  dynamics: "accent-every-third",
  progressionStyle: "twelve-bar",
  chordVoicing: "sevenths",
  positionStrategy: "box",
  direction: "call-response",
  learningGoal: "timing",
  includeChords: true,
  includeTechnique: true,
  includeTheory: true,
  seed: "test"
};

const normalized = normalizeConfig(baseConfig);
assert.equal(normalized.scale, "minorPentatonic");
assert.equal(normalized.tuning, "dropD");
assert.equal(normalized.difficulty, 5);

const positions = buildFretOptions(baseConfig);
assert.ok(positions.length > 0, "scale positions should be generated");
assert.ok(positions.every((position) => baseConfig.strings.includes(position.stringIndex)), "positions stay on selected strings");
assert.ok(positions.every((position) => position.fret >= 0 && position.fret <= 5), "positions stay inside fret window");

const pattern = generatePattern(baseConfig);
assert.equal(pattern.config.key, "E");
assert.equal(pattern.mode, "riff");
assert.ok(pattern.notes.length >= 8, "riff should create a playable phrase");
assert.ok(pattern.tab.includes("D|"), "tab should render selected tuning lines");
assert.ok(pattern.chordChart.includes("twelve-bar"), "chord chart should include progression style");
assert.ok(pattern.practiceLoop.length >= 5, "practice loop should contain actionable steps");
assert.ok(pattern.variations.length >= 4, "variations should include multiple creative uses");
assert.ok(pattern.exportText.includes("## Practice Loop"), "export should include a markdown session card");
assert.ok(pattern.analysis.some((item) => item.includes("Theory")), "analysis should include theory context");

const chordPattern = generatePattern({ ...baseConfig, mode: "chords", chordVoicing: "drop-2" });
assert.equal(chordPattern.mode, "chords");
assert.ok(chordPattern.progression.length >= 2, "chord mode should produce a progression");
assert.ok(chordPattern.notes.length > 0, "chord mode should produce voicing tones");

const openStringPattern = generatePattern({
  ...baseConfig,
  mode: "fretboard",
  tuning: "dadgad",
  allowOpenStrings: true,
  strings: [0, 1, 2, 3, 4, 5],
  fretStart: 7,
  fretSpan: 4
});
assert.equal(openStringPattern.config.tuning, "dadgad");
assert.ok(openStringPattern.fretboard.positions.some((note) => note.fret === 0), "open-string mode should include fret 0 options");

for (const mode of Object.keys(MODES)) {
  const generated = generatePattern({ ...baseConfig, mode, seed: `mode-${mode}` });
  assert.ok(generated.title.length > 0, `${mode} should produce a title`);
  assert.ok(generated.exportText.includes("## Tab"), `${mode} should export tab`);
}

for (const scale of Object.keys(SCALES)) {
  const generated = generatePattern({ ...baseConfig, scale, seed: `scale-${scale}` });
  assert.equal(generated.config.scale, scale, `${scale} should normalize`);
}

for (const tuning of Object.keys(TUNINGS)) {
  const generated = generatePattern({ ...baseConfig, tuning, strings: [0, 1, 2, 3, 4, 5], seed: `tuning-${tuning}` });
  assert.equal(generated.config.tuning, tuning, `${tuning} should normalize`);
}

for (const feel of Object.keys(FEELS)) {
  const generated = generatePattern({ ...baseConfig, feel, seed: `feel-${feel}` });
  assert.equal(generated.config.feel, feel, `${feel} should normalize`);
  assert.ok(generated.rhythm.length > 0, `${feel} should create rhythm`);
}

for (const key of ["picking", "articulation", "dynamics", "sequence", "positionStrategy", "progressionStyle", "chordVoicing", "learningGoal"]) {
  assert.ok(OPTION_GROUPS[key].length >= 5, `${key} should expose a useful option range`);
}

const first = seededRandom("same-seed")();
const second = seededRandom("same-seed")();
assert.equal(first, second, "seeded random should be deterministic");

assert.deepEqual(NOTES.slice(0, 3), ["C", "C#", "D"]);
console.log("All generator tests passed.");
