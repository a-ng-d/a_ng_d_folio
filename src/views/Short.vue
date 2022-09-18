<script lang="ts">
  import { defineComponent } from 'vue'
  import Footer from '@/components/patterns/Footer.vue'
  import About from '@/contexts/_id/About.vue'
  import Networks from '@/contexts/_id/Networks.vue'
  import Career from '@/contexts/_id/Career.vue'
  import Stories from '@/contexts/_id/Stories.vue'
  import Talks from '@/contexts/_id/Talks.vue'
  import Workshops from '@/contexts/_id/Workshops.vue'

  export default defineComponent({
    name: 'Short',
    components: {
      Footer,
      About,
      Networks,
      Career,
      Stories,
      Talks,
      Workshops
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
    <Transition name="slide-up" appear style="--delay: var(--duration-turtoise)">
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
