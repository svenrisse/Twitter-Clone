/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
      },
    },
    screens: {
      sm: "375px",
      md: "800px",
      lg: "1200px",
      xl: "1600px",
      "2xl": "2200px",
    },
  },
  plugins: [],
};
