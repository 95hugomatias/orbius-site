import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orbius: {
          navy: "#0C1B2A",
          navy2: "#132438",
          navy3: "#1A2F45",
          gold: "#C9A84C",
          goldLight: "#DFC06A",
          goldDark: "#A68B3A",
          white: "#E8ECF0",
          gray100: "#D0D7E0",
          gray300: "#8A97A8",
          gray500: "#5C6B7F",
          gray700: "#2D3D50",
          green: "#10B981",
          greenLight: "#34D399",
          red: "#EF4444",
          redLight: "#F87171",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
