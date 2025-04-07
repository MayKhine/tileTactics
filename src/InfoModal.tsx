import * as stylex from "@stylexjs/stylex"
import { IoMdCloseCircle } from "react-icons/io"

type InfoModalProps = {
  clickInfo: () => void
}
export const InfoModal = ({ clickInfo }: InfoModalProps) => {
  return (
    <div {...stylex.props(styles.popup)} onClick={clickInfo}>
      <div
        {...stylex.props(styles.baseDiv)}
        onClick={(e) => e.stopPropagation()}
      >
        <div {...stylex.props(styles.closeIconDiv)}>
          <IoMdCloseCircle color="black" size={30} onClick={clickInfo} />
        </div>
        <div {...stylex.props(styles.scrollDiv)}>
          <div {...stylex.props(styles.textDiv)}>
            <div>
              <p {...stylex.props(styles.headerFont)}>TileTactics</p>
              <p>
                TileTactics is a turn-based strategy game for two players,
                inspired by the classic game Kulami. The goal is to control the
                most tiles by strategically placing marbles on the board.
              </p>
            </div>
            <div>
              <p {...stylex.props(styles.subHeaderFont)}>Goal</p>
              <p>Win the most points by the end of the game.</p>
            </div>

            <div>
              <p {...stylex.props(styles.subHeaderFont)}> Objective</p>
              <p>
                Gain control of tiles by placing the majority of marbles on
                them.
              </p>
              <p>
                Plan ahead to limit your opponent’s options while maximizing
                your own.
              </p>
            </div>

            <div>
              <p {...stylex.props(styles.subHeaderFont)}>Gameplay</p>
              <ul>
                <li>Players take turns placing one marble at a time.</li>
                <li>
                  You must place your marble in the{" "}
                  <strong>same row or column</strong> as your opponent’s last
                  move.
                </li>
                <li>
                  You <strong>cannot</strong> place a marble on:
                  <ul>
                    <li>
                      The tile where your opponent just played their last
                      marble.
                    </li>
                    <li>The tile where you placed your own last marble.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <p {...stylex.props(styles.subHeaderFont)}> End of the Game</p>
              <ul>
                <li>The game ends when all marbles have been placed.</li>
                <li>Or, when a player has no valid moves left.</li>
              </ul>
            </div>
            <div>
              <p {...stylex.props(styles.subHeaderFont)}>Scoring</p>
              <ul>
                <li>You score points for each tile you control.</li>
                <li>
                  To control a tile, you must have more marbles on it than your
                  opponent.
                </li>
                <li>
                  If both players have the same number of marbles on a tile, it
                  does <strong>not</strong> count for either player.
                </li>
                <li>
                  Each tile's point value is based on how many holes it has. For
                  example:
                  <ul>
                    <li>A tile with 6 holes = 6 points</li>
                    <li>A tile with 3 holes = 3 points</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  popup: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: "100%",
    zIndex: "10",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  baseDiv: {
    backgroundColor: "#FFFBF4",

    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    width: {
      default: "70%",
      "@media (max-width: 768px)": "100%",
    },
    height: {
      default: "80%",
      "@media (max-height: 700px)": "100%",
    },
    maxWidth: "50rem",
    maxHeight: "50rem",
  },
  scrollDiv: {
    overflowY: "auto",
    margin: "2rem",
  },
  closeIconDiv: {
    // backgroundColor: "pink",
    cursor: "pointer",
    display: "flex",
    paddingRight: "1.5rem",
    paddingTop: "1rem",
    justifyContent: "flex-end",
  },
  textDiv: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    lineHeight: "1.5",
    paddingRight: "1rem",
  },

  headerFont: {
    fontSize: "2rem",
    fontWeight: "400",
    fontStyle: "normal",
  },
  subHeaderFont: {
    fontSize: "1.3rem",
    fontWeight: "400",
    fontStyle: "normal",
  },
})
