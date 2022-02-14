//const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    // screens: {
    //   'ms': '320px',
    //   ...defaultTheme.screens,
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
