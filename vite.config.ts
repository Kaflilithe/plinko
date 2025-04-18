import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from 'vite-plugin-singlefile'
// import singleFile from 'vite-plugin-singlefile';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), viteSingleFile()],

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
