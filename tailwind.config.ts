import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          sidebar: "#111111",
          card: "#171717",
          hover: "#1F1F1F",
          input: "#141414",
        },
        border: {
          DEFAULT: "#262626",
          gold: "rgba(212,175,55,0.25)",
          strong: "#333333",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#52525B",
          disabled: "#3F3F46",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8CC6A",
          dark: "#B8952A",
          50: "rgba(212,175,55,0.05)",
          100: "rgba(212,175,55,0.1)",
          200: "rgba(212,175,55,0.2)",
          300: "rgba(212,175,55,0.3)",
        },
        success: { DEFAULT: "#22C55E", muted: "rgba(34,197,94,0.1)" },
        warning: { DEFAULT: "#F59E0B", muted: "rgba(245,158,11,0.1)" },
        error: { DEFAULT: "#EF4444", muted: "rgba(239,68,68,0.1)" },
        info: { DEFAULT: "#3B82F6", muted: "rgba(59,130,246,0.1)" },
      },
      fontFamily: {
        display: ["'Cormorant SC'", "serif"],
        "display-italic": ["'Cormorant'", "serif"],
        sans: ["'Instrument Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      boxShadow: {
        gold: "0 0 30px rgba(212,175,55,0.15), 0 0 60px rgba(212,175,55,0.05)",
        "gold-sm": "0 0 12px rgba(212,175,55,0.12)",
        card: "0 1px 3px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 20px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)",
        inner: "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #B8952A 100%)",
        "gold-subtle": "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)",
        "card-gradient": "linear-gradient(145deg, #1a1a1a 0%, #141414 100%)",
        "sidebar-gradient": "linear-gradient(180deg, #131313 0%, #0E0E0E 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "fade-up": "fadeUp 0.5s ease forwards",
        shimmer: "shimmer 1.8s infinite",
        "gold-pulse": "goldPulse 2.5s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        goldPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.3)" },
          "50%": { boxShadow: "0 0 0 10px rgba(212,175,55,0)" },
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
