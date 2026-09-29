import { computed, defineComponent } from 'vue'
import type { ComputedRef } from 'vue'
import type { ThemeKind } from '@/router/scenery'

export const THEME_KEY = 'a_ng_d:theme'

export const provideTheme = (source: () => ThemeKind) => ({
  [THEME_KEY]: computed(source),
})

export const withTheme = defineComponent({
  inject: {
    providedTheme: { from: THEME_KEY, default: undefined },
  },
  props: {
    theme: { type: String, default: undefined },
  },
  computed: {
    resolvedTheme(): ThemeKind {
      if (this.theme !== undefined) return this.theme as ThemeKind
      const provided = this.providedTheme
      if (provided === null || provided === undefined) return 'DEFAULT'
      const value =
        (provided as { value?: ThemeKind }).value ?? (provided as ThemeKind)
      return typeof value === 'string' ? value : 'DEFAULT'
    },
  },
})
