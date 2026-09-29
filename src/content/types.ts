import type { HuBrInSaGr } from '@/utilities/types'
import type { Scenery, ThemeKind } from '@/router/scenery'

export interface WorkIllustration {
  kind: 'lottie' | 'image'
  file: string
}

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
  hasBody: boolean
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
