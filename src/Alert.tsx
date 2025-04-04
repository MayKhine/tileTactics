import * as stylex from "@stylexjs/stylex"
import { projectStyles } from "./tokens.stylex"

type alertProps = {
  closeAlert: () => void
  text: string
}
export const Alert = ({ closeAlert, text }: alertProps) => {
  return (
    <div
      {...stylex.props(styles.base)}
      onClick={(e) => {
        e.stopPropagation()
        closeAlert()
      }}
    >
      <div
        {...stylex.props(styles.textBox, projectStyles.alertBorder)}
        onClick={(e) => e.stopPropagation()}
      >
        <div> {text}</div>
        <div {...stylex.props(projectStyles.button)} onClick={closeAlert}>
          Okay
        </div>
      </div>
    </div>
  )
}

const styles = stylex.create({
  base: {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: "0",
    zIndex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: ".8rem",
    backgroundColor: "rgba(57, 113, 150, 0.5)",
  },
  textBox: {
    backgroundColor: "#FAEFDD",
    width: "max-content",
    height: "max-content",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    padding: {
      default: "3rem",
      "@media (max-width: 430px)": "2rem",
      "@media (min-width: 431px) and (max-width: 768px)": "2.5rem",
    },
    gap: {
      default: ".5rem",
      "@media (max-width: 430px)": ".2rem",
      "@media (min-width: 431px) and (max-width: 768px)": ".3rem",
    },
  },
})
