<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ScrollingText',
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
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
  })
</script>

<template>
  <h1
    v-if="!isSubTitle"
    class="scrolling-text"
    :class="stopped ? 'scrolling-text--stopped' : 'scrolling-text--played'"
    :data-theme="theme"
  >
    <span class="scrolling-text__instance">{{ label }}</span>
    <span class="scrolling-text__instance">{{ label }}</span>
  </h1>
  <h4
    v-else-if="isSubTitle"
    class="scrolling-text"
    :class="stopped ? 'scrolling-text--stopped' : 'scrolling-text--played'"
    :data-theme="theme"
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

  // Aspect
  .scrolling-text
    &__instance
      color: var(--text-color)

    &[data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
