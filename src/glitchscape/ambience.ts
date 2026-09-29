import type {
  AmbienceKind,
  ColorRamp,
  LightKind,
  ScenePalette,
} from '@/glitchscape/types'
import type { HuSaLiTy } from '@/utilities/types'
import { clamp, doMap, lerp } from '@/utilities/operations'

// Irradiance thresholds, as a share of full sun. Astronomical night reads 0,
// civil twilight a handful of W/m², and the thickest winter overcast at noon
// still lets 50 W/m² through, so 20 W/m² is a safe line for "the sun is not up".
const DARKNESS = 0.02

const TWILIGHT = 0.22

export const lightingForHour = (hour: number): LightKind => {
  if (hour < 5) return 'NIGHT'
  if (hour < 8) return 'DAWN'
  if (hour < 17) return 'ZENITH'
  if (hour < 21) return 'DUSK'

  return 'NIGHT'
}

export const resolveLighting = (
  ambience: AmbienceKind,
  lighting: LightKind,
  now: Date = new Date()
): LightKind =>
  ambience === 'LIVE' ? lightingForHour(now.getHours()) : lighting

const NIGHTWARD: { [key: string]: LightKind } = {
  ZENITH: 'DUSK',
  DAWN: 'NIGHT',
  DUSK: 'NIGHT',
  FLAT: 'FLAT',
  NIGHT: 'NIGHT',
  STORM: 'STORM',
}

export const nightward = (kind: LightKind): LightKind => NIGHTWARD[kind] || kind

// The clock names the period, because irradiance is symmetric about solar noon
// and so cannot tell a dawn from a dusk. The irradiance corrects the clock,
// because fixed bands cannot know the season: 17h is broad daylight in June and
// long dark in December, and 5h is the reverse.
export const temper = (
  kind: LightKind,
  index: number | null,
  hour: number
): LightKind => {
  if (index === null || kind === 'FLAT' || kind === 'STORM') return kind

  if (index <= DARKNESS) return 'NIGHT'

  if (kind === 'NIGHT' && index >= TWILIGHT) return hour < 12 ? 'DAWN' : 'DUSK'

  return kind
}

interface Tint {
  hue: number
  pull: number
  anchor: number
  spread: number
  saturation: number
}

// Where the lightness sits inside a period, read off the irradiance: a dusk
// still holding 300 W/m² and a dusk gone to ink are not painted alike. Each
// range is centred on the anchor the period used before, so a scene with no
// reading, or a fixed one, comes out exactly as it did.
const ANCHORS: {
  [key: string]: { low: number; high: number; from: number; to: number }
} = {
  DAWN: { low: 40, high: 56, from: DARKNESS, to: TWILIGHT },
  DUSK: { low: 30, high: 46, from: DARKNESS, to: TWILIGHT },
  NIGHT: { low: 10, high: 22, from: 0, to: DARKNESS },
  STORM: { low: 24, high: 44, from: 0, to: TWILIGHT },
}

const TINTS: { [key: string]: Tint } = {
  FLAT: { hue: 0, pull: 0, anchor: 0, spread: 1, saturation: 1 },
  ZENITH: { hue: 0, pull: 0, anchor: 0, spread: 1, saturation: 1 },
  DAWN: { hue: 18, pull: 0.35, anchor: 48, spread: 0.9, saturation: 1.05 },
  DUSK: { hue: 12, pull: 0.45, anchor: 38, spread: 0.85, saturation: 1.1 },
  NIGHT: { hue: 232, pull: 0.9, anchor: 16, spread: -0.42, saturation: 0.5 },
  STORM: { hue: 210, pull: 0.5, anchor: 34, spread: 0.6, saturation: 0.6 },
}

const anchorAt = (kind: LightKind, tint: Tint, index: number | null) => {
  const span = ANCHORS[kind]

  if (index === null || span === undefined) return tint.anchor

  const share = clamp(doMap(index, span.from, span.to, 0, 1), 0, 1)

  return lerp(span.low, span.high, share * share * (3 - 2 * share))
}

const toward = (from: number, to: number, amount: number) => {
  const delta = (((to - from + 540) % 360) - 180) * amount

  return (from + delta + 360) % 360
}

const paint = (color: HuSaLiTy, tint: Tint, reference: number): HuSaLiTy => ({
  ...color,
  hue: toward(color.hue, tint.hue, tint.pull),
  saturation: clamp(color.saturation * tint.saturation, 0, 100),
  lightness: clamp(
    tint.anchor + (color.lightness - reference) * tint.spread,
    0,
    100
  ),
})

export const tintPalette = (
  palette: ScenePalette,
  kind: LightKind,
  index: number | null = null
): ScenePalette => {
  const tint = TINTS[kind]
  // FLAT and ZENITH pull nothing, so full daylight is never touched by a
  // reading: the ambient owns the hue there, and that is what tells a context
  // apart.
  if (tint === undefined || tint.pull === 0) return palette

  const lit: Tint = { ...tint, anchor: anchorAt(kind, tint, index) },
    reference = palette.sky.lightness,
    ramp = (band: ColorRamp): ColorRamp => ({
      near: paint(band.near, lit, reference),
      far: paint(band.far, lit, reference),
    })

  return {
    sky: paint(palette.sky, lit, reference),
    ground: paint(palette.ground, lit, reference),
    glow: paint(palette.glow, lit, reference),
    mountains: ramp(palette.mountains),
    clouds: ramp(palette.clouds),
    stars: ramp(palette.stars),
  }
}

const LIT_SKY = 50

export const overcast = (
  palette: ScenePalette,
  amount: number
): ScenePalette => {
  const reference = palette.sky.lightness,
    cover = clamp(amount, 0, 1) * clamp(reference / LIT_SKY, 0.25, 1)

  if (cover <= 0.01) return palette

  const dull = (color: HuSaLiTy): HuSaLiTy => ({
      ...color,
      saturation: clamp(color.saturation * (1 - 0.6 * cover), 0, 100),
      lightness: clamp(
        lerp(color.lightness, reference, 0.35 * cover) * (1 - 0.12 * cover),
        0,
        100
      ),
    }),
    band = (ramp: ColorRamp): ColorRamp => ({
      near: dull(ramp.near),
      far: dull(ramp.far),
    })

  return {
    sky: dull(palette.sky),
    ground: dull(palette.ground),
    glow: dull(palette.glow),
    mountains: band(palette.mountains),
    clouds: band(palette.clouds),
    stars: band(palette.stars),
  }
}
