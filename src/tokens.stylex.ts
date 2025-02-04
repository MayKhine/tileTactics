import * as stylex from "@stylexjs/stylex"

export const colors = {
  // sand: "#E7B797",
  sand: "#DCA884",
  // blue: "#2E688F",
  blue: "#397196",
  offWhite: "#FAEFDD",
  darkBlue: "#002244",
  ashGreen: "#C9D6C2",
  white: "#FFFBF4",
}
export const tokens = {
  smallCellSize: "30px",
  medCellSize: "40px",
  bigCellSize: "50px",
}

export const projectStyles = stylex.create({
  padding: {
    paddingTop: {
      default: "1.5rem",
      "@media (max-width: 430px)": ".5rem",
      "@media (min-width: 431px) and (max-width: 768px)": "1rem",
    },
    paddingBottom: {
      default: "1.5rem",
      "@media (max-width: 430px)": ".5rem",
      "@media (min-width: 431px) and (max-width: 768px)": "1rem",
    },
  },
  border: {
    borderWidth: {
      default: ".12rem",
      "@media (max-width: 430px)": ".08rem",
    },
    borderStyle: "solid",
    borderColor: colors.darkBlue,
  },
})
