const colors = require('tailwindcss/colors');
const tailwindForms = require('@tailwindcss/forms');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  // 删除未使用样式
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '1080px',
      lg: '1080px',
      xl: '1080px'
    },
    colors: {
      primary: 'var(--primary-color)',
      transparent: 'transparent',
      gray: colors.blueGray,
      blue: colors.sky,
      red: colors.rose,
      green: colors.lime,
      yellow: colors.amber,
      black: 'var(--black-color)',
      white: 'var(--white-color)'
    },
    fontFamily: {
      sans: [
        'BlinkMacSystemFont',
        '-apple-system',
        '"Segoe UI"',
        '"Roboto"',
        '"Oxygen"',
        '"Ubuntu"',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        '"Helvetica"',
        '"Arial"',
        'sans-serif'
      ]
    },
    extend: {
      width: {
        width: '760px',
        aside: '304px'
      },
      maxWidth: {
        width: '760px',
        aside: '304px'
      },
      height: {
        image: '400px'
      },
      maxHeight:{
        image: '400px'
      },
      margin: {
        aside: '1.143rem'
      },
      borderWidth: {
        '6': '6px'
      }
    }
  },
  variants: {
    extend: {}
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
};
