const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      colors: {
        antiqueBlue: {
          50: "#F3F5F7",
          100: "#EAEEF1",
          200: "#D1DBE0",
          300: "#BCC9D2",
          400: "#A6B8C4",
          500: "#8FA6B4",
          600: "#69889B",
          700: "#4E6574",
          800: "#33434C",
          900: "#1B2328",
        },
        mauveTaupe: {
          50: "#F4EBEE",
          100: "#E9D8DC",
          200: "#D5B4BD",
          300: "#BF8D9A",
          400: "#AA697A",
          500: "#8A4E5E",
          600: "#6F3F4B",
          700: "#512E37",
          800: "#371F26",
          900: "#1A0F12",
        },
        stoneBlue: {
          50: "#E7EEF3",
          100: "#D0DDE7",
          200: "#A4BED0",
          300: "#759CB8",
          400: "#4E7997",
          500: "#37556A",
          600: "#2C4354",
          700: "#213340",
          800: "#17232C",
          900: "#0A1014",
        },
      },
      fontFamily: {
        serif: ["Space Grotesk", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
