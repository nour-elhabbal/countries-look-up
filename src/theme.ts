import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    body: {
      _dark: { bgColor: "dark.bg" },
      _light: { bgColor: "light.bg" },
    },
  },
  theme: {
    tokens: {
      colors: {
        dark: {
          bg: { value: "hsl(207, 26%, 17%)" },
          elements: { value: "hsl(209, 23%, 22%)" },
          text: { value: "hsl(0, 0%, 100%)" },
        },

        light: {
          bg: { value: "hsl(0, 0%, 98%)" },
          elements: { value: "hsl(0, 0%, 100%)" },
          input: { value: "hsl(0, 0%, 52%)" },
          text: { value: "hsl(200, 15%, 8%)" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
