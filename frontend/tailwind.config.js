/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),],
  // Enable both Tailwind and Bootstrap to work together
/*  corePlugins: {
    preflight: false,
  } */
}
