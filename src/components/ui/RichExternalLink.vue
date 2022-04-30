<script lang="ts">
  export default {
    name: 'RichExternalLink',
    props: {
      title: String,
      description: String,
      color: {
        type: String,
        default: 'var(color-soil)'
      },
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
  <a class="rich-external-link" :href="href" target="_blank" :alt="alt" :data-theme="theme">
    <div class="rich-external-link__icon" :style="`background-color: ${color}`">
      <slot name="icon"></slot>
    </div>
    <div class="rich-external-link__content">
      <h5>{{ title }}</h5>
      <p>{{ description }}</p>
    </div>
  </a>
</template>

<style scoped lang="sass">
  // Structure
  .rich-external-link
    display: flex
    flex-flow: row nowrap
    gap: 0 var(--layout-column-gap)
    padding: var(--spacing-l-000)
    border: var(--border-size) solid transparent
    border-radius: var(--regular-border-radius)
    transition: var(--simple-transition)
    transform-origin: center center
    box-shadow: 0 0 0 var(--button-border-size) var(--outline-color)

    &__icon
      display: flex
      flex: 0 0 var(--rich-external-link-size)
      width: var(--rich-external-link-size)
      height: var(--rich-external-link-size)
      justify-content: center
      align-items: center
      border-radius: calc(var(--rich-external-link-size) / 2)
      border: var(--border-large-size) solid var(--border-color)

    &__content
      display: flex
      flex-flow: column nowrap

      p
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden

  // Aspect
  [data-theme="dark"]
    --icon-color: var(--color-soil)
    --text-color: var(--color-cream)
    --outline-color: var(--color-cream)

  .rich-external-link
    --container-color: transparent
    --outline-color: transparent

    color: var(--text-color)
    background: var(--container-color)

    &:deep(svg)
      stroke: var(--icon-color)

  // Events
  .rich-external-link
    &:hover
      --amplitude: var(--spacing-s-000)
      --container-color: inherit
      --outline-color: var(--color-soil)

      animation: excited var(--duration-running) var(--ease-peps)

    &:focus
      --container-color: inherit
      --outline-color: var(--border-focus-color)

      transform: var(--focus-scale)
      z-index: 2

  .rich-external-link[data-theme="dark"]
    &:hover, &:focus
      --text-color: var(--color-soil)
      --border-color: var(--color-soil)

</style>
