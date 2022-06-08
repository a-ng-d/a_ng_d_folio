<script lang="ts">
  import Header from '@/components/patterns/Header.vue'
  import Button from '@/components/ui/Button.vue'
  import Pagination from '@/components/ui/Pagination.vue'
  import { ArrowRight, ArrowLeft, Menu } from 'lucide-vue-next'

  export default {
    name: 'MainMenu',
    components: {
      Header,
      Button,
      Pagination,
      ArrowRight,
      ArrowLeft,
      Menu
    },
    props: {
      device: {
        type: String,
        default: 'desktop'
      },
      context: {
        type: String,
        required: true
      },
      scroll: {
        type: Number,
        default: 0
      },
      dots: {
        type: Object,
        default: {}
      }
    },
    methods: {
      changeLogotypeColor(context) {
        const actions = {
          id: 'var(--color-soil)',
          work: this.dots.theme == 'default' ? 'var(--color-soil)' : 'var(--color-cream)'
        }
        return actions[context] ?? 'url(#gradient-biscarosse-sunset)'
      }
    }
  }
</script>

<template>
  <Header
    :logotypeColor="changeLogotypeColor(context)"
    :background="context === 'id' ? 'var(--color-candy-floss)' : 'transparent'"
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
        <Pagination
          v-else-if="context === 'work'"
          :label="$t('work.friendlyName')"
          :dots="dots"
          :theme="dots.theme"
        />
      </Transition>
    </template>
  </Header>
</template>

<style scoped lang="sass">

</style>
