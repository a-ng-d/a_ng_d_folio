<script lang="ts">
  import { defineComponent } from 'vue'
  import Footer from '@/components/patterns/Footer.vue'
  import { pageBody } from '@/content/pages'

  export default defineComponent({
    name: 'Short',
    components: {
      Footer,
    },
    computed: {
      // Le contenu vient de content/pages/short/index.en.md.
      body() {
        return pageBody('short')
      },
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
        <Component v-if="body !== undefined" :is="body" />
      </article>
    </Transition>
    <Footer alignment="LEFT" :theme="theme" />
  </main>
</template>

<style scoped lang="sass">
  // Structure
  .article
    grid-area: main
</style>
