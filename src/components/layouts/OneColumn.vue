<script lang="ts">
  export default {
    name: 'OneColumn',
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
  <div class="col-1" :data-theme="theme">
    <template v-if="title != undefined">
      <h3>{{ title }}</h3>
    </template>
    <div class="col-1__content">
      <slot name="plain"></slot>
    </div>
  </div>
</template>

<style scoped lang="sass">
  // Structure
  .col-1
    display: flex
    flex-flow: column nowrap
    padding: 0 var(--layout-center)
    gap: var(--layout-title-gap) 0

    &__content
      display: flex
      flex-flow: column nowrap
      gap: var(--layout-box-gap) 0

    // Aspect
    [data-theme="dark"]
      --text-color: var(--color-cream)
</style>
