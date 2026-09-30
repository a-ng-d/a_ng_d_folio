import { reactive } from 'vue'
import type { LightKind } from '@/glitchscape/types'
import type { LocalWeather } from '@/utilities/weather'

export const store = reactive({
  isPageCurtainOn: false as boolean,
  isSoundOn: true as boolean,
  isAudioUnlocked: false as boolean,
  isOver: false as boolean,
  isFocus: false as boolean,
  device: '' as string,
  weather: null as LocalWeather | null,
  hour: 'FLAT' as LightKind,
  clock: Date.now() as number,
  isLiveAmbience: false as boolean,
})
