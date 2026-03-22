import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createWindow = async () => {
  const window = new BrowserWindow({
    width: 1400,
    height: 780,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // During development, run vite dev server (`npm run dev`) and load it.
  // In production, load the built files from `dist`.
  const devUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

  if (
    process.env.VITE_DEV_SERVER_URL ||
    process.env.NODE_ENV === "development" ||
    !app.isPackaged
  ) {
    // Try loading the dev server URL. Make sure you run `npm run dev` first.
    await window.loadURL(devUrl);
    window.webContents.openDevTools();
  } else {
    // Load the built app (run `npm run build` first)
    window.loadFile(path.join(__dirname, "dist", "index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();
});
