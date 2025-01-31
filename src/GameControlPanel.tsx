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
        <div {...stylex.props(styles.restartButton)} onClick={gameRestart}>
          Restart
        </div>
        <div> Game Status: {game.gameStatus} </div>
        <div> Player Turn: {user == true ? "Player 1" : "Player 2"}</div>
        {game.gameStatus == "Over" && (
          <div>
            <div> Winner: {game.winner}</div>
            <div>
              Player 1: {game.redPoints} , Player 2: {game.blackPoints}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    backgroundColor: "lightgray",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  controlPanel: {
    padding: "1rem",
    backgroundColor: "gray",
    // width: "max-content",
    minWidth: "14rem",
    minHeight: "9rem",
  },
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
