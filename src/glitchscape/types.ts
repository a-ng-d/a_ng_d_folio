import type {
  HuBrInSaGr,
  HuSaLiTy,
  Position,
  Center,
  Rotation,
  Progress,
} from '@/utilities/types'

export type ShapeKind =
  | 'SWELL'
  | 'EXTRUSION'
  | 'TRIANGLE'
  | 'ROUND'
  | 'TRAPEZOID'
  | 'ORGANIC'
  | 'MIXED'

export type FlowKind =
  | 'STRAIGHT'
  | 'BACKWARD'
  | 'LEFT'
  | 'RIGHT'
  | 'UP'
  | 'DOWN'
  | 'STILL'

export type LightKind = 'FLAT' | 'DAWN' | 'ZENITH' | 'DUSK' | 'NIGHT' | 'STORM'

export type QualityKind = 'LOW' | 'HIGH'

export type AmbienceKind = 'FIXED' | 'LIVE'

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

export interface SceneConfig {
  shape: ShapeKind
  flow: FlowKind
  speed: number
  curvature: number
  density: number
  corridor: number
  relief: number
  breadth: number
  altitude: number
  fov: number
  turbulence: number
  lighting: LightKind
  ambience: AmbienceKind
  rain: number
  endless: boolean
  mist: number
  palette: ScenePalette
  filter: HuBrInSaGr
}

export interface SceneOverride {
  shape?: ShapeKind
  flow?: FlowKind
  speed?: number
  curvature?: number
  density?: number
  corridor?: number
  relief?: number
  breadth?: number
  altitude?: number
  fov?: number
  turbulence?: number
  lighting?: LightKind
  ambience?: AmbienceKind
  rain?: number
  endless?: boolean
  mist?: number
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

export type FlowAxis = 'LINEAR' | 'ARC_Y' | 'ARC_X'

export interface FlowField {
  axis: FlowAxis
  drift: Vector3
  turn: number
  pinch: number
  bearing: Bearing
}

export interface Bounds {
  width: number
  height: number
  limitX: number
  limitY: number
  limitZ: number
}

export interface Pointer {
  x: number
  y: number
}

export interface Stage {
  sk: any
  bounds: Bounds
  scene: SceneConfig
  flow: FlowField
  quality: QualityKind
  resolution: number
  speed: number
  surge: number
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

export interface GlitchscapeController {
  setQuality: (quality: string) => void
  setGlitched: (isGlitched: boolean) => void
  setScroll: (progress: number, limit: number) => void
  setScene: (scene: SceneConfig) => void
  destroy: () => void
}
