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
          saturation: '0.5'
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
          saturation: '0.5'
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
          hue: '160deg',
          brightness: '1',
          invert: '1',
          saturation: '0.5'
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
          saturation: '0.5'
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
          brightness: '1',
          invert: '0',
          saturation: '0.5'
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
        theme: 'DEFAULT',
        filter: {
          hue: '162deg',
          brightness: '0.5',
          invert: '0',
          saturation: '0.75'
        },
        pov: 'RESET',
        quality: 'HIGH'
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
    },
    {
      path: '/_work/_jean_bobby_radio/information',
      name: '_JEAN_BOBBY_RADIO_INFORMATION',
      beforeEnter() {
        window.open('https://involtag.notion.site/Monter-une-webradio-d-entreprise-avec-peu-de-moyens-8f64fad1b661454999baa1f65ea27c11', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_jean_bobby_radio/takeaway-1',
      name: '_JEAN_BOBBY_RADIO_TAKEAWAY_1',
      beforeEnter() {
        window.open('https://jean-bobby.radio.fm/', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_jean_bobby_radio/takeaway-2',
      name: '_JEAN_BOBBY_RADIO_TAKEAWAY_2',
      beforeEnter() {
        window.open('https://github.com/inVoltag/jean-bobby-radio', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_awesome_ipsums/takeaway-1',
      name: '_AWESOME_IPSUMS_TAKEAWAY_1',
      beforeEnter() {
        window.open('https://github.com/inVoltag/sketch-awesome-ipsums/releases/latest/download/awesome-ipsums.sketchplugin.zip', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_awesome_ipsums/takeaway-2',
      name: '_AWESOME_IPSUMS_TAKEAWAY_2',
      beforeEnter() {
        window.open('https://github.com/inVoltag/sketch-awesome-ipsums', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_iobeya_whiteboard/information-1',
      name: '_IOBEYA_WHITEBOARD_INFORMATION_1',
      beforeEnter() {
        window.open('https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/rG3Pa7/play', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_iobeya_whiteboard/information-2',
      name: '_IOBEYA_WHITEBOARD_INFORMATION_2',
      beforeEnter() {
        window.open('https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/mEQxdP/play', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_iobeya_whiteboard/information-3',
      name: '_IOBEYA_WHITEBOARD_INFORMATION_3',
      beforeEnter() {
        window.open('https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/ep3x9z/play', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    },
    {
      path: '/_work/_iobeya_whiteboard/takeaway-1',
      name: '_IOBEYA_WHITEBOARD_TAKEAWAY_1',
      beforeEnter() {
        window.open('https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/Zdpol7/play', '_blank')
      },
      meta: {
        view: 'n/a'
      }
    }
  ]
})

export default router
