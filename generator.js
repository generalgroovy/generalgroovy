export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const TUNINGS = {
  standard: {
    label: "Standard",
    strings: [
      { name: "e", midi: 64 },
      { name: "B", midi: 59 },
      { name: "G", midi: 55 },
      { name: "D", midi: 50 },
      { name: "A", midi: 45 },
      { name: "E", midi: 40 }
    ]
  },
  dropD: {
    label: "Drop D",
    strings: [
      { name: "e", midi: 64 },
      { name: "B", midi: 59 },
      { name: "G", midi: 55 },
      { name: "D", midi: 50 },
      { name: "A", midi: 45 },
      { name: "D", midi: 38 }
    ]
  },
  dadgad: {
    label: "DADGAD",
    strings: [
      { name: "D", midi: 62 },
      { name: "A", midi: 57 },
      { name: "G", midi: 55 },
      { name: "D", midi: 50 },
      { name: "A", midi: 45 },
      { name: "D", midi: 38 }
    ]
  },
  openG: {
    label: "Open G",
    strings: [
      { name: "D", midi: 62 },
      { name: "B", midi: 59 },
      { name: "G", midi: 55 },
      { name: "D", midi: 50 },
      { name: "G", midi: 43 },
      { name: "D", midi: 38 }
    ]
  },
  allFourths: {
    label: "All fourths",
    strings: [
      { name: "F", midi: 65 },
      { name: "C", midi: 60 },
      { name: "G", midi: 55 },
      { name: "D", midi: 50 },
      { name: "A", midi: 45 },
      { name: "E", midi: 40 }
    ]
  },
  baritone: {
    label: "Baritone B",
    strings: [
      { name: "B", midi: 59 },
      { name: "F#", midi: 54 },
      { name: "D", midi: 50 },
      { name: "A", midi: 45 },
      { name: "E", midi: 40 },
      { name: "B", midi: 35 }
    ]
  },
  sevenString: {
    label: "7-string standard",
    strings: [
      { name: "e", midi: 64 },
      { name: "B", midi: 59 },
      { name: "G", midi: 55 },
      { name: "D", midi: 50 },
      { name: "A", midi: 45 },
      { name: "E", midi: 40 },
      { name: "B", midi: 35 }
    ]
  },
  eightString: {
    label: "8-string F#",
    strings: [
      { name: "e", midi: 64 },
      { name: "B", midi: 59 },
      { name: "G", midi: 55 },
      { name: "D", midi: 50 },
      { name: "A", midi: 45 },
      { name: "E", midi: 40 },
      { name: "B", midi: 35 },
      { name: "F#", midi: 30 }
    ]
  },
  openD: {
    label: "Open D",
    strings: [
      { name: "D", midi: 62 },
      { name: "A", midi: 57 },
      { name: "F#", midi: 54 },
      { name: "D", midi: 50 },
      { name: "A", midi: 45 },
      { name: "D", midi: 38 }
    ]
  },
  nashville: {
    label: "Nashville high-strung",
    strings: [
      { name: "e", midi: 64 },
      { name: "B", midi: 59 },
      { name: "G", midi: 67 },
      { name: "D", midi: 62 },
      { name: "A", midi: 57 },
      { name: "E", midi: 52 }
    ]
  },
  newStandard: {
    label: "New standard",
    strings: [
      { name: "G", midi: 67 },
      { name: "E", midi: 64 },
      { name: "A", midi: 57 },
      { name: "D", midi: 50 },
      { name: "G", midi: 43 },
      { name: "C", midi: 36 }
    ]
  }
};

export const STANDARD_TUNING = TUNINGS.standard.strings;

export const SCALES = {
  chromatic: { label: "Chromatic", intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  major: { label: "Major", intervals: [0, 2, 4, 5, 7, 9, 11] },
  naturalMinor: { label: "Natural minor", intervals: [0, 2, 3, 5, 7, 8, 10] },
  harmonicMinor: { label: "Harmonic minor", intervals: [0, 2, 3, 5, 7, 8, 11] },
  melodicMinor: { label: "Melodic minor", intervals: [0, 2, 3, 5, 7, 9, 11] },
  dorian: { label: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
  phrygian: { label: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10] },
  lydian: { label: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11] },
  mixolydian: { label: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
  locrian: { label: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10] },
  majorPentatonic: { label: "Major pentatonic", intervals: [0, 2, 4, 7, 9] },
  minorPentatonic: { label: "Minor pentatonic", intervals: [0, 3, 5, 7, 10] },
  blues: { label: "Blues", intervals: [0, 3, 5, 6, 7, 10] },
  wholeTone: { label: "Whole tone", intervals: [0, 2, 4, 6, 8, 10] },
  diminished: { label: "Diminished", intervals: [0, 2, 3, 5, 6, 8, 9, 11] },
  altered: { label: "Altered dominant", intervals: [0, 1, 3, 4, 6, 8, 10] },
  doubleHarmonic: { label: "Double harmonic", intervals: [0, 1, 4, 5, 7, 8, 11] },
  japanese: { label: "Japanese Hirajoshi", intervals: [0, 2, 3, 7, 8] },
  inSen: { label: "In sen", intervals: [0, 1, 5, 7, 10] },
  iwato: { label: "Iwato", intervals: [0, 1, 5, 6, 10] },
  persian: { label: "Persian", intervals: [0, 1, 4, 5, 6, 8, 11] },
  enigmatic: { label: "Enigmatic", intervals: [0, 1, 4, 6, 8, 10, 11] },
  neapolitanMinor: { label: "Neapolitan minor", intervals: [0, 1, 3, 5, 7, 8, 11] },
  hungarianMinor: { label: "Hungarian minor", intervals: [0, 2, 3, 6, 7, 8, 11] },
  prometheus: { label: "Prometheus", intervals: [0, 2, 4, 6, 9, 10] },
  tritone: { label: "Tritone", intervals: [0, 1, 4, 6, 7, 10] },
  messiaen3: { label: "Messiaen mode 3", intervals: [0, 2, 3, 4, 6, 7, 8, 10, 11] },
  messiaen4: { label: "Messiaen mode 4", intervals: [0, 1, 2, 5, 6, 7, 8, 11] },
  lydianDominant: { label: "Lydian dominant", intervals: [0, 2, 4, 6, 7, 9, 10] },
  majorBebop: { label: "Major bebop", intervals: [0, 2, 4, 5, 7, 8, 9, 11] },
  dominantBebop: { label: "Dominant bebop", intervals: [0, 2, 4, 5, 7, 9, 10, 11] },
  minorSixDiminished: { label: "Minor 6 diminished", intervals: [0, 2, 3, 5, 7, 8, 9, 11] },
  allIntervalTetrachord: { label: "All-interval tetrachord", intervals: [0, 1, 4, 6] },
  hexatonicPole: { label: "Hexatonic pole", intervals: [0, 3, 4, 7, 8, 11] }
};

