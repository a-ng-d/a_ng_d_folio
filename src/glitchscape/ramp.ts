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
 * How far a particle has dissolved into the sky with distance.
 *
 * This one is a colour: at the back of the corridor a sheet takes the tone of
 * the sky it is disappearing into, which is what aerial perspective does. It
 * is still opaque, and it needs to be — there is nothing behind it but sky.
 */
export const hazeAt = (depth: number, far: number, onset: number) =>
  clamp(doMap(depth, far, far * onset, 1, 0), 0, 1)

/**
 * How far a particle has faded out as it passes the camera.
 *
 * This one has to be an opacity. Near the camera there are other sheets
 * behind, so a sheet painted the colour of the sky does not disappear against
 * them — it wipes over them, and a yellow shape sweeps across the range. It
 * finishes before the near clipping plane, which would otherwise cut it while
 * it still carried something.
 */
export const fadeAt = (
  depth: number,
  far: number,
  zone: number,
  edge: number
) => clamp(doMap(depth, far * zone, far * edge, 0, 1), 0, 1)

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

/**
 * Snaps a depth onto a fixed number of bands before the ramp reads it.
 *
 * A continuous ramp renders a range as one airbrushed gradient; stepping it
 * first gives each sheet a flat tone of its own, which is what makes a stack
 * of them read as cut paper rather than as fog.
 *
 * The staircase is soft at its edges. A hard one is invisible at a drift —
 * a sheet takes hundreds of frames to cross a band — but a scroll rushes it
 * across in twenty, and the tone visibly snaps. Holding each band flat for
 * most of its width and turning over the last of it keeps the sheets flat
 * without ever letting a colour jump.
 */
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
