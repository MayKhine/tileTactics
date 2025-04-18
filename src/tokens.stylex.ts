import * as stylex from "@stylexjs/stylex"

export const colors = {
  sand: "#DA9665",
  blue: "#499ED6",
  offWhite: "#FAEFDD",
  darkBlue: "#002244",
  ashGreen: "#C4D8B9",
  white: "#FFFBF4",
  gray: "#C2BFB7",
}
export const tokens = {
  smallCellSize: "40px",
  medCellSize: "45px",
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
    borderRadius: {
      default: ".3rem",
      "@media (max-width: 430px)": ".15rem",
    },
  },
  alertBorder: {
    borderWidth: {
      default: ".2rem",
      "@media (max-width: 430px)": ".1rem",
    },
    borderStyle: "solid",
    borderColor: colors.darkBlue,
    borderRadius: {
      default: "1rem",
      "@media (max-width: 430px)": ".6rem",
    },
  },
  button: {
    cursor: "pointer",
    backgroundColor: {
      default: "#FFFBF4",
      ":hover": "#C9D6C2",
    },
    padding: ".5rem",
    width: "max-content",
    borderWidth: {
      default: ".12rem",
      "@media (max-width: 430px)": ".08rem",
    },
    borderStyle: "solid",
    borderColor: colors.darkBlue,
    borderRadius: {
      default: ".5rem",
      "@media (max-width: 430px)": ".2rem",
    },
  },
})
