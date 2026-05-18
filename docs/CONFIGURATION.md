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
- Additional fringe colors: In sen, Iwato, Persian, Enigmatic, Neapolitan minor, Hungarian minor, Prometheus, Tritone, Messiaen modes, bebop scales, minor 6 diminished, all-interval tetrachord, hexatonic pole
- Theory systems: functional tonal, modal center, blues language, jazz chord-scale, post-tonal set theory, serial row, negative harmony, neo-Riemannian transforms, Bartok axis, spectral approximation, polymodal chromaticism, microtonal approximation, mathematical pattern
- Transformations: inversion, retrograde, retrograde inversion, negative harmony, parallel shift, relative shift, leading-tone exchange, chromatic planing, rhythmic augmentation, rhythmic diminution, pitch rotation
- Progressions: diatonic, ii-V-I, I-V-vi-IV, twelve-bar, modal vamp, circle of fifths, minor cadence, secondary dominants, chromatic mediants, Coltrane cycle, axis cycle, constant structure, set-class cycle
- Voicings: triads, sevenths, shells, drop-2, quartal, sus, add9, spread triads, power chords, open-string color

## Instrument

- Tunings: standard, Drop D, DADGAD, open G, all fourths, baritone B, 7-string standard, 8-string F#, open D, Nashville high-strung, new standard
- Capo: 0-12
- Strings: any subset of the current tuning
- Fret window: start, span, max frets
- Open strings: optional inclusion even when the main position is higher on the neck

## Rhythm

- Feels: straight eighths, sixteenth grid, triplets, shuffle, syncopated, 5/4, 7/8, bossa clave, funk sixteenths
- Algorithms: grid, Euclidean, clave, polymeter, isorhythm, additive, stochastic, space study
- Parameters: subdivision count, Euclidean pulses, polymeter step, microtonal cent offset
- Meter: editable text field
- Swing: 0-75%
- Rests: 0-60%
- Tempo ramp: configurable BPM range around the target tempo

## Technique

- Picking: alternate, economy, downstrokes, upstroke accent, hybrid, fingerstyle, sweep, tremolo
- Articulation: let ring, staccato, palm muted, legato, slides, hammer-ons, pull-offs, bends, vibrato, harmonics
- Dynamics: even, downbeat accents, backbeat accents, every-third accents, crescendo, question-answer phrasing
- Tone: clean, edge-of-breakup, crunch, high gain, acoustic, nylon, bass
- Extended tone labels: synth-like, prepared, ambient

## Randomization Locks

Every randomizable parameter has a lock checkbox. Locked parameters keep their current value when **Surprise** is pressed; unlocked parameters can mutate. This makes it possible to hold a key, tuning, string set, or rhythmic algorithm constant while exploring everything around it.

## Playback

Playback uses the browser Web Audio API. It schedules the generated notes, accents, rests, waveform, loop state, volume, and microtonal cent offset without external dependencies. The playback lane highlights the current step so the generated rhythm can be followed visually.

## Output

The generated session includes tab, fretboard mapping, chord chart, analysis, practice loop, variations, playback metadata, and a Markdown export. The generator is deterministic when supplied the same seed, which keeps tests stable and makes future sharing/preset features straightforward.
