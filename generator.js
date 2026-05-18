export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export const STANDARD_TUNING = [
  { name: "e", midi: 64 },
  { name: "B", midi: 59 },
  { name: "G", midi: 55 },
  { name: "D", midi: 50 },
  { name: "A", midi: 45 },
  { name: "E", midi: 40 }
];

export const SCALES = {
  minorPentatonic: { label: "Minor pentatonic", intervals: [0, 3, 5, 7, 10] },
  majorPentatonic: { label: "Major pentatonic", intervals: [0, 2, 4, 7, 9] },
  naturalMinor: { label: "Natural minor", intervals: [0, 2, 3, 5, 7, 8, 10] },
  major: { label: "Major", intervals: [0, 2, 4, 5, 7, 9, 11] },
  dorian: { label: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
  mixolydian: { label: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
  blues: { label: "Blues", intervals: [0, 3, 5, 6, 7, 10] }
};

const CHORD_QUALITIES = {
  major: ["maj7", "m7", "m7", "maj7", "7", "m7", "m7b5"],
  naturalMinor: ["m7", "m7b5", "maj7", "m7", "m7", "maj7", "7"],
  minorPentatonic: ["m7", "sus4", "m7", "7sus4", "maj6"],
  majorPentatonic: ["maj6", "sus2", "m7", "6/9", "m7"],
  dorian: ["m9", "m7", "maj7", "7", "m7", "m7b5", "maj7"],
  mixolydian: ["7", "m7", "m7b5", "maj7", "m7", "m7", "maj7"],
  blues: ["7#9", "m7", "7", "dim7", "7", "m7"]
};

const FEELS = {
  straight: ["1", "&", "2", "&", "3", "&", "4", "&"],
  sixteenths: ["1e", "&a", "2e", "&a", "3e", "&a", "4e", "&a"],
  triplet: ["1-trip-let", "2-trip-let", "3-trip-let", "4-trip-let"],
  syncopated: ["1", "a", "&", "2", "&", "a", "4", "&"],
  shuffle: ["1", "uh", "2", "uh", "3", "uh", "4", "uh"]
};

const TECHNIQUES = [
  "strict alternate picking",
  "economy pick through string changes",
  "hybrid pick the top string",
  "palm mute beats 1 and 3",
  "accent every third note",
  "slide into the first root",
  "use legato only on descending notes",
  "staccato release after each chord"
];

const TITLES = {
  picking: ["String-Crossing Ladder", "Accent Engine", "Inside-Outside Picking Circuit"],
  riff: ["Box-Breaker Riff", "Call-and-Answer Cell", "Diagonal Hook Builder"],
  chords: ["Voice-Leading Loop", "Pocket Progression", "Cadence Transformer"],
  ear: ["Hear-It-Then-Fret-It", "Interval Response Drill", "Motif Recall Loop"],
  mixed: ["Full-Spectrum Groove", "Daily Circuit", "Pocket Builder"]
};

export function noteName(midi) {
  return NOTES[((midi % 12) + 12) % 12];
}

export function seededRandom(seedText) {
  let seed = 2166136261;
  for (const char of seedText) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  return () => {
    seed += 0x6D2B79F5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildFretOptions({ key = "A", scale = "minorPentatonic", strings = [0, 1, 2, 3, 4, 5], fretStart = 3, fretSpan = 5 }) {
  const root = NOTES.indexOf(key);
  const intervals = SCALES[scale].intervals;
  const allowed = new Set(intervals.map((interval) => (root + interval) % 12));
  const fretEnd = Math.min(24, fretStart + fretSpan);
  const options = [];

  for (const stringIndex of strings) {
    const string = STANDARD_TUNING[stringIndex];
    for (let fret = fretStart; fret <= fretEnd; fret += 1) {
      const pitch = (string.midi + fret) % 12;
      if (allowed.has(pitch)) {
        options.push({
          stringIndex,
          string: string.name,
          fret,
          note: NOTES[pitch],
          degree: intervals.indexOf((pitch - root + 12) % 12) + 1,
          isRoot: pitch === root
        });
      }
    }
  }

  return options;
}

export function generatePattern(config = {}) {
  const normalized = normalizeConfig(config);
  const rand = seededRandom(JSON.stringify(normalized));
  const mode = normalized.mode === "mixed" ? pick(["picking", "riff", "chords", "ear"], rand) : normalized.mode;
  const fretOptions = buildFretOptions(normalized);
  const phraseLength = Math.max(4, normalized.bars * (normalized.feel === "triplet" ? 6 : 8));
  const notes = mode === "chords"
    ? generateChordTones(normalized, fretOptions, rand)
    : generateMelodicLine(normalized, fretOptions, phraseLength, rand);
  const progression = makeProgression(normalized, rand);
  const technique = normalized.includeTechnique ? pick(TECHNIQUES, rand) : "clean tone, even time";
  const title = `${normalized.key} ${SCALES[normalized.scale].label} ${pick(TITLES[mode], rand)}`;
  const tab = renderTab(notes, normalized);

  return {
    config: normalized,
    mode,
    title,
    typeLabel: labelForMode(mode),
    notes,
    progression,
    technique,
    tab,
    rhythm: FEELS[normalized.feel],
    positionLabel: `Frets ${normalized.fretStart}-${normalized.fretStart + normalized.fretSpan}`,
    variation: makeVariation(mode, normalized, progression, technique, rand),
    practiceLoop: makePracticeLoop(normalized, mode, technique, progression)
  };
}

function normalizeConfig(config) {
  const strings = Array.isArray(config.strings) && config.strings.length ? config.strings : [0, 1, 2, 3, 4, 5];
  return {
    seed: String(config.seed || ""),
    mode: config.mode || "mixed",
    key: NOTES.includes(config.key) ? config.key : "A",
    scale: SCALES[config.scale] ? config.scale : "minorPentatonic",
    strings: strings.map(Number).filter((index) => index >= 0 && index < STANDARD_TUNING.length),
    fretStart: clamp(Number(config.fretStart ?? 3), 0, 18),
    fretSpan: clamp(Number(config.fretSpan ?? 5), 3, 8),
    difficulty: clamp(Number(config.difficulty ?? 3), 1, 5),
    tempo: clamp(Number(config.tempo ?? 92), 45, 220),
    bars: clamp(Number(config.bars ?? 4), 1, 8),
    feel: FEELS[config.feel] ? config.feel : "straight",
    includeChords: config.includeChords !== false,
    includeTechnique: config.includeTechnique !== false
  };
}

function generateMelodicLine(config, fretOptions, length, rand) {
  if (!fretOptions.length) return [];
  const line = [];
  const sorted = [...fretOptions].sort((a, b) => a.stringIndex - b.stringIndex || a.fret - b.fret);
  let current = pick(sorted, rand);
  const maxJump = config.difficulty + 1;

  for (let index = 0; index < length; index += 1) {
    const candidates = sorted.filter((note) => {
      const fretDistance = Math.abs(note.fret - current.fret);
      const stringDistance = Math.abs(note.stringIndex - current.stringIndex);
      return fretDistance + stringDistance <= maxJump + (index % 7 === 0 ? 2 : 0);
    });
    current = pick(candidates.length ? candidates : sorted, rand);
    line.push({ ...current, step: index, accent: index % accentEvery(config) === 0 });
  }

  return line;
}

function generateChordTones(config, fretOptions, rand) {
  const roots = fretOptions.filter((note) => note.isRoot);
  const base = roots.length ? roots : fretOptions;
  const notes = [];
  const density = Math.max(2, Math.min(4, config.difficulty));

  for (let bar = 0; bar < config.bars; bar += 1) {
    const anchor = pick(base, rand);
    const chord = fretOptions
      .filter((note) => Math.abs(note.fret - anchor.fret) <= config.fretSpan && Math.abs(note.stringIndex - anchor.stringIndex) <= 3)
      .slice(0, density + 2);
    for (const note of chord.slice(0, density)) {
      notes.push({ ...note, step: notes.length, accent: note.isRoot });
    }
  }

  return notes;
}

function makeProgression(config, rand) {
  const degreesByScale = {
    major: ["I", "ii", "iii", "IV", "V", "vi"],
    naturalMinor: ["i", "iv", "v", "VI", "VII"],
    minorPentatonic: ["i", "bIII", "IV", "v", "bVII"],
    majorPentatonic: ["I", "ii", "iii", "V", "vi"],
    dorian: ["i", "IV", "v", "bVII"],
    mixolydian: ["I", "bVII", "IV", "v"],
    blues: ["I7", "IV7", "V7", "bIII7"]
  };
  const degrees = degreesByScale[config.scale];
  const qualities = CHORD_QUALITIES[config.scale];
  const length = config.includeChords ? Math.min(4, Math.max(2, config.bars)) : 2;
  const progression = [];

  for (let i = 0; i < length; i += 1) {
    const degreeIndex = Math.floor(rand() * degrees.length);
    progression.push(`${degrees[degreeIndex]} ${qualities[degreeIndex % qualities.length]}`);
  }

  return progression;
}

function renderTab(notes, config) {
  const slots = Math.max(notes.length, 8);
  const lines = STANDARD_TUNING.map((string, stringIndex) => {
    let line = `${string.name}|`;
    for (let slot = 0; slot < slots; slot += 1) {
      const note = notes.find((item) => item.step === slot && item.stringIndex === stringIndex);
      const value = note ? String(note.fret).padEnd(2, "-") : "--";
      line += `${value}-`;
    }
    return `${line}|`;
  });
  const beatLine = `  ${FEELS[config.feel].join("  ")} | loop ${config.bars} bars`;
  return `${lines.join("\n")}\n${beatLine}`;
}

function makePracticeLoop(config, mode, technique, progression) {
  const slow = Math.max(45, config.tempo - 20);
  const fast = Math.min(220, config.tempo + 12);
  const focus = mode === "ear"
    ? "sing each target note before fretting it"
    : mode === "chords"
      ? "connect the top note of each chord by the smallest possible motion"
      : "keep both hands relaxed through every string change";

  return [
    `Clap or count the ${humanFeel(config.feel)} pulse at ${slow} BPM.`,
    `Play the written pattern twice with ${technique}.`,
    `Loop ${progression.join(" - ")} and keep the same rhythmic cell.`,
    `Raise to ${config.tempo} BPM, then ${fast} BPM only when the accents stay even.`,
    `Transpose the idea up one octave or across a neighboring string set.`
  ].map((item, index) => index === 1 ? `${item} Main focus: ${focus}.` : item);
}

function makeVariation(mode, config, progression, technique, rand) {
  const endings = [
    "leave a two-beat rest after the last note and answer it with a new phrase",
    "reverse the contour while keeping the picking direction identical",
    "move only one note per bar and listen for the changed tension",
    "turn the final two notes into a bend-and-release target",
    "record one pass, then harmonize it a third above"
  ];
  const modePrompt = {
    picking: "Convert the line into a mechanical warmup by freezing the fretting hand and changing only the pick strokes.",
    riff: "Treat the first bar as the hook, then mutate the last bar until it sounds like a reply.",
    chords: "Keep the bass note steady while the upper voices follow the generated progression.",
    ear: "Look away from the fretboard, sing the next note, then check it against the tab.",
    mixed: "Split the workout into tone, timing, and fretboard-awareness passes."
  };

  return `${modePrompt[mode]} For this pass, ${pick(endings, rand)}. Constraint: ${technique}. Progression color: ${progression.join(" - ")}.`;
}

function labelForMode(mode) {
  return {
    picking: "Picking pattern",
    riff: "Riff generator",
    chords: "Chord movement",
    ear: "Ear-to-hands",
    mixed: "Mixed workout"
  }[mode];
}

function humanFeel(feel) {
  return {
    straight: "straight eighth-note",
    sixteenths: "sixteenth-note",
    triplet: "triplet",
    syncopated: "syncopated",
    shuffle: "shuffle"
  }[feel];
}

function accentEvery(config) {
  return config.feel === "triplet" ? 3 : Math.max(2, 6 - config.difficulty);
}

function pick(items, rand) {
  return items[Math.floor(rand() * items.length)];
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}
