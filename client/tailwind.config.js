/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add any theme extensions here
    },
  },

  preflight: {
    enable: true,
    style: {
      // Customize button background color to inherit
      'button': {
        backgroundColor: 'inherit',
      },
      // Add other preflight styles here if needed
    },
  },
  
  plugins: [],
};





