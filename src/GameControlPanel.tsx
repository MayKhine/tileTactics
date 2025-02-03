import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { playerMarblesType } from "./Board"

type GameControlPanelProps = {
  gameRestart: () => void
  game: {
    gameStatus: string
    redPoints: number
    blackPoints: number
    winner: string
  }
  user: boolean
  showPossilbeMovesHandler: (value: boolean) => void
  playerMarbles: playerMarblesType
}
export const GameControlPanel = ({
  gameRestart,
  game,
  user,
  showPossilbeMovesHandler,
  playerMarbles,
}: GameControlPanelProps) => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.controlPanel)}>
        <div {...stylex.props(styles.restartButtonContainer)}>
          <div {...stylex.props(styles.restartButton)} onClick={gameRestart}>
            Restart
          </div>
        </div>
        <div {...stylex.props(styles.spaceBetweenContainer)}>
          <div
            {...stylex.props(styles.checkedBox)}
            onClick={() => {
              if (!isChecked) {
                showPossilbeMovesHandler(true)
                setIsChecked(true)
              } else {
                showPossilbeMovesHandler(false)
                setIsChecked(false)
              }
            }}
          >
            {isChecked && <div {...stylex.props(styles.checkedMark)} />}
          </div>
          <span>Show Possible Moves </span>
        </div>
        <div {...stylex.props(styles.spaceBetweenContainer)}>
          <div>Game Status: </div>
          <div>{game.gameStatus}</div>
        </div>
        {game.gameStatus != "Over" && (
          <div>
            <div {...stylex.props(styles.spaceBetweenContainer)}>
              <div> Player Turn: </div>
              <div>{user == true ? "Player 1" : "Player 2"} </div>
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
    </div>
  )
}

const styles = stylex.create({
  base: {
    minHeight: "7.5rem",
    display: "flex",
    justifyContent: "center",
    fontSize: ".8rem",
    paddingBottom: "1rem",
  },
  controlPanel: {
    // backgroundColor: "gray",
    minWidth: "12rem",
  },
  restartButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: ".5rem",
  },
  restartButton: {
    cursor: "pointer",
    borderRadius: ".5rem",
    border: "2px solid black",
    padding: ".5rem",
    backgroundColor: {
      default: "white",
      ":hover": "lightgray",
    },
    width: "max-content",
  },

  checkedBox: {
    cursor: "pointer",
    height: "1rem",
    width: "1rem",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ".2rem",
  },
  checkedMark: {
    width: "60%",
    aspectRatio: "1",
    backgroundColor: "black",
    borderRadius: "50%",
  },
  spaceBetweenContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // backgroundColor: "white",
  },
  playerPoints: {
    // backgroundColor: "white",
  },
})
