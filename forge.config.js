import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { VitePlugin } from "@electron-forge/plugin-vite";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import path from "node:path";

const __dirname = import.meta.dirname;

const config = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, "assets/setup-icon"),
    extraResource: [path.join(__dirname, "assets/setup-icon.ico")],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      name: "SimpleAudioListener",
      setupIcon: path.join(__dirname, "assets/setup-icon.ico"),
      loadingGif: path.join(__dirname, "assets/setup-loading.gif"),
    }),
    new MakerZIP({}, ["darwin", "win32", "linux"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "electron/main.js",
          config: "vite.main.config.js",
          target: "main",
        },
        {
          entry: "electron/preload.js",
          config: "vite.preload.config.js",
          target: "preload",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.js",
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
