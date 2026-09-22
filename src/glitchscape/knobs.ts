import type { Disposition } from '@/glitchscape/dispositions'
import type { SceneOverride } from '@/glitchscape/types'

/**
 * The dimensions a disposition does not carry.
 *
 * Geometry belongs to the dispositions — corridor, height, width, altitude,
 * framing, density, pace, bend, roughness, silhouette — so offering it here as
 * well only asked the same question twice. What is left is the weather and the
 * light, which no arrangement of the relief has any say over.
 *
 * The exclusion is taken from the `Disposition` type rather than written out,
 * so the two can never drift: a new scene dimension is knobbable only for as
 * long as no disposition claims it.
 */
export type KnobField = Exclude<
  keyof SceneOverride,
  keyof Disposition | 'palette' | 'flow' | 'filter' | 'ambience'
>

export interface KnobStep {
  key: string
  value: number | string
}

export interface Knob {
  field: KnobField
  steps: Array<KnobStep>
}

export const knobs: Array<Knob> = [
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
