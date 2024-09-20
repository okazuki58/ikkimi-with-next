import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sf: [
          "-apple-system",
          "BlinkMacSystemFont",
          "San Francisco",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        inter: ["var(--font-inter)"],
      },
      keyframes: {
        smoothBounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "75%": { transform: "scale(0.95)" },
        },
      },
      animation: {
        smoothBounce:
          "smoothBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },

  plugins: [],
};
export default config;
