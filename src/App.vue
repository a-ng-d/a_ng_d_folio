<script lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Filter from '@/components/graphics/Filter.vue'
  import Logotype from '@/components/graphics/Logotype.vue'
  import MainMenu from '@/components/patterns/MainMenu.vue'
  import Button from '@/components/ui/Button.vue'
  import Glitchscape from '@/components/graphics/Glitchscape.vue'
  import { ArrowRight, ArrowLeft } from 'lucide-vue-next'

  export default {
    name: 'App',
    components: {
      Filter,
      Logotype,
      MainMenu,
      Button,
      Glitchscape,
      ArrowRight,
      ArrowLeft
    },
    data() {
      return {
        veil: '',
        pov: '',
        context: '',
        transition: 'scale-down',
        scroll: 0,
        pageHeight: NaN
      }
    },
    watch: {
      '$route' (to, from) {
        this.context = to.name
        document.title = to.meta.title
        this.veil = to.meta.veil
        this.pov = to.meta.pov

        if(from.name === 'home' && to.name === 'id')
          this.transition = 'push-left'

        if(from.name === 'id' && to.name === 'home')
          this.transition = 'push-right'

        if(from.name === 'home' && to.name === 'universes')
          this.transition = 'push-right'

        if(from.name === 'universes' && to.name === 'home')
          this.transition = 'push-left'
      }
    },
    methods: {
      getScrollParams(e) {
        this.pageHeight = e.target.scrollHeight
        this.scroll = e.target.scrollTop
      }
    }
  }
</script>

<template>
  <Filter />
  <Logotype />
  <Transition name="pull-down" style="transition-delay: var(--delay-very-late)" appear>
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
          path="/"
          layout="left-icon"
          theme="dark"
        >
          <template #icon>
            <ArrowLeft
              :size="24"
            />
          </template>
          <template #label>
            {{ $t("universes.back") }}
          </template>
        </Button>
      </Transition>
    </template>
      <template #right-part>
        <Transition name="switch" mode="out-in">
          <Button
            v-if="context === 'id'"
            type="primary"
            path="/"
            layout="right-icon"
          >
            <template #icon>
              <ArrowRight
                :size="24"
              />
            </template>
            <template #label>
              {{ $t("id.back") }}
            </template>
          </Button>
        </Transition>
      </template>
    </MainMenu>
  </Transition>
  <RouterView @scroll="getScrollParams" v-slot="{ Component, route }">
    <Transition ref="content" :name="transition" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <Glitchscape :veil="veil" :pov="pov" :scroll="scroll" :pageHeight="pageHeight" />
</template>

<style lang="sass">
  @use '@/assets/tokens.sass'
  @use '@/assets/base.sass'
  @use '@/assets/animations.sass'

  // Structure
  .page
    display: grid
    grid-template-columns: var(--layout-margin) repeat(9, 1fr) var(--layout-margin)
    grid-template-rows: var(--header-height-size) 1fr var(--footer-height-size)
    column-gap: var(--layout-column-gap)
    grid-template-areas: "header header header header header header header header header header header" "main main main main main main main main main main main" "footer footer footer footer footer footer footer footer footer footer footer"
    width: 100vw
    height: 100vh
    z-index: 1
    overflow-x: hidden
    overflow-y: scroll
</style>
