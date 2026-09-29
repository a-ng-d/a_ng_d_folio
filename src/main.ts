import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { i18n } from '@/lang'
import { registerContentComponents } from '@/content/components'
import Loop from '@/components/graphics/loader'
import SetCursor from '@/components/graphics/cursor'
import Vue3Lottie from 'vue3-lottie'
import NProgress from 'nprogress'

const app = createApp(App),
  loader = document.getElementById('loader') as HTMLElement,
  feedback = document.getElementById('feedback') as HTMLAudioElement

registerContentComponents(app)

document.title = 'Virtualization in progress…'

// Cursor
SetCursor()

if (import.meta.env.MODE != 'development') {
  // Progress bar
  NProgress.configure({
    showSpinner: false,
    parent: '#progress',
    easing: 'ease',
    speed: 200,
  })
  NProgress.start()

  const unlockAudio = () => {
    const previousVolume = feedback.volume
    feedback.volume = 0
    feedback
      .play()
      .then(() => {
        feedback.pause()
        feedback.currentTime = 0
        feedback.volume = previousVolume
      })
      .catch(() => {
        feedback.volume = previousVolume
      })
  }
  document.addEventListener('keydown', unlockAudio, { once: true })
  document.addEventListener('pointerdown', unlockAudio, { once: true })

  // Loading screen
  window.onload = () => {
    let isFrozen = false

    Loop.playSegments([[0, 200]], false)

    Loop.onLoopComplete = () => {
      isFrozen = !isFrozen
      if (isFrozen) {
        Loop.goToAndStop(200, true)
        loader.classList.add('loader--loaded')
        NProgress.done()
        setTimeout(entrance, 500)
      } else Loop.goToAndStop(420, true)
    }
  }

  const entrance = (): void => {
    Loop.setSpeed(2)
    Loop.playSegments([[200, 420]], false)
    Loop.play()
    feedback.volume = 0.2
    document.body.clientWidth > 1280
      ? feedback.play().catch(() => {
          //
        })
      : null

    loader.classList.remove('loader--loaded')

    app
      .use(router)
      .use(i18n)
      .use(Vue3Lottie, { name: 'Vue3Lottie' })
      .mount('#app')

    setTimeout(
      () => loader.classList.replace('loader--enter', 'loader--leave'),
      2000
    )
    setTimeout(() => {
      Loop.destroy()
      loader.remove()
    }, 4400)
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
