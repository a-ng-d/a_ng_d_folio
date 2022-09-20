<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Pagination',
    props: {
      pages: {
        type: [Array, Object],
        required: true
      },
      activePage: {
        type: Number,
        required: true
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  })
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
      transition: var(--grandma-transition)

      &--active
        flex: 4

    &__label
      --text-label-space: 0
      transition: var(--grandma-transition)

  // Aspect
  .pagination
    &__dot
      --alpha: .3

      background-color: var(--background-color)
      opacity: var(--alpha)

      &--active
        --alpha: 1

  [data-theme="DARK"]
    --text-color: var(--color-cream)
    --background-color: var(--color-cream)
</style>
