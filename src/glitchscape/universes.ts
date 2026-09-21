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
 * Structure shared by every universe. Pages differ by colour, and by whatever
 * their route asks of the scene — not by having each their own geometry. That
 * is what makes the worlds interchangeable: the same journey, recoloured.
 */
const COMMON = {
  shape: 'SWELL' as const,
  flow: 'STRAIGHT' as const,
  speed: 1,
  curvature: 0.55,
  density: 1,
  corridor: 0.5,
  relief: 1,
  altitude: 0,
  fov: 60,
  turbulence: 0.6,
  lighting: 'FLAT' as const,
  palette: palettes.SOLAR,
}

/** Named colour worlds. A route names one, then refines it if it needs to. */
export const universes: { [key: string]: SceneConfig } = {
  DAYBREAK: { ...COMMON, filter: filters.creamySun },
  MONOLITH: { ...COMMON, filter: filters.grayscale },
  NIGHTLY: { ...COMMON, filter: filters.nightly },
  CANDY_FLOSS: { ...COMMON, filter: filters.candyFloss },
  SOFT_WIND: { ...COMMON, filter: filters.softWind },
  MIRAGE: { ...COMMON, filter: filters.creamySun },
  TEMPEST: { ...COMMON, filter: filters.nightly },
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
    corridor: pick(patch.corridor, base.corridor),
    relief: pick(patch.relief, base.relief),
    altitude: pick(patch.altitude, base.altitude),
    fov: pick(patch.fov, base.fov),
    turbulence: pick(patch.turbulence, base.turbulence),
    lighting: pick(patch.lighting, base.lighting),
    palette: mergePalette(base.palette, patch.palette),
    filter: pick(patch.filter, base.filter),
  }
}
