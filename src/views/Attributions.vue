<script lang="ts">
  import MainMenu from '@/components/patterns/MainMenu.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import DevTools from '@/contexts/DevTools.vue'
  import UIAssets from '@/contexts/UIAssets.vue'
  import { ArrowLeft } from 'lucide-vue-next'

  export default {
    name: 'Attribution',
    components: {
      MainMenu,
      Footer,
      Button,
      DevTools,
      UIAssets,
      ArrowLeft
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
