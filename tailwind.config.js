/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F7AB0A",
      },
      boxShadow: {
        skillsd: "0 15px 35px hsla(0,0%,65%,.171)",
      },
    },
  },
  plugins: [],
};
