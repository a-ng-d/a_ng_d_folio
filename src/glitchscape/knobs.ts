import type { Disposition } from '@/glitchscape/dispositions'
import type { SceneOverride } from '@/glitchscape/types'

/**
 * The scene, taken apart one dimension at a time.
 *
 * Direction, colour and the ambience switch have controls of their own, and a
 * palette is not something to pick from a list, so none of them is a knob.
 */
export type KnobField = Exclude<
  keyof SceneOverride,
  'palette' | 'flow' | 'filter' | 'ambience'
>

/**
 * The two tiers of the panel, and they are exact complements.
 *
 * A fine dimension is one a disposition already sets; a surface one is any it
 * does not. Both are derived from the `Disposition` type rather than written
 * out, so neither can drift and nothing can land in the wrong drawer: name a
 * geometry dimension on the surface, or the weather behind the switch, and it
 * fails to compile.
 */
export type FineField = Extract<KnobField, keyof Disposition>

export type SurfaceField = Exclude<KnobField, keyof Disposition>

export interface KnobStep {
  key: string
  value: number | string
}

export interface Knob {
  field: KnobField
  steps: Array<KnobStep>
}

export interface SurfaceKnob extends Knob {
  field: SurfaceField
}

export interface FineKnob extends Knob {
  field: FineField
}

/** Always on the panel: the weather and the light, which no disposition
 *  has any say over. */
export const knobs: Array<SurfaceKnob> = [
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

/** Revealed by the fine tuning switch. Every one of these is already set by
 *  whichever disposition is in play, so each overrules it. */
export const fineKnobs: Array<FineKnob> = [
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
]
