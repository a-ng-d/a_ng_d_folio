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
        device: 'DESKTOP',
        transition: 'scale-down',
        scrollProgress: 0,
        pageHeight: NaN,
        viewHeight: NaN,
        isGlitched: false,
        activeProjectPosition: 0,
        numberOfProjects: NaN
      }
    },
    watch: {
      '$route' (to, from) {
        this.view = to.meta.view
        document.title = to.meta.title
        this.filter = to.meta.filter
        this.pov = to.meta.pov
        this.quality = to.meta.quality
        this.activeProjectPosition = to.meta.view === 'WORK' ? this.activeProjectPosition :
                                     to.meta.view === 'PROJECT' ? to.meta.position :
                                     0

        if (from.meta.view === 'HOME' && to.meta.view === 'CORE')
          this.transition = 'go-left'
        else if (from.meta.view === 'CORE' && to.meta.view === 'HOME')
          this.transition = 'go-right'

        if (from.meta.view === 'HOME' && to.meta.view === 'LAB')
          this.transition = 'go-right'
        else if (from.meta.view === 'LAB' && to.meta.view === 'HOME')
          this.transition = 'go-left'

        if (from.meta.view === 'HOME' && to.meta.view === 'WORK')
          this.transition = 'go-down'
        else if (from.meta.view === 'WORK' && to.meta.view === 'HOME')
          this.transition = 'go-up'

        if (from.meta.view === 'WORK' && to.meta.view === 'PROJECT')
          this.transition = 'go-down'
        else if (from.meta.view === 'PROJECT' && to.meta.view === 'WORK')
          this.transition = 'go-up'

        if (from.meta.position - to.meta.position == -1 || from.meta.position - to.meta.position == this.numberOfProjects - 1)
          this.transition = 'go-right'
        else if (from.meta.position - to.meta.position == 1 || from.meta.position - to.meta.position == -this.numberOfProjects + 1)
          this.transition = 'go-left'

        if (to.meta.view === 'UNIVERSES')
          this.transition = 'go-up'
        else if (from.meta.view === 'UNIVERSES')
          this.transition = 'go-down'

        if (from.meta.view === 'UNIVERSES' && to.meta.view === 'HOME')
          this.transition = 'go-left'
      }
    },
    methods: {
      getScrollParams(e) {
        this.pageHeight = e.target.scrollHeight
        this.scrollProgress = e.target.scrollTop
        this.viewHeight = document.body.clientHeight
      },
      onAfterLeave(e) {
        e.style.transitionDelay = '0'
      },
      getProjects(src) {
        let projects = src.map(a => a)
        projects = projects.filter(project => project.meta.view === 'PROJECT').sort((a, b) => a.meta.position - b.meta.position)
        this.numberOfProjects = projects.length
        return projects
      }
    },
    mounted() {
      window.innerWidth < 461 ? this.device = 'MOBILE' : this.device
      window.onresize = () => window.innerWidth < 461 ? this.device = 'MOBILE' : this.device = 'DESKTOP'
    }
  }
</script>

<template>
  <Filter />
  <Logotype />
  <Transition name="pull-down" style="--delay: var(--delay-jogging)" @after-leave="onAfterLeave" appear>
    <MainMenu
      :scrollProgress="scrollProgress"
      :view="view"
      :device="device"
      :projects="getProjects($router.options.routes)"
      :activeProjectPosition="activeProjectPosition"
    />
  </Transition>
  <RouterView @scroll.passive="getScrollParams" v-slot="{ Component, route }">
    <Transition :name="transition" @after-enter="" @before-leave="">
      <Component
        :is="Component"
        :key="route.path"
        :view="view"
        :projects="getProjects($router.options.routes)"
        :activeProjectPosition="activeProjectPosition"
        :project="route.meta"
        :scrollProgress="scrollProgress"
        :scrollLimit="pageHeight - viewHeight"
        :theme="view === 'PROJECT' ? 'DEFAULT' : route.meta.theme"
        @activeProjectPosition="activeProjectPosition = $event"
      />
    </Transition>
  </RouterView>
  <Glitchscape
    :filter="filter"
    :pov="pov"
    :quality="quality"
    :isGlitched="isGlitched"
    :scrollProgress="scrollProgress"
    :scrollLimit="pageHeight - viewHeight"
    :view="view"
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
