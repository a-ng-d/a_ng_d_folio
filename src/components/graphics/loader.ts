import Lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

export interface LoopAnimation extends AnimationItem {
  onLoopComplete?: () => void
}

const Loop = Lottie.loadAnimation({
  container: document.querySelector('#animation') as Element,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: '/animations/_loader/data.json',
}) as LoopAnimation

export default Loop
