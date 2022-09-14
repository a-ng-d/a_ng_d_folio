import lottie from 'lottie-web'

export const loop: any = lottie.loadAnimation({
  container: document.getElementById('animation')!,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/animations/_loader/data.json'
})
