import { reactive } from 'vue'
import type { LightKind } from '@/glitchscape/types'
import type { LocalWeather } from '@/utilities/weather'

export const store = reactive({
  isPageCurtainOn: false as boolean,
  isSoundOn: true as boolean,
  isOver: false as boolean,
  isFocus: false as boolean,
  device: '' as string,
  // What the scene is borrowing from the world right now, published so the
  // footer can name it without the whole tree passing it down.
  weather: null as LocalWeather | null,
  hour: 'FLAT' as LightKind,
  clock: Date.now() as number,
  isLiveAmbience: false as boolean,
})
