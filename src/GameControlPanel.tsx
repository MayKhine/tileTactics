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
        <div>Kulami</div>
        <div {...stylex.props(styles.restartButton)} onClick={gameRestart}>
          Restart
        </div>
        <div> Game Status: {game.gameStatus} </div>
        {game.gameStatus != "Over" && (
          <div> Player Turn: {user == true ? "Player 1" : "Player 2"}</div>
        )}

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
    // width: "100%",
    minHeight: "8rem",
    display: "flex",
    justifyContent: "center",
    margin: "2rem",
    backgroundColor: "white",
  },
  controlPanel: {
    backgroundColor: "gray",
    minWidth: "14rem",
  },
  restartButton: {
    cursor: "pointer",
    borderRadius: "1rem",
    border: "1px solid black",
    padding: ".75rem",
    backgroundColor: {
      default: "white",
      ":hover": "lightgray",
    },

    width: "max-content",
  },
})
