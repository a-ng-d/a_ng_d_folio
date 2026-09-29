<script lang="ts">
  import { defineComponent } from 'vue'
  import { withScroll } from '@/composables/scroll'

  export default defineComponent({
    name: 'AwesomeIpsumsEnding',
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
    background: url(/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/images/_work/_awesome_ipsums/ending-asset-2.svg) 55% v-bind('parallax(100, 55)') no-repeat, url(/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(0, 50)') no-repeat
    background-color: #23A566 !important

  @include device.tablet
    section.ending
      background: url(/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/images/_work/_awesome_ipsums/ending-asset-2.svg) 60% v-bind('parallax(100, 55)') no-repeat, url(/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(0, 50)') no-repeat

  @include device.smartphone-landscape
    section.ending
      background: url(/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/images/_work/_awesome_ipsums/ending-asset-2.svg) 65% v-bind('parallax(100, 80)') no-repeat, url(/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(0, 50)') no-repeat

  @include device.smartphone
    section.ending
      background: url(/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/images/_work/_awesome_ipsums/ending-asset-2.svg) 80% v-bind('parallax(100, 55)') no-repeat, url(/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(0, 50)') no-repeat
</style>
