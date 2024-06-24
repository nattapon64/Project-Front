/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // module.exports = {
    //   plugins: [require('tailwind-hamburgers')],
    // },
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

