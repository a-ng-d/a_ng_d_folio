import { HSLColors, filters } from '@/utilities/colors'
import type {
  SceneConfig,
  SceneOverride,
  ScenePalette,
} from '@/glitchscape/types'

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

export const SCENE_DEFAULTS: Omit<SceneConfig, 'filter'> = {
  shape: 'SWELL',
  flow: 'STRAIGHT',
  speed: 0.75,
  curvature: 0.55,
  density: 1.6,
  corridor: 0.5,
  relief: 1,
  breadth: 0.45,
  altitude: 0,
  fov: 60,
  turbulence: 0.6,
  lighting: 'FLAT',
  ambience: 'FIXED',
  rain: 0,
  endless: true,
  mist: 0.58,
  palette: palettes.SOLAR,
}

export const universes: { [key: string]: SceneConfig } = {
  DAYBREAK: { ...SCENE_DEFAULTS, filter: filters.creamySun },
  MONOLITH: { ...SCENE_DEFAULTS, filter: filters.grayscale },
  NIGHTLY: { ...SCENE_DEFAULTS, filter: filters.nightly },
  CANDY_FLOSS: { ...SCENE_DEFAULTS, filter: filters.candyFloss },
  SOFT_WIND: { ...SCENE_DEFAULTS, filter: filters.softWind },
  MIRAGE: { ...SCENE_DEFAULTS, filter: filters.creamySun },
  TEMPEST: { ...SCENE_DEFAULTS, filter: filters.nightly },
  SOFT_STEEL: { ...SCENE_DEFAULTS, filter: filters.softSteel },
  BISCAROSSE: { ...SCENE_DEFAULTS, filter: filters.biscarosse },
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
    breadth: pick(patch.breadth, base.breadth),
    altitude: pick(patch.altitude, base.altitude),
    fov: pick(patch.fov, base.fov),
    turbulence: pick(patch.turbulence, base.turbulence),
    lighting: pick(patch.lighting, base.lighting),
    ambience: pick(patch.ambience, base.ambience),
    rain: pick(patch.rain, base.rain),
    endless: pick(patch.endless, base.endless),
    mist: pick(patch.mist, base.mist),
    palette: mergePalette(base.palette, patch.palette),
    filter: pick(patch.filter, base.filter),
  }
}
