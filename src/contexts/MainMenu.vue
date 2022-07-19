<script lang="ts">
  import Header from '@/components/patterns/Header.vue'
  import Button from '@/components/ui/Button.vue'
  import Pagination from '@/components/ui/Pagination.vue'
  import Navigation from '@/components/ui/Navigation.vue'
  import { ArrowRight, ArrowLeft, Rocket } from 'lucide-vue-next'

  export default {
    name: 'MainMenu',
    components: {
      Header,
      Button,
      Pagination,
      Navigation,
      ArrowRight,
      ArrowLeft,
      Rocket
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
        type: [Array, Object],
        default: []
      },
      activeProjectPosition: Number
    },
    methods: {
      changeLogotypeColor(view) {
        const actions = {
          ID: 'var(--color-soil)',
          WORK: this.projects[this.activeProjectPosition].meta.theme == 'DEFAULT' ? 'var(--color-soil)' : 'var(--color-cream)',
          PROJECT: 'var(--color-sandstone)',
          UNIVERSES: 'var(--color-cream)'
        }
        return actions[view] ?? 'var(--color-soil)'
      },
      previousProject() {
        return this.projects[this.activeProjectPosition - 1 >= 0 ? this.activeProjectPosition - 1 : this.projects.length - 1].path
      },
      nextProject() {
        return this.projects[this.activeProjectPosition + 1 < this.projects.length ? this.activeProjectPosition + 1 : 0].path
      }
    }
  }
</script>

<template>
  <Header
    :logotypeColor="changeLogotypeColor(view)"
    :background="view === 'PROJECT' ? 'var(--color-cream)' : 'transparent'"
    :scrollProgress="scrollProgress"
  >
    <template #left-part>
      <Transition name="switch" mode="out-in">
        <Button
          v-if="view === 'UNIVERSES'"
          type="secondary"
          :label="$t('global.back.home')"
          path="/"
          :layout="device != 'MOBILE' ? 'ICON-LEFT' : 'ICON-ONLY'"
          theme="DARK"
        >
          <template #icon>
            <ArrowLeft :size="24" />
          </template>
        </Button>
        <Button
          v-else-if="view === 'WORK' || view === 'PROJECT'"
          type="secondary"
          :label="$t('global.menu')"
          path="/_universes"
          :layout="device != 'MOBILE' ? 'ICON-LEFT' : 'ICON-ONLY'"
          theme="DEFAULT"
        >
          <template #icon>
            <Rocket :size="24" />
          </template>
        </Button>
      </Transition>
    </template>
    <template #right-part>
      <Transition name="switch" mode="out-in">
        <Button
          v-if="view === 'ID'"
          type="primary"
          :label="$t('global.back.home')"
          path="/"
          :layout="device != 'MOBILE' ? 'ICON-RIGHT' : 'ICON-ONLY'"
        >
          <template #icon>
            <ArrowRight :size="24" />
          </template>
        </Button>
        <Pagination
          v-else-if="view === 'WORK'"
          
          :pages="projects"
          :activePage="activeProjectPosition"
          :theme="projects[activeProjectPosition].meta.theme"
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
