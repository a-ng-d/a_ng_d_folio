import { projects as manifest } from 'virtual:work-content'
import type { WorkProject } from './types'
import type { JSONObject } from '@/utilities/types'

const lottieIllustrations = import.meta.glob(
  '/src/assets/animations/_work/*/animation.json',
  { eager: true, import: 'default' }
)

const markdownBodies = import.meta.glob('/content/work/*/index.en.md', {
  eager: true,
  import: 'default',
})

export const allProjects: WorkProject[] = manifest

export const listProjects = (): WorkProject[] =>
  manifest.filter((project) => project.published)

export const routableProjects = (): WorkProject[] =>
  import.meta.env.DEV ? manifest : listProjects()

export const getProject = (slug: string): WorkProject | undefined =>
  manifest.find((project) => project.slug === slug)

export const positionOf = (slug: string): number =>
  listProjects().findIndex((project) => project.slug === slug)

export const pathOf = (slug: string): string => `/_work/${slug}`

export const assetUrl = (slug: string, file: string): string =>
  `/images/_work/${slug}/${file}`

export const illustrationOf = (project: WorkProject): JSONObject | string =>
  project.illustration.kind === 'lottie'
    ? (lottieIllustrations[
        `/src/assets/animations/_work/${project.slug}/animation.json`
      ] as JSONObject)
    : assetUrl(project.slug, project.illustration.file)

export const bodyOf = (project: WorkProject) =>
  markdownBodies[`/content/work/${project.slug}/index.en.md`]
