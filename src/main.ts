import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './lang'
import Vue3Lottie from 'vue3-lottie'
import { loop } from './utilities/animation'

const app = createApp(App),
loader: HTMLElement = document.getElementById('loader')!

window.onload = () => {
  let isFrozen = false

  loop.playSegments([[0, 200]], false)
  loop.setSpeed(.8)

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

const entrance: any = () => {
  loop.setSpeed(1.4)
  loop.playSegments([[200, 420]], false)
  loop.play()

  loader.classList.remove('loader--loaded')

  setTimeout(() => loader.classList.replace('loader--enter', 'loader--leave'), 2000)
  setTimeout(() => {
    loop.destroy()
    loader.innerHTML = ''
    document.onkeyup = null
    document.body.ontouchstart = null
    app
      .use(router)
      .use(i18n)
      .use(Vue3Lottie)
      .mount('#app')

  }, 3600)
}
