import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { i18n } from '@/lang'
import { registerContentComponents } from '@/content/components'
import { store } from '@/utilities/store'
import Loop from '@/components/graphics/loader'
import SetCursor from '@/components/graphics/cursor'
import Vue3Lottie from 'vue3-lottie'
import NProgress from 'nprogress'

const CLOSING_SPEED = 1
const CLOSING_FRAMES = (220 / 60) * 1000
const SETTLED_BEAT = 600
const WIPE_DURATION = 3200

const app = createApp(App),
  loader = document.getElementById('loader') as HTMLElement,
  feedback = document.getElementById('feedback') as HTMLAudioElement

registerContentComponents(app)

document.title = 'Virtualization in progress…'

// Cursor
SetCursor()

if (import.meta.env.MODE !== 'development') {
  store.isSceneRevealed = false

  let isWiping = false

  // Progress bar
  NProgress.configure({
    showSpinner: false,
    parent: '#progress',
    easing: 'ease',
    speed: 200,
  })
  NProgress.start()

  // Loading screen
  window.onload = () => {
    let isClosing = false

    Loop.playSegments([[0, 200]], false)

    Loop.onLoopComplete = () => {
      isClosing = !isClosing

      if (isClosing) {
        Loop.goToAndStop(200, true)
        loader.classList.add('loader--loaded')
        NProgress.done()
        setTimeout(entrance, SETTLED_BEAT)
      } else {
        Loop.goToAndStop(420, true)
        wipe()
      }
    }
  }

  const entrance = (): void => {
    Loop.setSpeed(CLOSING_SPEED)
    Loop.playSegments([[200, 420]], false)
    Loop.play()
    feedback.volume = 0.1
    document.body.clientWidth > 1280
      ? feedback.play().catch(() => {
          //
        })
      : null

    loader.classList.remove('loader--loaded')

    setTimeout(wipe, CLOSING_FRAMES / CLOSING_SPEED + SETTLED_BEAT)
  }

  const wipe = (): void => {
    if (isWiping) return

    isWiping = true
    loader.classList.replace('loader--enter', 'loader--leave')

    app
      .use(router)
      .use(i18n)
      .use(Vue3Lottie, { name: 'Vue3Lottie' })
      .mount('#app')

    setTimeout(() => {
      Loop.destroy()
      loader.remove()
      store.isSceneRevealed = true
    }, WIPE_DURATION)
  }
} else {
  Loop.destroy()
  loader.remove()
  app
    .use(router)
    .use(i18n)
    .use(Vue3Lottie, { name: 'Vue3Lottie' })
    .mount('#app')
}
