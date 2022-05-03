<script lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Filter from '@/components/graphics/Filter.vue'
  import Logotype from '@/components/graphics/Logotype.vue'
  import Glitchscape from '@/components/graphics/Glitchscape.vue'

  export default {
    name: 'App',
    components: {
      Filter,
      Logotype,
      Glitchscape
    },
    watch: {
      '$route' (to, from) {
        document.title = to.meta.title
        this.background = to.meta.background
        this.position = to.meta.position
      }
    },
    data() {
      return {
        background: '',
        position: ''
      }
    }
  }
</script>

<template>
  <Filter />
  <Logotype />
  <RouterView />
  <Glitchscape :veil="background" :pov="position" />
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
