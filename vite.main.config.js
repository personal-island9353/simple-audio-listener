import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    lib: {
      entry: "electron/main.js",
      fileName: () => "[name].js",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["electron-squirrel-startup"],
    },
  },
});
