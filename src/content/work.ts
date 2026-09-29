import { projects as manifest } from 'virtual:work-content'
import type { WorkProject } from './types'
import type { JSONObject } from '@/utilities/types'

/**
 * Accès au manifeste des projets, construit au build depuis les frontmatters
 * de content/work/<slug>/index.<locale>.md.
 *
 * Rien ici n'est écrit à la main : ajouter un dossier suffit.
 */

// Corps hérités. La phase 3 les remplace un par un par le corps Markdown ;
// `hasBody` du manifeste dira lequel des deux rendre.
//
// Chargés d'avance, comme ils l'étaient quand le routeur les importait en
// dur : la phase 2 ne doit rien changer au rendu. Retirer `eager` les rend
// paresseux et sort les huit projets du bundle initial — ce sera l'affaire
// de la phase 3, quand les corps changeront de toute façon.
const legacyBodies = import.meta.glob('/src/contexts/_work/*.vue', {
  eager: true,
  import: 'default',
})

// Les vignettes Lottie sont chargées d'avance : le carrousel les rend
// immédiatement, sans attente ni clignotement.
const lottieIllustrations = import.meta.glob(
  '/src/assets/animations/_work/*/animation.json',
  { eager: true, import: 'default' }
)

// Corps Markdown. Un projet bascule dessus dès que son fichier porte autre
// chose que sa frontmatter — d'où une migration projet par projet, réversible.
const markdownBodies = import.meta.glob('/content/work/*/index.en.md', {
  eager: true,
  import: 'default',
})

export const allProjects: WorkProject[] = manifest

/** Les projets du carrousel : publiés, triés. Identique en dev et en production. */
export const listProjects = (): WorkProject[] =>
  manifest.filter((project) => project.published)

/**
 * Les projets dont la route existe. En production, les publiés seulement.
 * En développement, les brouillons aussi : on peut les relire à leur URL,
 * sans qu'ils apparaissent pour autant dans le carrousel.
 */
export const routableProjects = (): WorkProject[] =>
  import.meta.env.DEV ? manifest : listProjects()

export const getProject = (slug: string): WorkProject | undefined =>
  manifest.find((project) => project.slug === slug)

/**
 * Rang du projet dans le carrousel. Dérivé du tri, jamais écrit à la main.
 * -1 pour un brouillon, ce qui le tient hors de la navigation.
 */
export const positionOf = (slug: string): number =>
  listProjects().findIndex((project) => project.slug === slug)

export const pathOf = (slug: string): string => `/_work/${slug}`

/** Une ressource d'un projet, adressée par son nom de fichier. */
export const assetUrl = (slug: string, file: string): string =>
  `/images/_work/${slug}/${file}`

/** Vignette du carrousel : l'animation Lottie elle-même, ou une URL d'image. */
export const illustrationOf = (project: WorkProject): JSONObject | string =>
  project.illustration.kind === 'lottie'
    ? (lottieIllustrations[
        `/src/assets/animations/_work/${project.slug}/animation.json`
      ] as JSONObject)
    : assetUrl(project.slug, project.illustration.file)

/** Le composant qui rend le corps du projet : son Markdown, sinon son SFC. */
export const bodyOf = (project: WorkProject) =>
  (project.hasBody
    ? markdownBodies[`/content/work/${project.slug}/index.en.md`]
    : undefined) ?? legacyBodies[`/src/contexts/_work/${project.slug}.vue`]
