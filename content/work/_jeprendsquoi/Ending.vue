<script lang="ts">
  import { defineComponent } from 'vue'
  import { withScroll } from '@/composables/scroll'

  export default defineComponent({
    name: 'JeprendsquoiEnding',
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
    background: url(/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-1.png) 35% v-bind('parallax(200, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-3.png) 65% v-bind('parallax(300, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-logotype.svg) 50% v-bind('parallax(200, 20)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-broccoli.png) 100% v-bind('parallax(100, -5)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-eggplant.png) 70% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pumpkin.png) 35% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-leek.png) 15% v-bind('parallax(200, 30)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-tomato.png) -5% v-bind('parallax(100, 50)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pear.png) 10% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-cherry.png) 95% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-lemon.png) 85% v-bind('parallax(200, 50)') no-repeat
    background-color: var(--color-titanium-white) !important

  @include device.tablet
    section.ending
      background: url(/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-1.png) 25% v-bind('parallax(200, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-3.png) 75% v-bind('parallax(300, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-logotype.svg) 50% v-bind('parallax(200, 20)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-broccoli.png) 100% v-bind('parallax(100, -5)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-eggplant.png) 70% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pumpkin.png) 35% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-leek.png) 15% v-bind('parallax(200, 30)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-tomato.png) -5% v-bind('parallax(100, 50)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pear.png) 10% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-cherry.png) 95% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-lemon.png) 85% v-bind('parallax(200, 50)') no-repeat
      background-color: var(--color-titanium-white) !important

  @include device.smartphone
    section.ending
      background: url(/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-1.png) -155% v-bind('parallax(200, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-3.png) 300% v-bind('parallax(300, 100)') no-repeat
</style>
