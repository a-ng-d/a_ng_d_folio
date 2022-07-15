<script lang="ts">
  import Header from '@/components/patterns/Header.vue'
  import Button from '@/components/ui/Button.vue'
  import Pagination from '@/components/ui/Pagination.vue'
  import Navigation from '@/components/ui/Navigation.vue'
  import { ArrowRight, ArrowLeft, Menu } from 'lucide-vue-next'

  export default {
    name: 'MainMenu',
    components: {
      Header,
      Button,
      Pagination,
      Navigation,
      ArrowRight,
      ArrowLeft,
      Menu
    },
    props: {
      device: {
        type: String,
        default: 'desktop'
      },
      view: {
        type: String,
        required: true
      },
      scroll: {
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
          id: 'var(--color-soil)',
          work: this.projects[this.activeProjectPosition].meta.theme == 'DEFAULT' ? 'var(--color-soil)' : 'var(--color-cream)',
          project: 'var(--color-sandstone)'
        }
        return actions[view] ?? 'url(#gradient-biscarosse-sunset)'
      },
      previousProject() {
        return this.projects[this.activeProjectPosition - 1 > 0 ? this.activeProjectPosition - 1 : this.projects.length - 1].path
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
    :background="view === 'project' ? 'var(--color-cream)' : 'transparent'"
    :scroll="scroll"
  >
    <template #left-part>
      <Transition name="switch" mode="out-in">
        <Button
          v-if="view === 'universes'"
          type="secondary"
          :label="$t('global.back.home')"
          path="/"
          :layout="device != 'mobile' ? 'ICON-LEFT' : 'ICON-ONLY'"
          theme="DARK"
        >
          <template #icon>
            <ArrowLeft :size="24" />
          </template>
        </Button>
        <Button
          v-else-if="view === 'work' || view === 'project'"
          type="secondary"
          :label="$t('global.menu')"
          path="/_universes"
          :layout="device != 'mobile' ? 'ICON-LEFT' : 'ICON-ONLY'"
          theme="DEFAULT"
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
          v-if="view === 'id'"
          type="primary"
          :label="$t('global.back.home')"
          path="/"
          :layout="device != 'mobile' ? 'ICON-RIGHT' : 'ICON-ONLY'"
        >
          <template #icon>
            <ArrowRight :size="24" />
          </template>
        </Button>
        <Pagination
          v-else-if="view === 'work'"
          :label="device != 'mobile' ? $t('work.friendlyName') : ''"
          :pages="projects"
          :activePage="activeProjectPosition"
          :theme="projects[activeProjectPosition].meta.theme"
        />
        <Navigation
          v-else-if="view === 'project'"
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
