import * as stylex from "@stylexjs/stylex"

type GameControlPanelProps = {
  gameRestart: () => void
  game: {
    gameStatus: string
    // gameOver: boolean
    redPoints: number
    blackPoints: number
    winner: string
  }
  user: boolean
}
export const GameControlPanel = ({
  gameRestart,
  game,
  user,
}: GameControlPanelProps) => {
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.controlPanel)}>
        <div {...stylex.props(styles.restartButtonContainer)}>
          <div {...stylex.props(styles.restartButton)} onClick={gameRestart}>
            Restart
          </div>
        </div>
        <div {...stylex.props(styles.spaceBetweenContainer)}>
          <div>Game Status: </div>
          <div>{game.gameStatus}</div>
        </div>
        {game.gameStatus != "Over" && (
          <div {...stylex.props(styles.spaceBetweenContainer)}>
            <div> Player Turn: </div>{" "}
            <div>{user == true ? "Player 1" : "Player 2"} </div>
          </div>
        )}

        {game.gameStatus == "Over" && (
          <div>
            <div> Winner: {game.winner}</div>
            <div {...stylex.props(styles.spaceBetweenContainer)}>
              <div {...stylex.props(styles.playerPoints)}>
                Player 1: {game.redPoints}
              </div>
              <div {...stylex.props(styles.playerPoints)}>
                Player 2: {game.blackPoints}
              </div>
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
  spaceBetweenContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  playerPoints: {
    // backgroundColor: "white",
  },
})
