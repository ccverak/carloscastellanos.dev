const defaultTheme = require("tailwindcss/defaultTheme")

const config = {
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        sans: ["IBM Plex Sans", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
    boxShadow: {
      focus: "inset 0 -.43333em #54c8f5a3"
    },
    backgroundColor: {
      ...defaultTheme.colors,
      link: "#9ddfffa6"
    }
  },
  variants: { },
  plugins: [],
}

module.exports = config;

