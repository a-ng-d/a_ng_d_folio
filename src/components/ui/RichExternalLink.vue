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
    gap: 0 var(--layout-gap)

    &__icon
      display: flex
      flex: 0 0 var(--sizing-xxl-000)
      width: var(--sizing-xxl-000)
      height: var(--sizing-xxl-000)
      justify-content: center
      align-items: center
      border-radius: calc(var(--sizing-xxl-000) / 2)
      border: 8rem solid var(--color-soil)

    &__content
      display: flex
      flex-flow: column nowrap
      gap: var(--spacing-m-000) 0

</style>
