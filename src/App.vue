<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import type { Route } from '@/utilities/types'
  import Logotype from '@/components/graphics/Logotype.vue'
  import MainMenu from '@/contexts/MainMenu.vue'
  import Glitchscape from '@/components/graphics/Glitchscape.vue'
  import Particles from '@/components/graphics/Particles.vue'
  import Audio from '@/components/ui/Audio.vue'

  let timeout: number

  export default defineComponent({
    name: 'App',
    components: {
      Logotype,
      MainMenu,
      Glitchscape,
      Particles,
      Audio
    },
    data: function() {
      return {
        store,
        filter: {},
        pov: '' as string,
        quality: '' as string,
        view: '' as string,
        transition: 'scale-down' as string,
        scrollProgress: 0 as number,
        pageHeight: 0 as number,
        viewHeight: 0 as number,
        isGlitched: false as boolean,
        isExpanded: false as boolean,
        isHardTransited: false as boolean,
        projects: this.getProjects(this.$router.options.routes) as Array<Route>,
        activeProjectPosition: 0 as number,
        numberOfProjects: this.getProjects(this.$router.options.routes).length as number,
        isQuickMenu: false as boolean,
        previousPath: '' as string,
        theme: 'DEFAULT' as string
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

        this.theme = this.view === 'PROJECT' ? 'DEFAULT' :
                     this.view === 'WORK' ? this.projects[this.activeProjectPosition].meta.theme :
                     to.meta.theme

        const AB: { [key: string]: () => void } = {
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
          },
          'PROJECT > HOME': () => {
            this.transition = 'go-up'
            this.isHardTransited = true
          },
          'HOME > SHORT': () => {
            this.transition = 'go-right'
            this.isHardTransited = true
          },
          'SHORT > HOME': () => {
            this.transition = 'go-left'
            this.isHardTransited = true
          },
          'HOME > CONTACT': () => {
            this.transition = 'go-left'
            this.isHardTransited = true
          },
          'CONTACT > HOME': () => {
            this.transition = 'go-right'
            this.isHardTransited = true
          }
        }

        const A: { [key: string]: () => void } = {
          'UNIVERSE': () => {
            this.transition = 'go-down'
            this.isHardTransited = this.isSameContext(to.path)
          },
          'ATTRIBUTION': () => {
            this.transition = 'go-up'
            this.isHardTransited = this.isSameContext(to.path)
          },
          'UNKNOWN': () => {
            this.transition = 'go-up'
            this.isHardTransited = this.isSameContext(to.path)
          }
        }

        const B: { [key: string]: () => void } = {
          'UNIVERSE': () => {
            this.transition = 'go-up'
            this.isQuickMenu = true
            this.isHardTransited = false
            this.previousPath = from.path
          },
          'ATTRIBUTION': () => {
            this.transition = 'go-down'
            this.isHardTransited = this.isSameContext(to.path)
          },
          'UNKNOWN': () => {
            this.transition = 'go-down'
            this.isHardTransited = this.isSameContext(to.path)
          }
        }

        A[from.meta.view]?.()

        if (from.name != undefined)
          B[to.meta.view]?.()

        AB[`${from.meta.view} > ${to.meta.view}`]?.()
      }
    },
    methods: {
      getScrollParams(e: Event) {
        if (timeout)
          window.cancelAnimationFrame(timeout)

        timeout = window.requestAnimationFrame(() => {
          this.pageHeight = (e.target as HTMLElement).scrollHeight
          this.scrollProgress = (e.target as HTMLElement).scrollTop
          this.viewHeight = document.body.clientHeight
        })
      },
      resetDelay(e: HTMLElement) {
        e.style.transitionDelay = '0'
      },
      expandParticles() {
        this.isExpanded = true
      },
      collapseParticles() {
        this.isExpanded = false
      },
      getProjects(src: Array<Route>) {
        let projects: Array<Route> = src.map((a: Route) => a)
        projects = projects.filter((project: Route) => project.meta.view === 'PROJECT').sort((a: Route, b: Route) => a.meta.position - b.meta.position)
        return projects
      },
      getScreenContext() {
        window.innerWidth < 1280 ? this.store.device = 'MOBILE' : this.store.device = 'DESKTOP'
        this.store.device === 'MOBILE' ? this.store.isSoundOn = false : this.store.isSoundOn = true
      },
      isSameContext(to: string) {
        if(this.previousPath === to) return false
        else return true
      },
    },
    created: function() {
      window.addEventListener("resize",  this.getScreenContext)
      this.getScreenContext()
    }
  })
