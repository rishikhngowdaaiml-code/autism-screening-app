import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // If your index.html is in a non-standard location, set `root`.
  // root: 'frontend', // <-- example if your index.html lives in a subfolder
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "i18next",
      "react-i18next",
      "uuid"
    ]
  }
});
