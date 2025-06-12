import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
  },
  plugins: [react(), tailwindcss()],
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// import tailwindcss from "@tailwindcss/vite";
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })

// export default {
//   base: "./",
//   build: {
//     outDir: "dist"
//   }
// }
