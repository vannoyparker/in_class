# AGENTS.md

This project is a single-file web app. All app code lives in `index.html`.

## Folder layout

```
.
├── AGENTS.md        # Instructions for AI agents (this file)
├── spec.md          # What the app should do
├── prompts.md       # Log of prompts used to build the app
├── index.html       # The app (must stay at the top level for GitHub Pages)
├── 00_planning/     # Notes, sketches, wireframes, brainstorming
├── 01_data/         # Data files (CSV, JSON, Excel exports, etc.)
├── 02_validation/   # Hand calculations and test cases
└── 03_output/       # Screenshots and exported results
```

Each numbered folder has a `README.md` describing what belongs in it.

## Rules

- Save every new file in the folder that matches its purpose, using the layout above. Do not put new files at the top level.
- Only `AGENTS.md`, `spec.md`, `prompts.md`, and `index.html` belong at the top level.
- Keep the app in the single file `index.html`; do not move or rename it.
