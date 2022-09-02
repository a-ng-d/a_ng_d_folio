import type { Colors, Filters } from '@/utilities/types'

export const HSLColors: Colors = {
  deepBlack: {
    hue: 240,
    saturation: 100,
    lightness: 8,
    type: 'value',
    name: 'DEEP_BLACK'
  },
  titaniumWhite: {
    hue: 0,
    saturation: 0,
    lightness: 100,
    type: 'value',
    name: 'TITANIUM_WHITE'
  },
  soil: {
    hue: 340,
    saturation: 2,
    lightness: 30,
    type: 'grayscale',
    name: 'SOIL'
  },
  sandstone: {
    hue: 345,
    saturation: 2,
    lightness: 61,
    type: 'grayscale',
    name: 'SANDSTONE'
  },
  clay: {
    hue: 3,
    saturation: 4,
    lightness: 78,
    type: 'grayscale',
    name: 'CLAY'
  },
  cream: {
    hue: 3,
    saturation: 14,
    lightness: 96,
    type: 'grayscale',
    name: 'CREAM'
  },
  creamySun: {
    hue: 49,
    saturation: 90,
    lightness: 62,
    type: 'primary',
    name: 'CREAMYSUN'
  },
  softWind: {
    hue: 209,
    saturation: 96,
    lightness: 89,
    type: 'primary',
    name: 'SOFT_WIND'
  },
  candyFloss: {
    hue: 266,
    saturation: 60,
    lightness: 89,
    type: 'primary',
    name: 'CANDY_FLOSS'
  },
  clearWater: {
    hue: 209,
    saturation: 96,
    lightness: 69,
    type: 'secondary',
    name: 'CLEAR_WATER'
  }
}

export const filters: Filters = {
  creamySun: {
    hue: '0deg',
    brightness: '1',
    invert: '0',
    saturation: '.9',
    grayscale: '0%',
    name: 'CREAMY_SUN'
  },
  nightly: {
    hue: '20deg',
    brightness: '1',
    invert: '1',
    saturation: '.3',
    grayscale: '0%',
    name: 'NIGHTLY'
  },
  candyFloss: {
    hue: '200deg',
    brightness: '1.1',
    invert: '0',
    saturation: '.8',
    grayscale: '0%',
    name: 'CANDY_FLOSS'
  },
  softWind: {
    hue: '170deg',
    brightness: '1.1',
    invert: '0',
    saturation: '.8',
    grayscale: '0%',
    name: 'SOFT_WIND'
  },
  grayscale: {
    hue: '0deg',
    brightness: '1.1',
    invert: '0',
    saturation: '1',
    grayscale: '100%',
    name: 'GRAYSCALE'
  },
  _ui_color_palette: {
    hue: '128deg',
    brightness: '1',
    invert: '0',
    saturation: '.55',
    grayscale: '0%',
    name: '_UI_COLOR_PALETTE'
  },
  _jeprendsquoi: {
    hue: '0deg',
    brightness: '1.5',
    invert: '0',
    saturation: '1',
    grayscale: '100%',
    name: '_JEPRENDSQUOI'
  },
  _jean_bobby_radio: {
    hue: '32deg',
    brightness: '1',
    invert: '1',
    saturation: '.3',
    grayscale: '0%',
    name: '_JEAN_BOBBY_RADIO'
  },
  _awesome_ipsums: {
    hue: '82deg',
    brightness: '.7',
    invert: '0',
    saturation: '.9',
    grayscale: '0%',
    name: '_AWESOME_IPSUMS'
  },
  _iobeya_whiteboard: {
    hue: '343deg',
    brightness: '1.5',
    invert: '1',
    saturation: '.7',
    grayscale: '0%',
    name: '_IOBEYA_WHITEBOARD'
  }
}
