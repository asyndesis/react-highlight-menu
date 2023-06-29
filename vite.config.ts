/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, copyDtsFiles: true })],
  test: {
    environment: "jsdom",
    globals: true,
  },

  build: {
    outDir: "dist", // Specify the output directory
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "React Highlight Menu",
      fileName: (format) => `react-highlight-menu.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
