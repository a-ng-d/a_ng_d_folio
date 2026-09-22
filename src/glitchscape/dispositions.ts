import type { SceneOverride } from '@/glitchscape/types'

export type Disposition = Omit<
  SceneOverride,
  | 'flow'
  | 'filter'
  | 'palette'
  | 'lighting'
  | 'ambience'
  | 'rain'
  | 'endless'
  | 'mist'
>

const named = <T extends { [key: string]: Disposition }>(entries: T) => entries

export const dispositions = named({
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
  FREE: {
    shape: 'SWELL',
    corridor: 0.5,
    breadth: 0.45,
    relief: 1,
    altitude: 0,
    fov: 60,
    density: 1.6,
    speed: 0.75,
    curvature: 0.55,
    turbulence: 0.6,
  },
})

export const FREE_DISPOSITION = 'FREE'

export type DispositionKind = keyof typeof dispositions

export const DISPOSITION_KEYS = Object.keys(
  dispositions
) as Array<DispositionKind>

export const INSPECTOR_DEFAULT: DispositionKind = 'PLAIN'
