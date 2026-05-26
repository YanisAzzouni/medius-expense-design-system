import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const mediusTheme = create({
  base: "light",

  // Brand
  brandTitle: "Medius Expense Design System",
  brandUrl: "https://medius.com",

  // UI
  colorPrimary: "#4f7e7f",   // olive-500
  colorSecondary: "#325051", // olive-700

  // App chrome
  appBg: "#f8fafa",          // olive-100
  appContentBg: "#ffffff",
  appBorderColor: "#d3d3d9", // chalk-300
  appBorderRadius: 6,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  // Text
  textColor: "#17171a",      // chalk-1000
  textInverseColor: "#ffffff",

  // Toolbar
  barTextColor: "#5d5d69",   // chalk-600
  barSelectedColor: "#4f7e7f",
  barBg: "#ffffff",

  // Form
  inputBg: "#ffffff",
  inputBorder: "#d3d3d9",
  inputTextColor: "#17171a",
  inputBorderRadius: 4,
});

addons.setConfig({
  theme: mediusTheme,
});
