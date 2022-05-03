<script lang="ts">
  export default {
    name: 'TwoColumns',
    props: {
      title: String,
      theme: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<template>
  <div class="col-2" :data-theme="theme">
    <template v-if="title != undefined">
      <h3>{{ title }}</h3>
    </template>
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
  // Structure
  .col-2
    display: flex
    flex-flow: column nowrap
    padding: 0 var(--layout-center)
    gap: var(--layout-title-gap) 0

    &__columns
      display: flex
      flex-flow: row nowrap
      gap: 0 var(--layout-column-gap)

    &__column
      display: flex
      flex-flow: column nowrap
      flex: 1
      gap: var(--layout-title-gap) 0

  // Aspect`
  [data-theme="dark"]
    --text-color: var(--color-cream)
</style>
