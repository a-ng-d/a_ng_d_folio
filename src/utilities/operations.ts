export const doMap = (value, oldMin, oldMax, newMin, newMax) => {
  const oldRange = oldMax - oldMin,
        newRange = newMax - newMin

  return ((value - oldMin) * newRange / oldRange) + newMin
}

export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

export const twoRangesRandom = (rangeLeftMin, rangeLeftMax, rangeRightMin, rangeRightMax) => {
  const randomLeft = random(rangeLeftMin, rangeLeftMax),
        randomRight = random(rangeRightMin, rangeRightMax),
        dice = Math.random()

  const dicer = dice < .5 ? randomLeft : randomRight
  return dicer
}
