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
      activeProject: Number
    },
    methods: {
      changeLogotypeColor(view) {
        const actions = {
          id: 'var(--color-soil)',
          work: this.projects[this.activeProject].meta.theme == 'default' ? 'var(--color-soil)' : 'var(--color-cream)',
          project: 'var(--color-sandstone)'
        }
        return actions[view] ?? 'url(#gradient-biscarosse-sunset)'
      },
      previousProject() {
        return this.projects[this.activeProject - 1 > 0 ? this.activeProject - 1 : this.projects.length - 1].path
      },
      nextProject() {
        return this.projects[this.activeProject + 1 < this.projects.length ? this.activeProject + 1 : 0].path
      }
    }
  }
</script>

<template>
  <Header
    :logotypeColor="changeLogotypeColor(view)"
    :background="view === 'id' ? 'var(--color-candy-floss)' : 'transparent'"
    :scroll="scroll"
  >
    <template #left-part>
      <Transition name="switch" mode="out-in">
        <Button
          v-if="view === 'universes'"
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
          v-else-if="view === 'work' || view === 'project'"
          type="secondary"
          :label="$t('global.menu')"
          path="/_universes"
          :layout="device != 'mobile' ? 'left-icon' : 'icon-only'"
          theme="default"
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
          :layout="device != 'mobile' ? 'right-icon' : 'icon-only'"
        >
          <template #icon>
            <ArrowRight :size="24" />
          </template>
        </Button>
        <Pagination
          v-else-if="view === 'work'"
          :label="device != 'mobile' ? $t('work.friendlyName') : ''"
          :pages="projects"
          :activePage="activeProject"
          :theme="projects[activeProject].meta.theme"
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
