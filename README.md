# Simple Audio Listener

A tiny React + Vite audio player demo.

**Features**

- Play / Pause / Stop controls
- Seek and progress bar
- Simple hook-based audio management (`src/hooks/usePlayAudio.js`)

**Quick start**

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
# open http://localhost:5173
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

**Notes for contributors**

- Entry HTML: [index.html](index.html#L1-L14)
- Main entry: `src/main.jsx`
- Hook that manages audio: [src/hooks/usePlayAudio.js](src/hooks/usePlayAudio.js)
- Favicon (SVG): [public/favicon.svg](public/favicon.svg)

License: see `LICENSE` in the repository root.