export const MODES = {
  mixed: "Mixed session",
  picking: "Picking",
  riff: "Riff",
  chords: "Chords",
  progression: "Progression",
  arpeggio: "Arpeggio",
  legato: "Legato",
  sweep: "Sweep",
  rhythm: "Rhythm",
  ear: "Ear training",
  fretboard: "Fretboard map",
  reading: "Reading",
  songwriting: "Songwriting"
};

export const THEORY_SYSTEMS = {
  tonal: "Functional tonal",
  modal: "Modal center",
  blues: "Blues language",
  jazz: "Jazz chord-scale",
  postTonal: "Post-tonal set theory",
  serial: "Serial row",
  negativeHarmony: "Negative harmony",
  neoRiemannian: "Neo-Riemannian transforms",
  axis: "Bartok axis",
  spectral: "Spectral approximation",
  polymodal: "Polymodal chromaticism",
  microtonal: "Microtonal approximation",
  mathematical: "Mathematical pattern"
};

export const TRANSFORMATIONS = {
  none: "None",
  inversion: "Inversion",
  retrograde: "Retrograde",
  retrogradeInversion: "Retrograde inversion",
  negative: "Negative harmony",
  parallel: "Parallel shift",
  relative: "Relative shift",
  leadingToneExchange: "Leading-tone exchange",
  chromaticPlaning: "Chromatic planing",
  augmentation: "Rhythmic augmentation",
  diminution: "Rhythmic diminution",
  rotation: "Pitch rotation"
};

export const RHYTHM_ALGORITHMS = {
  grid: "Grid",
  euclidean: "Euclidean",
  clave: "Clave",
  polymeter: "Polymeter",
  isorhythm: "Isorhythm",
  additive: "Additive",
  stochastic: "Stochastic",
  silence: "Space study"
};

export const FEELS = {
  straight8: { label: "Straight eighths", pulses: ["1", "&", "2", "&", "3", "&", "4", "&"], slotsPerBar: 8 },
  straight16: { label: "Sixteenth grid", pulses: ["1e", "&a", "2e", "&a", "3e", "&a", "4e", "&a"], slotsPerBar: 16 },
  triplet: { label: "Triplets", pulses: ["1-trip-let", "2-trip-let", "3-trip-let", "4-trip-let"], slotsPerBar: 12 },
  shuffle: { label: "Shuffle", pulses: ["1", "uh", "2", "uh", "3", "uh", "4", "uh"], slotsPerBar: 8 },
  syncopated: { label: "Syncopated", pulses: ["1", "a", "&", "2", "&", "a", "4", "&"], slotsPerBar: 8 },
  oddFive: { label: "5/4 pulse", pulses: ["1", "&", "2", "&", "3", "&", "4", "&", "5", "&"], slotsPerBar: 10 },
  oddSeven: { label: "7/8 pulse", pulses: ["1", "&", "2", "&", "3", "&", "4"], slotsPerBar: 7 },
  bossa: { label: "Bossa clave", pulses: ["1", "a", "2", "&", "3", "a", "4", "&"], slotsPerBar: 8 },
  funk16: { label: "Funk sixteenths", pulses: ["1", "e", "&", "a", "2", "e", "&", "a"], slotsPerBar: 16 }
};

export const OPTION_GROUPS = {
  tone: ["clean", "edge-of-breakup", "crunch", "high-gain", "acoustic", "nylon", "bass", "synth-like", "prepared", "ambient"],
  picking: ["alternate", "economy", "downstrokes", "upstroke-accent", "hybrid", "fingerstyle", "sweep", "tremolo"],
  articulation: ["let-ring", "staccato", "palm-muted", "legato", "slides", "hammer-ons", "pull-offs", "bends", "vibrato", "harmonics"],
  dynamics: ["even", "accent-downbeats", "accent-backbeat", "accent-every-third", "crescendo", "question-answer"],
  sequence: ["linear", "ascending", "descending", "inside-out", "outside-in", "thirds", "fourths", "triads", "enclosure", "pedal-tone", "call-response"],
  positionStrategy: ["box", "diagonal", "one-string", "three-notes-per-string", "caged", "open-position", "wide-interval"],
  progressionStyle: ["diatonic", "ii-V-I", "I-V-vi-IV", "twelve-bar", "modal-vamp", "circle-of-fifths", "minor-cadence", "secondary-dominants", "chromatic-mediants", "coltrane-cycle", "axis-cycle", "constant-structure", "set-class-cycle"],
  chordVoicing: ["triads", "sevenths", "shells", "drop-2", "quartal", "sus", "add9", "spread-triads", "power-chords", "open-strings"],
  learningGoal: ["speed", "timing", "accuracy", "fretboard", "ear", "harmony", "songwriting", "improvisation", "reading", "technique", "composition", "odd-meter", "outside-playing", "voice-leading"]
};

