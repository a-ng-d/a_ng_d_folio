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
      }
    },
    methods: {
      changeLogotypeColor(view: string) {
        const actions: any = {
          ID: 'var(--color-soil)',
          WORK: (this.projects[(this.activeProjectPosition as number)] as any).meta.theme == 'DEFAULT' ? 'var(--color-soil)' : 'var(--color-cream)',
          PROJECT: 'var(--color-sandstone)',
          UNIVERSE: 'var(--color-cream)'
        }
        return actions[view] ?? 'var(--color-soil)'
      },
      opaqueBackground(view: string) {
        const actions: any = {
          ID: 'var(--color-soft-wind)',
          CORE: 'var(--color-candy-floss)',
          PROJECT: 'var(--color-cream)'
        }
        return actions[view] ?? 'transparent'
      },
      changeUniverseButtonTheme(view: string) {
        const actions: any = {
          WORK: (this.projects[(this.activeProjectPosition as number)] as any).meta.theme,
        }
        return actions[view] ?? 'DEFAULT'
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
    :logotypeColor="changeLogotypeColor(view)"
    :background="opaqueBackground(view)"
    :scrollProgress="scrollProgress"
  >
    <template #left-part>
      <Transition name="switch" mode="out-in">
        <Button
          v-if="view === 'UNIVERSE'"
          type="primary"
          :label="$t('global.back.home')"
          path="/"
          :layout="device != 'MOBILE' ? 'ICON-LEFT' : 'ICON-ONLY'"
          theme="DARK"
        >
          <template #icon>
            <Home :size="24" />
          </template>
        </Button>
        <Button
          v-else-if="view != 'UNIVERSE' && view != 'HOME'"
          type="secondary"
          :label="$t('global.menu')"
          path="/_universe"
          :layout="device != 'MOBILE' ? 'ICON-LEFT' : 'ICON-ONLY'"
          :theme="changeUniverseButtonTheme(view)"
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
          :theme="(projects[activeProjectPosition as number] as any).meta.theme"
        />
        <Navigation
          v-else-if="view === 'PROJECT'"
          :previousPage="previousProject()"
          rootPage="/_work"
          :nextPage="nextProject()"
        />
      </Transition>
    </template>
  </Header>
</template>

<style scoped lang="sass">

</style>
