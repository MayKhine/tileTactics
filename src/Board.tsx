import { useState } from "react"
import { boardType, playerBoardType } from "./App"
import { Tile } from "./Title"
import * as stylex from "@stylexjs/stylex"

type BoardProps = {
  gameBoard: boardType
  playerBoard: playerBoardType
}
export const Board = ({ gameBoard, playerBoard }: BoardProps) => {
  const [user, setUser] = useState(true) //true => red, false => black
  const [playingBoard, setPlayingBoard] = useState(playerBoard)

  const clickHandler = (id: number, index: number) => {
    const userColor = user == true ? "red" : "black"
    setUser(!user)

    const newTileArr = playingBoard[id - 1].tile
    newTileArr[index] = userColor
    console.log(newTileArr)

    setPlayingBoard((prevData) => {
      const tempArr = prevData
      tempArr[id - 1].tile = newTileArr
      return tempArr
    })

    // console.log("What is current palyign board", playingBoard)
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
