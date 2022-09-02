export const easeInOutExpo = (t: number, b: number, c: number, d: number) => {
  if (t == 0) return b
  if (t == d) return b + c
  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
}

export const easeInOutCubic: number = (x: number) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

export const easeInOutQuart: number = (x: number) => x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
