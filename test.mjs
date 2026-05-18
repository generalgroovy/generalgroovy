import assert from "node:assert/strict";
import { NOTES, buildFretOptions, generatePattern, seededRandom } from "./generator.js";

const baseConfig = {
  mode: "riff",
  key: "E",
  scale: "minorPentatonic",
  strings: [2, 3, 4, 5],
  fretStart: 0,
  fretSpan: 5,
  difficulty: 3,
  tempo: 100,
  bars: 4,
  feel: "sixteenths"
};

const positions = buildFretOptions(baseConfig);
assert.ok(positions.length > 0, "scale positions should be generated");
assert.ok(positions.every((position) => baseConfig.strings.includes(position.stringIndex)), "positions stay on selected strings");
assert.ok(positions.every((position) => position.fret >= 0 && position.fret <= 5), "positions stay inside fret window");

const pattern = generatePattern(baseConfig);
assert.equal(pattern.config.key, "E");
assert.equal(pattern.mode, "riff");
assert.ok(pattern.notes.length >= 16, "riff should create a playable phrase");
assert.ok(pattern.tab.includes("E|"), "tab should render standard tuning lines");
assert.ok(pattern.practiceLoop.length >= 5, "practice loop should contain actionable steps");
assert.ok(pattern.variation.includes("Progression color"), "variation should include harmonic context");

const chordPattern = generatePattern({ ...baseConfig, mode: "chords", includeChords: true });
assert.equal(chordPattern.mode, "chords");
assert.ok(chordPattern.progression.length >= 2, "chord mode should produce a progression");
assert.ok(chordPattern.notes.length > 0, "chord mode should produce voicing tones");

const first = seededRandom("same-seed")();
const second = seededRandom("same-seed")();
assert.equal(first, second, "seeded random should be deterministic");

assert.deepEqual(NOTES.slice(0, 3), ["C", "C#", "D"]);
console.log("All generator tests passed.");
