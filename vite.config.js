import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Vite PWA test",
        short_name: "Vite PWA",
        description: "Test de création d'une PWA avec Vite",
        theme_color: "#242424",
        icons: [
          {
            src: "vite.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "vite.svg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
