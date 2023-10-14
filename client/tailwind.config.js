/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    gridColumn: {
      applicant: "300px 300px",
    },

    extend: {
      borderColor: {
        "border-base": "#cccccc",
      },
      backgroundImage: {
        backgroundImage:
          " linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('./src/assets/image/schoolBuilding.jpg');",

        coverImage:
          "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('./src/assets/image/cover_image.jpg');*",
      },

      fontFamily: {
        secondary: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
