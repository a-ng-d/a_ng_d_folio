<script lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Filter from '@/components/graphics/Filter.vue'
  import Logotype from '@/components/graphics/Logotype.vue'
  import MainMenu from '@/contexts/MainMenu.vue'
  import Glitchscape from '@/components/graphics/Glitchscape.vue'

  export default {
    name: 'App',
    components: {
      Filter,
      Logotype,
      MainMenu,
      Glitchscape
    },
    data() {
      return {
        filter: '',
        pov: '',
        quality: '',
        context: '',
        device: 'desktop',
        transition: 'scale-down',
        scroll: 0,
        pageHeight: NaN,
        isGlitched: false
      }
    },
    watch: {
      '$route' (to, from) {
        this.context = to.name
        document.title = to.meta.title
        this.filter = to.meta.filter
        this.pov = to.meta.pov
        this.quality = to.meta.quality

        if(from.name === 'home' && to.name === 'id')
          this.transition = 'go-left'

        if(from.name === 'id' && to.name === 'home')
          this.transition = 'go-right'

        if(from.name === 'home' && to.name === 'universes')
          this.transition = 'go-right'

        if(from.name === 'universes' && to.name === 'home')
          this.transition = 'go-left'

        if(from.name === 'universes' && to.name === 'work')
          this.transition = 'go-down'

        if(from.name === 'work' && to.name === 'universes')
          this.transition = 'go-up'
      }
    },
    methods: {
      getScrollParams(e) {
        this.pageHeight = e.target.scrollHeight
        this.scroll = e.target.scrollTop
      },
      onAfterLeave(e) {
        e.style.transitionDelay = '0'
      },
      glitch() {
        this.isGlitched = true
      },
      unglitch() {
        this.isGlitched = false
      }
    },
    mounted() {
      window.innerWidth < 461 ? this.device = 'mobile' : this.device
      window.onresize = () => window.innerWidth < 461 ? this.device = 'mobile' : this.device = 'desktop'
    }
  }
</script>

<template>
  <Filter />
  <Logotype />
  <Transition name="pull-down" style="--delay: var(--delay-very-late)" @after-leave="onAfterLeave" appear>
    <MainMenu
      :scroll="scroll"
      :context="context"
      :device="device"
    />
  </Transition>
  <RouterView @scroll.passive="getScrollParams" v-slot="{ Component, route }">
    <Transition :name="transition" @after-enter="unglitch" @before-leave="glitch">
      <Component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
  <Glitchscape :filter="filter" :pov="pov" :quality="quality" :isGlitched="isGlitched" :scroll="scroll" :pageHeight="pageHeight" />
</template>

<style lang="sass">
  @use '@/assets/tokens.sass'
  @use '@/assets/base.sass'
  @use '@/assets/animations.sass'
  @use '@/assets/base.sass' as device

  // Structure
  .page
    display: grid
    grid-template-columns: var(--layout-margin) repeat(var(--layout-columns), 1fr) var(--layout-margin)
    grid-template-rows: var(--header-height-size) 1fr min-content
    column-gap: var(--layout-column-gap)
    grid-template-areas: var(--layout-areas)
    width: 100vw
    height: 100vh
    z-index: 1
    overflow-x: hidden
    overflow-y: scroll

  @include device.tablet
    :root
      --font-size-ref: 0.85px
      --layout-margin: var(--spacing-xl-000)
      --layout-center: var(--spacing-xl-000)
      --layout-columns: 6
      --layout-areas: "header header header header header header header header" "main main main main main main main main" "footer footer footer footer footer footer footer footer"

  @include device.mobile-landscape
    :root
      --font-size-ref: 0.75px
      --font-size-relative: 8vw
      --header-height-size: var(--sizing-xl-700)

  @include device.mobile
    :root
      --font-size-ref: 0.75px
      --layout-margin: var(--spacing-l-000)
      --layout-center: var(--spacing-l-000)
      --layout-columns: 3
      --layout-areas: "header header header header header" "main main main main main" "footer footer footer footer footer"
</style>
