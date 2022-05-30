<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import About from '@/contexts/About.vue'
  import Networks from '@/contexts/Networks.vue'
  import Career from '@/contexts/Career.vue'
  import Stories from '@/contexts/Stories.vue'
  import Talks from '@/contexts/Talks.vue'
  import Workshops from '@/contexts/Workshops.vue'

  export default {
    name: 'Id',
    components: {
      Footer,
      Button,
      ScrollingText,
      About,
      Networks,
      Career,
      Stories,
      Talks,
      Workshops
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
    <Transition name="slide-up" appear style="--delay: calc(var(--duration-turtoise) + 0ms) ; --starting-point: 128rem">
      <article class="article">
        <About :theme="theme" />
        <Networks :theme="theme" />
        <Career :theme="theme" />
        <Stories :theme="theme" />
        <Talks :theme="theme" />
        <Workshops :theme="theme" />
      </article>
    </Transition>
    <Footer
      alignment="center"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  // Structure
  .article
    grid-area: main

  .scrolling-text
    width: auto
    height: 100vh
    position: fixed
    top: 0
    left: 0
</style>
