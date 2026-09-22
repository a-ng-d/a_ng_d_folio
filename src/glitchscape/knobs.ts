/**
 * The scene, taken apart one dimension at a time.
 *
 * A disposition sets all of these at once; a knob overrides a single one on
 * top of it, so each can be judged on its own. Steps are named rather than
 * numbered: what matters when looking at a landscape is whether the corridor
 * is a slit or a valley, not that it reads 0.08.
 */
export interface KnobStep {
  key: string
  value: number | string
}

export interface Knob {
  field: string
  steps: Array<KnobStep>
}

export const knobs: Array<Knob> = [
  {
    field: 'speed',
    steps: [
      { key: 'drifting', value: 0.15 },
      { key: 'slow', value: 0.4 },
      { key: 'steady', value: 0.75 },
      { key: 'brisk', value: 1.2 },
      { key: 'racing', value: 2 },
    ],
  },
  {
    field: 'shape',
    steps: [
      { key: 'swell', value: 'SWELL' },
      { key: 'organic', value: 'ORGANIC' },
      { key: 'triangle', value: 'TRIANGLE' },
      { key: 'round', value: 'ROUND' },
      { key: 'trapezoid', value: 'TRAPEZOID' },
      { key: 'extrusion', value: 'EXTRUSION' },
      { key: 'mixed', value: 'MIXED' },
    ],
  },
  {
    field: 'corridor',
    steps: [
      { key: 'slit', value: 0.08 },
      { key: 'tight', value: 0.2 },
      { key: 'open', value: 0.5 },
      { key: 'wide', value: 1 },
      { key: 'vast', value: 1.8 },
    ],
  },
  {
    field: 'relief',
    steps: [
      { key: 'flat', value: 0.6 },
      { key: 'even', value: 1 },
      { key: 'tall', value: 1.5 },
      { key: 'towering', value: 2.2 },
    ],
  },
  {
    field: 'breadth',
    steps: [
      { key: 'narrow', value: 0.25 },
      { key: 'slim', value: 0.45 },
      { key: 'even', value: 0.7 },
      { key: 'broad', value: 1 },
      { key: 'sprawling', value: 1.5 },
    ],
  },
  {
    field: 'altitude',
    steps: [
      { key: 'above', value: 1.5 },
      { key: 'level', value: 0 },
      { key: 'low', value: -1.5 },
      { key: 'sunken', value: -3 },
    ],
  },
  {
    field: 'fov',
    steps: [
      { key: 'long', value: 40 },
      { key: 'narrow', value: 50 },
      { key: 'even', value: 60 },
      { key: 'wide', value: 75 },
      { key: 'fisheye', value: 95 },
    ],
  },
  {
    field: 'density',
    steps: [
      { key: 'sparse', value: 0.6 },
      { key: 'light', value: 1.2 },
      { key: 'even', value: 1.8 },
      { key: 'thick', value: 2.6 },
      { key: 'packed', value: 3.6 },
    ],
  },
  {
    field: 'curvature',
    steps: [
      { key: 'faint', value: 0.2 },
      { key: 'gentle', value: 0.45 },
      { key: 'marked', value: 0.8 },
      { key: 'sharp', value: 1.3 },
    ],
  },
  {
    field: 'turbulence',
    steps: [
      { key: 'smooth', value: 0 },
      { key: 'soft', value: 0.35 },
      { key: 'broken', value: 0.7 },
      { key: 'jagged', value: 1 },
    ],
  },
  {
    field: 'rain',
    steps: [
      { key: 'none', value: 0 },
      { key: 'drizzle', value: 0.3 },
      { key: 'shower', value: 0.6 },
      { key: 'downpour', value: 1 },
    ],
  },
  {
    field: 'ambience',
    steps: [
      { key: 'fixed', value: 'FIXED' },
      { key: 'hourly', value: 'HOURLY' },
    ],
  },
  {
    field: 'lighting',
    steps: [
      { key: 'flat', value: 'FLAT' },
      { key: 'dawn', value: 'DAWN' },
      { key: 'zenith', value: 'ZENITH' },
      { key: 'dusk', value: 'DUSK' },
      { key: 'night', value: 'NIGHT' },
      { key: 'storm', value: 'STORM' },
    ],
  },
]
