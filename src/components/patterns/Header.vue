<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Header',
    props: {
      background: {
        type: String,
        default: 'var(--color-deep-black)'
      },
      scrollProgress: {
        type: Number,
        default: 0
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        isStuck: false
      }
    },
    watch: {
      scrollProgress(to, from) {
        this.scrollProgress > 0 ? this.isStuck = true : this.isStuck = false
      }
    }
  })
</script>

<template>
  <header class="main-menu" :class="isStuck ? 'main-menu--stuck' : null" :data-theme="theme">
    <div class="main-menu__left-part">
      <slot name="left-part"></slot>
    </div>
    <div class="main-menu__logotype">
      <svg viewBox="0 0 500 500">
        <use href="#logotype" />
      </svg>
    </div>
    <div class="main-menu__right-part">
      <slot name="right-part"></slot>
    </div>
  </header>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .main-menu
    --offset: calc(var(--header-height-size) * -1)
    --delay: var(--delay-jogging) !important

    position: fixed
    width: 100%
    height: var(--header-height-size)
    z-index: 4
    display: flex
    padding: 0 var(--layout-center)
    gap: var(--layout-section-gap)
    align-items: center
    justify-content: space-between
    transition: var(--slow-transition)
    box-shadow: 0 var(--header-height-size) 64rem var(--offset) v-bind(background) inset

    &__right-part,
    &__left-part
      flex: 1
      display: flex
      gap: 0 var(--layout-column-gap)

    &__right-part
      justify-content: flex-end

    &__left-part
      justify-content: flex-start

    &__logotype
      width: var(--logotype-size)
      height: var(--logotype-size)

      svg
        transition: var(--grandma-transition)
        fill: var(--logotype-color)

    &--stuck
      --offset: -96rem

  @include device.mobile
    .main-menu
      gap: 0 var(--layout-column-gap)

  // Aspect
  .main-menu
    --logotype-color: var(--color-soil)

    &[data-theme="DARK"]
      --logotype-color: var(--color-cream)
</style>
