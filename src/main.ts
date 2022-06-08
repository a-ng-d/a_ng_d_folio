import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './lang'
import Vue3Lottie from 'vue3-lottie'

createApp(App)
  .use(router)
  .use(i18n)
  .use(Vue3Lottie)
  .mount('#app')
