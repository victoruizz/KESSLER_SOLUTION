/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "space-black": "#000000",
        "space-surface": "#0A0A0A",
        "space-elevated": "#141414",
        "space-border": "#1F1F1F",
        "mars-orange": "#FF6B1A",
        "mars-dim": "#B84A0F",
        "mars-amber": "#FFB347",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B0B0B0",
        "text-tertiary": "#6E6E6E",
        "risk-low": "#4ADE80",
        "risk-medium": "#FACC15",
        "risk-high": "#FB923C",
        "risk-critical": "#EF4444",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        hud: "0.18em",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
      },
    },
  },
  plugins: [],
};
