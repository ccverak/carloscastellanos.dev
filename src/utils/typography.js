import Typography from "typography"
const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Inter",
    "sans-serif",
  ],
  bodyFontFamily: ["Inter", "serif"],
  // See below for the full list of options.
})

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
