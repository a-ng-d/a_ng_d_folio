import { reactive } from 'vue'

export const store = reactive({
  isSoundOn: true as boolean,
  isOver: false as boolean,
  isFocus: false as boolean,
  device: 'DESKTOP' as string
})
