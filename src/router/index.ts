import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/lang'
import Home from '../views/Home.vue'
import Id from '../views/Id.vue'
import Universes from '../views/Universes.vue'
import Work from '../views/Work.vue'
import Project from '../views/Project.vue'
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
        view: 'home',
        theme: 'dark',
        filter: {
          hue: '162deg',
          brightness: '0.5',
          invert: '0',
          saturation: '0.75'
        },
        pov: 'reset',
        quality: 'high'
      }
    },
    {
      path: '/_id',
      name: '_ID',
      component: Id,
      meta: {
        title: i18n.global.t('id.title'),
        view: 'id',
        theme: 'default',
        filter: {
          hue: '-78deg',
          brightness: '0.3',
          invert: '1',
          saturation: '0.75'
        },
        pov: 'scrolling…',
        quality: 'high'
      }
    },
    {
      path: '/_universes',
      name: '_UNIVERSES',
      component: Universes,
      meta: {
        title: i18n.global.t('universes.title'),
        view: 'universes',
        theme: 'dark',
        filter: {
          hue: '313deg',
          brightness: '0.5',
          invert: '0',
          saturation: '0.75'
        },
        pov: 'reset',
        quality: 'high'
      }
    },
    {
      path: '/_core',
      name: '_CORE',
      component: Home,
      meta: {
        view: 'core'
      }
    },
    {
      path: '/_work',
      name: '_WORK',
      component: Work,
      meta: {
        title: i18n.global.t('work.title'),
        view: 'work'
      }
    },
    {
      path: '/_work/_ui_color_palette',
      name: '_UI_COLOR_PALETTE',
      component: Project,
      meta: {
        codeName: i18n.global.t('work._ui_color_palette.shortTitle'),
        position: 0,
        title: i18n.global.t('work._ui_color_palette.title'),
        objectives: i18n.global.t('work._ui_color_palette.misc.objectives').split(', '),
        roles: i18n.global.t('work._ui_color_palette.misc.roles').split(', '),
        view: 'project',
        illustration: UCPAnimation,
        background: '#88EBF9',
        theme: 'default'
      }
    },
    {
      path: '/_work/_jeprendsquoi',
      name: '_JEPRENDSQUOI',
      component: Project,
      meta: {
        codeName: i18n.global.t('work._jeprendsquoi.shortTitle'),
        position: 1,
        title: i18n.global.t('work._jeprendsquoi.title'),
        objectives: i18n.global.t('work._jeprendsquoi.misc.objectives').split(', '),
        roles: i18n.global.t('work._jeprendsquoi.misc.roles').split(', '),
        view: 'project',
        illustration: '/src/assets/images/_work/_jeprendsquoi/illustration.png',
        background: '#FFF',
        theme: 'default'
      }
    },
    {
      path: '/_work/_jean_bobby_radio',
      name: '_JEAN_BOBBY_RADIO',
      component: Project,
      meta: {
        codeName: i18n.global.t('work._jean_bobby_radio.shortTitle'),
        position: 2,
        title: i18n.global.t('work.title'),
        view: 'project',
        illustration: JBRAnimation,
        background: '#190038',
        theme: 'dark'
      }
    },
    {
      path: '/_work/_awesome_ipsums',
      name: '_AWESOME_IPSUMS',
      component: Project,
      meta: {
        codeName: i18n.global.t('work._awesome_ipsums.shortTitle'),
        position: 3,
        title: i18n.global.t('work.title'),
        view: 'project',
        illustration: AIAnimation,
        background: '#23A566',
        theme: 'dark'
      }
    },
    {
      path: '/_work/_iobeya_whiteboard',
      name: '_IOBEYA_WHITEBOARD',
      component: Project,
      meta: {
        codeName: i18n.global.t('work._iobeya_whiteboard.shortTitle'),
        position: 4,
        title: i18n.global.t('work.title'),
        view: 'project',
        illustration: IWAnimation,
        background: '#001D5E',
        theme: 'dark'
      }
    },
    {
      path: '/_lab',
      name: '_LAB',
      component: Home,
      meta: {
        view: 'lab'
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
        window.open('https://involt.io', '_blank')
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
        theme: 'default',
        filter: {
          hue: '162deg',
          brightness: '0.5',
          invert: '0',
          saturation: '0.75'
        },
        pov: 'reset',
        quality: 'high'
      }
    },
    {
      path: '/_resume',
      name: '_RESUME',
      beforeEnter() {
        window.open('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4b0bb3f6-e894-4ff6-a572-8a7cd379e991/Aurelien_GrimaudResume・2022.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220504%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220504T120144Z&X-Amz-Expires=86400&X-Amz-Signature=ace9af1cb829311dd06b2b30439240e7826c64390507471c42df063005fff081&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"Aurelien%2520Grimaud%25EF%25B9%2592Resume%25E3%2583%25BB2022.pdf"&x-id=GetObject', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_linkedin',
      name: '_LINKEDIN',
      beforeEnter() {
        window.open('https://www.linkedin.com/in/augrimaud', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_ui_color_palette/takeaway-1',
      name: '_UI_COLOR_PALETTE_TAKEAWAY_1',
      beforeEnter() {
        window.open('https://www.figma.com/community/plugin/1063959496693642315/UI-Color-Palette', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_ui_color_palette/takeaway-2',
      name: '_UI_COLOR_PALETTE_TAKEAWAY_2',
      beforeEnter() {
        window.open('https://github.com/inVoltag/figma-ui-color-palette', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_jeprendsquoi/information',
      name: '_JEPRENDSQUOI_INFORMATION',
      beforeEnter() {
        window.open('https://yuka.io', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_jeprendsquoi/takeaway-1',
      name: '_JEPRENDSQUOI_TAKEAWAY_1',
      beforeEnter() {
        window.open('https://testflight.apple.com/join/AmEZ2igV', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_jeprendsquoi/takeaway-2',
      name: '_JEPRENDSQUOI_TAKEAWAY_2',
      beforeEnter() {
        window.open('https://testflight.apple.com/join/AmEZ2igV', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    }
  ]
})

export default router
