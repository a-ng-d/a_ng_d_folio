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

let timer, delta, velocity, currentPosition, snapPosition
export const scrollVelocity = (target, child) => {
  const paddingLeft = parseFloat(window.getComputedStyle(target, null).getPropertyValue('padding-left')),
        paddingRight = parseFloat(window.getComputedStyle(target, null).getPropertyValue('padding-right')),
        maxScroll = Math.floor(child.clientWidth - target.clientWidth + paddingLeft + paddingRight)

  velocity = 1
  delta = 0
  currentPosition = target.scrollLeft
  clearTimeout(timer)
  timer = setInterval(() => {
    snapPosition = target.scrollLeft
  }, 10)
  delta = Math.abs(currentPosition - snapPosition)
  currentPosition == 0 ? velocity = 1 :
                         currentPosition > maxScroll - 1 ? velocity = 1 :
                         velocity = doMap(delta, 1, 400, 1, 1.5)

  return velocity
}
