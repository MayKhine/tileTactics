import * as stylex from "@stylexjs/stylex"
import { Board } from "./Board"
import { positionType } from "./Title"

export type boardType = Array<tileType>

type tileType = {
  id: number
  rows: number
  cols: number
  position: positionType
  tileArr: Array<string>
  // curOwner: string
}

export const App = () => {
  const board = [
    {
      id: 1,
      rows: 2,
      cols: 2,
      position: { x: 200, y: 0 },
      tileArr: [],
    },
    {
      id: 2,
      rows: 1,
      cols: 2,
      position: { x: 0, y: 100 },
      tileArr: [],
    },
    {
      id: 3,
      rows: 2,
      cols: 2,
      position: { x: 100, y: 50 },
      tileArr: [],
    },
    {
      id: 4,
      rows: 1,
      cols: 2,
      position: { x: 200, y: 100 },
      tileArr: [],
    },
    {
      id: 5,
      rows: 3,
      cols: 1,
      position: { x: 300, y: 50 },
      tileArr: [],
    },
    {
      id: 6,
      rows: 3,
      cols: 2,
      position: { x: 0, y: 150 },
      tileArr: [],
    },
    {
      id: 7,
      rows: 3,
      cols: 1,
      position: { x: 100, y: 150 },
      tileArr: [],
    },
    {
      id: 8,
      rows: 2,
      cols: 3,
      position: { x: 150, y: 150 },
      tileArr: [],
    },
    {
      id: 9,
      rows: 1,
      cols: 3,
      position: { x: 350, y: 150 },
      tileArr: [],
    },
    {
      id: 10,
      rows: 1,
      cols: 3,
      position: { x: 150, y: 250 },
      tileArr: [],
    },
    {
      id: 11,
      rows: 2,
      cols: 3,
      position: { x: 300, y: 200 },
      tileArr: [],
    },
    {
      id: 12,
      rows: 2,
      cols: 2,
      position: { x: 50, y: 300 },
      tileArr: [],
    },
    {
      id: 13,
      rows: 2,
      cols: 1,
      position: { x: 150, y: 300 },
      tileArr: [],
    },
    {
      id: 14,
      rows: 2,
      cols: 2,
      position: { x: 200, y: 300 },
      tileArr: [],
    },
    {
      id: 15,
      rows: 3,
      cols: 2,
      position: { x: 300, y: 300 },
      tileArr: [],
    },
    {
      id: 16,
      rows: 1,
      cols: 2,
      position: { x: 100, y: 400 },
      tileArr: [],
    },
    {
      id: 17,
      rows: 2,
      cols: 2,
      position: { x: 200, y: 400 },
      tileArr: [],
    },
  ]

  const updateGameBoardWithPlayerTiles = (board: boardType) => {
    board = board.map((item) => {
      const tempTileArr = new Array(item.rows * item.cols).fill("")
      return {
        ...item,
        tileArr: tempTileArr,
      }
    })
    return board
  }

  const updatedGameBoard = updateGameBoardWithPlayerTiles(board)

  return (
    <div {...stylex.props(styles.base)}>
      <div> Title: Kulami </div>
      <Board board={updatedGameBoard} />
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "pink",
  },
})
