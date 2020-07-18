const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
        sans: ['Inter', 'IBM Plex Sans', ...defaultTheme.fontFamily.sans]
      }
    },
    boxShadow: {
      focus: 'inset 0 -.43333em #54c8f5a3'
    },
    backgroundColor: {
      ...defaultTheme.colors,
      link: '#9ddfffa6'
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '9/10': '90%',
      full: '100%'
    }
  },
  variants: {},
  plugins: [
    //require('@tailwindcss/typography')
  ]
}

module.exports = config