const DEGREE_NAMES = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "#5", "6", "b7", "7"];
const ROMAN_BY_SCALE = {
  major: ["I", "ii", "iii", "IV", "V", "vi", "vii half-dim"],
  naturalMinor: ["i", "ii half-dim", "III", "iv", "v", "VI", "VII"],
  harmonicMinor: ["i", "ii half-dim", "III+", "iv", "V", "VI", "vii dim"],
  melodicMinor: ["i", "ii", "III+", "IV", "V", "vi half-dim", "vii half-dim"],
  dorian: ["i", "ii", "bIII", "IV", "v", "vi half-dim", "bVII"],
  phrygian: ["i", "bII", "bIII", "iv", "v half-dim", "bVI", "bvii"],
  lydian: ["I", "II", "iii", "#iv half-dim", "V", "vi", "vii"],
  mixolydian: ["I", "ii", "iii half-dim", "IV", "v", "vi", "bVII"],
  locrian: ["i half-dim", "bII", "biii", "iv", "bV", "bVI", "bvii"],
  minorPentatonic: ["i", "bIII", "IV", "v", "bVII"],
  majorPentatonic: ["I", "ii", "iii", "V", "vi"],
  blues: ["I7", "bIII", "IV7", "bV", "V7", "bVII"],
  chromatic: ["I", "bII", "II", "bIII", "III", "IV", "bV", "V", "bVI", "VI", "bVII", "VII"],
  wholeTone: ["I+", "II+", "III+", "#IV+", "#V+", "bVII+"],
  diminished: ["I dim", "II dim", "bIII dim", "IV dim", "bV dim", "bVI dim", "VI dim", "VII dim"],
  altered: ["I7alt", "b9", "#9", "3", "#11", "b13", "b7"],
  doubleHarmonic: ["I", "bII", "III", "iv", "V", "bVI", "VII"],
  japanese: ["I", "II", "bIII", "V", "bVI"],
  inSen: ["I", "bII", "IV", "V", "bVII"],
  iwato: ["I", "bII", "IV", "bV", "bVII"],
  persian: ["I", "bII", "III", "IV", "bV", "bVI", "VII"],
  enigmatic: ["I", "bII", "III", "#IV", "#V", "bVII", "VII"],
  neapolitanMinor: ["i", "bII", "bIII", "iv", "V", "bVI", "VII"],
  hungarianMinor: ["i", "ii", "bIII", "#IV", "V", "bVI", "VII"],
  prometheus: ["I", "II", "III", "#IV", "VI", "bVII"],
  tritone: ["I", "bII", "III", "bV", "V", "bVII"],
  messiaen3: ["M3-1", "M3-2", "M3-3", "M3-4", "M3-5", "M3-6", "M3-7", "M3-8", "M3-9"],
  messiaen4: ["M4-1", "M4-2", "M4-3", "M4-4", "M4-5", "M4-6", "M4-7", "M4-8"],
  lydianDominant: ["I7#11", "II", "iii", "#iv half-dim", "V", "vi", "bVII"],
  majorBebop: ["I", "ii", "iii", "IV", "V", "#Vdim", "vi", "vii"],
  dominantBebop: ["I7", "ii", "iii", "IV", "V", "vi", "bVII", "VII"],
  minorSixDiminished: ["i", "ii half-dim", "bIII", "iv", "V", "bVI", "VI", "VII"],
  allIntervalTetrachord: ["0", "1", "4", "6"],
  hexatonicPole: ["I", "bIII", "III", "V", "#V", "VII"]
};

const MODE_TITLE = {
  picking: ["String-Crossing Lab", "Pick-Hand Calibration", "Accent Grid"],
  riff: ["Motif Forge", "Riff Cell Builder", "Hook Generator"],
  chords: ["Voicing Navigator", "Chord Voice-Leader", "Grip Connector"],
  progression: ["Harmony Route", "Cadence Builder", "Changes Map"],
  arpeggio: ["Arpeggio Engine", "Chord-Tone Targeter", "Outline Drill"],
  legato: ["Legato Flow", "Slur Circuit", "Left-Hand Line"],
  sweep: ["Sweep Path", "Arpeggio Roll", "Economy Cascade"],
  rhythm: ["Rhythm Machine", "Groove Etude", "Subdivision Lab"],
  ear: ["Ear-to-Hand Drill", "Interval Recall", "Hear-Then-Play"],
  fretboard: ["Fretboard Survey", "Position Finder", "Map Builder"],
  reading: ["Reading Cue", "Neck Notation Drill", "Sightline Study"],
  songwriting: ["Song Seed", "Part Builder", "Arrangement Sketch"],
  mixed: ["Complete Practice Circuit", "Daily Lab", "General Workout"]
};

const MODE_POOL = ["picking", "riff", "chords", "progression", "arpeggio", "legato", "sweep", "rhythm", "ear", "fretboard", "reading", "songwriting"];

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

