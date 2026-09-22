import 'vue-router'
import type { Filters, HuBrInSaGr } from '@/utilities/types'
import type {
  FlowKind,
  QualityKind,
  SceneOverride,
  ShapeKind,
} from '@/glitchscape/types'
import type { DispositionKind } from '@/glitchscape/dispositions'
import { dispositions } from '@/glitchscape/dispositions'
import { filters } from '@/utilities/colors'

export interface Scenery {
  disposition: DispositionKind
  flow: FlowKind
  ambient: AmbientKind
  live?: boolean
  endless?: boolean
  wireframe?: boolean
  shape?: ShapeKind
}

export type AmbientKind = Exclude<keyof Filters, `_${string}`>

export type ViewKind =
  | 'HOME'
  | 'SHORT'
  | 'UNIVERSE'
  | 'CORE'
  | 'LAB'
  | 'WORK'
  | 'PROJECT'
  | 'CONTACT'
  | 'ATTRIBUTION'
  | 'UNKNOWN'

export type ThemeKind = 'DEFAULT' | 'DARK'

export interface SceneryMeta {
  filter: HuBrInSaGr
  quality: QualityKind
  scene: SceneOverride
}

export const scenery = (page: Scenery): SceneryMeta => ({
  filter: filters[page.ambient],
  quality: page.wireframe === true ? 'LOW' : 'HIGH',
  scene: {
    ...dispositions[page.disposition],
    flow: page.flow,
    ambience: page.live === true ? 'LIVE' : 'FIXED',
    endless: page.endless === true,
    ...(page.shape !== undefined ? { shape: page.shape } : {}),
  },
})

export interface PageMeta extends SceneryMeta {
  title: string
  view: ViewKind
  theme?: ThemeKind
  codeName?: string
  description?: string
  summary?: string
  date?: string
  objectives?: Array<string>
  roles?: Array<string>
  type?: string
  position?: number
  illustration?: object | string
  background?: HuBrInSaGr
  backgroundImage?: string
}

type Only<T extends PageMeta> = T &
  Record<Exclude<keyof T, keyof PageMeta>, never>

export const page = <T extends PageMeta>(meta: Only<T>): Only<T> => meta

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends PageMeta {}
}
