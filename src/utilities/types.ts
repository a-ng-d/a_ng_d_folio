import type { SceneOverride } from '@/glitchscape/types'

export interface Colors {
  deepBlack: HuSaLiTy
  titaniumWhite: HuSaLiTy
  soil: HuSaLiTy
  sandstone: HuSaLiTy
  clay: HuSaLiTy
  cream: HuSaLiTy
  creamySun: HuSaLiTy
  softWind: HuSaLiTy
  candyFloss: HuSaLiTy
  clearWater: HuSaLiTy
}

export interface Filters {
  creamySun: HuBrInSaGr
  nightly: HuBrInSaGr
  candyFloss: HuBrInSaGr
  softWind: HuBrInSaGr
  grayscale: HuBrInSaGr
  softSteel: HuBrInSaGr
  biscarosse: HuBrInSaGr
  _ui_color_palette: HuBrInSaGr
  _jeprendsquoi: HuBrInSaGr
  _jean_bobby_radio: HuBrInSaGr
  _awesome_ipsums: HuBrInSaGr
  _iobeya_whiteboard: HuBrInSaGr
  _iobeya_mobile_ds: HuBrInSaGr
  _iobeya_creativity: HuBrInSaGr
  _axeptio_gusto: HuBrInSaGr
}

export interface HuSaLiTy {
  hue: number
  saturation: number
  lightness: number
  type: string
  name: string
}

export interface HuBrInSaGr {
  hue: string
  brightness: string
  invert: string
  saturation: string
  grayscale: string
  name: string
  /**
   * A CSS gradient laid over the canvas in `color` blend mode, for the
   * ambients that are a sky rather than a tint. The filter underneath turns
   * the scene to greys, and this puts the hue back one band at a time — which
   * a single hue-rotate cannot do, since it moves every pixel by one angle.
   */
  gradient?: string
}

export interface ParticleProps extends Path {
  weight: number
}

export interface Position {
  x: number
  y: number
  z: number
}

export interface Path {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Center {
  x: number
  y: number
  z: number
}

export interface Progress {
  x: number
  y: number
  z: number
}

export interface Rotation {
  v: number
  h: number
}

export interface Size {
  width: number
  height: number
}

export interface Row {
  width: number
  height: number
  x: number
}

export interface Route {
  path: string
  name: string
  component: unknown
  meta: Meta
}

export interface Meta {
  title: string
  codeName: string
  description: string
  summary: string
  date: string
  objectives: Array<string>
  roles: Array<string>
  position: number
  view: string
  illustration: JSONObject
  background: HuBrInSaGr
  backgroundImage: string
  theme: string
  filter: HuBrInSaGr
  pov: string
  quality: string
  universe?: string
  scene?: SceneOverride
}

export interface Option {
  name: string
  action: () => void
  isActive: boolean
}

export interface Asset {
  [x: string]: Array<string>
}

type JSONValue = string | number | boolean | JSONObject | JSONArray

interface JSONObject {
  [x: string]: JSONValue
}

type JSONArray = Array<JSONValue>
