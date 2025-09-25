import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
    "./src/styles/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        night: {
          900: "#05060a",
          800: "#090b12",
          700: "#0d1020",
        },
        glow: {
          cyan: "#37f8ff",
          magenta: "#ff3ff0",
          amber: "#ffb347",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(55, 248, 255, 0.35)",
        "glow-magenta": "0 0 45px rgba(255, 63, 240, 0.3)",
      },
      backgroundImage: {
        "noise": "linear-gradient(135deg, rgba(55,248,255,0.12), rgba(16,21,32,0.85))",
      },
      animation: {
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
