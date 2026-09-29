<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'CareerRole',
    props: {
      start: { type: String, required: true },
      end: { type: String, required: true },
      title: { type: String, required: true },
    },
  })
</script>

<template>
  <div>
    <h6>
      <span>{{ start }}</span>
      <span>{{ $t('global.separator') }}</span>
      <span>{{ end }}</span>
    </h6>
    <p>{{ title }}</p>
  </div>
</template>
