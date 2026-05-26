import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // Disable react-docgen globally — the 1k-icon barrel overflows the AST
  // traversal call stack, and our token/icon stories have no arg controls.
  reactDocgen: false,
  viteFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@tokens": resolve(__dirname, "../src/tokens"),
      "@icons": resolve(__dirname, "../src/icons"),
      "@components": resolve(__dirname, "../src/components"),
    };

    // reactDocgen: false disables docgen for story files, but the Vite plugin
    // still transforms transitively-imported modules. Remove it from the
    // plugin list entirely so it never runs on the icon barrel.
    if (Array.isArray(config.plugins)) {
      config.plugins = config.plugins.filter((p) => {
        if (!p || typeof p !== "object" || !("name" in p)) return true;
        return (p as { name: string }).name !== "storybook:react-docgen-plugin";
      });
    }

    return config;
  },
};

export default config;
