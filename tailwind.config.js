/** @type {import('tailwindcss').Config} */
const { lightThemeColors, darkThemeColors } = require("./src/theme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...lightThemeColors,
      },
    },
  },
  variants: {
    extend: {
      colors: {
        dark: darkThemeColors,
      },
    },
  },
  plugins: [],
};
