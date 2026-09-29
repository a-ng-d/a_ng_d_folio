import { computed, defineComponent, inject } from 'vue'
import type { ComputedRef } from 'vue'
import { doMap } from '@/utilities/operations'

export const SCROLL_KEY = 'a_ng_d:scroll'

const IDLE: ScrollState = { progress: 0, limit: 1 }

/**
 * Selon qu'on injecte depuis un composant Options ou depuis `setup`, Vue rend
 * la valeur telle quelle ou déjà déballée. On accepte les deux plutôt que de
 * retomber silencieusement sur une position figée.
 */
const readScroll = (provided: unknown): ScrollState => {
  if (provided === null || provided === undefined) return IDLE
  const value = (provided as { value?: ScrollState }).value ?? provided
  return (value as ScrollState).limit !== undefined
    ? (value as ScrollState)
    : IDLE
}

export interface ScrollState {
  progress: number
  limit: number
}

export const provideScroll = (source: () => ScrollState) => ({
  [SCROLL_KEY]: computed(source),
})

// Pour tout composant qui se déplace au défilement. Évite de faire traverser
// scrollProgress et scrollLimit à un corps Markdown pour les redescendre.
export const withScroll = defineComponent({
  inject: {
    providedScroll: { from: SCROLL_KEY, default: undefined },
  },
  computed: {
    scroll(): ScrollState {
      return readScroll(this.providedScroll)
    },
  },
  methods: {
    // Même interpolation que les SFC d'origine, doMap compris.
    parallax(start: number, end: number): string {
      const { progress, limit } = this.scroll
      return `${doMap(progress, 0, limit, start, end)}%`
    },
  },
})

/** Variante composition, pour un bloc <script setup> dans un corps Markdown. */
export const useScroll = () => {
  const provided = inject<ComputedRef<ScrollState> | undefined>(
    SCROLL_KEY,
    undefined
  )

  const parallax = (start: number, end: number): string => {
    const { progress, limit } = readScroll(provided)
    return `${doMap(progress, 0, limit, start, end)}%`
  }

  return { parallax }
}
