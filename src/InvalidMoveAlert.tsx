import * as stylex from "@stylexjs/stylex"

type InvalidMoveAlertProps = {
  closeAlert: () => void
}
export const InvalidMoveAlert = ({ closeAlert }: InvalidMoveAlertProps) => {
  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.textBox)}>
        <div> Invalid Move</div>
        <div {...stylex.props(styles.button)} onClick={closeAlert}>
          {" "}
          Okay{" "}
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
    // backgroundColor: "lightyellow",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    border: "2px solid black",
    backgroundColor: "lightyellow",
    padding: "5rem",
    width: "max-content",
    height: "max-content",
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
