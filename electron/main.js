const { app, BrowserWindow } = require("electron");
const started = require("electron-squirrel-startup");
const path = require("node:path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

if (process.platform === "win32") {
  app.setAppUserModelId("com.squirrel.SimpleAudioListener.SimpleAudioListener");
}

const createWindow = () => {
  // Create the browser window.
  // app.getAppPath() returns the project root in dev mode and the asar path when
  // packaged.  For packaged builds the .ico is copied to process.resourcesPath
  // via extraResources in forge.config.js.
  let iconPath;
  if (process.platform === "win32") {
    iconPath = app.isPackaged
      ? path.join(process.resourcesPath, "setup-icon.ico")
      : path.join(app.getAppPath(), "assets", "setup-icon.ico");
  } else {
    iconPath = app.isPackaged
      ? path.join(app.getAppPath(), "assets", "icon.png")
      : path.join(app.getAppPath(), "assets", "icon.png");
  }

  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 960,
    show: false,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Show the window only once it's ready to paint, preventing a blank flash.
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
