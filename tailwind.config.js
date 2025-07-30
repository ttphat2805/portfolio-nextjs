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
        primary: "#6366f1",   // Xanh tím hiện đại
        bgmain: "#0f172a",    // Màu nền đậm
        light: "#f1f5f9",     // Màu sáng trắng xám
        dark: "#1e293b",      // Nền tối
        textdark: "#e2e8f0",  // Text sáng dark mode
        textlight: "#334155", // Text tối sáng mode
      },
      boxShadow: {
        skillsd: "0 15px 35px rgba(100,100,111,0.2)",
        sdlight: "0 5px 15px rgba(0,0,0,0.05)",
        sddark: "0 5px 15px rgba(255,255,255,0.05)",
      },
      fontFamily: {
        Pacifico: "Pacifico, cursive",
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
