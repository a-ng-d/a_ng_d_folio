import type { HuBrInSaGr } from '@/utilities/types'
import type { Scenery, ThemeKind } from '@/router/scenery'

export interface WorkIllustration {
  // Une extension .json désigne une animation Lottie, tout le reste une image.
  kind: 'lottie' | 'image'
  file: string
}

/**
 * Un projet tel que le manifeste le décrit : sa fiche d'identité, lue dans la
 * frontmatter de content/work/<slug>/index.<locale>.md.
 *
 * Le slug est le nom du dossier — il n'est écrit nulle part ailleurs.
 */
export interface WorkProject {
  slug: string
  published: boolean
  order: number
  theme: ThemeKind
  illustration: WorkIllustration
  backgroundImage: string
  tint: HuBrInSaGr
  scenery: Scenery
  locales: string[]
  // Vrai dès que le Markdown porte autre chose que sa frontmatter. C'est ce
  // qui fait basculer le rendu du SFC hérité vers le corps Markdown, projet
  // par projet.
  hasBody: boolean
  // Surcharges de texte portées par la frontmatter. Tant qu'un champ est
  // absent, le routeur va le chercher dans en.json sous work.<slug>.
  text: Partial<{
    title: string
    shortTitle: string
    summary: string
    description: string
    date: string
    type: string
    objectives: string[]
    roles: string[]
  }>
}
