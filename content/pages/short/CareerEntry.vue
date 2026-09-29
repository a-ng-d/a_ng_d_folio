<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'CareerEntry',
    props: {
      start: { type: String, required: true },
      end: { type: String, required: true },
      title: { type: String, required: true },
      label: { type: String, default: undefined },
    },
  })
</script>

<template>
  <div class="career-entry">
    <div>
      <h5>
        <span>{{ start }}</span>
        <span>{{ $t('global.separator') }}</span>
        <span>{{ end }}</span>
      </h5>
      <h4>{{ title }}</h4>
      <p v-if="label !== undefined">{{ label }}</p>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="sass">
  .career-entry
    display: flex
    flex-flow: column nowrap
    gap: var(--layout-row-gap) 0

    h5
      margin: 0 0 var(--layout-label-gap)
</style>
