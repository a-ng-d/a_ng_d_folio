<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import type { Route } from '@/utilities/types'
  import Header from '@/components/patterns/Header.vue'
  import Button from '@/components/ui/Button.vue'
  import Pagination from '@/components/ui/Pagination.vue'
  import Navigation from '@/components/ui/Navigation.vue'
  import { Rocket, Home, X } from 'lucide-vue-next'

  export default defineComponent({
    name: 'MainMenu',
    components: {
      Header,
      Button,
      Pagination,
      Navigation,
      Rocket,
      Home,
      X
    },
    props: {
      view: {
        type: String,
        required: true
      },
      scrollProgress: {
        type: Number,
        default: 0
      },
      projects: {
        type: Array,
        required: true
      },
      activeProjectPosition: {
        type: Number,
        required: true
      },
      goback: {
        type: Boolean,
        default: false
      },
      previousPath: {
        type: String,
        default: '/'
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        store
      }
    },
    methods: {
      opaqueBackground(view: string) {
        const actions: { [key: string]: string } = {
          SHORT: 'var(--color-soft-wind)',
          CORE: 'var(--color-candy-floss)',
          PROJECT: this.theme === 'DEFAULT' ? 'var(--color-cream)' : 'var(--color-soil)'
        }
        return actions[view] ?? 'transparent'
      },
      previousProject() {
        return (this.projects[(this.activeProjectPosition as number) - 1 >= 0 ? (this.activeProjectPosition as unknown as number) - 1 : this.projects.length - 1] as Route).path
      },
      nextProject() {
        return (this.projects[(this.activeProjectPosition as number) + 1 < this.projects.length ? (this.activeProjectPosition as unknown as number) + 1 : 0] as Route).path
      }
    }
  })
</script>

<template>
  <Header
    :background="opaqueBackground(view)"
    :scrollProgress="scrollProgress"
    :theme="theme"
  >
    <template #left-part>
      <Transition name="switch" mode="out-in" appear>
        <Button
          v-if="view === 'UNIVERSE'"
          type="secondary"
          :label="$t('global.back.home')"
          path="/"
          :layout="store.device != 'MOBILE' ? 'ICON-LEFT' : 'ICON-ONLY'"
          :alt="$t('global.back.home')"
          :theme="theme"
        >
          <template #icon>
            <Home :size="24" />
          </template>
        </Button>
        <Button
          v-else-if="view != 'HOME'"
          type="secondary"
          :label="$t('global.menu')"
          path="/_universe"
          :layout="store.device != 'MOBILE' ? 'ICON-LEFT' : 'ICON-ONLY'"
          :alt="$t('actions.menu')"
          :theme="theme"
        >
          <template #icon>
            <Rocket :size="24" />
          </template>
        </Button>
      </Transition>
    </template>
    <template #right-part>
      <Transition name="switch" mode="out-in">
        <Pagination
          v-if="view === 'WORK'"
          :pages="projects"
          :activePage="activeProjectPosition"
          :theme="theme"
        />
        <Navigation
          v-else-if="view === 'PROJECT'"
          :previousPage="previousProject()"
          rootPage="/_work"
          :nextPage="nextProject()"
          :theme="theme"
        />
        <Button
          v-else-if="view === 'UNIVERSE' && goback"
          type="primary"
          layout="ICON-ONLY"
          :path="previousPath"
          :alt="$t('actions.close')"
          :theme="theme"
        >
          <template #icon>
            <X :size="24" />
          </template>
        </Button>
        <div class="universe-title" v-else>
          <Transition name="switch" mode="out-in">
            <div v-if="view === 'SHORT'"><h6>{{ $t("glossary.id") }}</h6></div>
            <div v-else-if="view === 'CORE'"><h6>{{ $t("glossary.core") }}</h6></div>
            <div v-else-if="view === 'LAB'"><h6>{{ $t("glossary.lab") }}</h6></div>
            <div v-else-if="view === 'UNIVERSE'"><h6>{{ $t("glossary.universe") }}</h6></div>
            <div v-else-if="view === 'CONTACT'"><h6>{{ $t("glossary.contact") }}</h6></div>
            <div v-else-if="view === 'ATTRIBUTION'"><h6>{{ $t("glossary.attribution") }}</h6></div>
          </Transition>
        </div>
      </Transition>
    </template>
  </Header>
</template>

<style scoped lang="sass">
  .main-menu
    h6
      text-align: right
      line-height: 1.4

    &[data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
