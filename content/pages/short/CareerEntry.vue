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
  <div>
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
