<script lang="ts">
  export default {
    name: 'OneColumn',
    props: {
      title: String,
      isSubSection: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<template>
  <div class="col-1" :data-theme="theme">
    <template v-if="title != undefined && !isSubSection">
      <h3>{{ title }}</h3>
    </template>
    <template v-else-if="title != undefined && isSubSection">
      <h4>{{ title }}</h4>
    </template>
    <div class="col-1__content">
      <slot name="plain"></slot>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .col-1
    display: flex
    flex-flow: column nowrap
    padding: 0 var(--layout-center)
    gap: var(--layout-title-gap)

    &__content
      display: flex
      flex-flow: row wrap
      gap: var(--layout-box-gap) var(--layout-column-gap)

      & > :deep(*)
        flex: 0 1 calc(50% - var(--layout-column-gap))

    @include device.tablet
      &__content
        flex-flow: row nowrap
        overflow: auto
        margin: 0 calc(var(--layout-margin) * -1)
        padding: var(--spacing-xs-000) var(--layout-margin)

        &::-webkit-scrollbar
          display: none

        & > :deep(*)
          flex: none
          width: 50vw

    @include device.mobile
      &__content
        flex-flow: row nowrap
        overflow: auto
        margin: 0 calc(var(--layout-margin) * -1)
        padding: var(--spacing-xs-000) var(--layout-margin)

        &::-webkit-scrollbar
          display: none

        & > :deep(*)
          flex: none
          width: 75vw

    // Aspect
    [data-theme="dark"]
      --text-color: var(--color-cream)
</style>
