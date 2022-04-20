<script lang="ts">
  export default {
    name: 'OneColumn',
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
  <div class="col-1">
    <h3>{{ title }}</h3>
    <div class="col-1__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped lang="sass">
  .col-1
    display: flex
    flex-flow: column nowrap
    padding: 0 var(--layout-center)
    gap: var(--layout-title-gap) 0

    &__content
      display: flex
      flex-flow: column nowrap
      gap: var(--layout-column-gap) 0
</style>
