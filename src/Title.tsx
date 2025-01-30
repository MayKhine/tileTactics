import * as stylex from "@stylexjs/stylex"
import { MarbleCell } from "./MarbleCell"
import { boardType } from "./App"

type TileProps = {
  rows: number
  cols: number
  position: positionType
  id: number
  clickHandler: (
    id: number,
    index: number,
    row: number,
    col: number,
    position: positionType
  ) => void
  tileArr: Array<string>
  calculateXY: (
    index: number,
    rows: number,
    cols: number,
    x: number,
    y: number
  ) => { x: number; y: number }
  lastMove: { x: number; y: number; id: number }
  playersTile: {
    red: { id: number; x: number; y: number }
    black: { id: number; x: number; y: number }
  }
  gameBoard: boardType
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
  calculateXY,
  lastMove,
  playersTile,
  gameBoard,
}: TileProps) => {
  return (
    <div {...stylex.props(styles.tile(rows, cols, position))}>
      {Array.from({ length: rows * cols }).map((_, index) => (
        <MarbleCell
          key={id + index}
          id={id}
          index={index}
          calculateXY={calculateXY}
          clickHandler={clickHandler}
          cols={cols}
          rows={rows}
          position={position}
          tileColor={tileArr[index]}
          lastMove={lastMove}
          playersTile={playersTile}
          gameBoard={gameBoard}
        />
      ))}
    </div>
  )
}

const styles = stylex.create({
  tile: (rows, cols, position) => ({
    display: "grid",
    gridTemplaterow: `repeat(${rows}, 50px)`,
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
    backgroundColor: "white",
  }),
})
