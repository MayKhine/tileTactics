import { useState } from "react"
import { boardType, tileType } from "./App"
import { positionType, Tile } from "./Tile"
import * as stylex from "@stylexjs/stylex"
import { GameControlPanel } from "./GameControlPanel"
import { Alert } from "./Alert"
import { tokens } from "./tokens.stylex"
type BoardProps = {
  initialBoard: boardType
  positionMultiplierBasedOnWindowSize: number
}

export const calculateXY = (
  index: number,
  rows: number,
  cols: number,
  x: number,
  y: number,
  positionMultiplierBasedOnWindowSize: number
) => {
  let tempCol = 0
  let tempX = x
  let tempY = y

  for (let curRow = 0; curRow < rows; curRow++) {
    for (let curCol = 0; curCol < cols; curCol++) {
      if (index === curCol + tempCol) {
        // tempX = tempX + curCol * 50
        tempX = tempX + curCol * positionMultiplierBasedOnWindowSize

        return { x: tempX, y: tempY }
      }
    }
    tempCol = tempCol + cols
    // tempY = tempY + 50
    tempY = tempY + positionMultiplierBasedOnWindowSize
  }

  return { x, y }
}
export type playerMarblesType = {
  player1: number
  player2: number
}

export const Board = ({
  initialBoard,
  positionMultiplierBasedOnWindowSize,
}: BoardProps) => {
  const [user, setUser] = useState(true) //true => red, false => black
  const deepCopy = (data: boardType) => JSON.parse(JSON.stringify(data))
  const [gameBoard, setGameBoard] = useState(deepCopy(initialBoard))
  const [validMove, setValidMove] = useState(true)
  const [showPossibleMoves, setShowPossibleMoves] = useState(false)
  const [playerMarbles, setPlayerMarbles] = useState({
    player1: 28,
    player2: 28,
  })
  const [game, setGame] = useState({
    gameStatus: "Ready to start",
    // gameOver: false,
    redPoints: 0,
    blackPoints: 0,
    winner: "",
  })
  const [playersTiles, setPlayersTile] = useState({
    red: {
      id: -1,
      x: -1,
      y: -1,
    },
    black: {
      id: -1,
      x: -1,
      y: -1,
    },
  })

  const [lastMove, setLastMove] = useState({ x: -1, y: -1, id: -1 })

  const gameRestart = () => {
    setUser(true)
    setValidMove(true)
    setGameBoard(deepCopy(initialBoard))
    setPlayersTile((prev) => {
      return {
        ...prev,
        red: {
          id: -1,
          x: -1,
          y: -1,
        },
        black: {
          id: -1,
          x: -1,
          y: -1,
        },
      }
    })
    setLastMove((prev) => {
      return { ...prev, x: -1, y: -1, id: -1 }
    })
    setGame((prev) => {
      return {
        ...prev,
        gameStatus: "Ready to start",
        redPoints: 0,
        blackPoints: 0,
        winner: "",
      }
    })
    setPlayerMarbles({
      player1: 28,
      player2: 28,
    })

    console.log("board after reset", gameBoard[2], initialBoard[2])
  }
  const checkValidMovesLeft = (
    id: number,
    positionX: number,
    positionY: number
  ) => {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let z = 0; z < gameBoard[i].tileArr.length; z++) {
        if (
          (gameBoard[i].tileArr[z].x === positionX &&
            gameBoard[i].tileArr[z].owner.length === 0 &&
            gameBoard[i].id != id &&
            lastMove.id != gameBoard[i].id) ||
          (gameBoard[i].tileArr[z].y === positionY &&
            gameBoard[i].tileArr[z].owner.length === 0 &&
            gameBoard[i].id != id &&
            lastMove.id != gameBoard[i].id)
        ) {
          setValidMove(true)
          return true
        }
      }
    }

    gameEndHandler()
    return
  }

  const gameEndHandler = () => {
    setGame((prevData) => {
      return { ...prevData, gameStatus: "Over" }
    })
    setValidMove(false)
    setTimeout(() => setValidMove(true), 5000)
    calculatePlayersPoint()
  }
  const calculatePlayersPoint = () => {
    let totalRedPoints = 0
    let totalBlackPoints = 0
    for (let i = 0; i < gameBoard.length; i++) {
      let tempRedPoints = 0
      let tempBlackPoints = 0
      for (let x = 0; x < gameBoard[i].tileArr.length; x++) {
        if (gameBoard[i].tileArr[x].owner == "red") {
          tempRedPoints = tempRedPoints + 1
        }
        if (gameBoard[i].tileArr[x].owner == "black") {
          tempBlackPoints = tempBlackPoints + 1
        }
      }
      if (tempBlackPoints > tempRedPoints) {
        totalBlackPoints = totalBlackPoints + gameBoard[i].tileArr.length
      }
      if (tempRedPoints > tempBlackPoints) {
        totalRedPoints = totalRedPoints + gameBoard[i].tileArr.length
      }
    }
    setGame((prevData) => {
      return {
        ...prevData,
        redPoints: totalRedPoints,
        blackPoints: totalBlackPoints,
        winner:
          totalRedPoints > totalBlackPoints
            ? "Player 1"
            : totalBlackPoints > totalRedPoints
            ? "Player 2"
            : "Draw",
      }
    })
  }

  const clickHandler = (
    id: number,
    index: number,
    rows: number,
    cols: number,
    position: positionType
  ) => {
    const selectedCellPosition = calculateXY(
      index,
      rows,
      cols,
      position.x,
      position.y,
      positionMultiplierBasedOnWindowSize
    )

    if (game.gameStatus == "Over") {
      return
    }
    const userColor = user == true ? "red" : "black"

    if (lastMove.x == 1 && lastMove.y == 1) {
      setGame((prevData) => {
        return { ...prevData, gameStatus: "On" }
      })
    }

    if (
      playersTiles.black.id !== id &&
      playersTiles.red.id !== id &&
      (lastMove.x == -1 ||
        lastMove.y == -1 ||
        selectedCellPosition.x == lastMove.x ||
        selectedCellPosition.y == lastMove.y) &&
      gameBoard[id - 1].tileArr[index].owner.length === 0
    ) {
      setPlayersTile((prevData) => {
        return {
          ...prevData,
          [userColor]: {
            id: id,
            x: selectedCellPosition.x,
            y: selectedCellPosition.y,
          },
        }
      })

      setLastMove(() => {
        return { ...selectedCellPosition, id: id }
      })

      // setGame((prevData) => {
      //   return { ...prevData, gameStatus: "On" }
      // })

      setUser(!user)
      const newTileArr = gameBoard[id - 1].tileArr
      newTileArr[index].owner = userColor

      setGameBoard((prevData: boardType) => {
        return prevData.map((tile, index) => {
          if (index === id - 1) {
            return { ...tile, tileArr: [...newTileArr] }
          }
          return tile
        })
      })

      setPlayerMarbles((prevData: playerMarblesType) => {
        if (userColor == "red") {
          const marbles = prevData.player1 - 1

          return { ...prevData, player1: marbles }
        }
        if (userColor == "black") {
          const marbles = prevData.player2 - 1
          if (marbles == 0 && prevData.player1 == 0) {
            console.log("game over")
            gameEndHandler()
          }
          return { ...prevData, player2: marbles }
        }
      })
      checkValidMovesLeft(id, selectedCellPosition.x, selectedCellPosition.y)

      console.log("click handler end : ", gameBoard[1], lastMove, playersTiles)

      // if (
      //   checkValidMovesLeft(id, selectedCellPosition.x, selectedCellPosition.y)
      // ) {
      //   setLastMove(() => {
      //     return { ...selectedCellPosition, id: id }
      //   })
      //   return
      // }
    } else {
      setValidMove(false)
      setTimeout(() => setValidMove(true), 5000)
      return
    }
  }

  // useEffect(() => {
  //   const updatedBoard = gameBoard.map((tile: tileType) => {
  //     return {
  //       ...tile,
  //       position: {
  //         x: tile.originalPosition.x * positionMultiplierBasedOnWindowSize,
  //         y: tile.originalPosition.y * positionMultiplierBasedOnWindowSize,
  //       },
  //     }
  //   })
  //   setGameBoard(updatedBoard)
  // }, [positionMultiplierBasedOnWindowSize])

  // console.log(
  //   "gmae board",
  //   gameBoard[0].originalPosition,
  //   gameBoard[0].position
  // )

  return (
    <div {...stylex.props(styles.base)}>
      {!validMove && game.gameStatus != "Over" && (
        <Alert
          closeAlert={() => {
            setValidMove(true)
          }}
          text="Invalid Move"
        />
      )}

      {!validMove && game.gameStatus == "Over" && (
        <Alert
          closeAlert={() => {
            setValidMove(true)
          }}
          text="Game Over"
        />
      )}
      <div {...stylex.props(styles.title)}>Title Tactics</div>
      <div {...stylex.props(styles.gameControlPanelContainer)}>
        <GameControlPanel
          gameRestart={gameRestart}
          game={game}
          user={user}
          showPossilbeMovesHandler={(value: boolean) => {
            setShowPossibleMoves(value)
          }}
          playerMarbles={playerMarbles}
        />
      </div>
      <div {...stylex.props(styles.boardContainer)}>
        <div
          {...stylex.props(
            styles.board(game.gameStatus === "Over" ? true : false)
          )}
        >
          {gameBoard.map((tile: tileType) => (
            <Tile
              key={tile.id}
              rows={tile.rows}
              cols={tile.cols}
              position={tile.position}
              id={tile.id}
              clickHandler={clickHandler}
              tileArr={tile.tileArr}
              calculateXY={calculateXY}
              lastMove={lastMove}
              playersTile={playersTiles}
              gameBoard={gameBoard}
              showPossilbeMoves={showPossibleMoves}
              positionMultiplierBasedOnWindowSize={
                positionMultiplierBasedOnWindowSize
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    width: "100%",
    height: "100%",
    backgroundColor: "lightyellow",
    display: "flex",
    flexDirection: "column",
  },
  gameControlPanelContainer: {
    width: "100%",
    backgroundColor: "orange",
  },

  boardContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "green",
  },

  board: (gameOver: boolean) => ({
    pointerEvents: gameOver == true ? "none" : "all",
    backgroundColor: "pink",

    width: {
      default: `${Math.round((parseInt(tokens.bigCellSize) * 10) / 16)}rem`,
      "@media (max-width: 430px)": `${Math.round(
        (parseInt(tokens.smallCellSize) * 10) / 16
      )}rem`,
      "@media (min-width: 431px) and (max-width: 768px)": `${Math.round(
        (parseInt(tokens.medCellSize) * 10) / 16
      )}rem`,
    },
    height: {
      default: `${Math.round((parseInt(tokens.bigCellSize) * 10) / 16)}rem`,
      "@media (max-width: 430px)": `${Math.round(
        (parseInt(tokens.smallCellSize) * 10) / 16
      )}rem`,
      "@media (min-width: 431px) and (max-width: 768px)": `${Math.round(
        (parseInt(tokens.medCellSize) * 10) / 16
      )}rem`,
    },
    position: "relative",
    boxSizing: "border-box",
  }),
  title: {
    fontSize: "2rem",
    width: "100%",
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "400",
    fontStyle: "normal",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
  },
})
