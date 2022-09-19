<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'OneColumn',
    props: {
      title: String,
      isSubSection: {
        type: Boolean,
        default: false
      },
      columns: {
        type: Number,
        default: 2
      },
      isFullScreen: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  })
</script>

<template>
  <div class="col-w" :data-theme="theme">
    <template v-if="title != undefined && !isSubSection">
      <h3>{{ title }}</h3>
    </template>
    <template v-else-if="title != undefined && isSubSection">
      <h4>{{ title }}</h4>
    </template>
    <div class="col-w__scroll">
      <div class="col-w__content">
        <slot name="plain"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .col-w
    display: flex
    flex-flow: column nowrap
    padding: 0 var(--layout-center)
    gap: var(--layout-title-gap)

    &__content
      display: flex
      flex-flow: row wrap
      gap: var(--layout-box-gap) var(--layout-column-gap)

      & > :deep(*)
        flex: 1 1 v-bind("columns == 3 ? 'calc(33% - var(--layout-column-gap))' : columns == 4 ? 'calc(25% - var(--layout-column-gap))' : 'calc(50% - var(--layout-column-gap))'")

    @include device.tablet
      &__scroll
        overflow: auto
        padding: v-bind("isFullScreen ? '100vh' : '0'") 0
        margin: v-bind("isFullScreen ? '-100vh' : '0'") calc(var(--layout-margin) * -1)
        scrollbar-width: none
        transition: var(--simple-transition)

        &::-webkit-scrollbar
          display: none

      &__content
        flex-flow: row nowrap
        width: fit-content
        padding: var(--spacing-xs-000) var(--layout-margin)

        & > :deep(*)
          flex: none
          width: 50vw

    @include device.smartphone
      &__scroll
        overflow: auto
        padding: v-bind("isFullScreen ? '100vh' : '0'") 0
        margin: v-bind("isFullScreen ? '-100vh' : '0'") calc(var(--layout-margin) * -1)
        scrollbar-width: none
        transition: var(--simple-transition)

        &::-webkit-scrollbar
          display: none

      &__content
        flex-flow: row nowrap
        width: fit-content
        padding: var(--spacing-xs-000) var(--layout-margin)

        & > :deep(*)
          flex: none
          width: 75vw

  // Aspect
  .col-w
    &[data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
