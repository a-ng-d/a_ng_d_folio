import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/lang'
import Home from '../views/Home.vue'
import Id from '../views/Id.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'nG⚡️ aka. Aurélien Grimaud﹒Senior Product Designer & Creative Technologist'
      }
    },
    {
      path: '/_id',
      name: 'id',
      component: Id,
      meta: {
        title: 'nG⚡️ aka. Aurélien Grimaud﹒ID card'
      }
    },
    {
      path: '/_universes',
      name: 'universes',
      component: Home
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
      component: Home
    }
  ]
})

export default router
