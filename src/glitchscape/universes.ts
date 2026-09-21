import { HSLColors, filters } from '@/utilities/colors'
import type {
  SceneConfig,
  SceneOverride,
  ScenePalette,
} from '@/glitchscape/types'

/**
 * Colored universes.
 *
 * Colour keeps being driven by the CSS filter mechanism — that is what recolors
 * the whole canvas in one pass — so the palettes below stay deliberately
 * conservative. `SOLAR` is the historical one, pixel for pixel; `DEEP` is an
 * opt-in, higher contrast variant. What really distinguishes an universe is its
 * silhouette, its flow, its pace and its light.
 */
export const palettes: { [key: string]: ScenePalette } = {
  SOLAR: {
    sky: HSLColors.creamySun,
    ground: HSLColors.creamySun,
    mountains: { near: HSLColors.cream, far: HSLColors.creamySun },
    clouds: { near: HSLColors.clay, far: HSLColors.creamySun },
    stars: { near: HSLColors.soil, far: HSLColors.clay },
    glow: HSLColors.creamySun,
  },
  DEEP: {
    sky: HSLColors.creamySun,
    ground: HSLColors.clay,
    mountains: { near: HSLColors.titaniumWhite, far: HSLColors.sandstone },
    clouds: { near: HSLColors.sandstone, far: HSLColors.creamySun },
    stars: { near: HSLColors.deepBlack, far: HSLColors.soil },
    glow: HSLColors.clearWater,
  },
}

export const DEFAULT_UNIVERSE = 'DAYBREAK'

/**
 * Each universe is a full scene. A route only has to name one, and may refine
 * it with a partial override.
 */
export const universes: { [key: string]: SceneConfig } = {
  // The historical scene, untouched: straight travel, extruded relief, no light.
  DAYBREAK: {
    shape: 'EXTRUSION',
    flow: 'STRAIGHT',
    speed: 1,
    curvature: 0,
    density: 1,
    turbulence: 0.5,
    lighting: 'FLAT',
    palette: palettes.SOLAR,
    filter: filters.creamySun,
  },
  MONOLITH: {
    shape: 'EXTRUSION',
    flow: 'STRAIGHT',
    speed: 1,
    curvature: 0,
    density: 1,
    turbulence: 0.5,
    lighting: 'FLAT',
    palette: palettes.SOLAR,
    filter: filters.grayscale,
  },
  NIGHTLY: {
    shape: 'ORGANIC',
    flow: 'UP',
    speed: 0.7,
    curvature: 0.12,
    density: 1.2,
    turbulence: 0.85,
    lighting: 'NIGHT',
    palette: palettes.SOLAR,
    filter: filters.nightly,
  },
  CANDY_FLOSS: {
    shape: 'ROUND',
    flow: 'LEFT',
    speed: 0.85,
    curvature: 0.18,
    density: 1,
    turbulence: 0.4,
    lighting: 'DUSK',
    palette: palettes.SOLAR,
    filter: filters.candyFloss,
  },
  SOFT_WIND: {
    shape: 'TRIANGLE',
    flow: 'RIGHT',
    speed: 1.15,
    curvature: 0.2,
    density: 0.9,
    turbulence: 0.3,
    lighting: 'DAWN',
    palette: palettes.SOLAR,
    filter: filters.softWind,
  },
  TEMPEST: {
    shape: 'TRAPEZOID',
    flow: 'DOWN',
    speed: 1.4,
    curvature: 0.16,
    density: 1.1,
    turbulence: 0.7,
    lighting: 'STORM',
    palette: palettes.DEEP,
    filter: filters.grayscale,
  },
  MIRAGE: {
    shape: 'MIXED',
    flow: 'STRAIGHT',
    speed: 0.6,
    curvature: 0,
    density: 1.3,
    turbulence: 1,
    lighting: 'ZENITH',
    palette: palettes.SOLAR,
    filter: filters.creamySun,
  },
}

export const UNIVERSE_KEYS = Object.keys(universes)

const mergePalette = (
  base: ScenePalette,
  override?: Partial<ScenePalette>
): ScenePalette => {
  if (override === undefined) return base

  return {
    sky: override.sky || base.sky,
    ground: override.ground || base.ground,
    mountains: override.mountains || base.mountains,
    clouds: override.clouds || base.clouds,
    stars: override.stars || base.stars,
    glow: override.glow || base.glow,
  }
}

const pick = <T>(value: T | undefined, fallback: T): T =>
  value === undefined ? fallback : value

/**
 * Turns an universe name plus an optional override into a usable scene. Any
 * unknown name silently falls back on the default universe, so a typo in a
 * route meta never blanks the background.
 */
export const resolveScene = (
  universe?: string,
  override?: SceneOverride
): SceneConfig => {
  const base =
      universes[universe || DEFAULT_UNIVERSE] || universes[DEFAULT_UNIVERSE],
    patch = override || {}

  return {
    shape: pick(patch.shape, base.shape),
    flow: pick(patch.flow, base.flow),
    speed: pick(patch.speed, base.speed),
    curvature: pick(patch.curvature, base.curvature),
    density: pick(patch.density, base.density),
    turbulence: pick(patch.turbulence, base.turbulence),
    lighting: pick(patch.lighting, base.lighting),
    palette: mergePalette(base.palette, patch.palette),
    filter: pick(patch.filter, base.filter),
  }
}
