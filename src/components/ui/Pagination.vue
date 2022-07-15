<script lang="ts">
  export default {
    name: 'Pagination',
    props: {
      label: String,
      pages: {
        type: [Array, Object],
        required: true
      },
      activePage: Number,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  }
</script>

<template>
  <div class="pagination" :data-theme="theme">
    <div class="pagination__dots">
      <div
        v-for="n in pages.length"
        class="pagination__dot"
        :class="n == activePage + 1 ? 'pagination__dot--active' : ''"
        :key="`dots-${n}`">
      </div>
    </div>
    <div v-if="label !=''" class="pagination__label">
      <h6>{{ label }}</h6>
    </div>
  </div>
</template>

<style scoped lang="sass">
  // Structure
  .pagination
    width: 100%
    display: flex
    flex-flow: column nowrap
    gap: var(--layout-paragraph-gap)

    &__dots
      display: flex
      gap: var(--layout-label-gap)
      height: var(--sizing-s-000)

    &__dot
      flex: 1
      border-radius: calc(var(--sizing-s-000) / 2)
      transition: all var(--duration-grandma) var(--ease-vroom)

      &--active
        flex: 4

    &__label
      --text-label-space: 0
      transition: all var(--duration-grandma) var(--ease-vroom)

  // Aspect
  .pagination
    &__dot
      --alpha: 0.3

      background-color: var(--background-color)
      opacity: var(--alpha)

      &--active
        --alpha: 1

  [data-theme="DARK"]
    --text-color: var(--color-cream)
    --background-color: var(--color-cream)
</style>
