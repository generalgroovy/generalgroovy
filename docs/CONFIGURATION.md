# Configuration Reference

GeneralGroovy treats a generated practice item as a complete session, not only a random note stream. These are the supported configuration families.

## Session

- Focus: mixed, picking, riff, chords, progression, arpeggio, legato, sweep, rhythm, ear training, fretboard, reading, songwriting
- Goal: speed, timing, accuracy, fretboard, ear, harmony, songwriting, improvisation, reading, technique
- Difficulty: 1-10
- Density: 1-10
- Duration: 1-120 minutes

## Theory

- Keys: all 12 chromatic roots
- Scale colors: chromatic, major, natural minor, harmonic minor, melodic minor, seven modes, pentatonics, blues, whole tone, diminished, altered, double harmonic, Hirajoshi
- Progressions: diatonic, ii-V-I, I-V-vi-IV, twelve-bar, modal vamp, circle of fifths, minor cadence, secondary dominants, chromatic mediants
- Voicings: triads, sevenths, shells, drop-2, quartal, sus, add9, spread triads, power chords, open-string color

## Instrument

- Tunings: standard, Drop D, DADGAD, open G, all fourths, baritone B
- Capo: 0-12
- Strings: any subset of the current tuning
- Fret window: start, span, max frets
- Open strings: optional inclusion even when the main position is higher on the neck

## Rhythm

- Feels: straight eighths, sixteenth grid, triplets, shuffle, syncopated, 5/4, 7/8, bossa clave, funk sixteenths
- Meter: editable text field
- Swing: 0-75%
- Rests: 0-60%
- Tempo ramp: configurable BPM range around the target tempo

## Technique

- Picking: alternate, economy, downstrokes, upstroke accent, hybrid, fingerstyle, sweep, tremolo
- Articulation: let ring, staccato, palm muted, legato, slides, hammer-ons, pull-offs, bends, vibrato, harmonics
- Dynamics: even, downbeat accents, backbeat accents, every-third accents, crescendo, question-answer phrasing
- Tone: clean, edge-of-breakup, crunch, high gain, acoustic, nylon, bass

## Output

The generated session includes tab, fretboard mapping, chord chart, analysis, practice loop, variations, and a Markdown export. The generator is deterministic when supplied the same seed, which keeps tests stable and makes future sharing/preset features straightforward.
