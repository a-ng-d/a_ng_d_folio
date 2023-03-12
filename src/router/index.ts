import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/lang'
import Home from '../views/Home.vue'
import Short from '../views/Short.vue'
import Core from '../views/Core.vue'
import Universe from '../views/Universe.vue'
import Work from '../views/Work.vue'
import Project from '../views/Project.vue'
import Lab from '../views/Lab.vue'
import Contact from '../views/Contact.vue'
import Attribution from '../views/Attribution.vue'
import Unknown from '../views/Unknown.vue'
import JBRAnimation from '@/assets/animations/_work/_jean_bobby_radio/animation.json'
import UCPAnimation from '@/assets/animations/_work/_ui_color_palette/animation.json'
import IMDSAnimation from '@/assets/animations/_work/_iobeya_mobile_ds/animation.json'
import AIAnimation from '@/assets/animations/_work/_awesome_ipsums/animation.json'
import IWAnimation from '@/assets/animations/_work/_iobeya_whiteboard/animation.json'
import { filters } from '@/utilities/colors'
import { assets } from '@/utilities/assets'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '_HOME',
      component: Home,
      meta: {
        title: i18n.global.t('title'),
        view: 'HOME',
        theme: 'DEFAULT',
        filter: filters.creamySun,
        pov: 'RESET',
        quality: 'HIGH',
      },
    },
    {
      path: '/_short',
      name: '_SHORT',
      component: Short,
      meta: {
        title: i18n.global.t('id.title'),
        view: 'SHORT',
        theme: 'DEFAULT',
        filter: filters.grayscale,
        pov: 'INVERT',
        quality: 'HIGH',
      },
    },
    {
      path: '/_universe',
      name: '_UNIVERSE',
      component: Universe,
      meta: {
        title: i18n.global.t('universe.title'),
        view: 'UNIVERSE',
        theme: 'DARK',
        filter: filters.nightly,
        pov: 'DONTLOOKUP',
        quality: 'HIGH',
      },
    },
    {
      path: '/_core',
      name: '_CORE',
      component: Core,
      meta: {
        title: i18n.global.t('core.title'),
        view: 'CORE',
        theme: 'DEFAULT',
        filter: filters.candyFloss,
        pov: 'RESET',
        quality: 'HIGH',
      },
    },
    {
      path: '/_lab',
      name: '_LAB',
      component: Lab,
      meta: {
        title: i18n.global.t('lab.title'),
        view: 'LAB',
        theme: 'DEFAULT',
        filter: filters.softWind,
        pov: 'SIDE',
        quality: 'LOW',
      },
    },
    {
      path: '/_work',
      name: '_WORK',
      component: Work,
      meta: {
        title: i18n.global.t('work.title'),
        view: 'WORK',
        filter: filters.grayscale,
        pov: 'DIVE_3',
        quality: 'LOW',
      },
    },
    {
      path: '/_work/_ui_color_palette',
      name: '_UI_COLOR_PALETTE',
      component: Project,
      meta: {
        title: i18n.global.t('work._ui_color_palette.title'),
        codeName: i18n.global.t('work._ui_color_palette.shortTitle'),
        description: i18n.global.t('work._ui_color_palette.description'),
        summary: i18n.global.t('work._ui_color_palette.shortDescription'),
        date: i18n.global.t('work._ui_color_palette.misc.date'),
        objectives: i18n.global
          .t('work._ui_color_palette.misc.objectives')
          .split(', '),
        roles: i18n.global.t('work._ui_color_palette.misc.roles').split(', '),
        type: i18n.global.t('work._ui_color_palette.misc.type'),
        position: 0,
        view: 'PROJECT',
        illustration: UCPAnimation,
        background: filters._ui_color_palette,
        theme: 'DEFAULT',
        filter: filters.grayscale,
        pov: 'DIVE_1',
        quality: 'LOW',
      },
    },
    {
      path: '/_work/_jeprendsquoi',
      name: '_JEPRENDSQUOI',
      component: Project,
      meta: {
        title: i18n.global.t('work._jeprendsquoi.title'),
        codeName: i18n.global.t('work._jeprendsquoi.shortTitle'),
        description: i18n.global.t('work._jeprendsquoi.description'),
        summary: i18n.global.t('work._jeprendsquoi.shortDescription'),
        date: i18n.global.t('work._jeprendsquoi.misc.date'),
        objectives: i18n.global
          .t('work._jeprendsquoi.misc.objectives')
          .split(', '),
        roles: i18n.global.t('work._jeprendsquoi.misc.roles').split(', '),
        type: i18n.global.t('work._jeprendsquoi.misc.type'),
        position: 1,
        view: 'PROJECT',
        illustration: assets._jeprendsquoi[0],
        background: filters._jeprendsquoi,
        theme: 'DEFAULT',
        filter: filters.grayscale,
        pov: 'DIVE_2',
        quality: 'LOW',
      },
    },
    {
      path: '/_work/_jean_bobby_radio',
      name: '_JEAN_BOBBY_RADIO',
      component: Project,
      meta: {
        title: i18n.global.t('work._jean_bobby_radio.title'),
        codeName: i18n.global.t('work._jean_bobby_radio.shortTitle'),
        description: i18n.global.t('work._jean_bobby_radio.description'),
        summary: i18n.global.t('work._jean_bobby_radio.shortDescription'),
        date: i18n.global.t('work._jean_bobby_radio.misc.date'),
        objectives: i18n.global
          .t('work._jean_bobby_radio.misc.objectives')
          .split(', '),
        roles: i18n.global.t('work._jean_bobby_radio.misc.roles').split(', '),
        type: i18n.global.t('work._jean_bobby_radio.misc.type'),
        position: 2,
        view: 'PROJECT',
        illustration: JBRAnimation,
        background: filters._jean_bobby_radio,
        theme: 'DARK',
        filter: filters.grayscale,
        pov: 'DIVE_3',
        quality: 'LOW',
      },
    },
    {
      path: '/_work/_iobeya_mobile_ds',
      name: '_IOBEYA_MOBILE_DS',
      component: Project,
      meta: {
        title: i18n.global.t('work._iobeya_mobile_ds.title'),
        codeName: i18n.global.t('work._iobeya_mobile_ds.shortTitle'),
        description: i18n.global.t('work._iobeya_mobile_ds.description'),
        summary: i18n.global.t('work._iobeya_mobile_ds.shortDescription'),
        date: i18n.global.t('work._iobeya_mobile_ds.misc.date'),
        objectives: i18n.global
          .t('work._iobeya_mobile_ds.misc.objectives')
          .split(', '),
        roles: i18n.global.t('work._iobeya_mobile_ds.misc.roles').split(', '),
        type: i18n.global.t('work._iobeya_mobile_ds.misc.type'),
        position: 3,
        view: 'PROJECT',
        illustration: IMDSAnimation,
        background: filters._iobeya_mobile_ds,
        theme: 'DARK',
        filter: filters.grayscale,
        pov: 'DIVE_4',
        quality: 'LOW',
      },
    },
    {
      path: '/_work/_awesome_ipsums',
      name: '_AWESOME_IPSUMS',
      component: Project,
      meta: {
        title: i18n.global.t('work._awesome_ipsums.title'),
        codeName: i18n.global.t('work._awesome_ipsums.shortTitle'),
        description: i18n.global.t('work._awesome_ipsums.description'),
        summary: i18n.global.t('work._awesome_ipsums.shortDescription'),
        date: i18n.global.t('work._awesome_ipsums.misc.date'),
        objectives: i18n.global
          .t('work._awesome_ipsums.misc.objectives')
          .split(', '),
        roles: i18n.global.t('work._awesome_ipsums.misc.roles').split(', '),
        type: i18n.global.t('work._awesome_ipsums.misc.type'),
        position: 4,
        view: 'PROJECT',
        illustration: AIAnimation,
        background: filters._awesome_ipsums,
        theme: 'DARK',
        filter: filters.grayscale,
        pov: 'DIVE_5',
        quality: 'LOW',
      },
    },
    {
      path: '/_work/_iobeya_whiteboard',
      name: '_IOBEYA_WHITEBOARD',
      component: Project,
      meta: {
        title: i18n.global.t('work._iobeya_whiteboard.title'),
        codeName: i18n.global.t('work._iobeya_whiteboard.shortTitle'),
        description: i18n.global.t('work._iobeya_whiteboard.description'),
        summary: i18n.global.t('work._iobeya_whiteboard.shortDescription'),
        date: i18n.global.t('work._iobeya_whiteboard.misc.date'),
        objectives: i18n.global
          .t('work._iobeya_whiteboard.misc.objectives')
          .split(', '),
        roles: i18n.global.t('work._iobeya_whiteboard.misc.roles').split(', '),
        type: i18n.global.t('work._iobeya_whiteboard.misc.type'),
        position: 5,
        view: 'PROJECT',
        illustration: IWAnimation,
        background: filters._iobeya_whiteboard,
        theme: 'DARK',
        filter: filters.grayscale,
        pov: 'DIVE_6',
        quality: 'LOW',
      },
    },
    {
      path: '/_contact',
      name: '_CONTACT',
      component: Contact,
      meta: {
        title: i18n.global.t('contact.title'),
        view: 'CONTACT',
        theme: 'DEFAULT',
        filter: filters.grayscale,
        pov: 'RESET',
        quality: 'HIGH',
      },
    },
    {
      path: '/_attribution',
      name: '_ATTRIBUTION',
      component: Attribution,
      meta: {
        title: i18n.global.t('attribution.title'),
        view: 'ATTRIBUTION',
        theme: 'DEFAULT',
        filter: filters.grayscale,
        pov: 'RESET',
        quality: 'HIGH',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '_UNKNOWN',
      component: Unknown,
      meta: {
        title: i18n.global.t('unknown.title'),
        view: 'UNKNOWN',
        theme: 'DEFAULT',
        filter: filters.creamySun,
        pov: 'RESET',
        quality: 'HIGH',
      },
    },
  ],
})

export default router
