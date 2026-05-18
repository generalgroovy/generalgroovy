# GeneralGroovy

GeneralGroovy is a static guitar and music-theory practice lab. It generates configurable practice material for picking, riffs, chords, progressions, arpeggios, legato, sweep picking, rhythm, ear training, fretboard mapping, reading, songwriting, and mixed practice sessions.

## What It Generates

- Guitar tab with accent and rest cues
- Fretboard maps with roots, scale tones, played tones, and optional interval labels
- Chord charts with harmonic function notes
- Technique constraints for picking, articulation, dynamics, and tone
- Practice loops with tempo ramps and timed sections
- Creative variations for improvisation, songwriting, ear work, and fretboard transfer
- Markdown session cards that can be copied into a practice journal
- Browser-native playback with step highlighting, loop control, waveform selection, volume, accents, rests, and cent offsets
- Lockable randomization so any parameter can be protected while the rest of the session mutates

## Configuration Surface

GeneralGroovy is designed around practical musical categories:

- **Session:** focus mode, goal, duration, difficulty, density
- **Theory:** key, scale/mode, progression style, chord voicing
- **Advanced theory:** functional harmony, modal practice, jazz chord-scale, post-tonal set theory, serial rows, negative harmony, neo-Riemannian moves, axis theory, spectral approximations, polymodal chromaticism, microtonal offsets, mathematical patterning
- **Instrument:** tuning, capo, strings, fret window, max frets, open strings
- **Neck strategy:** box, diagonal, one-string, three-notes-per-string, CAGED, open position, wide interval
- **Rhythm:** tempo, ramp, bars, meter, feel, swing, rest probability, Euclidean rhythms, clave, polymeter, isorhythm, additive patterns, stochastic rests, silence studies
- **Technique:** picking system, articulation, dynamics, tone, harmony/theory/technique toggles
- **Transformations:** inversion, retrograde, retrograde inversion, negative harmony, parallel/relative shifts, leading-tone exchange, chromatic planing, augmentation, diminution, rotation

The app intentionally keeps all of this client-side: no build step, no server dependency, and no account required.

## Run Locally

Open `index.html` directly, or serve the folder:

```bash
npm start
```

Then visit:

```text
http://localhost:4173/
```

## GitHub Pages

The repository is configured for GitHub Pages through GitHub Actions. The live site is:

```text
https://generalgroovy.github.io/generalgroovy/
```

If Pages is ever reset, set **Settings -> Pages -> Source** to **GitHub Actions**.

## Test

```bash
node test.mjs
node --check app.js
node --check generator.js
node --check server.mjs
```
