export const calculateXY = (
  index: number,
  rows: number,
  cols: number,
  x: number,
  y: number,
  positionMultiplierBasedOnWindowSize: number
) => {
  let tempCol = 0
  let tempX = x
  let tempY = y

  for (let curRow = 0; curRow < rows; curRow++) {
    for (let curCol = 0; curCol < cols; curCol++) {
      if (index === curCol + tempCol) {
        // tempX = tempX + curCol * 50
        tempX = tempX + curCol * positionMultiplierBasedOnWindowSize

        return { x: tempX, y: tempY }
      }
    }
    tempCol = tempCol + cols
    // tempY = tempY + 50
    tempY = tempY + positionMultiplierBasedOnWindowSize
  }

  return { x, y }
}
