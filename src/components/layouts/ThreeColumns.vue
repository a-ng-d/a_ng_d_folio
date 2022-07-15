<script lang="ts">
  export default {
    name: 'ThreeColumns',
    props: {
      title: String,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  }
</script>

<template>
  <div class="col-3" :data-theme="theme">
    <template v-if="title != undefined">
      <h3>{{ title }}</h3>
    </template>
    <div class="col-3__columns">
      <div class="col-3__column">
        <slot name="left"></slot>
      </div>
      <div class="col-3__column">
        <slot name="middle"></slot>
      </div>
      <div class="col-3__column">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .col-3
    display: flex
    flex-flow: column nowrap
    padding: 0 var(--layout-center)
    gap: var(--layout-title-gap)

    &__columns
      display: flex
      gap: var(--layout-column-gap)

    &__column
      display: flex
      flex-flow: column nowrap
      flex: 1
      gap: var(--layout-column-gap)

  @include device.mobile
    .col-3
      &__columns
        flex-flow: column nowrap

  // Aspect`
  [data-theme="DARK"]
    --text-color: var(--color-cream)
</style>
