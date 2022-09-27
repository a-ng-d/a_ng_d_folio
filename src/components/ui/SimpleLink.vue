<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import Label from '@/components/ui/Label.vue'

  export default defineComponent({
    name: 'SimpleLink',
    components: {
      Label
    },
    props: {
      label: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true
      },
      alt: String,
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
    },
    data: function() {
      return {
        store
      }
    }
  })
</script>

<template>
  <RouterLink
    class="internal-link"
    :to="path"
    :alt="alt"
    @focus="store.isFocus = true"
    @blur="store.isFocus = false"
    :data-theme="theme"
  >
    <div class="internal-link__label">
      <Label
        :label="label"
        underlined
        :small="small ? true : false"
        :large="large ? true : false"
        :theme="theme"
      />
    </div>
  </RouterLink>
</template>

<style scoped lang="sass">
  // Structure
  .internal-link
    display: inline-flex
    transition: var(--simple-transition)
    align-items: baseline
    transform-origin: center center

  // Aspect
  .internal-link
    &[data-theme="DARK"]
      --icon-color: var(--color-cream)
      --border-active-color: var(--color-sandstone)

  // Events
  .internal-link
    &:hover
      --amplitude: var(--spacing-s-000)

      animation: excited var(--duration-running) var(--ease-peps)

      .label
        &:after
          --underline-color: var(--border-active-color)

          height: 75%
          left: calc(var(--border-size) * 2)

    &:focus
      transform: var(--focus-scale)
      padding: 0 var(--spacing-m-000)

    &:active
      transform: var(--active-scale)

    &:focus, &:active
      z-index: 2

      .label
        &:after
          --underline-color: var(--border-focus-color)

          height: 75%
          left: calc(var(--border-size) * 2)
</style>
