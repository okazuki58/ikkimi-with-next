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
      // テキストカラー
      textColor: {
        primary: "hsl(225, 10%, 20%)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#563bff",
          light: "#7a65ff",
          dark: "#3d2bbd",
        },
        secondary: {
          DEFAULT: "#f2f2fa",
          light: "#fafafe",
          dark: "#d9d9e6",
        },
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
        unbounded: ["Unbounded", "sans-serif"],
        note_sans_jp: ["Noto Sans JP", "sans-serif"],
      },
      keyframes: {
        smoothBounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "75%": { transform: "scale(0.95)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scaleY(0.95)" },
          "100%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        smoothBounce:
          "smoothBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        fadeIn: "fadeIn 0.2s ease-out forwards",
      },
    },
  },

  plugins: [],
};
export default config;
