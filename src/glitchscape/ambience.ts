import type {
  AmbienceKind,
  ColorRamp,
  LightKind,
  ScenePalette,
} from '@/glitchscape/types'
import type { HuSaLiTy } from '@/utilities/types'
import { clamp, lerp } from '@/utilities/operations'

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

interface Tint {
  hue: number
  pull: number
  anchor: number
  spread: number
  saturation: number
}

const TINTS: { [key: string]: Tint } = {
  FLAT: { hue: 0, pull: 0, anchor: 0, spread: 1, saturation: 1 },
  ZENITH: { hue: 0, pull: 0, anchor: 0, spread: 1, saturation: 1 },
  DAWN: { hue: 18, pull: 0.35, anchor: 48, spread: 0.9, saturation: 1.05 },
  DUSK: { hue: 12, pull: 0.45, anchor: 38, spread: 0.85, saturation: 1.1 },
  NIGHT: { hue: 232, pull: 0.9, anchor: 16, spread: -0.42, saturation: 0.5 },
  STORM: { hue: 210, pull: 0.5, anchor: 34, spread: 0.6, saturation: 0.6 },
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
  kind: LightKind
): ScenePalette => {
  const tint = TINTS[kind]
  if (tint === undefined || tint.pull === 0) return palette

  const reference = palette.sky.lightness,
    ramp = (band: ColorRamp): ColorRamp => ({
      near: paint(band.near, tint, reference),
      far: paint(band.far, tint, reference),
    })

  return {
    sky: paint(palette.sky, tint, reference),
    ground: paint(palette.ground, tint, reference),
    glow: paint(palette.glow, tint, reference),
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
