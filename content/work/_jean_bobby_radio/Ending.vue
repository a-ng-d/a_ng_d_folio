<script lang="ts">
  import { defineComponent } from 'vue'
  import { withScroll } from '@/composables/scroll'

  export default defineComponent({
    name: 'JeanBobbyRadioEnding',
    mixins: [withScroll],
  })
</script>

<template>
  <section class="ending"></section>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  section.ending
    height: 100vh
    background: url(/images/_work/_jean_bobby_radio/ending-asset-2.svg) 50% v-bind('parallax(0, 50)') no-repeat, url(/images/_work/_jean_bobby_radio/ending-asset-1.webp) 50% v-bind('parallax(-50, 50)') no-repeat
    background-color: #190038 !important
    background-size: auto, cover
</style>
