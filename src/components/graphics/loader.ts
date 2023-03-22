import Lottie from 'lottie-web'

const Loop: any = Lottie.loadAnimation({
  container: document.querySelector('#animation')!,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/animations/_loader/data.json',
})

export default Loop
