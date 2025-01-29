import { useState } from "react"
import { boardType } from "./App"
import { Tile } from "./Title"
import * as stylex from "@stylexjs/stylex"

type BoardProps = {
  board: boardType
}
export const Board = ({ board }: BoardProps) => {
  const [user, setUser] = useState(true) //true => red, false => black
  const [gameBoard, setGameBoard] = useState(board)
  const [errorMsg, setErrorMsg] = useState("")
  const [playersTiles, setPlayersTile] = useState({ red: 1, black: 2 })

  const clickHandler = (id: number, index: number) => {
    const userColor = user == true ? "red" : "black"

    //check if user is already owns this tile
    if (playersTiles.black === id || playersTiles.red === id) {
      console.log("user already own this shit")
      setErrorMsg("Cannot place the tile here")
      return
    }

    setPlayersTile((prevData) => {
      setErrorMsg("")
      return { ...prevData, [userColor]: id }
    })
    console.log("What is palyers tile ", playersTiles)

    setUser(!user)
    //get a copy of the tile
    const newTileArr = gameBoard[id - 1].tileArr
    newTileArr[index] = userColor

    setGameBoard((prevData) => {
      const tempArr = prevData
      tempArr[id - 1].tileArr = newTileArr
      return tempArr
    })

    console.log("Game board", gameBoard)
  }

  return (
    <div>
      <div> User: {user == true ? "Red" : "Black"}</div>
      <div>Error Msg : {errorMsg} </div>
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
