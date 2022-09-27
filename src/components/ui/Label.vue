<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Label',
    props: {
      label: {
        type: String,
        required: true
      },
      underlined: {
        type: Boolean,
        default: false
      },
      highlighted: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      large: {
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
  <div
    class="label"
    :data-theme="theme"
    :data-underlined="underlined"
    :data-highlighted="highlighted"
  >
    <span :class="small ? 'small-label' : large ? 'enhanced-label' : 'label'">{{ label }}</span>
  </div>
</template>

<style lang="sass">
  // Structure
  .label
    --line-width: v-bind("small ? 'calc(var(--border-size) * .75)' : large ? 'calc(var(--border-size) * 1.5)' : 'var(--border-size)'")
    display: inline-flex

    span
      z-index: 2
      transition: var(--slow-transition)

    &:after
      z-index: 1

    &[data-underlined="true"]
      &:after
        content: ''
        width: 100%
        height: var(--line-width)
        position: absolute
        left: 0
        bottom: calc(var(--line-width) * -1.5)
        border-radius: var(--full-border-radius)
        transition: var(--simple-transition)

    &[data-highlighted="true"]
      &:after
        content: ''
        width: 100%
        height: 75%
        position: absolute
        left: calc(var(--border-size) * 4)
        bottom: calc(var(--border-size) * -1)
        border-radius: var(--full-border-radius)

  // Aspect
  .label
    color: var(--text-color)

    &[data-theme="DARK"]
      --text-color: var(--color-cream)
      --border-color: var(--color-cream)

    &[data-underlined="true"], &[data-highlighted="true"]
      &:after
        background: var(--border-color)

    &[data-highlighted="true"]
      &:after
        --border-color: var(--color-creamy-sun)
        mix-blend-mode: darken
</style>
