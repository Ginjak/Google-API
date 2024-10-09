/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        source: {
          green: "#1b3c33",
          textLight: "#fffdf8",
          greenHover: "#20312d",
          darkThemeBg: "#0e241e",
          suggestions: "#7EBDC2",
        },
      },
      screens: {
        "custom-sm-600": { max: "600px" },
      },
    },
  },
  plugins: [],
};
