import { reactive } from 'vue'

export const store = reactive({
  /**
   * The particle curtain that covers a page change.
   *
   * Off, the background is left on show while the route swaps, so the relief
   * can be watched rearranging itself into the next page's disposition —
   * which is worth seeing now that it eases there rather than jumping. Turn
   * it back on here.
   */
  isCurtainOn: false as boolean,
  isSoundOn: true as boolean,
  isOver: false as boolean,
  isFocus: false as boolean,
  device: '' as string,
})
