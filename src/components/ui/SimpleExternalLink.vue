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
      href: {
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
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .external-link
    --icon-size: v-bind("small ? 'calc(var(--icon-size-regular) * .5)' : large ? 'calc(var(--icon-size-regular) * 2)' : 'var(--icon-size-regular)'")

    display: inline-flex
    gap: v-bind("small ? 'calc(var(--rich-external-link-gap) * .5)' : large ? 'calc(var(--rich-external-link-gap) * 2)' : 'var(--rich-external-link-gap)'")
    transition: var(--simple-transition)
    align-items: baseline
    transform-origin: center center

    &__icon svg
        width: var(--icon-size)
        height: var(--icon-size)

  // Aspect
  .external-link
    &[data-theme="DARK"]
      --icon-color: var(--color-cream)
      --border-active-color: var(--color-sandstone)

    &__icon svg
      stroke: var(--icon-color)

  // Events
  .external-link
    &:hover
      --amplitude: var(--spacing-s-000)

      animation: excited var(--duration-running) var(--ease-peps)

      .label
        &:after
          --underline-color: var(--border-active-color)
          --interaction-line-height: 75%
          --interaction-line-shift: calc(var(--border-size) * v-bind("small ? 1 : large ? 3 : 2"))

          height: var(--interaction-line-height)
          left: var(--interaction-line-shift)

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
          --interaction-line-height: 75%
          --interaction-line-shift: calc(var(--border-size) * v-bind("small ? 1 : large ? 3 : 2"))

          height: var(--interaction-line-height)
          left: var(--interaction-line-shift)

  @include device.mobile
    .external-link
      --underline-color: var(--text-color)

      &:hover
        --amplitude: 0

        .label
          &:after
            --underline-color: var(--text-color)
            --interaction-line-height: var(--line-width)
            --interaction-line-shift: 0

      &:focus, &:active
        .label
          &:after
            --interaction-line-height: var(--line-width)
            --interaction-line-shift: 0
</style>
