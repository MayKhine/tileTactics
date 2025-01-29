import * as stylex from "@stylexjs/stylex"

type TileProps = {
  rows: number
  cols: number
  position: positionType
  id: number
  clickHandler: (id: number, index: number) => void
  tileArr: Array<string>
}

export type positionType = {
  x: number
  y: number
}
export const Tile = ({
  rows,
  cols,
  position,
  clickHandler,
  id,
  tileArr,
}: TileProps) => {
  return (
    <div {...stylex.props(styles.tile(rows, cols, position))}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <div key={index} {...stylex.props(styles.cell)}>
          <div
            {...stylex.props(styles.circle(tileArr[index]))}
            onClick={() => {
              clickHandler(id, index)
            }}
          />
        </div>
      ))}
    </div>
  )
}

const styles = stylex.create({
  tile: (rows, cols, position) => ({
    display: "grid",
    gridTemplateRows: `repeat(${rows}, 50px)`,
    gridTemplateColumns: `repeat(${cols}, 50px)`,
    position: "absolute",
    left: position.x,
    top: position.y,
    border: "1px solid black",
    padding: "0",
    margin: "0",
    boxSizing: "border-box",
    width: `calc(${cols} * 50px)`,
    height: `calc(${rows} * 50px)`,
    backgroundColor: "#FFF7E2",
  }),
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
