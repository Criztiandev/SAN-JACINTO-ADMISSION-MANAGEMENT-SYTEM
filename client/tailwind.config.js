/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
        secondary: ["Roboto Slab", "serif"],
      },

      colors: {
        primary: "#1E90FF",
        secondary: "#FFA500",
      },
    },
  },
  plugins: [],
};
