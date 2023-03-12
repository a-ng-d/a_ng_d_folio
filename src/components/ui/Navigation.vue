<script lang="ts">
  import { defineComponent } from 'vue'
  import Button from '@/components/ui/Button.vue'
  import { ArrowUp, ArrowRight, ArrowLeft } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Navigation',
    components: {
      Button,
      ArrowUp,
      ArrowRight,
      ArrowLeft,
    },
    props: {
      previousPage: String,
      rootPage: String,
      nextPage: String,
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
  })
</script>

<template>
  <nav class="navigation">
    <Button
      type="secondary"
      :path="previousPage"
      layout="ICON-ONLY"
      :alt="$t('actions.projects.previous')"
      :theme="theme"
    >
      <template #icon>
        <ArrowLeft :size="24" />
      </template>
    </Button>
    <Button
      type="primary"
      :path="rootPage"
      layout="ICON-ONLY"
      :alt="$t('actions.projects.go')"
      :theme="theme"
    >
      <template #icon>
        <ArrowUp :size="24" />
      </template>
    </Button>
    <Button
      type="secondary"
      :path="nextPage"
      layout="ICON-ONLY"
      :alt="$t('actions.projects.next')"
      :theme="theme"
    >
      <template #icon>
        <ArrowRight :size="24" />
      </template>
    </Button>
  </nav>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device
  // Structure
  .navigation
    display: flex
    gap: 0 var(--layout-column-gap)

  // Structure
  @include device.smartphone
    .navigation
      gap: 0 var(--layout-paragraph-gap)

      a:nth-child(2)
        display: none
</style>