export function getTuning(tuning = "standard") {
  return TUNINGS[tuning] || TUNINGS.standard;
}

export function buildFretOptions(config = {}) {
  const normalized = normalizeConfig(config);
  const root = NOTES.indexOf(normalized.key);
  const intervals = SCALES[normalized.scale].intervals;
  const allowed = new Set(intervals.map((interval) => (root + interval) % 12));
  const tuning = getTuning(normalized.tuning).strings;
  const fretEnd = Math.min(normalized.maxFrets, normalized.fretStart + normalized.fretSpan);
  const options = [];

  for (const stringIndex of normalized.strings) {
    const string = tuning[stringIndex];
    if (!string) continue;
    for (let fret = normalized.allowOpenStrings ? 0 : normalized.fretStart; fret <= fretEnd; fret += 1) {
      if (!normalized.allowOpenStrings && fret < normalized.fretStart) continue;
      if (fret > 0 && fret < normalized.fretStart) continue;
      const pitch = (string.midi + fret + normalized.capo) % 12;
      if (allowed.has(pitch)) {
        const interval = (pitch - root + 12) % 12;
        options.push({
          stringIndex,
          string: string.name,
          fret,
          note: NOTES[pitch],
          pitch,
          midi: string.midi + fret + normalized.capo,
          interval,
          degree: intervals.indexOf(interval) + 1,
          degreeName: DEGREE_NAMES[interval],
          isRoot: pitch === root
        });
      }
    }
  }

  return sortByStrategy(options, normalized);
}

export function generatePattern(config = {}) {
  const normalized = normalizeConfig(config);
  const rand = seededRandom(JSON.stringify(normalized));
  const mode = normalized.mode === "mixed" ? pick(MODE_POOL, rand) : normalized.mode;
  const fretOptions = buildFretOptions(normalized);
  const progression = makeProgression(normalized, rand);
  const noteCount = phraseLength(normalized, mode);
  const rawNotes = makeNotes(mode, normalized, fretOptions, noteCount, rand);
  const notes = applyTransformation(rawNotes, normalized);
  const rhythm = makeRhythm(normalized, Math.max(noteCount, notes.length), rand);
  const techniques = makeTechniqueStack(mode, normalized, rand);
  const title = `${normalized.key} ${SCALES[normalized.scale].label} ${pick(MODE_TITLE[mode] || MODE_TITLE.mixed, rand)}`;
  const tab = renderTab(notes, normalized, rhythm);
  const chordChart = renderChordChart(progression, normalized);
  const analysis = normalized.includeTheory
    ? makeAnalysis(mode, normalized, notes, progression, techniques)
    : [`Theory analysis disabled. Focus on ${MODES[mode]}, timing, and tone.`];
  const fretboard = makeFretboardSummary(normalized, notes);
  const practiceLoop = makePracticeLoop(normalized, mode, techniques, progression);
  const variations = makeVariations(mode, normalized, progression, techniques, rand);
  const exportText = renderExport({ normalized, mode, title, progression, tab, chordChart, analysis, practiceLoop, variations });

  return {
    config: normalized,
    mode,
    title,
    typeLabel: MODES[mode],
    notes,
    progression,
    techniques,
    technique: techniques.join(", "),
    rhythm,
    tab,
    chordChart,
    analysis,
    fretboard,
    positionLabel: fretboard.label,
    practiceLoop,
    variations,
    variation: variations[0],
    exportText,
    warning: fretOptions.length ? "" : "No notes found for that fret/string window. Enable open strings, widen the fret span, or choose more strings."
  };
}

export function normalizeConfig(config = {}) {
  const tuningKey = TUNINGS[config.tuning] ? config.tuning : "standard";
  const tuning = getTuning(tuningKey).strings;
  const strings = Array.isArray(config.strings) && config.strings.length ? config.strings : tuning.map((_, index) => index);
  const scale = SCALES[config.scale] ? config.scale : "minorPentatonic";
  const mode = MODES[config.mode] ? config.mode : "mixed";
  return {
    seed: String(config.seed || ""),
    mode,
    key: NOTES.includes(config.key) ? config.key : "A",
    scale,
    tuning: tuningKey,
    capo: clamp(Number(config.capo ?? 0), 0, 12),
    strings: unique(strings.map(Number).filter((index) => index >= 0 && index < tuning.length)),
    fretStart: clamp(Number(config.fretStart ?? 3), 0, 22),
    fretSpan: clamp(Number(config.fretSpan ?? 5), 1, 12),
    maxFrets: clamp(Number(config.maxFrets ?? 24), 12, 36),
    allowOpenStrings: config.allowOpenStrings === true,
    difficulty: clamp(Number(config.difficulty ?? 3), 1, 10),
    density: clamp(Number(config.density ?? 5), 1, 10),
    tempo: clamp(Number(config.tempo ?? 92), 30, 260),
    tempoRamp: clamp(Number(config.tempoRamp ?? 8), 0, 40),
    bars: clamp(Number(config.bars ?? 4), 1, 16),
    minutes: clamp(Number(config.minutes ?? 12), 1, 120),
    feel: FEELS[config.feel] ? config.feel : "straight8",
    meter: String(config.meter || (config.feel === "oddFive" ? "5/4" : config.feel === "oddSeven" ? "7/8" : "4/4")),
    swing: clamp(Number(config.swing ?? 0), 0, 75),
    restRate: clamp(Number(config.restRate ?? 10), 0, 60),
    subdivision: clamp(Number(config.subdivision ?? 8), 1, 32),
    euclideanPulses: clamp(Number(config.euclideanPulses ?? 5), 1, 32),
    polymeterSteps: clamp(Number(config.polymeterSteps ?? 3), 2, 17),
    microtonalCents: clamp(Number(config.microtonalCents ?? 0), -50, 50),
    randomizeDepth: clamp(Number(config.randomizeDepth ?? 5), 1, 10),
    theorySystem: optionKey(config.theorySystem, THEORY_SYSTEMS, "tonal"),
    transformation: optionKey(config.transformation, TRANSFORMATIONS, "none"),
    rhythmAlgorithm: optionKey(config.rhythmAlgorithm, RHYTHM_ALGORITHMS, "grid"),
    direction: option(config.direction, OPTION_GROUPS.sequence, "linear"),
    positionStrategy: option(config.positionStrategy, OPTION_GROUPS.positionStrategy, "box"),
    picking: option(config.picking, OPTION_GROUPS.picking, "alternate"),
    articulation: option(config.articulation, OPTION_GROUPS.articulation, "let-ring"),
    dynamics: option(config.dynamics, OPTION_GROUPS.dynamics, "even"),
    progressionStyle: option(config.progressionStyle, OPTION_GROUPS.progressionStyle, "diatonic"),
    chordVoicing: option(config.chordVoicing, OPTION_GROUPS.chordVoicing, "triads"),
    tone: option(config.tone, OPTION_GROUPS.tone, "clean"),
    learningGoal: option(config.learningGoal, OPTION_GROUPS.learningGoal, "timing"),
    includeChords: config.includeChords !== false,
    includeTheory: config.includeTheory !== false,
    includeTechnique: config.includeTechnique !== false,
    showIntervals: config.showIntervals !== false
  };
}

