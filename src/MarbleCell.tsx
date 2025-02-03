import { boardType } from "./App"
import { positionType } from "./Tile"
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
    y: number,
    positionMultiplierBasedOnWindowSize: number
  ) => { x: number; y: number }

  lastMove: { x: number; y: number; id: number }
  playersTile: {
    red: { id: number; x: number; y: number }
    black: { id: number; x: number; y: number }
  }
  gameBoard: boardType
  showPossibleMoves: boolean
  positionMultiplierBasedOnWindowSize: number
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
  playersTile,
  gameBoard,
  showPossibleMoves,
  positionMultiplierBasedOnWindowSize,
}: MarbelCellProps) => {
  // console.log(position)

  let highlightValidMove = false
  const result = calculateXY(
    index,
    rows,
    cols,
    position.x,
    position.y,
    positionMultiplierBasedOnWindowSize
  )

  // console.log("result: ", result, lastMove)
  if (
    (result.x == lastMove.x || result.y == lastMove.y) &&
    playersTile.red.id != id &&
    playersTile.black.id != id &&
    gameBoard[id - 1].tileArr[index].owner.length === 0 &&
    showPossibleMoves == true
  ) {
    highlightValidMove = true
  }

  if (lastMove.x == -1 && lastMove.y == -1 && showPossibleMoves == true) {
    highlightValidMove = true
  }

  const lastRedMove =
    result.x === playersTile.red.x && result.y === playersTile.red.y
      ? true
      : false

  const lastBlackMove =
    result.x === playersTile.black.x && result.y === playersTile.black.y
      ? true
      : false

  // console.log("gameBoard[id - 1].tileArr[id]", gameBoard[id - 1].tileArr[index])
  // console.log("tile color: ", tileColor)

  return (
    <div key={index} {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.cell(highlightValidMove))}>
        {lastRedMove && (
          <div {...stylex.props(styles.circleRing)}>
            <div
              {...stylex.props(styles.circle(tileColor))}
              onClick={() => {
                clickHandler(id, index, rows, cols, position)
              }}
            />
          </div>
        )}

        {lastBlackMove && (
          <div {...stylex.props(styles.circleRing)}>
            <div
              {...stylex.props(styles.circle(tileColor))}
              onClick={() => {
                clickHandler(id, index, rows, cols, position)
              }}
            />
          </div>
        )}

        {lastBlackMove === false && lastRedMove === false && (
          <div
            {...stylex.props(styles.circle(tileColor))}
            onClick={() => {
              console.log("Marbel cell on click: ", tileColor)
              clickHandler(id, index, rows, cols, position)
            }}
          />
        )}
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
    // width: "2rem",
    // height: "2rem",
    width: "80%",
    aspectRatio: "1",
    borderCollapse: "collapse",
    backgroundColor: highlightValidMove === true ? "lightGreen" : "lightgray",
  }),

  circle: (color: string) => ({
    // width: "1.5rem",
    // height: "1.5rem",
    // width: "100%",
    // height: "100%",
    minWidth: "1.5rem",
    minHeight: "1.5rem",
    borderRadius: "50%",
    backgroundColor:
      color === "black" ? "black" : color === "red" ? "red" : "gray",
    cursor: "pointer",
    boxSizing: "border-box",
  }),

  circleRing: {
    // width: "70%",
    // height: "70%",
    border: "2px solid yellow",
    borderRadius: "50%",
    backgroundColor: "pink",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    justifyItems: "center",
    alignSelf: "center",
  },
})
