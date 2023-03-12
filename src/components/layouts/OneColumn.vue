<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'OneColumn',
    props: {
      title: String,
      center: Boolean,
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
  })
</script>

<template>
  <div class="col-1" :data-theme="theme">
    <template v-if="title != undefined">
      <h3>{{ title }}</h3>
    </template>
    <div class="col-1__content">
      <slot name="plain"></slot>
    </div>
  </div>
</template>

<style scoped lang="sass">
  // Structure
  .col-1
    display: flex
    flex-flow: column nowrap
    padding: 0 var(--layout-center)
    gap: var(--layout-title-gap)

    &__content
      display: flex
      flex-flow: column nowrap
      gap: var(--layout-row-gap) 0
      justify-content: v-bind("center ? 'center' : 'flex-start'")

  // Aspect
  .col-1
    &[data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