function makeNotes(mode, config, fretOptions, noteCount, rand) {
  if (!fretOptions.length) return [];
  if (["chords", "progression"].includes(mode)) return generateChordTones(config, fretOptions, rand);
  if (["arpeggio", "sweep"].includes(mode)) return generateArpeggioLine(config, fretOptions, noteCount, rand);
  if (mode === "fretboard") return generateFretboardSurvey(config, fretOptions);
  return generateMelodicLine(config, fretOptions, noteCount, rand);
}

function generateMelodicLine(config, fretOptions, length, rand) {
  const sorted = sortByStrategy(fretOptions, config);
  const line = [];
  let current = pick(sorted, rand);
  const maxJump = Math.max(2, Math.round(config.difficulty / 2) + 2);

  for (let index = 0; index < length; index += 1) {
    const local = sorted.filter((note) => {
      const fretDistance = Math.abs(note.fret - current.fret);
      const stringDistance = Math.abs(note.stringIndex - current.stringIndex);
      return fretDistance + stringDistance <= maxJump + (index % 9 === 0 ? 3 : 0);
    });
    const pool = local.length ? local : sorted;
    current = chooseByDirection(pool, current, config, index, rand);
    line.push(decorateNote(current, index, config));
  }

  return applyDensity(line, config, rand);
}

function generateArpeggioLine(config, fretOptions, length, rand) {
  const chordTones = new Set([0, 3, 4, 7, 10, 11]);
  const pool = fretOptions.filter((note) => chordTones.has(note.interval)) || fretOptions;
  const sorted = sortByStrategy(pool.length ? pool : fretOptions, config);
  const line = [];
  for (let index = 0; index < length; index += 1) {
    line.push(decorateNote(sorted[index % sorted.length], index, config));
  }
  return config.direction === "descending" ? line.reverse().map((note, step) => ({ ...note, step })) : applyDensity(line, config, rand);
}

function generateChordTones(config, fretOptions, rand) {
  const notes = [];
  const perChord = config.chordVoicing === "power-chords" ? 2 : config.chordVoicing === "shells" ? 3 : clamp(Math.round(config.difficulty / 2) + 2, 3, 6);
  const anchors = fretOptions.filter((note) => note.isRoot || [3, 4, 7, 10].includes(note.interval));
  const source = anchors.length ? anchors : fretOptions;

  for (let bar = 0; bar < config.bars; bar += 1) {
    const anchor = pick(source, rand);
    const voicing = fretOptions
      .filter((note) => Math.abs(note.fret - anchor.fret) <= Math.max(2, config.fretSpan) && Math.abs(note.stringIndex - anchor.stringIndex) <= 4)
      .sort((a, b) => b.stringIndex - a.stringIndex || a.fret - b.fret)
      .slice(0, perChord);
    for (const note of voicing) {
      notes.push(decorateNote(note, notes.length, config, note.isRoot));
    }
  }

  return notes;
}

function generateFretboardSurvey(config, fretOptions) {
  return fretOptions
    .filter((note) => note.isRoot || note.degree === 3 || note.degree === 5 || note.degree === 7)
    .slice(0, Math.max(8, config.bars * 6))
    .map((note, step) => decorateNote(note, step, config, note.isRoot));
}

