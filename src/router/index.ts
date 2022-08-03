import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/lang'
import Home from '../views/Home.vue'
import Id from '../views/Id.vue'
import Universes from '../views/Universes.vue'
import Work from '../views/Work.vue'
import Project from '../views/Project.vue'
import Lab from '../views/Lab.vue'
import Attribution from '../views/Attribution.vue'
import JBRAnimation from '@/assets/images/_work/_jean_bobby_radio/animation.json'
import UCPAnimation from '@/assets/images/_work/_ui_color_palette/animation.json'
import AIAnimation from '@/assets/images/_work/_awesome_ipsums/animation.json'
import IWAnimation from '@/assets/images/_work/_iobeya_whiteboard/animation.json'

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
        filter: {
          hue: '0deg',
          brightness: '1',
          invert: '0',
          saturation: '.5'
        },
        pov: 'RESET',
        quality: 'HIGH'
      }
    },
    {
      path: '/_id',
      name: '_ID',
      component: Id,
      meta: {
        title: i18n.global.t('id.title'),
        view: 'ID',
        theme: 'DEFAULT',
        filter: {
          hue: '-78deg',
          brightness: '1',
          invert: '1',
          saturation: '.5'
        },
        pov: 'RESET',
        quality: 'HIGH'
      }
    },
    {
      path: '/_universes',
      name: '_UNIVERSES',
      component: Universes,
      meta: {
        title: i18n.global.t('universes.title'),
        view: 'UNIVERSES',
        theme: 'DARK',
        filter: {
          hue: '20deg',
          brightness: '1',
          invert: '1',
          saturation: '.3'
        },
        pov: 'WISEEYE',
        quality: 'HIGH'
      }
    },
    {
      path: '/_core',
      name: '_CORE',
      component: Home,
      meta: {
        title: i18n.global.t('core.title'),
        view: 'CORE',
        theme: 'DEFAULT',
        filter: {
          hue: '190deg',
          brightness: '1',
          invert: '0',
          saturation: '.5'
        },
        pov: 'RESET',
        quality: 'HIGH'
      }
    },
    {
      path: '/_work',
      name: '_WORK',
      component: Work,
      meta: {
        title: i18n.global.t('work.title'),
        view: 'WORK',
        filter: {
          hue: '0deg',
          brightness: '1.25',
          invert: '0',
          saturation: '0'
        },
        pov: 'BIRDEYE_3'
      }
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
        objectives: i18n.global.t('work._ui_color_palette.misc.objectives').split(', '),
        roles: i18n.global.t('work._ui_color_palette.misc.roles').split(', '),
        position: 0,
        view: 'PROJECT',
        illustration: UCPAnimation,
        background: '#88EBF9',
        theme: 'DEFAULT',
        filter: {
          hue: '0deg',
          brightness: '1.25',
          invert: '0',
          saturation: '0'
        },
        pov: 'BIRDEYE_1'
      }
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
        objectives: i18n.global.t('work._jeprendsquoi.misc.objectives').split(', '),
        roles: i18n.global.t('work._jeprendsquoi.misc.roles').split(', '),
        position: 1,
        view: 'PROJECT',
        illustration: '/src/assets/images/_work/_jeprendsquoi/illustration.png',
        background: '#FFF',
        theme: 'DEFAULT',
        filter: {
          hue: '0deg',
          brightness: '1.25',
          invert: '0',
          saturation: '0'
        },
        pov: 'BIRDEYE_2'
      }
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
        objectives: i18n.global.t('work._jean_bobby_radio.misc.objectives').split(', '),
        roles: i18n.global.t('work._jean_bobby_radio.misc.roles').split(', '),
        position: 2,
        view: 'PROJECT',
        illustration: JBRAnimation,
        background: '#190038',
        theme: 'DARK',
        filter: {
          hue: '0deg',
          brightness: '1.25',
          invert: '0',
          saturation: '0'
        },
        pov: 'BIRDEYE_3'
      }
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
        objectives: i18n.global.t('work._awesome_ipsums.misc.objectives').split(', '),
        roles: i18n.global.t('work._awesome_ipsums.misc.roles').split(', '),
        position: 3,
        view: 'PROJECT',
        illustration: AIAnimation,
        background: '#23A566',
        theme: 'DARK',
        filter: {
          hue: '0deg',
          brightness: '1.25',
          invert: '0',
          saturation: '0'
        },
        pov: 'BIRDEYE_4'
      }
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
        objectives: i18n.global.t('work._iobeya_whiteboard.misc.objectives').split(', '),
        roles: i18n.global.t('work._iobeya_whiteboard.misc.roles').split(', '),
        position: 4,
        view: 'PROJECT',
        illustration: IWAnimation,
        background: '#001D5E',
        theme: 'DARK',
        filter: {
          hue: '0deg',
          brightness: '1.25',
          invert: '0',
          saturation: '0'
        },
        pov: 'BIRDEYE_5'
      }
    },
    {
      path: '/_lab',
      name: '_LAB',
      component: Lab,
      meta: {
        title: i18n.global.t('lab.title'),
        view: 'LAB',
        theme: 'DEFAULT',
        filter: {
          hue: '120deg',
          brightness: '1.2',
          invert: '0',
          saturation: '.3'
        },
        pov: 'RESET',
        quality: 'HIGH'
      }
    },
    {
      path: '/_contact',
      name: '_CONTACT',
      component: Home,
      meta: {
        view: 'contact'
      }
    },
    {
      path: '/_archive',
      name: '_ARCHIVE',
      beforeEnter() {
        window.open('https://school.involt.io', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_attribution',
      name: '_ATTRIBUTION',
      component: Attribution,
      meta: {
        title: i18n.global.t('attribution.title'),
        view: 'attribution',
        theme: 'DEFAULT',
        filter: {
          hue: '162deg',
          brightness: '.5',
          invert: '0',
          saturation: '.75'
        },
        pov: 'RESET',
        quality: 'HIGH'
      }
    }
  ]
})

export default router
