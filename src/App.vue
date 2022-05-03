<script lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Filter from '@/components/graphics/Filter.vue'
  import Logotype from '@/components/graphics/Logotype.vue'
  import Landscape from '@/components/graphics/Landscape.vue'

  export default {
    name: 'App',
    components: {
      Filter,
      Logotype,
      Landscape
    },
    watch: {
      '$route' (to, from) {
        document.title = to.meta.title
        this.background = to.meta.background
      }
    },
    data() {
      return {
        background: ''
      }
    }
  }
</script>

<template>
  <Filter />
  <Logotype />
  <RouterView />
  <Landscape :background="background" />
</template>

<style lang="sass">
  @use '@/assets/tokens.sass'
  @use '@/assets/base.sass'
  @use '@/assets/animations.sass'

  // Structure
  .page
    display: grid
    grid-template-columns: var(--layout-margin) repeat(9, 1fr) var(--layout-margin)
    grid-template-rows: var(--spacing-xxl-600) 1fr var(--spacing-xl-200)
    column-gap: var(--layout-column-gap)
    grid-template-areas: "header header header header header header header header header header header" "main main main main main main main main main main main" "footer footer footer footer footer footer footer footer footer footer footer"
    height: 100vh
    z-index: 1
</style>
