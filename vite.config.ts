import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx", "src/**/*.figma.tsx"],
    }),
  ],
  resolve: {
    alias: {
      "@tokens": resolve(__dirname, "src/tokens"),
      "@icons": resolve(__dirname, "src/icons"),
      "@components": resolve(__dirname, "src/components"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MediusExpenseDesignSystem",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
        },
        assetFileNames: (info) => {
          if (info.name === "style.css") return "tokens/tokens.css";
          return info.name ?? "assets/[name][extname]";
        },
      },
    },
    copyPublicDir: false,
  },
});
