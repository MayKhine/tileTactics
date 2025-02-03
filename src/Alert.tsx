import * as stylex from "@stylexjs/stylex"

type alertProps = {
  closeAlert: () => void
  text: string
}
export const Alert = ({ closeAlert, text }: alertProps) => {
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.textBox)}>
        <div> {text}</div>
        <div {...stylex.props(styles.button)} onClick={closeAlert}>
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
  },
  textBox: {
    border: "2px solid black",
    backgroundColor: "white",
    padding: "5rem",
    width: "max-content",
    height: "max-content",
    // boxShadow: "2px 2px black",
  },
  button: {
    border: "2px solid black",
    cursor: "pointer",
    backgroundColor: {
      default: "white",
      ":hover": "lightgray",
    },
  },
})
