<script lang="ts">
  export default {
    name: 'ScrollingText',
    props: {
      label: String,
      theme: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<template>
  <h1 class="scrolling-text" :data-theme="theme">
    <span class="scrolling-text__instance">{{ label }}</span>
    <span class="scrolling-text__instance">{{ label }}</span>
  </h1>
</template>

<style scoped lang="sass">
  // Structure
  .scrolling-text
    display: flex
    width: 100vw

    &__instance
      display: block
      animation: across 16000ms infinite forwards linear

  // Aspect
  .scrolling-text
    &__instance
      color: var(--text-color)

  .scrolling-text[data-theme="dark"]
    --text-color: var(--color-cream)
</style>
