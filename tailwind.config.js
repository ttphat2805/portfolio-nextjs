/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // future-proofing for App Router
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        bgmain: "#0f172a",
        light: "#f1f5f9",
        dark: "#1e293b",
        textdark: "#e2e8f0",
        textlight: "#334155",
      },
      boxShadow: {
        skillsd: "0 15px 35px rgba(100,100,111,0.2)",
        sdlight: "0 5px 15px rgba(0,0,0,0.05)",
        sddark: "0 5px 15px rgba(255,255,255,0.05)",
      },
      fontFamily: {
        Pacifico: ["var(--font-pacifico)", "cursive"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
