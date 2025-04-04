import * as stylex from "@stylexjs/stylex"
import { useEffect, useState } from "react"

import { Board } from "./Board"
import { positionType } from "./Tile"
import { calculateXY } from "./helperFunc"
export type boardType = Array<tileType>

export type tileType = {
  id: number
  rows: number
  cols: number
  originalPosition: positionType
  position: positionType
  tileArr: TileArrType
}

export type TileArrType = Array<{ owner: string; x: number; y: number }>

export const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  //small screen: max 430px => 15px
  //med: min 431 px  to 768px => 30px
  //big: min 768px => 50px

  const positionMultiplierBasedOnWindowSize =
    windowSize.width <= 430
      ? 40
      : windowSize.width > 430 && windowSize.width <= 768
      ? 45
      : 50

  // const tutorialBoard = [
  //   {
  //     id: 1,
  //     rows: 2,
  //     cols: 2,
  //     originalPosition: {
  //       x: 4,
  //       y: 0,
  //     },
  //     position: { x: 0, y: 0 },

  //     tileArr: [],
  //   },
  //   {
  //     id: 2,
  //     rows: 1,
  //     cols: 2,
  //     originalPosition: {
  //       x: 0,
  //       y: 2,
  //     },
  //     position: { x: 0, y: 0 },

  //     tileArr: [],
  //   },
  //   {
  //     id: 3,
  //     rows: 2,
  //     cols: 2,
  //     originalPosition: {
  //       x: 2,
  //       y: 1,
  //     },
  //     position: { x: 0, y: 0 },

  //     tileArr: [],
  //   },
  //   {
  //     id: 4,
  //     rows: 1,
  //     cols: 2,
  //     originalPosition: {
  //       x: 4,
  //       y: 2,
  //     },
  //     position: { x: 0, y: 0 },

  //     tileArr: [],
  //   },
  //   {
  //     id: 5,
  //     rows: 3,
  //     cols: 1,
  //     originalPosition: {
  //       x: 6,
  //       y: 1,
  //     },
  //     position: { x: 0, y: 0 },
  //     tileArr: [],
  //   },
  //   {
  //     id: 6,
  //     rows: 3,
  //     cols: 2,
  //     originalPosition: {
  //       x: 0,
  //       y: 3,
  //     },
  //     position: { x: 0, y: 0 },

  //     tileArr: [],
  //   },
  // ]

  const board = [
    {
      id: 1,
      rows: 2,
      cols: 2,
      originalPosition: {
        x: 4,
        y: 0,
      },
      position: { x: 0, y: 0 },

      tileArr: [],
    },
    {
      id: 2,
      rows: 1,
      cols: 2,
      originalPosition: {
        x: 0,
        y: 2,
      },
      position: { x: 0, y: 0 },

      tileArr: [],
    },
    {
      id: 3,
      rows: 2,
      cols: 2,
      originalPosition: {
        x: 2,
        y: 1,
      },
      position: { x: 0, y: 0 },

      tileArr: [],
    },
    {
      id: 4,
      rows: 1,
      cols: 2,
      originalPosition: {
        x: 4,
        y: 2,
      },
      position: { x: 0, y: 0 },

      tileArr: [],
    },
    {
      id: 5,
      rows: 3,
      cols: 1,
      originalPosition: {
        x: 6,
        y: 1,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 6,
      rows: 3,
      cols: 2,
      originalPosition: {
        x: 0,
        y: 3,
      },
      position: { x: 0, y: 0 },

      tileArr: [],
    },
    {
      id: 7,
      rows: 3,
      cols: 1,
      // position: { x: 100, y: 150 },
      originalPosition: {
        x: 2,
        y: 3,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 8,
      rows: 2,
      cols: 3,
      // position: { x: 150, y: 150 },
      originalPosition: {
        x: 3,
        y: 3,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 9,
      rows: 1,
      cols: 3,
      originalPosition: {
        x: 7,
        y: 3,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 10,
      rows: 1,
      cols: 3,
      originalPosition: {
        x: 3,
        y: 5,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 11,
      rows: 2,
      cols: 3,
      originalPosition: {
        x: 6,
        y: 4,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 12,
      rows: 2,
      cols: 2,
      originalPosition: {
        x: 1,
        y: 6,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 13,
      rows: 2,
      cols: 1,
      originalPosition: {
        x: 3,
        y: 6,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 14,
      rows: 2,
      cols: 2,
      originalPosition: {
        x: 4,
        y: 6,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 15,
      rows: 3,
      cols: 2,
      originalPosition: {
        x: 6,
        y: 6,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 16,
      rows: 1,
      cols: 2,
      originalPosition: {
        x: 2,
        y: 8,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
    {
      id: 17,
      rows: 2,
      cols: 2,
      originalPosition: {
        x: 4,
        y: 8,
      },
      position: { x: 0, y: 0 },
      tileArr: [],
    },
  ]

  const updateGameBoardWithPlayerTiles = (board: boardType) => {
    board = board.map((item) => {
      const tempTileArr = new Array(item.rows * item.cols).fill({
        owner: "",
        x: -1,
        y: -1,
      })

      return {
        ...item,
        tileArr: tempTileArr,
      }
    })
    return board
  }

  const updateGameBoardForEachCell = (board: boardType) => {
    board = board.map((item) => {
      const tempTileArr = item.tileArr

      for (let i = 0; i < item.tileArr.length; i++) {
        const result = calculateXY(
          i,
          item.rows,
          item.cols,
          item.position.x,
          item.position.y,
          positionMultiplierBasedOnWindowSize
        )
        tempTileArr[i] = { ...tempTileArr[i], x: result.x, y: result.y }
      }
      return { ...item, tileArr: tempTileArr }
    })
    return board
  }

  const updateTilePosition = (
    board: boardType,
    positionMultiplierBasedOnWindowSize: number
  ) => {
    board = board.map((item) => {
      const tempPosition = {
        x: item.originalPosition.x * positionMultiplierBasedOnWindowSize,
        y: item.originalPosition.y * positionMultiplierBasedOnWindowSize,
      }
      return { ...item, position: tempPosition }
    })
    return board
  }

  const updatedGameBoard = updateGameBoardWithPlayerTiles(board)
  const updatedGameBoard3 = updateTilePosition(
    updatedGameBoard,
    positionMultiplierBasedOnWindowSize
  )
  const updateBoardTileArr = updateGameBoardForEachCell(updatedGameBoard3)

  // const updatedTutorialBoard = updateGameBoardWithPlayerTiles(tutorialBoard)
  // const updatedTutorialBoard2 = updateTilePosition(
  //   updatedTutorialBoard,
  //   positionMultiplierBasedOnWindowSize
  // )

  // const updateTutorialBoardTileArr = updateGameBoardForEachCell(
  //   updatedTutorialBoard2
  // )
  return (
    <div {...stylex.props(styles.base)}>
      <Board
        initialBoard={updateBoardTileArr}
        positionMultiplierBasedOnWindowSize={
          positionMultiplierBasedOnWindowSize
        }
      />
    </div>
  )
}

const styles = stylex.create({
  base: {
    height: "100%",
    width: "100%",
  },
})
