import { useState } from "react"
import { boardType } from "./App"
import { positionType, Tile } from "./Title"
import * as stylex from "@stylexjs/stylex"
import { InvalidMoveAlert } from "./InvalidMoveAlert"

type BoardProps = {
  board: boardType
}

export const calculateXY = (
  index: number,
  rows: number,
  cols: number,
  x: number,
  y: number
) => {
  let tempCol = 0
  let tempX = x
  let tempY = y

  for (let curRow = 0; curRow < rows; curRow++) {
    for (let curCol = 0; curCol < cols; curCol++) {
      if (index === curCol + tempCol) {
        tempX = tempX + curCol * 50
        return { x: tempX, y: tempY }
      }
    }
    tempCol = tempCol + cols
    tempY = tempY + 50
  }

  return { x, y }
}

export const Board = ({ board }: BoardProps) => {
  const [user, setUser] = useState(true) //true => red, false => black
  const [gameBoard, setGameBoard] = useState([...board])
  const [validMove, setValidMove] = useState(true)
  const [game, setGame] = useState({
    gameOver: false,
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
    console.log("game restart: ", gameBoard, board)
    setGameBoard(() => [...board])
    console.log("after: ", gameBoard)
  }
  const checkValidMovesLeft = (
    id: number,
    positionX: number,
    positionY: number
  ) => {
    for (let i = 0; i < board.length; i++) {
      for (let z = 0; z < board[i].tileArr.length; z++) {
        if (
          (board[i].tileArr[z].x === positionX &&
            board[i].tileArr[z].owner.length === 0 &&
            board[i].id != id &&
            lastMove.id != board[i].id) ||
          (board[i].tileArr[z].y === positionY &&
            board[i].tileArr[z].owner.length === 0 &&
            board[i].id != id &&
            lastMove.id != board[i].id)
        ) {
          // console.log(
          //   board[i].tileArr[z].x,
          //   positionX,
          //   board[i].tileArr[z].owner,
          //   board[i].tileArr[z].y,
          //   positionY,
          //   board[i].tileArr[z].owner
          // )
          return true
        }
      }
    }

    setGame((prevData) => {
      return { ...prevData, gameOver: true }
    })
    return false
  }

  const calculatePlayersPoint = (board: boardType) => {
    let totalRedPoints = 0
    let totalBlackPoints = 0
    for (let i = 0; i < board.length; i++) {
      let tempRedPoints = 0
      let tempBlackPoints = 0
      for (let x = 0; x < board[i].tileArr.length; x++) {
        if (board[i].tileArr[x].owner == "red") {
          tempRedPoints = tempRedPoints + 1
        }
        if (board[i].tileArr[x].owner == "black") {
          tempBlackPoints = tempBlackPoints + 1
        }
      }
      if (tempBlackPoints > tempRedPoints) {
        totalBlackPoints = totalBlackPoints + board[i].tileArr.length
      }
      if (tempRedPoints > tempBlackPoints) {
        totalRedPoints = totalRedPoints + board[i].tileArr.length
      }
    }
    // return { red: totalRedPoints, black: totalBlackPoints }
    setGame((prevData) => {
      return {
        ...prevData,
        redPoints: totalRedPoints,
        blackPoints: totalBlackPoints,
        winner:
          totalRedPoints > totalBlackPoints
            ? "red"
            : totalBlackPoints > totalRedPoints
            ? "black"
            : "draw",
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
      position.y
    )

    const userColor = user == true ? "red" : "black"

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
        setValidMove(true)
        // return { ...prevData, [userColor]: id }
        return {
          ...prevData,
          [userColor]: {
            id: id,
            x: selectedCellPosition.x,
            y: selectedCellPosition.y,
          },
        }
      })
      setUser(!user)
      //get a copy of the tile
      const newTileArr = gameBoard[id - 1].tileArr
      newTileArr[index].owner = userColor
      setGameBoard((prevData) => {
        const tempArr = prevData
        tempArr[id - 1].tileArr = newTileArr
        return tempArr
      })
      if (
        checkValidMovesLeft(id, selectedCellPosition.x, selectedCellPosition.y)
      ) {
        setLastMove(() => {
          return { ...selectedCellPosition, id: id }
        })
        return
      } else {
        calculatePlayersPoint(board)
      }
    } else {
      setValidMove(false)
      setTimeout(() => setValidMove(true), 5000)
      return
    }
  }

  return (
    <div>
      {!validMove && (
        <InvalidMoveAlert
          closeAlert={() => {
            setValidMove(true)
          }}
        />
      )}
      <div>
        <div {...stylex.props(styles.restartButton)} onClick={gameRestart}>
          {" "}
          Restart
        </div>
        <div> User: {user == true ? "Red" : "Black"}</div>
        {game.gameOver && (
          <div>
            <div> Game Over</div>
            <div> Winner: {game.winner}</div>
            <div>
              {" "}
              Red: {game.redPoints} , Black: {game.blackPoints}
            </div>
          </div>
        )}
      </div>

      <div {...stylex.props(styles.board(game.gameOver))}>
        {gameBoard.map((tile) => (
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
          />
        ))}
      </div>
    </div>
  )
}

const styles = stylex.create({
  board: (gameOver: boolean) => ({
    pointerEvents: gameOver == true ? "none" : "all",
    position: "relative",
    height: "100%",
    boxSizing: "border-box",
  }),
  restartButton: {
    cursor: "pointer",
    border: "1px solid black",
    padding: "1rem",
    backgroundColor: {
      default: "white",
      ":hover": "lightgray",
    },
    width: "max-content",
  },
})
