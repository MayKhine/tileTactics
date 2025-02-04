import * as stylex from "@stylexjs/stylex"
import { boardType } from "./App"
import { positionType } from "./Tile"
import { colors } from "./tokens.stylex"

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
  let highlightValidMove = false
  const result = calculateXY(
    index,
    rows,
    cols,
    position.x,
    position.y,
    positionMultiplierBasedOnWindowSize
  )

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

  return (
    <div key={index} {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.cell(highlightValidMove))}>
        {lastRedMove && (
          <div
            {...stylex.props(styles.circle(tileColor))}
            onClick={() => {
              clickHandler(id, index, rows, cols, position)
            }}
          >
            <div {...stylex.props(styles.circleDot)} />
          </div>
        )}

        {lastBlackMove && (
          <div
            {...stylex.props(styles.circle(tileColor))}
            onClick={() => {
              clickHandler(id, index, rows, cols, position)
            }}
          >
            <div {...stylex.props(styles.circleDot)} />
          </div>
        )}

        {lastBlackMove === false && lastRedMove === false && (
          <div
            {...stylex.props(styles.circle(tileColor))}
            onClick={() => {
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
    margin: "0",
    boxSizing: "border-box",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    width: "80%",
    aspectRatio: "1",
    borderCollapse: "collapse",
    backgroundColor:
      highlightValidMove === true ? "rgba(201, 214, 194, 0.8)" : colors.white,
  }),

  circle: (color: string) => ({
    width: {
      default: "1.7rem",
      "@media (max-width: 430px)": "1.3rem",
      "@media (min-width: 431px) and (max-width: 768px)": "1.5rem",
    },
    height: {
      default: "1.7rem",
      "@media (max-width: 430px)": "1.3rem",
      "@media (min-width: 431px) and (max-width: 768px)": "1.5rem",
    },
    borderRadius: "50%",
    backgroundColor:
      color === "black"
        ? colors.blue
        : color === "red"
        ? colors.sand
        : colors.gray,
    cursor: "pointer",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
  }),

  circleDot: {
    width: {
      default: "10px",
      "@media (max-width: 430px)": "5px",
    },
    height: {
      default: "10px",
      "@media (max-width: 430px)": "5px",
    },
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: "50%",
  },
})
