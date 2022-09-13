<script lang="ts">
  import { defineComponent } from 'vue'
  import Header from '@/components/patterns/Header.vue'
  import Button from '@/components/ui/Button.vue'
  import Pagination from '@/components/ui/Pagination.vue'
  import Navigation from '@/components/ui/Navigation.vue'
  import { ArrowRight, ArrowDown, ArrowLeft, Rocket, Home, User } from 'lucide-vue-next'

  export default defineComponent({
    name: 'MainMenu',
    components: {
      Header,
      Button,
      Pagination,
      Navigation,
      ArrowRight,
      ArrowDown,
      ArrowLeft,
      Rocket,
      Home,
      User
    },
    props: {
      device: {
        type: String,
        default: 'DESKTOP'
      },
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
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    methods: {
      opaqueBackground(view: string) {
        const actions: any = {
          SHORT: 'var(--color-soft-wind)',
          CORE: 'var(--color-candy-floss)',
          PROJECT: this.theme === 'DEFAULT' ? 'var(--color-cream)' : 'var(--color-soil)'
        }
        return actions[view] ?? 'transparent'
      },
      previousProject() {
        return (this.projects[(this.activeProjectPosition as number) - 1 >= 0 ? (this.activeProjectPosition as unknown as number) - 1 : this.projects.length - 1] as any).path
      },
      nextProject() {
        return (this.projects[(this.activeProjectPosition as number) + 1 < this.projects.length ? (this.activeProjectPosition as unknown as number) + 1 : 0] as any).path
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
          type="primary"
          :label="$t('global.back.home')"
          path="/"
          :layout="device != 'MOBILE' ? 'ICON-LEFT' : 'ICON-ONLY'"
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
          :layout="device != 'MOBILE' ? 'ICON-LEFT' : 'ICON-ONLY'"
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
    &[data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
