# Simple Audio Listener

> A minimal React + Vite + Electron demo that plays audio with simple controls.

**Features**

- Play / Pause / Stop controls
- Seekable progress bar and duration display
- Volume control and keyboard-friendly buttons
- Hook-based audio logic in src/hooks/usePlayAudio.js

**Quick start**

1. Install dependencies

```bash
npm install
```

2. Run the app (development)

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Package the app

```bash
npm run package
```

**Optional commands**

```bash
# Lint source
npm run lint

# Format files
npm run format
```

**Project layout**

- [index.html](index.html#L1-L14) — App shell
- [src/renderer.jsx](src/renderer.jsx) — App entry (renderer)
- [src/hooks/usePlayAudio.js](src/hooks/usePlayAudio.js) — Audio management hook
- [src/components](src/components) — UI controls and components
- [electron/main.js](electron/main.js) — Electron main process entry
- [electron/preload.js](electron/preload.js) — Preload script for renderer

**Contributing**

- Open an issue for feature requests or bugs.
- Send pull requests against `main`. Keep changes focused and documented.

**License**

See [LICENSE](LICENSE) for details.
