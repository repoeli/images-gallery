/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Custom color scale from 50 to 900
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
