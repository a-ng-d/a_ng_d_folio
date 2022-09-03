<script lang="ts">
  import { defineComponent } from 'vue'
  import Footer from '@/components/patterns/Footer.vue'
  import DevTools from '@/contexts/_attribution/DevTools.vue'
  import UIAssets from '@/contexts/_attribution/UIAssets.vue'

  export default defineComponent({
    name: 'Attribution',
    components: {
      Footer,
      DevTools,
      UIAssets,
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  })
</script>

<template>
  <main class="page">
    <Transition name="slide-up" appear style="--delay: calc(var(--duration-turtoise) + 0ms) ; --gap: 128rem">
      <article class="article">
        <DevTools :theme="theme" />
        <UIAssets :theme="theme" />
      </article>
    </Transition>
    <Footer
      alignment="CENTER"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  // Structure
  .article
    grid-area: main
</style>
