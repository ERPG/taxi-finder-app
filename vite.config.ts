/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    minify: "terser",
    sourcemap: false,
    target: "es2020"
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});