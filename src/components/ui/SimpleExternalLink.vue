<script lang="ts">
  import { ExternalLink } from 'lucide-vue-next'
  import Label from '@/components/ui/Label.vue'

  export default {
    name: 'SimpleExternalLink',
    components: {
      ExternalLink,
      Label
    },
    props: {
      label: String,
      href: String,
      alt: String,
      theme: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<template>
  <a class="external-link" :href="href" target="_blank" :alt="alt" :data-theme="theme">
    <div class="external-link__icon">
      <ExternalLink
        :size="24"
      />
    </div>
    <div class="external-link__label">
      <Label
        :label="label"
        underlined
        :theme="theme"
      />
    </div>
  </a>
</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  // Structure
  .external-link
    display: flex
    flex-flow: row nowrap
    gap: 0 var(--rich-external-link-gap)
    transition: var(--simple-transition)
    transform-origin: center center

    &__icon
      padding: var(--spacing-s-000) 0 0

  // Aspect
  [data-theme="dark"]
    --icon-color: var(--color-cream)
    --border-active-color: var(--color-clay)

  .external-link
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
      z-index: 2

      .label
        &:after
          --border-color: var(--border-focus-color)

          height: 50%
          left: calc(var(--border-size) * 4)
</style>
