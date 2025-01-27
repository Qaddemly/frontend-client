/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      main: "#133E87",
      "light-main": "#42659f",
      secondary: "#608BC1",
      "light-secondary": "#CBDCEB",
      "light-secondary-200": "#98A0B4",
      "light-secondary-300": "#BACAE4",
      "danger-300": "#D93A40",
      "danger-200": "#e16166",
      white: "#FFFFFF",
      background: "#F3F2F0",
      yellow: "#EECC00",
      "light-danger": "#FEEEEF",
      offWhite: "#E4E5E8",
      "gray-100": "#ccc",
      "gray-200": "#D9D9D9",
      "gray-300": "#999",
      "gray-400": "#9BA1AA",
      "gray-500": "#767F8C",
      "gray-600": "#5E6670",
      "gray-700": "#4F4F4F",
      "gray-800": "#2D2D2D",
      "green-100": "#0BA02C",
      "green-200": "#017550",
      "light-green": "#E7F6EA",
      "main-dark": "#1B1F23",
    },
    extend: {
      animation: {
        slide: "slideX 35s linear infinite",
      },
      keyframes: {
        slideX: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
