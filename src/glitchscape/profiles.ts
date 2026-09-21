import type { ShapeKind } from '@/glitchscape/types'
import { clamp, lerp, random, randomFloat } from '@/utilities/operations'

/**
 * A silhouette is stored as a normalised height profile: `resolution` samples
 * of the upper contour, from the left foot (t = 0) to the right foot (t = 1),
 * each between 0 and 1. The base line closes the shape, so every silhouette is
 * closed by construction — including the fully random organic ones.
 *
 * Because every kind shares that single representation, morphing from a
 * triangle to a blob is a plain component-wise interpolation.
 */
export type Profile = Array<number>

export type NoiseFn = (x: number) => number

export const SHAPES: Array<ShapeKind> = [
  'SWELL',
  'EXTRUSION',
  'TRIANGLE',
  'ROUND',
  'TRAPEZOID',
  'ORGANIC',
]

/** Per-instance variations, drawn once so a mountain keeps its character. */
export interface ProfileSeed {
  peak: number
  shoulders: Array<number>
  corner: number
  offset: number
  frequency: number
  amplitude: number
  skew: number
}

export const createSeed = (): ProfileSeed => {
  const left = randomFloat(0.15, 0.4)

  return {
    peak: randomFloat(0.2, 0.8),
    shoulders: [left, randomFloat(0.6, 0.85)],
    corner: randomFloat(0.12, 0.28),
    offset: randomFloat(0, 1000),
    frequency: randomFloat(2.5, 6),
    amplitude: randomFloat(0.4, 0.75),
    skew: randomFloat(-0.2, 0.2),
  }
}

export const resolveShape = (kind: ShapeKind): ShapeKind =>
  kind === 'MIXED' ? SHAPES[random(0, SHAPES.length)] : kind

const smoothstep = (x: number) => {
  const c = clamp(x, 0, 1)

  return c * c * (3 - 2 * c)
}

/**
 * A long, silky crest with soft shoulders and an off-centre summit. Both
 * flanks are smoothstepped rather than straight, so the ridge sweeps instead
 * of pointing, and the asymmetry of the summit is what makes a field of them
 * nest into each other like folded silk.
 */
const swellAt = (t: number, seed: ProfileSeed) => {
  const peak = clamp(seed.peak, 0.12, 0.88)

  return t < peak ? smoothstep(t / peak) : smoothstep((1 - t) / (1 - peak))
}

/** Historical silhouette: straight flanks and rounded shoulders. */
const extrusionAt = (t: number, seed: ProfileSeed) => {
  const corner = seed.corner

  if (t < corner)
    return (
      1 - corner + corner * Math.sqrt(1 - Math.pow((corner - t) / corner, 2))
    )
  if (t > 1 - corner)
    return (
      1 -
      corner +
      corner * Math.sqrt(1 - Math.pow((t - (1 - corner)) / corner, 2))
    )

  return 1
}

const triangleAt = (t: number, seed: ProfileSeed) =>
  t < seed.peak ? t / seed.peak : (1 - t) / (1 - seed.peak)

const roundAt = (t: number) =>
  Math.sqrt(Math.max(0, 1 - Math.pow(2 * t - 1, 2)))

const trapezoidAt = (t: number, seed: ProfileSeed) => {
  const left = seed.shoulders[0],
    right = seed.shoulders[1]

  if (t < left) return t / left
  if (t > right) return (1 - t) / (1 - right)

  return 1
}

/**
 * Random but closed: a noise ridge multiplied by an envelope that pins both
 * feet to the ground line.
 */
const organicAt = (
  t: number,
  seed: ProfileSeed,
  turbulence: number,
  noise: NoiseFn
) => {
  const envelope = Math.pow(Math.sin(Math.PI * t), 0.55),
    coarse = noise(seed.offset + t * seed.frequency),
    fine = noise(seed.offset * 2 + t * seed.frequency * 3.7),
    ridge = lerp(coarse, coarse * 0.6 + fine * 0.4, turbulence)

  return clamp(envelope * (0.45 + ridge * seed.amplitude), 0, 1)
}

const sampleAt = (
  kind: ShapeKind,
  t: number,
  seed: ProfileSeed,
  turbulence: number,
  noise: NoiseFn
) => {
  if (kind === 'SWELL') return swellAt(t, seed)
  if (kind === 'TRIANGLE') return triangleAt(t, seed)
  if (kind === 'ROUND') return roundAt(t)
  if (kind === 'TRAPEZOID') return trapezoidAt(t, seed)
  if (kind === 'ORGANIC') return organicAt(t, seed, turbulence, noise)

  return extrusionAt(t, seed)
}

export const buildProfile = (
  kind: ShapeKind,
  resolution: number,
  seed: ProfileSeed,
  turbulence: number,
  noise: NoiseFn
): Profile => {
  const profile: Profile = [],
    steps = Math.max(3, resolution)

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    profile.push(clamp(sampleAt(kind, t, seed, turbulence, noise), 0, 1))
  }

  return profile
}

/** Component-wise interpolation, used to morph a silhouette into another. */
export const morphProfile = (
  from: Profile,
  to: Profile,
  amount: number
): Profile => {
  if (from.length !== to.length) return to.slice()

  return from.map((value, index) => lerp(value, to[index], amount))
}

/** Per-frame corruption of a silhouette, for the glitch mode. */
export const shatterProfile = (source: Profile, intensity: number): Profile =>
  source.map((value) =>
    clamp(value * randomFloat(1 - intensity, 1 + intensity * 0.5), 0, 1)
  )
