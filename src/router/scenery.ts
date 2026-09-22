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

/**
 * What a page says about the world it travels through.
 *
 * The dials are the ones the inspector shows, under the names it shows them
 * by, so a page can be written straight off a run through `/_unknown`: pick
 * an arrangement, a direction and an ambient, flick the switches, copy it
 * here. The engine's own vocabulary — filters, universes, quality tiers,
 * scene overrides — is derived below rather than spelled out by hand, which
 * is what kept drifting apart.
 */
export interface Scenery {
  /** The arrangement of the relief. Every name there is, and only those. */
  disposition: DispositionKind
  /** Which way the journey goes. */
  flow: FlowKind
  /** The colour world, as the Ambient dropdown lists it. */
  ambient: AmbientKind
  /** Follow the local hour and weather. Held as set when left out. */
  live?: boolean
  /** Let the scroll push the relief along, past where the page ends. */
  endless?: boolean
  /** Draw the silhouettes as outlines instead of sheets. */
  wireframe?: boolean
  /** A silhouette of its own, over whatever the disposition uses. */
  shape?: ShapeKind
}

/**
 * The ambients a page may travel in.
 *
 * The project tints live in the same table but are not worlds — they recolour
 * the background of one card — so they are kept out of the choice a page has.
 */
export type AmbientKind = Exclude<keyof Filters, `_${string}`>

/** Which page is on screen. Drives layout, not the background. */
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

/** Light or dark interface over the background. */
export type ThemeKind = 'DEFAULT' | 'DARK'

/** What a scenery turns into: the three fields the app actually reads. */
export interface SceneryMeta {
  filter: HuBrInSaGr
  quality: QualityKind
  scene: SceneOverride
}

/**
 * Expands a page's description into what the background expects.
 *
 * Spread into a route's meta, it replaces four fields that had to be kept
 * consistent by hand — and were not: a page could name one ambient and one
 * universe that disagreed, or carry a wireframe by way of a quality tier
 * called `LOW`.
 */
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

/**
 * Everything a page declares about itself.
 *
 * The three fields a background needs come from `scenery`; the rest is what
 * the page is made of. Anything a project carries is optional, since no other
 * page has it — casting a project route to `Route` is what asserts it is all
 * there.
 */
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
  /**
   * What stands for the project on the Work page: a Lottie document for most
   * of them, the path to an image for the one that has no animation. Work.vue
   * draws the first through the player and the second through an `img`, and
   * the type says so rather than leaving it to be discovered.
   *
   * The Lottie stays a plain object — the exported JSON is far too deep for a
   * recursive JSON type to check without the compiler giving up halfway down
   * a shape layer.
   */
  illustration?: object | string
  background?: HuBrInSaGr
  backgroundImage?: string
}

/**
 * Vue Router leaves `meta` open by design — its own type accepts any key at
 * all — so a misspelt field would be carried along and silently ignored.
 * Mapping everything that is not part of a page to `never` closes that: the
 * only names that compile are the ones below.
 */
type Only<T extends PageMeta> = T &
  Record<Exclude<keyof T, keyof PageMeta>, never>

/**
 * Declares a page. Call it around a route's meta and the editor will offer
 * every field, refuse the ones that do not exist and check the values of the
 * ones that do.
 */
export const page = <T extends PageMeta>(meta: Only<T>): Only<T> => meta

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends PageMeta {}
}
