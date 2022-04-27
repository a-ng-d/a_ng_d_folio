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
        title: 'nG⚡️ aka. Aurélien Grimaud﹒Senior Product Designer & Creative Technologist',
        background: 'var(--gradient-chill-night)'
      }
    },
    {
      path: '/_id',
      name: 'id',
      component: Id,
      meta: {
        title: 'nG⚡️ aka. Aurélien Grimaud﹒ID card',
        background: 'var(--gradient-biscarosse-sunset)'
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
    },
    {
      path: '/_resume',
      name: 'resume',
      beforeEnter() {
        window.open('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f2cf96ad-5468-4704-b18a-c8761a0d5588/Aurelien_Grimaud・Resume・2022.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220421T224043Z&X-Amz-Expires=86400&X-Amz-Signature=d90b99058da0d8897ba37992a1abb83d6d0713316803296c7ce0edafdd157a5f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"Aurelien%2520Grimaud%25E3%2583%25BBResume%25E3%2583%25BB2022.pdf"&x-id=GetObject', '_blank')
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
