<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
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
    <article class="article">
      <About :theme="theme" />
      <Networks :theme="theme" />
      <Career :theme="theme" />
      <Stories :theme="theme" />
      <Talks :theme="theme" />
      <Workshops :theme="theme" />
    </article>
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
</style>
