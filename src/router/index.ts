import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/lang'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/_id',
      name: 'id',
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
