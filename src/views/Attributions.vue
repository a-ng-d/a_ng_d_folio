<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import DevTools from '@/contexts/DevTools.vue'
  import UIAssets from '@/contexts/UIAssets.vue'

  export default {
    name: 'Attribution',
    components: {
      Footer,
      DevTools,
      UIAssets,
    },
    data() {
      return {
        theme: 'default'
      }
    }
  }
</script>

<template>
  <main class="page">
    <article class="article">
      <DevTools :theme="theme" />
      <UIAssets :theme="theme" />
    </article>
    <Footer
      alignment="center"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  .page
    height: fit-content

  // Structure
  .article
    grid-area: main
</style>
