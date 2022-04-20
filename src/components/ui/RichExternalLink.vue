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
      dark: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<template>
  <a class="rich-external-link" :href="href" target="_blank" :alt="alt">
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

    &__icon
      display: flex
      flex: 0 0 var(--rich-external-link-size)
      width: var(--rich-external-link-size)
      height: var(--rich-external-link-size)
      justify-content: center
      align-items: center
      border-radius: calc(var(--rich-external-link-size) / 2)
      border: 8rem solid var(--color-soil)

    &__content
      display: flex
      flex-flow: column nowrap
      gap: var(--layout-paragraph-gap) 0

      p
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden
</style>
