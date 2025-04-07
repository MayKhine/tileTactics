import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { playerMarblesType } from "./Board"
import { colors, projectStyles } from "./tokens.stylex"
import { RiInformationFill } from "react-icons/ri"

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
  clickInfo: () => void
  clickTutorial: () => void
}
export const GameControlPanel = ({
  gameRestart,
  game,
  user,
  showPossilbeMovesHandler,
  playerMarbles,
  clickInfo,
  clickTutorial,
}: GameControlPanelProps) => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.controlPanel)}>
        <div {...stylex.props(styles.options)}>
          <div {...stylex.props(styles.tutorialDiv)} onClick={clickTutorial}>
            <p>Tutorial</p>
          </div>
          <div {...stylex.props(styles.iContainer)}>
            <RiInformationFill color="black" size={30} onClick={clickInfo} />
          </div>

          <div {...stylex.props(styles.spaceBetweenContainer)}>
            <div {...stylex.props(styles.restartButtonContainer)}>
              <div
                {...stylex.props(projectStyles.button)}
                onClick={gameRestart}
              >
                Restart
              </div>
            </div>
            <div {...stylex.props(styles.checkedBoxContainer)}>
              <div
                {...stylex.props(styles.checkedBox, projectStyles.border)}
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
          </div>
        </div>

        {game.gameStatus != "Over" && (
          <div>
            <div
              {...stylex.props(styles.spaceBetweenContainer, styles.playerTurn)}
            >
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
            <div
              {...stylex.props(styles.spaceBetweenContainer, styles.playerTurn)}
            >
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
    minHeight: "9rem",
    display: "flex",
    justifyContent: "center",
  },
  controlPanel: {
    minWidth: "20rem",
  },
  options: {
    marginBottom: ".5rem",
  },
  restartButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  checkedBoxContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: ".3rem",
  },
  checkedBox: {
    cursor: "pointer",
    height: "1rem",
    width: "1rem",
    backgroundColor: "#FFFBF4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ".2rem",
  },
  playerTurn: {
    height: "2rem",
  },
  checkedMark: {
    width: "60%",
    aspectRatio: "1",
    backgroundColor: "#002244",
    borderRadius: "50%",
  },
  iContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    cursor: "pointer",
  },
  tutorialDiv: {
    cursor: "pointer",
    backgroundColor: "pink",
    borderRadius: "1rem",
    padding: ".5rem",
    alignItems: "center",
  },
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
