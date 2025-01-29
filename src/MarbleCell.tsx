import { positionType } from "./Title"
import * as stylex from "@stylexjs/stylex"
type MarbelCellProps = {
  id: number
  index: number
  rows: number
  cols: number
  position: positionType
  tileColor: string
  clickHandler: (
    id: number,
    index: number,
    row: number,
    col: number,
    position: positionType
  ) => void
  calculateXy: (
    index: number,
    rows: number,
    cols: number,
    x: number,
    y: number
  ) => { x: number; y: number }
}

export const MarbleCell = ({
  id,
  index,
  rows,
  cols,
  position,
  tileColor,
  clickHandler,
  calculateXy,
}: MarbelCellProps) => {
  return (
    <div key={index} {...stylex.props(styles.cell)}>
      <div
        {...stylex.props(styles.circle(tileColor))}
        onClick={() => {
          clickHandler(id, index, rows, cols, position)
        }}
      />
    </div>
  )
}

const styles = stylex.create({
  cell: {
    // border: "3px solid gray",
    margin: "0",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // width: "50px",
    // height: "50px",
    borderCollapse: "collapse",
  },
  circle: (color: string) => ({
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    backgroundColor:
      color === "black" ? "black" : color === "red" ? "red" : "gray",
    cursor: "pointer",
  }),
})
