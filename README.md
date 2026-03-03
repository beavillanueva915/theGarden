# The Garden

A short text-based game for web and iPhone via Expo. You wake in a small garden.

Completable in about 8 minutes.

---

## Play It

**Web** — live at [beavillanueva915.github.io/theGarden](https://beavillanueva915.github.io/theGarden/)

**iPhone** — install [Expo Go](https://expo.dev/go) (free on the App Store), then open the share link:

> _Link coming soon — will be added after first Expo publish_

---

## Tech Stack

- [Vite](https://vitejs.dev) + React + TypeScript (web)
- [Expo](https://expo.dev) + React Native + TypeScript (iPhone)
- Shared game logic in `src/` — no framework dependencies

---

## Development Setup

### Prerequisites
- [Node.js](https://nodejs.org) (LTS)

### Install

```bash
git clone https://github.com/beavillanueva915/theGarden.git
cd theGarden
```

### Run (web)

```bash
cd web
npm install
npm run dev
```

### Run (iPhone)

```bash
npm install
npm start
```

Expo will print a QR code. Open it in Expo Go on your iPhone.

---

## Project Structure

```
src/
├── theme.ts                  # Colors, fonts, speed constants
└── game/
    ├── gameState.ts          # TypeScript types and initial state
    ├── story.ts              # All narrative content and choices
    └── engine.ts             # Pure state transition functions

web/
└── src/
    ├── App.tsx               # Main game loop (useReducer)
    └── components/
        ├── TextWindow.tsx    # Typewriter animation + scrolling text log
        ├── ActionPanel.tsx   # Choice buttons with fade-in
        └── MapPanel.tsx      # Map overlay, theme + speed settings
```

---

## Contributing

```bash
git checkout main && git pull origin main
git checkout -b feature/your-change
# make changes
git add .
git commit -m "describe your change"
git push -u origin feature/your-change
# open a PR targeting main on GitHub
```

PRs target `main`. Keep changes focused — one concern per PR.
