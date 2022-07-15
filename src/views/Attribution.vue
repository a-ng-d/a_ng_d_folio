<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import DevTools from '@/contexts/_attribution/DevTools.vue'
  import UIAssets from '@/contexts/_attribution/UIAssets.vue'

  export default {
    name: 'Attribution',
    components: {
      Footer,
      DevTools,
      UIAssets,
    },
    props: {
      theme: {
        type: String,
        default: 'default'
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
