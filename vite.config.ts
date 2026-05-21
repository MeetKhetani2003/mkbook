import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
    ViteImageOptimizer({
      webp: {
        quality: 70,
      },
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
