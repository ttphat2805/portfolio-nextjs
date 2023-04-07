/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f89d36",
        bgmain: "#172029",
        light: "#ecedef",
        dark: "#253649",
        textdark: "#9bacc4",
        textlight: "#8492a6",
      },
      boxShadow: {
        skillsd: "0 15px 35px hsla(0,0%,65%,.171)",
        sdlight: "rgba(165, 164, 164, 0.15) 0px 5px 15px 0px",
        sddark: "rgba(44, 44, 44, 0.15) 0px 5px 15px 0px",
      },
      fontFamily: {
        Pacifico: "Pacifico, cursive",
      },
    },
  },
  plugins: [],
};
