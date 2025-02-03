import * as stylex from "@stylexjs/stylex"

// export const projectStyles = stylex.create({})
export const tokens = {
  // cellSize: "50px",
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
})
