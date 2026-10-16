import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { i18n } from '@/lang'
import { registerContentComponents } from '@/content/components'
import SetCursor from '@/components/graphics/cursor'
import Vue3Lottie from 'vue3-lottie'

const app = createApp(App)

registerContentComponents(app)

// Cursor
SetCursor()

app
  .use(router)
  .use(i18n)
  .use(Vue3Lottie, { name: 'Vue3Lottie' })
  .mount('#app')
