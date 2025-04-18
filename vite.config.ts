import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { viteSingleFile } from 'vite-plugin-singlefile';
import tsconfigPaths from "vite-tsconfig-paths";
import {base64} from "vite-plugin-base64";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), viteSingleFile(), base64()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext', // Современные браузеры
    assetsInlineLimit: Infinity, // Большой лимит для инлайнинга ресурсов
    cssCodeSplit: false, // Объединить все стили в один
  },
});
