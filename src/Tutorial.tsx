import * as stylex from "@stylexjs/stylex"
import { IoMdCloseCircle } from "react-icons/io"
import { boardType, tileType } from "./App"
import { colors, projectStyles, tokens } from "./tokens.stylex"
import { useEffect, useState } from "react"
import { playerMarblesType } from "./Board"
import { positionType, Tile } from "./Tile"
import { calculateXY } from "./helperFunc"
import { Alert } from "./Alert"

type TutorialProps = {
  clickClose: () => void
  initialTutorialBoard: boardType
  positionMultiplierBasedOnWindowSize: number
}
export const Tutorial = ({
  clickClose,
  initialTutorialBoard,
  positionMultiplierBasedOnWindowSize,
}: TutorialProps) => {
  const [user, setUser] = useState(true) //true => red, false => black
  const deepCopy = (data: boardType) => JSON.parse(JSON.stringify(data))
  const [gameBoard, setGameBoard] = useState(deepCopy(initialTutorialBoard))
  const [validMove, setValidMove] = useState(true)
  const [showPossibleMoves, setShowPossibleMoves] = useState(true)
  const [playerMarbles, setPlayerMarbles] = useState<playerMarblesType>({
    player1: 10,
    player2: 10,
  })

  const [infoClick, setInfoClick] = useState(false)
  const [tutorial, setTutorial] = useState(false)
  const [game, setGame] = useState({
    gameStatus: "Ready to start",
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
    setGameBoard(deepCopy(initialTutorialBoard))
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
      player1: 10,
      player2: 10,
    })
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
            gameEndHandler()
          }
          return { ...prevData, player2: marbles }
        }

        return { ...prevData }
      })

      if (
        checkValidMovesLeft(id, selectedCellPosition.x, selectedCellPosition.y)
      ) {
        setLastMove(() => {
          return { ...selectedCellPosition, id: id }
        })
        return
      }
    } else {
      setValidMove(false)
      setTimeout(() => setValidMove(true), 5000)
      return
    }
  }

  useEffect(() => {
    const updatedBoard = gameBoard.map((tile: tileType) => {
      return {
        ...tile,
        position: {
          x: tile.originalPosition.x * positionMultiplierBasedOnWindowSize,
          y: tile.originalPosition.y * positionMultiplierBasedOnWindowSize,
        },
      }
    })
    setGameBoard(updatedBoard)
    gameRestart()
  }, [positionMultiplierBasedOnWindowSize])

  return (
    <div {...stylex.props(styles.popup)} onClick={clickClose}>
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
      <div
        {...stylex.props(styles.baseDiv)}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div {...stylex.props(styles.closeIconDiv)}>
          <IoMdCloseCircle color="black" size={30} onClick={clickClose} />
        </div>
        <div {...stylex.props(styles.scrollDiv)}>
          <div {...stylex.props(styles.gameInfo)}>
            <div {...stylex.props(styles.centerDiv)}>
              <div {...stylex.props(styles.headerFont)}>Sample Game Play</div>
              <div
                {...stylex.props(projectStyles.button)}
                onClick={gameRestart}
              >
                Restart
              </div>
            </div>
            {game.gameStatus != "Over" && (
              <div>
                <div {...stylex.props(styles.spaceBetweenContainer)}>
                  <div> Player Turn: </div>
                  <div {...stylex.props(styles.playerColor(user))}>
                    {user == true ? "Player 1" : "Player 2"}{" "}
                  </div>
                </div>
                <div {...stylex.props(styles.spaceBetweenContainer)}>
                  <div> Player 1 marbles: </div>
                  <div> {playerMarbles.player1} </div>
                </div>
                <div {...stylex.props(styles.spaceBetweenContainer)}>
                  <div> Player 2 marbles: </div>
                  <div> {playerMarbles.player2} </div>
                </div>
              </div>
            )}
            {game.gameStatus == "Over" && (
              <div>
                <div {...stylex.props(styles.spaceBetweenContainer)}>
                  <div> Winner: </div> <div> {game.winner} </div>
                </div>
                <div {...stylex.props(styles.spaceBetweenContainer)}>
                  <div> Player 1: </div> <div> {game.redPoints} points</div>
                </div>
                <div {...stylex.props(styles.spaceBetweenContainer)}>
                  <div> Player 2: </div> <div> {game.blackPoints} points</div>
                </div>
              </div>
            )}
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
      </div>
    </div>
  )
}

const styles = stylex.create({
  popup: {
    backgroundColor: "rgba(0, 0, 0, .5)",
    width: "100%",
    height: "100%",
    zIndex: "10",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",
  },
  baseDiv: {
    backgroundColor: "#FFFBF4",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    padding: "1rem",
    width: {
      default: "70%",
      "@media (max-width: 768px)": "100%",
    },
    height: {
      default: "70%",
      "@media (max-height: 700px)": "100%",
    },
    maxWidth: "50rem",
    maxHeight: "50rem",
  },
  scrollDiv: { overflow: "auto" },
  closeIconDiv: {
    // backgroundColor: "pink",
    cursor: "pointer",
    display: "flex",
    paddingRight: "1.5rem",
    paddingTop: "1rem",
    justifyContent: "flex-end",
  },
  gameInfo: {
    // backgroundColor: "orange",
    alignContent: "center",
    // justifyItems: "center",
    width: "100%",
    paddingBottom: "1rem",
  },
  centerDiv: {
    gap: ".5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerFont: {
    fontSize: "1.5rem",
    fontWeight: "400",
    fontStyle: "normal",
  },
  boardContainer: {
    backgroundColor: "pink",
    display: "flex",
    justifyContent: "center",
    maxHeight: "100%",
  },
  board: (gameOver: boolean) => ({
    pointerEvents: gameOver == true ? "none" : "all",
    width: {
      default: `${Math.round((parseInt(tokens.bigCellSize) * 7) / 16)}rem`,
      "@media (max-width: 430px)": `${Math.round(
        (parseInt(tokens.smallCellSize) * 7) / 16
      )}rem`,
      "@media (min-width: 431px) and (max-width: 768px)": `${Math.round(
        (parseInt(tokens.medCellSize) * 7) / 16
      )}rem`,
    },
    height: {
      default: `${Math.round((parseInt(tokens.bigCellSize) * 7) / 16)}rem`,
      "@media (max-width: 430px)": `${Math.round(
        (parseInt(tokens.smallCellSize) * 7) / 16
      )}rem`,
      "@media (min-width: 431px) and (max-width: 768px)": `${Math.round(
        (parseInt(tokens.medCellSize) * 7) / 16
      )}rem`,
    },
    position: "relative",
    boxSizing: "border-box",
  }),
  spaceBetweenContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerColor: (player1: boolean) => ({
    backgroundColor: player1 == true ? colors.sand : colors.blue,
    padding: {
      default: ".3rem",
      "@media (max-width: 430px)": ".1rem",
      "@media (min-width: 431px) and (max-width: 768px)": ".2rem",
    },
    borderRadius: {
      default: ".3rem",
      "@media (max-width: 430px)": ".15rem",
    },
  }),
})
