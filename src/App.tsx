import * as stylex from "@stylexjs/stylex"

export const App = () => {
  return <div {...stylex.props(styles.base)}> App</div>
}

const styles = stylex.create({
  base: {
    backgroundColor: "pink",
  },
})