</script>

<template>
  <!--Transition-->
  <Particles
    :weight="176"
    :isExpanded="isExpanded"
    :movement="transition"
  />

  <!--Menu-->
  <Transition name="pull-down" style="--delay: var(--duration-turtoise)" @after-leave="resetDelay" appear>
    <MainMenu
      :scrollProgress="scrollProgress"
      :view="view"
      :projects="projects"
      :activeProjectPosition="activeProjectPosition"
      :goback="isQuickMenu"
      :previousPath="previousPath"
      :theme="theme"
    />
  </Transition>

  <!--View-->
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
        :projects="projects"
        :project="route.meta"
        :activeProjectPosition="activeProjectPosition"
        :scrollProgress="scrollProgress"
        :scrollLimit="pageHeight - viewHeight"
        :filter="filter"
        :theme="theme"
        @activeProjectPosition="activeProjectPosition = $event"
        @activeProjectBackground="filter = $event"
        @activeProjectPov="pov = $event"
        @pov="pov = $event"
        @quality="quality = $event"
        @glitch="isGlitched = $event"
        @filter="filter = $event"
        @theme="theme = $event"
      />
    </Transition>
  </RouterView>

  <!--Background-->
  <Glitchscape
    :filter="filter"
    :pov="pov"
    :quality="quality"
    :isGlitched="isGlitched"
    :scrollProgress="view != 'PROJECT' ? scrollProgress : 0"
    :scrollLimit="pageHeight - viewHeight"
    :numberOfProjects="numberOfProjects"
    :view="view"
  />

  <!--Audio-->
  <Audio
    src="/sounds/ambient.mp3"
    autoplay
    loop
    :muted="!store.isSoundOn"
    :volume=".15"
  />
  <Audio
    src="/sounds/entrance.mp3"
    autoplay
    :muted="!store.isSoundOn"
    :volume=".2"
  />
  <Audio
    src="/sounds/transition-in.mp3"
    :muted="!store.isSoundOn"
    :play="isExpanded"
    :volume=".4"
  />
  <Audio
    src="/sounds/transition-out.mp3"
    :muted="!store.isSoundOn"
    :play="!isExpanded"
    :volume=".4"
  />
  <Audio
    src="/sounds/interaction-over.mp3"
    :muted="!store.isSoundOn"
    :play="store.isOver"
    :volume=".4"
  />
  <Audio
    src="/sounds/interaction-focus.mp3"
    :muted="!store.isSoundOn"
    :play="store.isFocus"
    :volume=".3"
  />
</template>

<style lang="sass">
  @use '@/assets/stylesheets/tokens'
  @use '@/assets/stylesheets/base'
  @use '@/assets/stylesheets/animations'
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .page
    display: grid
    grid-template-columns: var(--layout-margin) repeat(var(--layout-columns), 1fr) var(--layout-margin)
    grid-template-rows: var(--header-height-size) 1fr min-content
    column-gap: var(--layout-column-gap)
    grid-template-areas: var(--layout-areas)
    width: 100%
    height: 100%
    z-index: 2
    overflow-x: hidden
    overflow-y: scroll

  @include device.tablet
    :root
      --font-size-ref: 0.875px
      --layout-margin: var(--spacing-xl-000)
      --layout-center: var(--spacing-xl-000)
      --logotype-size: var(--sizing-xl-500)
      --layout-columns: 6
      --layout-areas: "header header header header header header header header" "main main main main main main main main" "footer footer footer footer footer footer footer footer"

  @include device.smartphone-landscape
    :root
      --font-size-ref: 0.5px
      --font-size-relative: 8vw
      --header-height-size: var(--sizing-xl-700)
      --logotype-size: var(--sizing-xl-500)

  @include device.smartphone
    :root
      --font-size-ref: 0.75px
      --layout-margin: var(--spacing-l-000)
      --layout-center: var(--spacing-l-000)
      --header-height-size: var(--sizing-xxl-100)
      --logotype-size: var(--sizing-xl-300)
      --layout-columns: 3
      --layout-areas: "header header header header header" "main main main main main" "footer footer footer footer footer"
</style>
