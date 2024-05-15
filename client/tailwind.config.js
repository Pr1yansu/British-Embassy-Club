/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E2E8F0",
        text_primary: "#6B7280",
        btn_primary: "#1d4ed8",
        btn_secondary: "#F8FAFC",
      },
      boxShadow: {
        main_card: "0px 6px 8px 0px rgba(0, 0, 0, 0.20)",
        main_card_hover: "8px 8px 12px 0px rgba(33, 92, 221, 0.25)",
        btn_shadow: "-4px 4px 20px 2px rgba(59, 130, 246, 0.25)"
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
};
