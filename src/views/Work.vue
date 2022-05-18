<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import {  } from 'lucide-vue-next'

  export default {
    name: 'Work',
    components: {
      Footer,
      Button
    },
    data() {
      return {
        theme: 'dark'
      }
    },
    methods: {

    }
  }
</script>

<template>
  <main class="page">
    <section class="works">

    </section>
    <Footer
      alignment="left"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  .works
    grid-area: main
</style>
