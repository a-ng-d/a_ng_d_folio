<script lang="ts">
  import { defineComponent } from 'vue'
  import { withTheme } from '@/composables/theme'

  export default defineComponent({
    name: 'ScrollingText',
    mixins: [withTheme],
    props: {
      label: {
        type: String,
        default: 'Some scrolling text',
      },
      direction: {
        type: String,
        default: 'LEFT',
      },
      isSubTitle: {
        type: Boolean,
        default: false,
      },
      stopped: {
        type: Boolean,
        default: false,
      },
      pauseOnHover: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      modifiers(): Array<string> {
        return [
          this.stopped ? 'scrolling-text--stopped' : 'scrolling-text--played',
          this.pauseOnHover ? 'scrolling-text--pausable' : '',
        ]
      },
    },
  })
</script>

<template>
  <h1
    v-if="!isSubTitle"
    class="scrolling-text"
    :class="modifiers"
    :data-theme="resolvedTheme"
  >
    <span class="scrolling-text__instance">{{ label }}</span>
    <span class="scrolling-text__instance">{{ label }}</span>
  </h1>
  <h4
    v-else-if="isSubTitle"
    class="scrolling-text"
    :class="modifiers"
    :data-theme="resolvedTheme"
  >
    <span class="scrolling-text__instance">{{ label }}</span>
    <span class="scrolling-text__instance">{{ label }}</span>
  </h4>
</template>

<style scoped lang="sass">
  // Structure
  .scrolling-text
    display: flex
    justify-content: v-bind("direction === 'LEFT' ? 'flex-start' : 'flex-end'")
    width: 100vw

    &__instance
      display: block
      position: absolute
      animation: v-bind("direction === 'LEFT' ? 'across-left' : 'across-right'") 32000ms infinite forwards linear
      white-space: nowrap

    &--stopped &__instance
      animation-play-state: paused

    &--played &__instance
      animation-play-state: running

    &--pausable:hover &__instance
      animation-play-state: paused

  // Aspect
  .scrolling-text
    &__instance
      color: var(--text-color)

    &[data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
