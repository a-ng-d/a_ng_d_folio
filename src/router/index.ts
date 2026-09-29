import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/lang'
import Home from '@/views/Home.vue'
import Short from '@/views/Short.vue'
import Core from '@/views/Core.vue'
import Universe from '@/views/Universe.vue'
import Work from '@/views/Work.vue'
import Project from '@/views/Project.vue'
import Lab from '@/views/Lab.vue'
import Contact from '@/views/Contact.vue'
import Attribution from '@/views/Attribution.vue'
import Unknown from '@/views/Unknown.vue'
import { INSPECTOR_DEFAULT } from '@/glitchscape/dispositions'
import { page, scenery } from '@/router/scenery'
import {
  illustrationOf,
  pathOf,
  positionOf,
  routableProjects,
} from '@/content/work'
import type { WorkProject } from '@/content/types'

// Le texte vient de la frontmatter si elle le porte, sinon de en.json.
// C'est ce qui rend la bascule du contenu réversible, projet par projet.
type TextField = keyof WorkProject['text']

// Une frontmatter peut porter les mêmes messages liés qu'en.json :
// `@:global.separator` pointe vers une valeur du site, `{'2019'}` est un
// littéral. Le routeur les résout comme le ferait $t.
const resolve = (value: string): string =>
  value
    .replace(/@:([\w.]+)/g, (_, key) => i18n.global.t(key))
    .replace(/\{'([^']*)'\}/g, '$1')

const text = (project: WorkProject, field: TextField, key: string): string => {
  const own = project.text[field] as string | undefined
  return own !== undefined
    ? resolve(own)
    : i18n.global.t(`work.${project.slug}.${key}`)
}

const list = (project: WorkProject, field: TextField, key: string): string[] =>
  (project.text[field] as string[] | undefined) ??
  i18n.global.t(`work.${project.slug}.${key}`).split(', ')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '_HOME',
      component: Home,
      meta: page({
        title: i18n.global.t('title'),
        view: 'HOME',
        theme: 'DEFAULT',
        ...scenery({
          disposition: 'CANYON',
          flow: 'STRAIGHT',
          ambient: 'creamySun',
          live: true,
        }),
      }),
    },
    {
      path: '/_short',
      name: '_SHORT',
      component: Short,
      meta: page({
        title: i18n.global.t('id.title'),
        view: 'SHORT',
        theme: 'DEFAULT',
        ...scenery({
          disposition: 'VALLEY',
          flow: 'RIGHT',
          ambient: 'softSteel',
          live: true,
          endless: true,
        }),
      }),
    },
    {
      path: '/_universe',
      name: '_UNIVERSE',
      component: Universe,
      meta: page({
        title: i18n.global.t('universe.title'),
        view: 'UNIVERSE',
        theme: 'DARK',
        ...scenery({
          disposition: 'SWARM',
          flow: 'UP',
          ambient: 'biscarosse',
          live: true,
        }),
      }),
    },
    {
      path: '/_core',
      name: '_CORE',
      component: Core,
      meta: page({
        title: i18n.global.t('core.title'),
        view: 'CORE',
        theme: 'DEFAULT',
        ...scenery({
          disposition: 'VALLEY',
          flow: 'LEFT',
          ambient: 'candyFloss',
          live: true,
          endless: true,
        }),
      }),
    },
    {
      path: '/_lab',
      name: '_LAB',
      component: Lab,
      meta: page({
        title: i18n.global.t('lab.title'),
        view: 'LAB',
        theme: 'DEFAULT',
        ...scenery({
          disposition: 'VALLEY',
          flow: 'RIGHT',
          ambient: 'softWind',
          live: true,
          wireframe: true,
        }),
      }),
    },
    {
      path: '/_work',
      name: '_WORK',
      component: Work,
      meta: page({
        title: i18n.global.t('work.title'),
        view: 'WORK',
        ...scenery({
          disposition: 'DUNES',
          flow: 'DOWN',
          ambient: 'grayscale',
          live: true,
          wireframe: true,
        }),
      }),
    },
    // Les routes projet sont dérivées du manifeste : déposer un dossier sous
    // content/work/ suffit à en créer une. En production seuls les projets
    // publiés en obtiennent une ; en développement les brouillons aussi, pour
    // qu'on puisse les relire à leur URL sans les exposer.
    ...routableProjects().map((project) => ({
      path: pathOf(project.slug),
      name: project.slug.toUpperCase(),
      component: Project,
      meta: page({
        title: text(project, 'title', 'title'),
        // Le slug fait foi. Il servait jusqu'ici de chaîne i18n, ce qui
        // rendait le rendu du corps dépendant d'un fichier de traduction.
        codeName: project.slug,
        description: text(project, 'description', 'description'),
        summary: text(project, 'summary', 'shortDescription'),
        date: text(project, 'date', 'misc.date'),
        objectives: list(project, 'objectives', 'misc.objectives'),
        roles: list(project, 'roles', 'misc.roles'),
        type: text(project, 'type', 'misc.type'),
        position: positionOf(project.slug),
        view: 'PROJECT' as const,
        illustration: illustrationOf(project),
        background: project.tint,
        backgroundImage: project.backgroundImage,
        theme: project.theme,
        ...scenery(project.scenery),
      }),
    })),
    {
      path: '/_contact',
      name: '_CONTACT',
      component: Contact,
      meta: page({
        title: i18n.global.t('contact.title'),
        view: 'CONTACT',
        theme: 'DEFAULT',
        ...scenery({
          disposition: 'VALLEY',
          flow: 'LEFT',
          ambient: 'grayscale',
          live: true,
        }),
      }),
    },
    {
      path: '/_attribution',
      name: '_ATTRIBUTION',
      component: Attribution,
      meta: page({
        title: i18n.global.t('attribution.title'),
        view: 'ATTRIBUTION',
        theme: 'DEFAULT',
        ...scenery({
          disposition: 'DUNES',
          flow: 'DOWN',
          ambient: 'grayscale',
          live: true,
          endless: true,
        }),
      }),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '_UNKNOWN',
      component: Unknown,
      meta: page({
        title: i18n.global.t('unknown.title'),
        view: 'UNKNOWN',
        theme: 'DEFAULT',
        ...scenery({
          disposition: INSPECTOR_DEFAULT,
          flow: 'STRAIGHT',
          ambient: 'creamySun',
        }),
      }),
    },
  ],
})

export default router
