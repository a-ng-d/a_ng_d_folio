import { computed, defineComponent } from 'vue'
import type { ComputedRef } from 'vue'
import { doMap } from '@/utilities/operations'

export const SCROLL_KEY = 'a_ng_d:scroll'

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
      const provided = this.providedScroll as
        | ComputedRef<ScrollState>
        | undefined
      return provided?.value ?? { progress: 0, limit: 1 }
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
