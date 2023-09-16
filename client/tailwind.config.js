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
    },
  },
  plugins: [],
};
