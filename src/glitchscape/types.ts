import type {
  HuBrInSaGr,
  HuSaLiTy,
  Position,
  Center,
  Rotation,
  Progress,
} from '@/utilities/types'

/**
 * Silhouette of the relief. Every kind is expressed as a normalised height
 * profile, which makes them all morphable into each other.
 * `MIXED` lets every single mountain pick its own kind.
 */
export type ShapeKind =
  | 'SWELL'
  | 'EXTRUSION'
  | 'TRIANGLE'
  | 'ROUND'
  | 'TRAPEZOID'
  | 'ORGANIC'
  | 'MIXED'

/**
 * Tendency of the journey. `STRAIGHT` is the historical behaviour: the world
 * rushes towards the camera. The others add an endless lateral or vertical
 * drift, combined with a bounded camera bearing, so the trip feels like an
 * infinite turn.
 */
export type FlowKind =
  | 'STRAIGHT'
  | 'BACKWARD'
  | 'LEFT'
  | 'RIGHT'
  | 'UP'
  | 'DOWN'
  | 'STILL'

/** Light rig applied to the sketch. `FLAT` means no light at all. */
export type LightKind = 'FLAT' | 'DAWN' | 'ZENITH' | 'DUSK' | 'NIGHT' | 'STORM'

export type QualityKind = 'LOW' | 'HIGH'

export interface ColorRamp {
  near: HuSaLiTy
  far: HuSaLiTy
}

export interface ScenePalette {
  sky: HuSaLiTy
  ground: HuSaLiTy
  mountains: ColorRamp
  clouds: ColorRamp
  stars: ColorRamp
  glow: HuSaLiTy
}

/** Everything that makes a colored universe, fully resolved. */
export interface SceneConfig {
  shape: ShapeKind
  flow: FlowKind
  /** Multiplier over the reference travel speed. `1` is the historical pace. */
  speed: number
  /**
   * How sharply an arc flow bends, as a fraction of the visible depth.
   * Higher curls the corridor out of frame sooner.
   */
  curvature: number
  /** Multiplier over the number of particles. */
  density: number
  /**
   * Half width of the free corridor the journey travels through, as a
   * multiplier over the historical one. Below 1 the relief closes in and
   * the range reads as a canyon; above 1 it opens onto the sky.
   */
  corridor: number
  /**
   * Multiplier over the height of the relief. Above 1 the range towers
   * over the journey and eats into the sky.
   */
  relief: number
  /**
   * Height of the journey over its default line, in screen heights.
   * Negative values drop the eye towards the foot of the range, which is
   * what turns a landscape into something you stand under.
   */
  altitude: number
  /**
   * Vertical field of view, in degrees. Narrowing it stacks the depth
   * layers into each other and crops the sky, which is what makes the
   * vanishing point feel endless.
   */
  fov: number
  /** Roughness of the `ORGANIC` silhouettes, 0 to 1. */
  turbulence: number
  lighting: LightKind
  palette: ScenePalette
  filter: HuBrInSaGr
}

/** Partial scene, as declared in a route meta or emitted by a view. */
export interface SceneOverride {
  shape?: ShapeKind
  flow?: FlowKind
  speed?: number
  curvature?: number
  density?: number
  corridor?: number
  relief?: number
  altitude?: number
  fov?: number
  turbulence?: number
  lighting?: LightKind
  palette?: Partial<ScenePalette>
  filter?: HuBrInSaGr
}

export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface Bearing {
  yaw: number
  pitch: number
  roll: number
}

/** Shape of the track the world travels on: a line, or a bent corridor. */
export type FlowAxis = 'LINEAR' | 'ARC_Y' | 'ARC_X'

export interface FlowField {
  axis: FlowAxis
  drift: Vector3
  /** Arc flows only: which side the centre of the bend sits on, -1 or 1. */
  turn: number
  bearing: Bearing
}

export interface Bounds {
  width: number
  height: number
  limitX: number
  limitY: number
  limitZ: number
  multiplier: number
}

export interface Pointer {
  x: number
  y: number
}

/**
 * Mutable context shared by the sketch and every entity. Entities read it on
 * each frame, so mutating it reconfigures the scene live.
 */
export interface Stage {
  sk: any
  bounds: Bounds
  scene: SceneConfig
  flow: FlowField
  quality: QualityKind
  resolution: number
  speed: number
  boost: number
  /** Radius of the bend, derived from the curvature of the scene. */
  turnRadius: number
  time: number
  pointer: Pointer
  isGlitched: boolean
}

export interface MountainProps {
  widthRange: Array<number>
  heightRange: Array<number>
  x: number
  y: number
  zRange: Array<number>
}

export interface CloudProps {
  widthRange: Array<number>
  heightRange: Array<number>
  x: number
  y: number
  zRange: Array<number>
  rows: number
}

export interface StarProps {
  sizeRange: Array<number>
  x: number
  z: number
  yRange: Array<number>
}

export interface PovProps extends Position {
  cX: number
  cY: number
  cZ: number
  rH: number
  rV: number
}

export type { Position, Center, Rotation, Progress }

/** Public remote of a running sketch. */
export interface GlitchscapeController {
  setPov: (name: string) => void
  setQuality: (quality: string) => void
  setGlitched: (isGlitched: boolean) => void
  setScroll: (progress: number, limit: number) => void
  setScene: (scene: SceneConfig) => void
  setProjectsNumber: (projects: number) => void
  destroy: () => void
}
