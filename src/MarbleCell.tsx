import { useState } from "react"
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

  calculateXY: (
    index: number,
    rows: number,
    cols: number,
    x: number,
    y: number
  ) => { x: number; y: number }

  lastMove: { x: number; y: number }
}

export const MarbleCell = ({
  id,
  index,
  rows,
  cols,
  position,
  tileColor,
  clickHandler,
  calculateXY,
  lastMove,
}: MarbelCellProps) => {
  let highlightValidMove = false
  const result = calculateXY(index, rows, cols, position.x, position.y)
  if (result.x == lastMove.x || result.y == lastMove.y) {
    highlightValidMove = true
  }

  return (
    <div key={index} {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.cell(highlightValidMove))}>
        <div
          {...stylex.props(styles.circle(tileColor))}
          onClick={() => {
            clickHandler(id, index, rows, cols, position)
          }}
        />
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  cell: (highlightValidMove: boolean) => ({
    // border: "1px solid gray",
    margin: "0",
    boxSizing: "border-box",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // width: "50px",
    // height: "50px",
    width: "60%",
    height: "60%",
    borderCollapse: "collapse",
    backgroundColor: highlightValidMove === true ? "pink" : "white",
    // backgroundColor: "white",
  }),

  circle: (color: string) => ({
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    backgroundColor:
      color === "black" ? "black" : color === "red" ? "red" : "gray",
    cursor: "pointer",
  }),
})
