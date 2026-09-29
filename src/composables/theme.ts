import { computed, defineComponent } from 'vue'
import type { ComputedRef } from 'vue'
import type { ThemeKind } from '@/router/scenery'

export const THEME_KEY = 'a_ng_d:theme'

/**
 * Met le thème courant à disposition de tout le sous-arbre.
 * À appeler depuis l'option `provide` d'un composant, en lui passant un
 * accesseur vers son propre thème : `provide() { return provideTheme(() => this.theme) }`
 */
export const provideTheme = (source: () => ThemeKind) => ({
  [THEME_KEY]: computed(source),
})

/**
 * À mélanger dans tout composant de présentation réutilisable.
 *
 * Le thème vient de trois endroits, dans cet ordre : la prop `theme` si le
 * parent en pose une (surcharge locale — une figure sombre sur une page
 * claire), sinon le thème fourni par l'ancêtre le plus proche, sinon
 * 'DEFAULT'. Les composants rendus depuis un Markdown ne reçoivent aucune
 * prop : c'est l'injection qui les sert.
 */
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
      const provided = this.providedTheme as ComputedRef<ThemeKind> | undefined
      return provided?.value ?? 'DEFAULT'
    },
  },
})