function applyTransformation(notes, config) {
  if (!notes.length || config.transformation === "none") return notes;
  const root = NOTES.indexOf(config.key);
  let transformed = [...notes];
  if (config.transformation === "retrograde") transformed = transformed.reverse();
  if (config.transformation === "inversion" || config.transformation === "retrogradeInversion") {
    transformed = transformed.map((note) => transposeNoteLabel(note, (root - (note.pitch - root) + 24) % 12));
    if (config.transformation === "retrogradeInversion") transformed = transformed.reverse();
  }
  if (config.transformation === "negative") {
    transformed = transformed.map((note) => transposeNoteLabel(note, (root + 7 - (note.pitch - root) + 24) % 12));
  }
  if (config.transformation === "parallel") transformed = transformed.map((note) => transposeNoteLabel(note, note.pitch + 3));
  if (config.transformation === "relative") transformed = transformed.map((note) => transposeNoteLabel(note, note.pitch + 9));
  if (config.transformation === "leadingToneExchange") transformed = transformed.map((note, index) => index % 2 ? transposeNoteLabel(note, note.pitch + 1) : note);
  if (config.transformation === "chromaticPlaning") transformed = transformed.map((note, index) => transposeNoteLabel(note, note.pitch + (index % 4)));
  if (config.transformation === "rotation") transformed = transformed.map((note, index, source) => source[(index + config.euclideanPulses) % source.length]);
  return transformed.map((note, step) => ({ ...note, step }));
}

function transposeNoteLabel(note, pitch) {
  const normalizedPitch = ((pitch % 12) + 12) % 12;
  return {
    ...note,
    pitch: normalizedPitch,
    note: NOTES[normalizedPitch],
    midi: note.midi + (((normalizedPitch - note.pitch + 18) % 12) - 6),
    interval: normalizedPitch
  };
}

function makeRhythm(config, noteCount, rand) {
  const feel = FEELS[config.feel];
  const activeSteps = rhythmStepSet(config, noteCount, rand);
  const rhythm = [];
  for (let step = 0; step < noteCount; step += 1) {
    const pulse = feel.pulses[step % feel.pulses.length];
    const algorithmRest = !activeSteps.has(step % Math.max(1, config.subdivision));
    const rest = algorithmRest || (rand() * 100 < config.restRate && step % feel.pulses.length !== 0);
    rhythm.push({
      step,
      pulse,
      rest,
      accent: isAccent(step, config),
      duration: config.feel.includes("16") || config.feel === "funk16" ? "16th" : config.feel === "triplet" ? "triplet" : "8th"
    });
  }
  return rhythm;
}

function rhythmStepSet(config, noteCount, rand) {
  const steps = Math.max(1, config.subdivision);
  if (config.rhythmAlgorithm === "euclidean") return euclideanSet(config.euclideanPulses, steps);
  if (config.rhythmAlgorithm === "clave") return new Set([0, 3, 6, 10, 12].map((step) => step % steps));
  if (config.rhythmAlgorithm === "polymeter") return new Set(Array.from({ length: steps }, (_, step) => step).filter((step) => step % config.polymeterSteps === 0 || step % 4 === 0));
  if (config.rhythmAlgorithm === "isorhythm") return new Set(Array.from({ length: steps }, (_, step) => step).filter((step) => [0, 2, 5, 7, 11].includes(step % 13)));
  if (config.rhythmAlgorithm === "additive") return new Set(additiveSteps([3, 2, 3, 4, 2], steps));
  if (config.rhythmAlgorithm === "stochastic") return new Set(Array.from({ length: steps }, (_, step) => step).filter(() => rand() > 0.35));
  if (config.rhythmAlgorithm === "silence") return new Set([0, Math.floor(steps / 2)]);
  return new Set(Array.from({ length: Math.max(steps, noteCount) }, (_, step) => step % steps));
}

function euclideanSet(pulses, steps) {
  const set = new Set();
  const safePulses = Math.min(pulses, steps);
  for (let i = 0; i < steps; i += 1) {
    if ((i * safePulses) % steps < safePulses) set.add(i);
  }
  return set;
}

function additiveSteps(groups, steps) {
  const result = [];
  let cursor = 0;
  while (cursor < steps) {
    result.push(cursor);
    cursor += groups[result.length % groups.length];
  }
  return result;
}

function makeTechniqueStack(mode, config, rand) {
  const stack = [];
  if (config.includeTechnique) {
    stack.push(`${config.picking} picking`);
    stack.push(config.articulation);
    stack.push(config.dynamics);
  }
  if (mode === "legato") stack.push("minimum picked notes");
  if (mode === "sweep") stack.push("one pick stroke direction per string crossing");
  if (mode === "ear") stack.push("sing before playing");
  if (mode === "reading") stack.push("name note, degree, then fret");
  if (mode === "songwriting") stack.push(pick(["develop into verse part", "write a contrasting answer", "turn into a hook"], rand));
  return unique(stack).slice(0, 5);
}

function makeProgression(config, rand) {
  const scaleRomans = ROMAN_BY_SCALE[config.scale] || ROMAN_BY_SCALE.major;
  const templates = {
    diatonic: [0, 3, 4, 0],
    "ii-V-I": [1, 4, 0, 0],
    "I-V-vi-IV": [0, 4, 5, 3],
    "twelve-bar": [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4],
    "modal-vamp": [0, scaleRomans.length - 1, 0, 3],
    "circle-of-fifths": [5, 1, 4, 0],
    "minor-cadence": [0, 3, 4, 0],
    "secondary-dominants": [0, 2, 5, 1, 4, 0],
    "chromatic-mediants": [0, 2, 5, 0],
    "coltrane-cycle": [0, 2, 4, 6],
    "axis-cycle": [0, 3, 6, 4],
    "constant-structure": [0, 2, 4, 6, 8],
    "set-class-cycle": [0, 1, 4, 6]
  };
  const template = templates[config.progressionStyle] || templates.diatonic;
  const length = config.includeChords ? Math.min(template.length, Math.max(2, config.bars)) : 2;
  const progression = [];

  for (let index = 0; index < length; index += 1) {
    const degreeIndex = template[index % template.length] % scaleRomans.length;
    const color = chordColor(config, degreeIndex, rand);
    progression.push({
      degree: scaleRomans[degreeIndex],
      chord: `${scaleRomans[degreeIndex]}${color}`,
      function: harmonicFunction(degreeIndex),
      bar: index + 1
    });
  }

  return progression;
}

