<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Filter from '@/components/graphics/Filter.vue'
  import Logotype from '@/components/graphics/Logotype.vue'
</script>

<template>
  <Filter />
  <Logotype />
  <RouterView />
</template>

<style lang="sass">
  @use '@/assets/tokens.sass'
  @use '@/assets/text-styles.sass' as text
  @use '@/assets/base.sass'

  #app
    display: grid
    grid-template-columns: var(--layout-margin) repeat(9, 1fr) var(--layout-margin)
    grid-template-rows: var(--spacing-xxl-600) 1fr var(--spacing-xl-200)
    column-gap: var(--layout-gap)
    grid-template-areas: "header header header header header header header header header header header" "main main main main main main main main main main main" "footer footer footer footer footer footer footer footer footer footer footer"
    height: 100vh
    background-color: var(--color-soil)

</style>
