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
      ArrowLeft
    },
    props: {
      previousPage: String,
      rootPage: String,
      nextPage: String
    }
  })
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
  @use '@/assets/stylesheets/base.sass' as device
  // Structure
  .navigation
    display: flex
    gap: 0 var(--layout-column-gap)

  // Structure
  @include device.mobile
    .navigation
      gap: 0 var(--layout-paragraph-gap)

      a:nth-child(2)
        display: none
</style>