function renderTab(notes, config, rhythm) {
  const tuning = getTuning(config.tuning).strings;
  const slots = Math.max(notes.length, FEELS[config.feel].slotsPerBar);
  const byStep = new Map(notes.map((note) => [note.step, note]));
  const lines = tuning.map((string, stringIndex) => {
    let line = `${string.name.padStart(2, " ")}|`;
    for (let slot = 0; slot < slots; slot += 1) {
      const note = byStep.get(slot);
      const value = note && note.stringIndex === stringIndex ? String(note.fret).padEnd(2, "-") : "--";
      line += `${value}-`;
    }
    return `${line}|`;
  });
  const accents = "  |" + Array.from({ length: slots }, (_, slot) => rhythm[slot]?.accent ? ">--" : rhythm[slot]?.rest ? "x--" : "---").join("") + "|";
  const pulses = `    ${FEELS[config.feel].pulses.join("  ")} | ${config.meter}, ${config.swing}% swing`;
  return `${lines.join("\n")}\n${accents}\n${pulses}`;
}

function renderChordChart(progression, config) {
  const width = Math.max(4, progression.length);
  const bars = progression.map((item) => `| ${item.chord.padEnd(10, " ")} `).join("") + "|";
  const functions = progression.map((item) => `| ${item.function.padEnd(10, " ")} `).join("") + "|";
  return `${config.key} ${SCALES[config.scale].label} / ${config.progressionStyle}\n${bars}\n${functions}\n${" ".repeat(width)}Voicing target: ${config.chordVoicing}`;
}

function makeAnalysis(mode, config, notes, progression, techniques) {
  const uniqueDegrees = unique(notes.map((note) => note.degreeName).filter(Boolean));
  const pitchClasses = unique(notes.map((note) => note.pitch).filter((pitch) => Number.isInteger(pitch))).sort((a, b) => a - b);
  return [
    `Mode: ${MODES[mode]} with ${config.learningGoal} as the primary goal.`,
    `Theory: ${THEORY_SYSTEMS[config.theorySystem]}; ${config.key} ${SCALES[config.scale].label}; target degrees ${uniqueDegrees.join(", ") || "none in range"}.`,
    `Pitch math: set ${formatSetClass(pitchClasses)}, transformation ${TRANSFORMATIONS[config.transformation]}, micro offset ${config.microtonalCents} cents.`,
    `Range: ${getTuning(config.tuning).label}, capo ${config.capo}, strings ${stringNames(config).join(" ")}, frets ${config.fretStart}-${Math.min(config.maxFrets, config.fretStart + config.fretSpan)}.`,
    `Rhythm: ${RHYTHM_ALGORITHMS[config.rhythmAlgorithm]}, ${FEELS[config.feel].label}, ${config.meter}, ${config.swing}% swing, ${config.restRate}% rest probability.`,
    `Harmony: ${progression.map((item) => item.chord).join(" - ")}.`,
    `Technique: ${techniques.join(", ") || "neutral execution"}.`
  ];
}

function formatSetClass(pitchClasses) {
  if (!pitchClasses.length) return "{}";
  const primeLike = pitchClasses.map((pitch) => (pitch - pitchClasses[0] + 12) % 12).sort((a, b) => a - b);
  return `{${pitchClasses.join(",")}} / normal-ish {${primeLike.join(",")}}`;
}

function makeFretboardSummary(config, notes) {
  const positions = buildFretOptions(config);
  const active = new Set(notes.map((note) => `${note.stringIndex}:${note.fret}`));
  return {
    label: `${getTuning(config.tuning).label}, frets ${config.fretStart}-${Math.min(config.maxFrets, config.fretStart + config.fretSpan)}`,
    positions,
    active,
    rootCount: positions.filter((note) => note.isRoot).length
  };
}

function makePracticeLoop(config, mode, techniques, progression) {
  const startTempo = Math.max(30, config.tempo - config.tempoRamp);
  const highTempo = Math.min(260, config.tempo + config.tempoRamp);
  const minutes = Math.max(1, Math.floor(config.minutes / 4));
  return [
    `${minutes} min: count ${FEELS[config.feel].label} aloud at ${startTempo} BPM before playing.`,
    `${minutes} min: play the tab with ${techniques[0] || "clean alternate strokes"} and stop for any noisy shift.`,
    `${minutes} min: loop ${progression.map((item) => item.chord).join(" - ")} while keeping the same rhythmic cell.`,
    `${minutes} min: raise to ${config.tempo} BPM, then ${highTempo} BPM only if accents stay relaxed.`,
    `Final pass: transpose the idea to a neighboring string set, new key, or different position strategy.`
  ];
}

