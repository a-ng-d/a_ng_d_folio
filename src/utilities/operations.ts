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

export const randomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min

export const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount

export const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value

export const toRadians = (degrees: number) => (degrees * Math.PI) / 180

/**
 * Keeps a value inside a range by teleporting it to the opposite bound, so a
 * drifting field never runs out of material.
 */
export const wrap = (value: number, min: number, max: number) => {
  const range = max - min

  if (range <= 0) return value

  let wrapped = value
  if (wrapped < min) wrapped += range * Math.ceil((min - wrapped) / range)
  if (wrapped > max) wrapped -= range * Math.ceil((wrapped - max) / range)

  return wrapped
}
