import type { SceneOverride } from '@/glitchscape/types'

/**
 * Named dispositions of the relief.
 *
 * A disposition is everything that shapes the journey — how tight the
 * corridor runs, how broad and how tall its crests are, how low the eye sits,
 * how sharply the corridor bends — and deliberately not which way it turns.
 * Direction belongs to the route, so two pages facing opposite ways share one
 * disposition and differ only by their flow.
 *
 * Colour is not here either: that is what an universe is for.
 */
export type Disposition = Omit<SceneOverride, 'flow' | 'filter' | 'palette'>

export const dispositions: { [key: string]: Disposition } = {
  /** Tight, tall and low: the range stands over the journey. */
  CANYON: {
    shape: 'SWELL',
    corridor: 0.1,
    breadth: 0.35,
    relief: 1.6,
    altitude: -2.4,
    fov: 50,
    density: 2.2,
    speed: 0.6,
    curvature: 0.55,
  },
  /** A canyon that turns harder and closes in further. */
  GORGE: {
    shape: 'SWELL',
    corridor: 0.18,
    breadth: 0.4,
    relief: 1.45,
    altitude: -1.6,
    fov: 54,
    density: 2,
    speed: 0.7,
    curvature: 0.95,
  },
  /** The narrowest of them, fast and crowded. */
  SLIPSTREAM: {
    shape: 'SWELL',
    corridor: 0.08,
    breadth: 0.28,
    relief: 1.3,
    altitude: -1.2,
    fov: 62,
    density: 2.8,
    speed: 1.1,
    curvature: 0.8,
  },
  /** Very tall, narrow framing, slow: height rather than pace. */
  CATHEDRAL: {
    shape: 'SWELL',
    corridor: 0.15,
    breadth: 0.5,
    relief: 2.2,
    altitude: -3,
    fov: 44,
    density: 1.8,
    speed: 0.45,
    curvature: 0.6,
  },
  /** Room to breathe, broad crests, a gentle bend. */
  VALLEY: {
    shape: 'SWELL',
    corridor: 0.45,
    breadth: 0.7,
    relief: 1.1,
    altitude: -0.6,
    fov: 58,
    density: 1.6,
    speed: 0.75,
    curvature: 0.5,
  },
  /** The open reference, closest to where this started. */
  PLAIN: {
    shape: 'SWELL',
    corridor: 1,
    breadth: 1,
    relief: 1,
    altitude: 0,
    fov: 60,
    density: 1.2,
    speed: 0.9,
    curvature: 0.35,
  },
  /** Wide and high: mostly sky. */
  HORIZON: {
    shape: 'SWELL',
    corridor: 1.5,
    breadth: 1.1,
    relief: 0.8,
    altitude: 1.2,
    fov: 66,
    density: 1,
    speed: 0.8,
    curvature: 0.3,
  },
  /** A broken skyline, carved by noise. */
  RIDGELINE: {
    shape: 'ORGANIC',
    corridor: 0.3,
    breadth: 0.5,
    relief: 1.5,
    altitude: -1.5,
    fov: 54,
    density: 2,
    speed: 0.7,
    turbulence: 1,
    curvature: 0.7,
  },
  /** Sharp summits, packed tight. */
  SPIRES: {
    shape: 'TRIANGLE',
    corridor: 0.2,
    breadth: 0.3,
    relief: 1.8,
    altitude: -2,
    fov: 50,
    density: 2.4,
    speed: 0.7,
    curvature: 0.6,
  },
  /** Round and low, unhurried. */
  DUNES: {
    shape: 'ROUND',
    corridor: 0.6,
    breadth: 0.9,
    relief: 0.9,
    altitude: -0.4,
    fov: 60,
    density: 1.5,
    speed: 0.55,
    curvature: 0.45,
  },
  /** Flat tops, stepped. */
  TERRACES: {
    shape: 'TRAPEZOID',
    corridor: 0.35,
    breadth: 0.6,
    relief: 1.3,
    altitude: -1.2,
    fov: 56,
    density: 1.8,
    speed: 0.7,
    curvature: 0.6,
  },
  /** Few, huge and squared off. */
  MONOLITHS: {
    shape: 'EXTRUSION',
    corridor: 0.5,
    breadth: 1.2,
    relief: 1.6,
    altitude: -1,
    fov: 52,
    density: 1,
    speed: 0.6,
    curvature: 0.5,
  },
  /** Every silhouette at once, small and everywhere. */
  SWARM: {
    shape: 'MIXED',
    corridor: 0.12,
    breadth: 0.25,
    relief: 1.2,
    altitude: -1.5,
    fov: 64,
    density: 3,
    speed: 0.9,
    turbulence: 0.8,
    curvature: 0.75,
  },
}

export const DISPOSITION_KEYS = Object.keys(dispositions)

/** Where the inspector starts: the open reference. */
export const INSPECTOR_DEFAULT = 'PLAIN'
