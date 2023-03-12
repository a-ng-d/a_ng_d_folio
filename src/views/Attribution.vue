<script lang="ts">
  import { defineComponent } from 'vue'
  import Footer from '@/components/patterns/Footer.vue'
  import DevTools from '@/contexts/_attribution/DevTools.vue'
  import Hosting from '@/contexts/_attribution/Hosting.vue'
  import UIAssets from '@/contexts/_attribution/UIAssets.vue'
  import SoundsMusics from '@/contexts/_attribution/SoundsMusics.vue'

  export default defineComponent({
    name: 'Attribution',
    components: {
      Footer,
      DevTools,
      Hosting,
      UIAssets,
      SoundsMusics,
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
  })
</script>

<template>
  <main class="page">
    <Transition
      name="slide-up"
      appear
      style="--delay: var(--duration-turtoise)"
    >
      <article class="article">
        <DevTools :theme="theme" />
        <Hosting :theme="theme" />
        <UIAssets :theme="theme" />
        <SoundsMusics :theme="theme" />
      </article>
    </Transition>
    <Footer alignment="CENTER" :theme="theme" />
  </main>
</template>

<style scoped lang="sass">
  // Structure
  .article
    grid-area: main
</style>
