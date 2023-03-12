export const doMap = (
  value: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
) => {
  const oldRange = oldMax - oldMin,
    newRange = newMax - newMin

  return ((value - oldMin) * newRange) / oldRange + newMin
}

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

export const twoRangesRandom = (
  rangeLeftMin: number,
  rangeLeftMax: number,
  rangeRightMin: number,
  rangeRightMax: number
) => {
  const randomLeft: number = random(rangeLeftMin, rangeLeftMax),
    randomRight: number = random(rangeRightMin, rangeRightMax),
    dice: number = Math.random()

  const dicer: number = dice < 0.5 ? randomLeft : randomRight
  return dicer
}

let timer: () => void,
  pick: number,
  delta = 0,
  velocity = 0,
  currentPosition = 0,
  snapPosition = 0
export const scrollVelocity = (
  target: HTMLElement,
  scrollLimit: number,
  orientation: string
) => {
  velocity = 1
  delta = 1
  currentPosition = orientation === 'y' ? target.scrollTop : target.scrollLeft
  window.cancelAnimationFrame(pick)
  timer = () => {
    snapPosition = orientation === 'y' ? target.scrollTop : target.scrollLeft
  }
  pick = window.requestAnimationFrame(timer)
  delta = Math.abs(currentPosition - snapPosition)
  if (delta < 1 || delta > 200) delta = 1
  currentPosition == 0
    ? (velocity = 1)
    : currentPosition > scrollLimit - 1
    ? (velocity = 1)
    : (velocity = doMap(delta, 1, 200, 1, 1.5))

  return velocity
}
