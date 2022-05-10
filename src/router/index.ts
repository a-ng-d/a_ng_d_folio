import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/lang'
import Home from '../views/Home.vue'
import Id from '../views/Id.vue'
import Attributions from '../views/Attributions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: i18n.global.t('title'),
        background: 'var(--color-soil)',
        pov: 'reset',
        transition: 'scale-up'
      }
    },
    {
      path: '/_id',
      name: 'id',
      component: Id,
      meta: {
        title: i18n.global.t('id.title'),
        background: 'var(--gradient-biscarosse-sunset)',
        pov: 'scrolling…',
        transition: 'scale-down'
      }
    },
    {
      path: '/_universes',
      name: 'universes',
      beforeEnter() {
        window.open('https://involtag.notion.site/involtag/Aur-lien-Grimaud-aka-inV-6b95d4c74aec4b489472d9eda80322d1', '_blank')
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
      component: Home
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
      path: '/_attribution',
      name: 'attribution',
      component: Attributions,
      meta: {
        title: i18n.global.t('attributions.title'),
        background: 'var(--color-soft-wind)',
        pov: 'reset'
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
