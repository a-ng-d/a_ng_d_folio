<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Logotype',
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        weight: 50 as number,
        dash: 150 as number,
      }
    }
  })
</script>

<template>
  <svg class="logotype" width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" :data-theme="theme">
    <line x1="379.151" y1="211.151" x2="339.851" y2="279.219" :stroke-width="weight" stroke-linecap="round" />
    <line x1="428.151" y1="126.151" x2="415.651" y2="147.801" :stroke-width="weight" stroke-linecap="round" />
    <line x1="342.151" y1="126.151" x2="279.651" y2="234.404" :stroke-width="weight" stroke-linecap="round" />
    <line x1="256.151" y1="126.151" x2="193.651" y2="234.404" :stroke-width="weight" stroke-linecap="round" />
    <line x1="169.651" y1="127.151" x2="107.151" y2="235.404" :stroke-width="weight" stroke-linecap="round" />
    <line x1="84.1506" y1="126.151" x2="71.6506" y2="147.801" :stroke-width="weight" stroke-linecap="round" />
    <line x1="257.151" y1="348.151" x2="239.651" y2="378.462" :stroke-width="weight" stroke-linecap="round" />
    <line x1="243.151" y1="298.151" x2="225.651" y2="328.462" :stroke-width="weight" stroke-linecap="round" />
  </svg>
</template>


<style scoped lang="sass">
  // Structure
  .logotype
    width: var(--logotype-size)
    height: var(--logotype-size)
    stroke: var(--logotype-color)
    transition: var(--slow-transition)

  // Aspect
  .logotype
    --logotype-color: var(--color-soil)

    &[data-theme="DARK"]
      --logotype-color: var(--color-cream)
</style>
