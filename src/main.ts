import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './lang'
import Vue3Lottie from 'vue3-lottie'
import { loop } from './utilities/animation'

const app = createApp(App),
loader: HTMLElement = document.getElementById('loader')!,
feedback: any = document.getElementById('feedback')!

window.onload = () => {
  let isFrozen = false

  loop.playSegments([[0, 200]], false)

  loop.onLoopComplete = () => {
    isFrozen = !isFrozen
    if (isFrozen) {
      loop.goToAndStop(200, true)
      loader.classList.add('loader--loaded')
      document.onkeyup = () => entrance()
      document.body.ontouchstart = () => entrance()
    } else loop.goToAndStop(420, true)
  }
}

const entrance = (): void => {
  loop.setSpeed(2)
  loop.playSegments([[200, 420]], false)
  loop.play()
  feedback.volume = .2
  document.body.clientWidth > 1280 ? feedback.play() : null
  document.onkeyup = null
  document.body.ontouchstart = null

  loader.classList.remove('loader--loaded')

  setTimeout(() => loader.classList.replace('loader--enter', 'loader--leave'), 2000)
  setTimeout(() => {
    loop.destroy()
    loader.innerHTML = ''
    app
      .use(router)
      .use(i18n)
      .use(Vue3Lottie)
      .mount('#app')

  }, 3600)
}
