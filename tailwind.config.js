const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
    boxShadow: {
      focus: "inset 0 -.43333em #54c8f5a3"
    },
    backgroundColor: theme => ({
      ...theme(defaultTheme.colors),
      link: "#9ddfffa6"
    })
  },
  variants: {},
  plugins: [],
}
