<script lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Filter from '@/components/graphics/Filter.vue'
  import Logotype from '@/components/graphics/Logotype.vue'
  import MainMenu from '@/contexts/MainMenu.vue'
  import Glitchscape from '@/components/graphics/Glitchscape.vue'
  import Particles from '@/components/graphics/Particles.vue'

  export default {
    name: 'App',
    components: {
      Filter,
      Logotype,
      MainMenu,
      Glitchscape,
      Particles
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
        isExpanded: false,
        isHardTransited: false,
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
        this.scrollProgress = 0
        this.activeProjectPosition = to.meta.view === 'WORK' ? this.activeProjectPosition :
                                     to.meta.view === 'PROJECT' ? to.meta.position :
                                     0

        const AB = {
          'HOME > CORE': () => {
            this.transition = 'go-left'
            this.isHardTransited = true
          },
          'CORE > HOME': () => {
            this.transition = 'go-right'
            this.isHardTransited = true
          },
          'HOME > LAB': () => {
            this.transition = 'go-right'
            this.isHardTransited = true
          },
          'LAB > HOME': () => {
            this.transition = 'go-left'
            this.isHardTransited = true
          },
          'HOME > WORK': () => {
            this.transition = 'go-down'
            this.isHardTransited = true
          },
          'WORK > HOME': () => {
            this.transition = 'go-up'
            this.isHardTransited = true
          },
          'WORK > PROJECT': () => this.transition = 'go-down',
          'PROJECT > WORK': () => this.transition = 'go-up',
          'PROJECT > PROJECT': () => {
            let diff = from.meta.position - to.meta.position
            diff == this.numberOfProjects - 1 ? diff = -1 : diff
            diff == -this.numberOfProjects + 1 ? diff = 1 : diff
            return diff < 0 ? this.transition = 'push-right' : this.transition = 'push-left'
          }
        }

        const A = {
          'UNIVERSES': () => {
            this.transition = 'go-down'
            this.isHardTransited = true
          }
        }

        const B = {
          'UNIVERSES': () => {
            this.transition = 'go-up'
            this.isHardTransited = true
          }
        }

        A[from.meta.view]?.()
        B[to.meta.view]?.()
        AB[`${from.meta.view} > ${to.meta.view}`]?.()
      }
    },
    methods: {
      getScrollParams(e) {
        this.pageHeight = e.target.scrollHeight
        this.scrollProgress = e.target.scrollTop
        this.viewHeight = document.body.clientHeight
      },
      resetDelay(e) {
        e.style.transitionDelay = '0'
      },
      expandParticles() {
        this.isExpanded = true
      },
      collapseParticles() {
        setTimeout(() => this.isExpanded = false, 200)
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
  <Particles
    :weight="160"
    :isExpanded="isExpanded"
    :movement="transition"
    :style="`position: absolute ; visibility: ${isHardTransited ? 'visible' : 'hidden'} ; z-index: 2`"
  />
  <Transition name="pull-down" style="--delay: var(--duration-turtoise)" @after-leave="resetDelay" appear>
    <MainMenu
      :scrollProgress="scrollProgress"
      :view="view"
      :device="device"
      :projects="getProjects($router.options.routes)"
      :activeProjectPosition="activeProjectPosition"
    />
  </Transition>
  <RouterView @scroll.passive="getScrollParams" v-slot="{ Component, route }">
    <Transition
      :name="transition"
      :mode="isHardTransited ? 'out-in' : 'default'"
      @leave="expandParticles"
      @enter="collapseParticles"
      @after-enter="isHardTransited = false"
    >
      <Component
        :is="Component"
        :key="route.path"
        :view="view"
        :projects="getProjects($router.options.routes)"
        :project="route.meta"
        :activeProjectPosition="activeProjectPosition"
        :scrollProgress="scrollProgress"
        :scrollLimit="pageHeight - viewHeight"
        :theme="view === 'PROJECT' ? 'DEFAULT' : route.meta.theme"
        @activeProjectPosition="activeProjectPosition = $event"
        @pov="pov = $event"
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
    :numberOfProjects="numberOfProjects"
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
