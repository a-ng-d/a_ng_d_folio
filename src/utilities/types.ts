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
  _ui_color_palette: HuBrInSaGr
  _jeprendsquoi: HuBrInSaGr
  _jean_bobby_radio: HuBrInSaGr
  _awesome_ipsums: HuBrInSaGr
  _iobeya_whiteboard: HuBrInSaGr
}

export interface HuSaLiTy {
  hue: number,
  saturation: number,
  lightness: number,
  type: string
}

export interface HuBrInSaGr {
  hue: string,
  brightness: string,
  invert: string,
  saturation: string,
  grayscale: string
}

export interface MountainProps {
  widthRange: Array<number>,
  heightRange: Array<number>,
  x: number,
  y: number,
  zRange: Array<number>,
  foreground: HuSaLiTy
  background: HuSaLiTy
}

export interface CloudProps {
  widthRange: Array<number>,
  heightRange: Array<number>,
  x: number,
  y: number,
  zRange: Array<number>,
  rows: number,
  foreground: HuSaLiTy
  background: HuSaLiTy
}

export interface StarProps {
  sizeRange: Array<number>,
  x: number,
  z: number,
  yRange: Array<number>,
  foreground: HuSaLiTy
  background: HuSaLiTy
}

export interface PovProps extends Position {
  cX: number,
  cY: number,
  cZ: number,
  rH: number,
  rV: number
}

export interface ParticleProps extends Path {
  weight: number
}

export interface Position {
  x: number,
  y: number,
  z: number,
}

export interface Path {
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

export interface Center {
  x: number,
  y: number,
  z: number
}

export interface Progress {
  x: number,
  y: number,
  z: number
}

export interface Rotation {
  v: number,
  h: number
}

export interface Size {
  width: number,
  height: number
}

export interface Row {
  width: number,
  height: number,
  x: number
}
