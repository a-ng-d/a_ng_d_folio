<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import { ExternalLink } from 'lucide-vue-next'
  import Label from '@/components/ui/Label.vue'

  export default defineComponent({
    name: 'SimpleExternalLink',
    components: {
      ExternalLink,
      Label
    },
    props: {
      label: {
        type: String,
        required: true
      },
      href: String,
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
  <a
    class="external-link"
    :href="href"
    target="_blank"
    :alt="alt"
    @focus="store.isFocus = true"
    @blur="store.isFocus = false"
    :data-theme="theme"
  >
    <div class="external-link__icon">
      <ExternalLink
        :size="small ? 16 : large ? 32 : 24"
      />
    </div>
    <div class="external-link__label">
      <Label
        :label="label"
        underlined
        :small="small ? true : false"
        :large="large ? true : false"
        :theme="theme"
      />
    </div>
  </a>
</template>

<style scoped lang="sass">
  // Structure
  .external-link
    display: inline-flex
    gap: v-bind("small ? 'calc(var(--rich-external-link-gap) * .75)' : large ? 'calc(var(--rich-external-link-gap) * 1.5)' : 'var(--rich-external-link-gap)'")
    transition: var(--simple-transition)
    align-items: baseline
    transform-origin: center center

  // Aspect
  .external-link
    &[data-theme="DARK"]
      --icon-color: var(--color-cream)
      --border-active-color: var(--color-clay)

    &__icon svg
      stroke: var(--icon-color)

  // Events
  .external-link
    &:hover
      --amplitude: var(--spacing-s-000)

      animation: excited var(--duration-running) var(--ease-peps)

      .label
        &:after
          --border-color: var(--border-active-color)

          height: 50%
          left: calc(var(--border-size) * 4)

    &:focus
      transform: var(--focus-scale)
      padding: 0 var(--spacing-m-000)

    &:active
      transform: var(--active-scale)

    &:focus, &:active
      z-index: 2

      .label
        &:after
          --border-color: var(--border-focus-color)

          height: 50%
          left: calc(var(--border-size) * 4)
</style>
