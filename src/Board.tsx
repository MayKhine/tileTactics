import { useState } from "react"
import { boardType } from "./App"
import { positionType, Tile } from "./Title"
import * as stylex from "@stylexjs/stylex"
import { InvalidMoveAlert } from "./InvalidMoveAlert"

type BoardProps = {
  board: boardType
}
export const Board = ({ board }: BoardProps) => {
  const [user, setUser] = useState(true) //true => red, false => black
  const [gameBoard, setGameBoard] = useState(board)
  const [validMove, setValidMove] = useState(true)
  const [playersTiles, setPlayersTile] = useState({ red: -1, black: -1 })
  const [lastMove, setLastMove] = useState({ x: -1, y: -1, id: -1 })

  const calculateXY = (
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
      playersTiles.black !== id &&
      playersTiles.red !== id &&
      (lastMove.x == -1 ||
        lastMove.y == -1 ||
        selectedCellPosition.x == lastMove.x ||
        selectedCellPosition.y == lastMove.y) &&
      gameBoard[id - 1].tileArr[index].length === 0
    ) {
      setPlayersTile((prevData) => {
        setValidMove(true)
        return { ...prevData, [userColor]: id }
      })
      setUser(!user)
      //get a copy of the tile
      const newTileArr = gameBoard[id - 1].tileArr
      newTileArr[index] = userColor
      setGameBoard((prevData) => {
        const tempArr = prevData
        tempArr[id - 1].tileArr = newTileArr
        return tempArr
      })
      setLastMove(() => {
        return { ...selectedCellPosition, id: id }
      })
      return
      //check if there's still valid moves to make more
    }

    setValidMove(false)
    setTimeout(() => setValidMove(true), 5000)
    return
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
      <div> User: {user == true ? "Red" : "Black"}</div>
      <div {...stylex.props(styles.board)}>
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
          />
        ))}
      </div>
    </div>
  )
}

const styles = stylex.create({
  board: {
    position: "relative",
    height: "100%",
    boxSizing: "border-box",
  },
})
