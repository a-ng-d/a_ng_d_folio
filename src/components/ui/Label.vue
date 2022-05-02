<script lang="ts">
export default {
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
      theme: {
        type: String,
        default: "default"
      }
    }
  }
</script>

<template>
  <div class="label" :data-theme="theme" :data-underlined="underlined">
    <span>{{ label }}</span>
  </div>
</template>

<style lang="sass">
  @use '@/assets/text-styles.sass' as text

  // Structure
  .label
    @include text.current

    span
      z-index: 1

    &[data-underlined="true"]
      &:after
        content: ''
        width: 100%
        height: var(--border-size)
        position: absolute
        left: 0
        bottom: calc(var(--border-size) * -1)
        border-radius: var(--full-border-radius)
        transition: var(--simple-transition)

    &[data-highlighted="true"]
      &:after
        content: ''
        width: 100%
        height: 50%
        position: absolute
        left: calc(var(--border-size) * 4)
        bottom: calc(var(--border-size) * -1)
        border-radius: var(--full-border-radius)

  // Aspect
  [data-theme="dark"]
    --text-color: var(--color-cream)
    --border-color: var(--color-cream)

  .label
    color: var(--text-color)

    &[data-underlined="true"], &[data-highlighted="true"]
      &:after
        background: var(--border-color)

    &[data-highlighted="true"]
      &:after
        --border-color: var(--color-titanium-white)
        mix-blend-mode: darken
</style>
