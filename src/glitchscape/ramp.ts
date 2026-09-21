import type { ColorRamp } from '@/glitchscape/types'
import type { HuSaLiTy } from '@/utilities/types'
import { clamp, doMap, lerp } from '@/utilities/operations'

export interface RampColor {
  hue: number
  saturation: number
  lightness: number
}

/**
 * Reads a colour out of a depth ramp. `far` and `near` are the bounds of the
 * axis used to fade a particle into the sky, which is what gives the scene its
 * aerial perspective.
 */
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

/** Lifts or drops the lightness of a ramp colour, to fake a lit facet. */
export const shade = (color: RampColor, amount: number): RampColor => ({
  hue: color.hue,
  saturation: color.saturation,
  lightness: clamp(color.lightness + amount, 0, 100),
})

/**
 * How much of the sky a particle has dissolved into. It reaches 1 at the far
 * end of the range, whatever the palette says the ramp ends on, so nothing can
 * ever wink into existence at the back of the corridor.
 */
export const fogAt = (depth: number, far: number, onset: number) =>
  clamp(doMap(depth, far, far * onset, 1, 0), 0, 1)

/** Dissolves a ramp colour into the sky. */
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
