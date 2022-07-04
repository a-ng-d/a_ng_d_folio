import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/lang'
import Home from '../views/Home.vue'
import Id from '../views/Id.vue'
import Universes from '../views/Universes.vue'
import Work from '../views/Work.vue'
import Attribution from '../views/Attribution.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: i18n.global.t('title'),
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
      name: 'id',
      component: Id,
      meta: {
        title: i18n.global.t('id.title'),
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
      name: 'universes',
      component: Universes,
      meta: {
        title: i18n.global.t('universes.title'),
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
      name: 'core',
      component: Home
    },
    {
      path: '/_work',
      name: 'work',
      component: Work,
      meta: {
        title: i18n.global.t('work.title'),
        filter: {
          hue: '162deg',
          brightness: '0.5',
          invert: '0',
          saturation: '0.75'
        },
        pov: 'reset',
        quality: 'low'
      }
    },
    {
      path: '/_lab',
      name: 'lab',
      component: Home
    },
    {
      path: '/_contact',
      name: 'contact',
      component: Home
    },
    {
      path: '/_archive',
      name: 'archive',
      beforeEnter() {
        window.open('https://involt.io', '_blank')
      }
    },
    {
      path: '/_attribution',
      name: 'attribution',
      component: Attribution,
      meta: {
        title: i18n.global.t('attribution.title'),
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
      name: 'resume',
      beforeEnter() {
        window.open('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4b0bb3f6-e894-4ff6-a572-8a7cd379e991/Aurelien_GrimaudResume・2022.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220504%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220504T120144Z&X-Amz-Expires=86400&X-Amz-Signature=ace9af1cb829311dd06b2b30439240e7826c64390507471c42df063005fff081&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"Aurelien%2520Grimaud%25EF%25B9%2592Resume%25E3%2583%25BB2022.pdf"&x-id=GetObject', '_blank')
      }
    },
    {
      path: '/_linkedin',
      name: 'linkedin',
      beforeEnter() {
        window.open('https://www.linkedin.com/in/augrimaud/', '_blank')
      }
    },
  ]
})

export default router