function makeVariations(mode, config, progression, techniques, rand) {
  const harmonic = progression.map((item) => item.chord).join(" - ");
  const ideas = [
    `Keep the rhythm and replace every target with its nearest chord tone from ${harmonic}.`,
    `Move the entire idea through ${config.positionStrategy} positions without changing string set.`,
    `Invert the contour, keep ${config.picking} picking, and preserve the accents.`,
    `Turn the last two beats into a question-answer phrase using ${config.articulation}.`,
    `Write a second part that starts on beat 2 and resolves to ${config.key}.`,
    `Apply ${TRANSFORMATIONS[config.transformation]} to the phrase, then compare the emotional gravity.`,
    `Keep the frets but reinterpret them as ${THEORY_SYSTEMS[config.theorySystem]} material.`
  ];
  if (mode === "ear") ideas.unshift("Sing each note name, then each scale degree, then play without looking.");
  if (mode === "songwriting") ideas.unshift("Name the generated cell as verse, pre-chorus, chorus, or fill, then create a contrasting role.");
  if (mode === "reading") ideas.unshift("Read the tab once as frets, once as note names, and once as scale degrees.");
  return shuffle(ideas, rand).slice(0, 4).map((idea) => `${idea} Constraint: ${techniques.join(", ") || "steady time"}.`);
}

function renderExport({ normalized, mode, title, progression, tab, chordChart, analysis, practiceLoop, variations }) {
  return [
    `# ${title}`,
    "",
    `Focus: ${MODES[mode]}`,
    `Config: ${normalized.key} ${SCALES[normalized.scale].label}, ${THEORY_SYSTEMS[normalized.theorySystem]}, ${getTuning(normalized.tuning).label}, ${normalized.meter}, ${normalized.tempo} BPM`,
    "",
    "## Chord Chart",
    chordChart,
    "",
    "## Tab",
    tab,
    "",
    "## Analysis",
    ...analysis.map((item) => `- ${item}`),
    "",
    "## Practice Loop",
    ...practiceLoop.map((item, index) => `${index + 1}. ${item}`),
    "",
    "## Variations",
    ...variations.map((item) => `- ${item}`)
  ].join("\n");
}

function sortByStrategy(options, config) {
  const sorted = [...options];
  if (config.positionStrategy === "one-string") return sorted.sort((a, b) => a.stringIndex - b.stringIndex || a.fret - b.fret);
  if (config.positionStrategy === "diagonal") return sorted.sort((a, b) => a.fret + a.stringIndex - (b.fret + b.stringIndex));
  if (config.positionStrategy === "wide-interval") return sorted.sort((a, b) => a.interval - b.interval || b.stringIndex - a.stringIndex);
  return sorted.sort((a, b) => a.fret - b.fret || b.stringIndex - a.stringIndex);
}

function chooseByDirection(pool, current, config, index, rand) {
  if (config.direction === "ascending") return pool.find((note) => note.midi >= current.midi) || pick(pool, rand);
  if (config.direction === "descending") return [...pool].reverse().find((note) => note.midi <= current.midi) || pick(pool, rand);
  if (config.direction === "thirds") return nearestInterval(pool, current, 3) || pick(pool, rand);
  if (config.direction === "fourths") return nearestInterval(pool, current, 5) || pick(pool, rand);
  if (config.direction === "pedal-tone" && index % 2 === 0) return pool.find((note) => note.isRoot) || current;
  return pick(pool, rand);
}

function nearestInterval(pool, current, semitones) {
  return pool
    .filter((note) => Math.abs(Math.abs(note.midi - current.midi) - semitones) <= 1)
    .sort((a, b) => Math.abs(a.fret - current.fret) - Math.abs(b.fret - current.fret))[0];
}

function decorateNote(note, step, config, accent = false) {
  return {
    ...note,
    step,
    accent: accent || isAccent(step, config),
    technique: config.articulation,
    dynamic: config.dynamics
  };
}

function applyDensity(line, config, rand) {
  const keepChance = 45 + config.density * 5;
  return line.filter((note, index) => index === 0 || rand() * 100 <= keepChance).map((note, step) => ({ ...note, step }));
}

function phraseLength(config, mode) {
  const base = FEELS[config.feel].slotsPerBar * config.bars;
  if (mode === "chords") return Math.max(config.bars * 3, 8);
  if (mode === "rhythm") return base;
  return clamp(Math.round(base * (0.45 + config.density / 14)), 6, 192);
}

function isAccent(step, config) {
  if (config.dynamics === "accent-every-third") return step % 3 === 0;
  if (config.dynamics === "accent-backbeat") return step % 8 === 2 || step % 8 === 6;
  if (config.dynamics === "accent-downbeats") return step % 4 === 0;
  return step % Math.max(2, 7 - Math.round(config.difficulty / 2)) === 0;
}

function chordColor(config, degreeIndex, rand) {
  const voicingColor = {
    triads: "",
    sevenths: "7",
    shells: " shell",
    "drop-2": " drop2",
    quartal: " quartal",
    sus: "sus",
    add9: "add9",
    "spread-triads": " spread",
    "power-chords": "5",
    "open-strings": " add11"
  }[config.chordVoicing] || "";
  if (config.progressionStyle === "secondary-dominants" && degreeIndex !== 0) return "7";
  if (config.progressionStyle === "chromatic-mediants") return pick(["maj7", "m9", "7#11"], rand);
  return voicingColor;
}

function harmonicFunction(index) {
  if ([0, 2, 5].includes(index)) return "tonic";
  if ([1, 3].includes(index)) return "predom";
  return "dominant";
}

function stringNames(config) {
  const tuning = getTuning(config.tuning).strings;
  return config.strings.map((index) => tuning[index]?.name).filter(Boolean);
}

function option(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function optionKey(value, allowed, fallback) {
  return Object.prototype.hasOwnProperty.call(allowed, value) ? value : fallback;
}

function pick(items, rand) {
  return items[Math.floor(rand() * items.length)];
}

function shuffle(items, rand) {
  return [...items].sort(() => rand() - 0.5);
}

function unique(items) {
  return [...new Set(items)];
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}
