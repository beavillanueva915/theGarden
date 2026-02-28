# The Garden

A short text-based mobile game for iPhone, inspired by A Dark Room. Warm, quiet, and wholesome — with a message worth remembering.

You wake in a small garden. You explore. You find things that matter. You remember someone you love.

Completable in about 5 minutes.

---

## Play It

Install **Expo Go** (free on the App Store), then open the share link:

> _Link coming soon — will be added after first Expo publish_

---

## Tech Stack

- [Expo](https://expo.dev) (React Native + TypeScript)
- Distributed via Expo Go — no App Store or Apple Developer account required

---

## Development Setup

### Prerequisites
- [Node.js](https://nodejs.org) (LTS)
- An [Expo account](https://expo.dev) (free)

### Install

```bash
git clone https://github.com/beavillanueva915/beaGames.git
cd beaGames
npm install
```

### Run (local network)

```bash
npm start
```

### Run (Microsoft Dev Box or remote machine)

```bash
npm run tunnel
```

Expo will print a QR code. Open it in Expo Go on your iPhone.

---

## Project Structure

```
src/
├── theme.ts                  # Colors, fonts, animation constants
├── game/
│   ├── gameState.ts          # TypeScript types and initial state
│   ├── story.ts              # All narrative content and choices
│   └── engine.ts             # Pure state transition functions
└── components/
    ├── GameScreen.tsx         # Main game loop (useReducer)
    ├── TextWindow.tsx         # Typewriter animation + scrolling text log
    ├── ActionButton.tsx       # Choice buttons with fade-in + haptics
    └── ActionPanel.tsx        # Manages button visibility and stagger
```

---

## Contributing / Making Changes

```bash
git checkout develop
git checkout -b feature/your-change
# make changes
git add .
git commit -m "describe your change"
git push -u origin feature/your-change
# open a PR targeting develop on GitHub
```

PRs should target `develop`. `develop` → `main` only when a milestone is stable and tested on device.

See `.github/PULL_REQUEST_TEMPLATE.md` for the PR checklist.
