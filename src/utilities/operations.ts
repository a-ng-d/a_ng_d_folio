export const doMap = (value: number, oldMin: number, oldMax: number, newMin: number, newMax: number) => {
  const oldRange = oldMax - oldMin,
        newRange = newMax - newMin

  return ((value - oldMin) * newRange / oldRange) + newMin
}

export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

export const twoRangesRandom = (rangeLeftMin: number, rangeLeftMax: number, rangeRightMin: number, rangeRightMax: number) => {
  const randomLeft: number = random(rangeLeftMin, rangeLeftMax),
        randomRight: number = random(rangeRightMin, rangeRightMax),
        dice: number = Math.random()

  const dicer: number = dice < .5 ? randomLeft : randomRight
  return dicer
}

let timer: any,
    delta = 0,
    velocity = 0,
    currentPosition = 0,
    snapPosition = 0
export const scrollVelocity = (target: HTMLElement, scrollLimit: number, orientation: string) => {
  velocity = 1
  delta = 1
  currentPosition =  orientation === 'y' ? target.scrollTop : target.scrollLeft
  window.cancelAnimationFrame(timer)
  timer = () => {
    snapPosition = orientation === 'y' ? target.scrollTop : target.scrollLeft
  }
  window.requestAnimationFrame(timer)
  delta = Math.abs(currentPosition - snapPosition)
  delta > 200 ? delta = 1 : null
  currentPosition == 0 ? velocity = 1 :
                         currentPosition > scrollLimit - 1 ? velocity = 1 :
                         velocity = doMap(delta, 1, 200, 1, 1.5)

  return velocity
}
