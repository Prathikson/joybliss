/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-inconsolata)", "monospace"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        ink: {
          bg: "var(--ink-bg)",
          bg2: "var(--ink-bg2)",
          fg: "var(--ink-fg)",
          fg2: "var(--ink-fg2)",
          fg3: "var(--ink-fg3)",
          border: "var(--ink-border)",
          card: "var(--ink-card)",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
