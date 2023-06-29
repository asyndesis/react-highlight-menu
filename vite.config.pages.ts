/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-highlight-menu/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
  build: {
    outDir: "./pages",
  },
});
