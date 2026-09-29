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

export interface Option {
  name: string
  action: () => void
  isActive: boolean
}

export type JSONValue = string | number | boolean | JSONObject | JSONArray

export interface JSONObject {
  [x: string]: JSONValue
}

type JSONArray = Array<JSONValue>
