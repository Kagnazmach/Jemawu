/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#0f3d2e",
        gold: "#f4b41b",
        cream: "#fdf6e3",
        red: "#ce1126",
        slate: "#1e293b",
        muted: "#94a3b8",
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        amharic: ["Noto Sans Ethiopic", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
