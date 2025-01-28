import * as stylex from "@stylexjs/stylex"
import { Board } from "./Board"
import { positionType } from "./Title"

export type boardType = Array<tileType>
type tileType = {
  id: number
  rows: number
  cols: number
  position: positionType
}

export type playerBoardType = Array<playerTileType>

type playerTileType = {
  id: number
  tile: Array<string>
}

export const App = () => {
  const board = [
    { id: 1, rows: 2, cols: 2, position: { x: 200, y: 0 } },
    { id: 2, rows: 1, cols: 2, position: { x: 0, y: 100 } },
    { id: 3, rows: 2, cols: 2, position: { x: 100, y: 50 } },
    { id: 4, rows: 1, cols: 2, position: { x: 200, y: 100 } },
    { id: 5, rows: 3, cols: 1, position: { x: 300, y: 50 } },
    { id: 6, rows: 3, cols: 2, position: { x: 0, y: 150 } },
    { id: 7, rows: 3, cols: 1, position: { x: 100, y: 150 } },
    { id: 8, rows: 2, cols: 3, position: { x: 150, y: 150 } },
    { id: 9, rows: 1, cols: 3, position: { x: 350, y: 150 } },
    { id: 10, rows: 1, cols: 3, position: { x: 150, y: 250 } },
    { id: 11, rows: 2, cols: 3, position: { x: 300, y: 200 } },
    { id: 12, rows: 2, cols: 2, position: { x: 50, y: 300 } },
    { id: 13, rows: 2, cols: 1, position: { x: 150, y: 300 } },
    { id: 14, rows: 2, cols: 2, position: { x: 200, y: 300 } },
    { id: 15, rows: 3, cols: 2, position: { x: 300, y: 300 } },
    { id: 16, rows: 1, cols: 2, position: { x: 100, y: 400 } },
    { id: 17, rows: 2, cols: 2, position: { x: 200, y: 400 } },
  ]

  const generatePlayerBoard = (board: boardType) => {
    const tempArr = []
    for (let i = 0; i < board.length; i++) {
      const tileArrLength = board[i].rows * board[i].cols
      tempArr.push({ id: i + 1, tile: new Array(tileArrLength).fill("") })
    }
    return tempArr
  }

  const playerBoard = generatePlayerBoard(board)

  return (
    <div {...stylex.props(styles.base)}>
      <div> Title: Kulami </div>
      <Board gameBoard={board} playerBoard={playerBoard} />
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "pink",
  },
})
