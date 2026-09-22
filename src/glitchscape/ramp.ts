import type { ColorRamp } from '@/glitchscape/types'
import type { HuSaLiTy } from '@/utilities/types'
import { clamp, doMap, lerp } from '@/utilities/operations'

export interface RampColor {
  hue: number
  saturation: number
  lightness: number
}

export const rampAt = (
  ramp: ColorRamp,
  value: number,
  far: number,
  near: number
): RampColor => ({
  hue: doMap(value, far, near, ramp.far.hue, ramp.near.hue),
  saturation: doMap(
    value,
    far,
    near,
    ramp.far.saturation,
    ramp.near.saturation
  ),
  lightness: doMap(value, far, near, ramp.far.lightness, ramp.near.lightness),
})

export const shade = (color: RampColor, amount: number): RampColor => ({
  hue: color.hue,
  saturation: color.saturation,
  lightness: clamp(color.lightness + amount, 0, 100),
})

export const hazeAt = (depth: number, far: number, onset: number) =>
  clamp(doMap(depth, far, far * onset, 1, 0), 0, 1)

export const fadeAt = (
  depth: number,
  far: number,
  zone: number,
  edge: number
) => clamp(doMap(depth, far * zone, far * edge, 0, 1), 0, 1)

export const haze = (
  color: RampColor,
  sky: HuSaLiTy,
  amount: number
): RampColor =>
  amount <= 0
    ? color
    : {
        hue: lerp(color.hue, sky.hue, amount),
        saturation: lerp(color.saturation, sky.saturation, amount),
        lightness: lerp(color.lightness, sky.lightness, amount),
      }

export const stepDepth = (
  depth: number,
  far: number,
  near: number,
  steps: number,
  blend: number
) => {
  const t = clamp(doMap(depth, far, near, 0, 1), 0, 1),
    position = t * steps,
    band = Math.floor(position),
    within = position - band,
    turning = clamp((within - (1 - blend)) / blend, 0, 1),
    eased = turning * turning * (3 - 2 * turning)

  return doMap(clamp((band + eased) / steps, 0, 1), 0, 1, far, near)
}
