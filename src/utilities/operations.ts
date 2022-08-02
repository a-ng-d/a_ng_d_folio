export const doMap = (value, oldMin, oldMax, newMin, newMax) => {
  const oldRange = oldMax - oldMin,
        newRange = newMax - newMin
        
  return ((value - oldMin) * newRange / oldRange) + newMin
}
