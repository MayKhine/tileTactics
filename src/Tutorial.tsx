import * as stylex from "@stylexjs/stylex"
import { IoMdCloseCircle } from "react-icons/io"

type TutorialProps = {
  clickClose: () => void
}
export const Tutorial = ({ clickClose }: TutorialProps) => {
  return (
    <div {...stylex.props(styles.popup)} onClick={clickClose}>
      <div
        {...stylex.props(styles.baseDiv)}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div {...stylex.props(styles.closeIconDiv)}>
          <IoMdCloseCircle color="black" size={30} onClick={clickClose} />
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
    width: "60%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
  },
  closeIconDiv: {
    // backgroundColor: "pink",
    cursor: "pointer",
    display: "flex",
    paddingRight: "1.5rem",
    paddingTop: "1rem",
    justifyContent: "flex-end",
  },
})
