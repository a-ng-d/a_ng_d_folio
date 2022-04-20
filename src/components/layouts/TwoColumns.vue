<script lang="ts">
  export default {
    name: 'TwoColumns',
    props: {
      title: String,
      dark: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<template>
  <div class="col-2">
    <h3>{{ title }}</h3>
    <div class="col-2__columns">
      <div class="col-2__column">
        <slot name="left"></slot>
      </div>
      <div class="col-2__column">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  .col-2
    display: flex
    flex-flow: column nowrap
    padding: 0 var(--layout-center)
    gap: var(--spacing-l-300) 0

    &__columns
      display: flex
      flex-flow: row nowrap
      gap: 0 var(--spacing-m-200)

    &__column
      display: flex
      flex-flow: column nowrap
      flex: 1
      gap: var(--spacing-l-300) 0
</style>
