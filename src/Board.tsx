import { useState } from "react"
import { boardType } from "./App"
import { Tile } from "./Title"
import * as stylex from "@stylexjs/stylex"

type BoardProps = {
  gameBoard: boardType
}
export const Board = ({ gameBoard }: BoardProps) => {
  const [user, setUser] = useState(true) //true => red, false => black
  const [GameBoard, setGameBoard] = useState(gameBoard)

  const clickHandler = (id: number, index: number) => {
    const userColor = user == true ? "red" : "black"
    setUser(!user)

    console.log("id: ", id, index)
    const newTileArr = GameBoard[id - 1].tileArr
    newTileArr[index] = userColor

    setGameBoard((prevData) => {
      const tempArr = prevData
      tempArr[id - 1].tileArr = newTileArr
      return tempArr
    })

    console.log("Game board", GameBoard)
  }

  return (
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
        />
      ))}
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
