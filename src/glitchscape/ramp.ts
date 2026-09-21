import type { ColorRamp } from '@/glitchscape/types'
import { clamp, doMap } from '@/utilities/operations'

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
