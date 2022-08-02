<script lang="ts">
  import Button from '@/components/ui/Button.vue'
  import { ArrowUp, ArrowRight, ArrowLeft } from 'lucide-vue-next'

  export default {
    name: 'Navigation',
    components: {
      Button,
      ArrowUp,
      ArrowRight,
      ArrowLeft
    },
    props: {
      previousPage: String,
      rootPage: String,
      nextPage: String
    }
  }
</script>

<template>
  <nav class="navigation">
    <Button
      type="secondary"
      :path="previousPage"
      layout="ICON-ONLY"
    >
      <template #icon>
        <ArrowLeft :size="24" />
      </template>
    </Button>
    <Button
      type="primary"
      :path="rootPage"
      layout="ICON-ONLY"
    >
      <template #icon>
        <ArrowUp :size="24" />
      </template>
    </Button>
    <Button
      type="secondary"
      :path="nextPage"
      layout="ICON-ONLY"
    >
      <template #icon>
        <ArrowRight :size="24" />
      </template>
    </Button>
  </nav>
</template>

<style scoped lang="sass">
  // Structure
  .navigation
    display: flex
    gap: 0 var(--layout-column-gap)
</style>
