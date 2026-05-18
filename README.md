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

## Configuration Surface

GeneralGroovy is designed around practical musical categories:

- **Session:** focus mode, goal, duration, difficulty, density
- **Theory:** key, scale/mode, progression style, chord voicing
- **Instrument:** tuning, capo, strings, fret window, max frets, open strings
- **Neck strategy:** box, diagonal, one-string, three-notes-per-string, CAGED, open position, wide interval
- **Rhythm:** tempo, ramp, bars, meter, feel, swing, rest probability
- **Technique:** picking system, articulation, dynamics, tone, harmony/theory/technique toggles

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
