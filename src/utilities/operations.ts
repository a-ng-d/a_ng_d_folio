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

let timer,
    delta = 0,
    velocity = 0,
    currentPosition = 0,
    snapPosition = 0
export const scrollVelocity = (target, scrollLimit, orientation) => {
  velocity = 1
  delta = 0
  currentPosition =  orientation === 'y' ? target.scrollTop : target.scrollLeft
  clearTimeout(timer)
  timer = setInterval(() => {
    snapPosition = orientation === 'y' ? target.scrollTop : target.scrollLeft
  }, 10)
  delta = Math.abs(currentPosition - snapPosition)
  currentPosition == 0 ? velocity = 1 :
                         currentPosition > scrollLimit - 1 ? velocity = 1 :
                         velocity = doMap(delta, 1, 400, 1, 1.5)

  return velocity
}
