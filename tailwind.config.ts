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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        spatial: {
          bg: "#05070E",
          card: "rgba(15, 23, 42, 0.65)",
          border: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(139, 92, 246, 0.15)",
          cyan: "#06B6D4",
          violet: "#8B5CF6",
          lavender: "#C4B5FD",
          accent: "#38BDF8",
          dark: "#080C16",
          darker: "#020408",
        },
      },
      backgroundImage: {
        "spatial-radial": "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.05) 45%, transparent 70%)",
        "spatial-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.25), transparent)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        spatial: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "spatial-lg": "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.12)",
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.5)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
