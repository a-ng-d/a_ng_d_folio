<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ScrollingText',
    props: {
      label: {
        type: String,
        default: 'Some scrolling text'
      },
      direction: {
        type: String,
        default: 'LEFT'
      },
      isSubTitle: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  })
</script>

<template>
  <h1 v-if="!isSubTitle" class="scrolling-text" :data-theme="theme">
    <span class="scrolling-text__instance">{{ label }}</span>
    <span class="scrolling-text__instance">{{ label }}</span>
  </h1>
  <h4 v-else-if="isSubTitle" class="scrolling-text" :data-theme="theme">
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
      --gap: v-bind("direction === 'LEFT' ? '-100%' : '100%'")

      display: block
      animation: across 16000ms infinite forwards linear
      white-space: nowrap

  // Aspect
  .scrolling-text
    &__instance
      color: var(--text-color)

  .scrolling-text[data-theme="DARK"]
    --text-color: var(--color-cream)
</style>
