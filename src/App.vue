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
        view: '',
        device: 'desktop',
        transition: 'scale-down',
        scroll: 0,
        pageHeight: NaN,
        isGlitched: false,
        activeProject: 0
      }
    },
    watch: {
      '$route' (to, from) {
        this.view = to.meta.view
        document.title = to.meta.title
        this.filter = to.meta.filter
        this.pov = to.meta.pov
        this.quality = to.meta.quality
        this.activeProject = to.meta.view === 'work' ? this.activeProject : to.meta.position

        if(from.meta.view === 'home' && to.meta.view === 'id')
          this.transition = 'go-left'

        if(from.meta.view === 'id' && to.meta.view === 'home')
          this.transition = 'go-right'

        if(from.meta.view === 'home' && to.meta.view === 'universes')
          this.transition = 'go-right'

        if(from.meta.view === 'universes' && to.meta.view === 'home')
          this.transition = 'go-left'

        if(from.meta.view === 'universes' && to.meta.view === 'work')
          this.transition = 'go-down'

        if(from.meta.view === 'work' && to.meta.view === 'universes')
          this.transition = 'go-up'
      },
      activeProject(to, from) {
        console.log(to, from)
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
      getProjects(src) {
        let projects = src
        return projects.filter(project => project.meta.view === 'project')
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
  <Transition name="pull-down" style="--delay: var(--delay-jogging)" @after-leave="onAfterLeave" appear>
    <MainMenu
      :scroll="scroll"
      :view="view"
      :device="device"
      :projects="getProjects($router.options.routes)"
      :activeProject="activeProject"
    />
  </Transition>
  <RouterView @scroll.passive="getScrollParams" v-slot="{ Component, route }">
    <Transition :name="transition" @after-enter="" @before-leave="">
      <Component
        :is="Component"
        :key="route.path"
        :view="view"
        :projects="getProjects($router.options.routes)"
        :activeProject="activeProject"
        :project="route.meta"
        :theme="route.meta.theme"
        @activeProject="activeProject = $event"
      />
    </Transition>
  </RouterView>
  <Glitchscape
    :filter="filter"
    :pov="pov"
    :quality="quality"
    :isGlitched="isGlitched"
    :scroll="scroll"
    :pageHeight="pageHeight"
  />
</template>

<style lang="sass">
  @use '@/assets/stylesheets/tokens.sass'
  @use '@/assets/stylesheets/base.sass'
  @use '@/assets/stylesheets/animations.sass'
  @use '@/assets/stylesheets/base.sass' as device

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
