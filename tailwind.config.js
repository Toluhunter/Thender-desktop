/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js,tsx,tx}"
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter']
    },

    extend: {
      colors: {
        primary: "#0011FF",
        primaryLight: "#1F2EFF",
        sideNav: "#00032D",
        danger: "#FF1D1D",
      }
    },
  },
  plugins: [],
}