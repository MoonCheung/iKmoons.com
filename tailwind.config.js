const colors = require('tailwindcss/colors');
const tailwindForms = require('@tailwindcss/forms');
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#03a9f4',
      gray: colors.blueGray,
      blue: colors.lightBlue,
      red: colors.rose,
      green: colors.lime,
      yellow: colors.amber,
    },
    fontFamily: {
      sans: ['BlinkMacSystemFont', '-apple-system', '"Segoe UI"', '"Roboto"', '"Oxygen"', '"Ubuntu"',
      '"Cantarell"', '"Fira Sans"', '"Droid Sans"', '"Helvetica Neue"', '"Helvetica"', '"Arial"', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindForms]
  // plugin(function({ addBase, config }) {
  //   addBase({
  //     // 'html': {
  //     //   'box-sizing': 'border-box',
  //     //   'overflow-x': 'hidden',
  //     //   'overflow-y': 'scroll',
  //     //   'text-size-adjust': '100%',
  //     //   'text-rendering': 'optimizeLegibility'
  //     // }
  //   })
  // })
}