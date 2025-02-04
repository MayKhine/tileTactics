import * as stylex from "@stylexjs/stylex"
import { tokens, projectStyles } from "./tokens.stylex"

import { MarbleCell } from "./MarbleCell"
import { boardType, TileArrType } from "./App"

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
  tileArr: TileArrType
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
  showPossilbeMoves: boolean
  positionMultiplierBasedOnWindowSize: number
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
  showPossilbeMoves,
  positionMultiplierBasedOnWindowSize,
}: TileProps) => {
  return (
    <div
      {...stylex.props(projectStyles.border, styles.tile(rows, cols, position))}
    >
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
          tileColor={tileArr[index].owner}
          lastMove={lastMove}
          playersTile={playersTile}
          gameBoard={gameBoard}
          showPossibleMoves={showPossilbeMoves}
          positionMultiplierBasedOnWindowSize={
            positionMultiplierBasedOnWindowSize
          }
        />
      ))}
    </div>
  )
}

const styles = stylex.create({
  tile: (rows, cols, position) => ({
    backgroundColor: "#FFFBF4",
    display: "grid",
    position: "absolute",
    left: position.x,
    top: position.y,
    boxSizing: "border-box",
    gridTemplaterow: {
      default: `repeat(${rows},  ${tokens.bigCellSize})`,
      "@media (max-width: 430px)": `repeat(${rows},  ${tokens.smallCellSize})`,
      "@media (min-width: 431px) and (max-width: 768px)": `repeat(${rows},  ${tokens.medCellSize})`,
    },
    gridTemplateColumns: {
      default: `repeat(${cols},  ${tokens.bigCellSize})`,
      "@media (max-width: 430px)": `repeat(${cols},  ${tokens.smallCellSize})`,
      "@media (min-width: 431px) and (max-width: 768px)": `repeat(${cols},  ${tokens.medCellSize})`,
    },
    width: {
      default: `calc(${cols} * ${tokens.bigCellSize})`,
      "@media (max-width: 430px)": `calc(${cols} * ${tokens.smallCellSize})`,
      "@media (min-width: 431px) and (max-width: 768px)": `calc(${cols} * ${tokens.medCellSize})`,
    },
    height: {
      default: `calc(${rows} * ${tokens.bigCellSize})`,
      "@media (max-width: 430px)": `calc(${rows} * ${tokens.smallCellSize})`,
      "@media (min-width: 431px) and (max-width: 768px)": `calc(${rows} * ${tokens.medCellSize})`,
    },
  }),
})
