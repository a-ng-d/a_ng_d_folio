<script lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Filter from '@/components/graphics/Filter.vue'
  import Logotype from '@/components/graphics/Logotype.vue'
  import MainMenu from '@/components/patterns/MainMenu.vue'
  import Button from '@/components/ui/Button.vue'
  import Glitchscape from '@/components/graphics/Glitchscape.vue'
  import { ArrowRight, ArrowLeft, Menu } from 'lucide-vue-next'

  export default {
    name: 'App',
    components: {
      Filter,
      Logotype,
      MainMenu,
      Button,
      Glitchscape,
      ArrowRight,
      ArrowLeft,
      Menu
    },
    data() {
      return {
        veil: '',
        pov: '',
        quality: '',
        context: '',
        transition: 'scale-down',
        scroll: 0,
        pageHeight: NaN,
        isGlitched: false,
        device: 'desktop'
      }
    },
    watch: {
      '$route' (to, from) {
        this.context = to.name
        document.title = to.meta.title
        this.veil = to.meta.veil
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
      :logotypeColor="context === 'id' ? 'var(--color-soil)' : 'url(#gradient-biscarosse-sunset)'"
      :background="context === 'id' ? 'var(--color-soft-wind)' : 'transparent'"
      :scroll="scroll"
    >
      <template #left-part>
        <Transition name="switch" mode="out-in">
          <Button
            v-if="context === 'universes'"
            type="secondary"
            :label="$t('global.back.home')"
            path="/"
            :layout="device != 'mobile' ? 'left-icon' : 'icon-only'"
            theme="dark"
          >
            <template #icon>
              <ArrowLeft :size="24" />
            </template>
          </Button>
          <Button
            v-else-if="context === 'work'"
            type="secondary"
            :label="$t('global.menu')"
            path="/_universes"
            :layout="device != 'mobile' ? 'left-icon' : 'icon-only'"
            theme="dark"
          >
            <template #icon>
              <Menu :size="24" />
            </template>
          </Button>
        </Transition>
      </template>
      <template #right-part>
        <Transition name="switch" mode="out-in">
          <Button
            v-if="context === 'id'"
            type="primary"
            :label="$t('global.back.home')"
            path="/"
            :layout="device != 'mobile' ? 'right-icon' : 'icon-only'"
          >
            <template #icon>
              <ArrowRight :size="24" />
            </template>
          </Button>
        </Transition>
      </template>
    </MainMenu>
  </Transition>
  <RouterView @scroll.passive="getScrollParams" v-slot="{ Component, route }">
    <Transition :name="transition" @after-enter="unglitch" @before-leave="glitch">
      <Component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
  <Glitchscape :veil="veil" :pov="pov" :quality="quality" :isGlitched="isGlitched" :scroll="scroll" :pageHeight="pageHeight" />
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

  @include device.mobile
    :root
      --font-size-ref: 0.75px
      --layout-margin: var(--spacing-l-000)
      --layout-center: var(--spacing-l-000)
      --layout-columns: 3
      --layout-areas: "header header header header header" "main main main main main" "footer footer footer footer footer"
</style>
