/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    container: {
      padding: '0.5rem',
    },
  },
  plugins: [require("daisyui")],
}