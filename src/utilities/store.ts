import { reactive } from 'vue'

export const store = reactive({
  isPageCurtainOn: false as boolean,
  isSoundOn: true as boolean,
  isOver: false as boolean,
  isFocus: false as boolean,
  device: '' as string,
})
