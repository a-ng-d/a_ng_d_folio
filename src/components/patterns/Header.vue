<script lang="ts">
  export default {
    name: 'Header',
    props: {
      logotypeColor: {
        type: String,
        default: 'var(--color-deep-black)'
      },
      background: {
        type: String,
        default: 'var(--color-deep-black)'
      },
      scrollProgress: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        isStuck: false
      }
    },
    watch: {
      scrollProgress(to, from) {
        this.scrollProgress > 0 ? this.isStuck = true : this.isStuck = false
      }
    }
  }
</script>

<template>
  <header class="main-menu" :class="isStuck ? 'main-menu--stuck' : null">
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
    position: fixed
    width: 100vw
    height: var(--header-height-size)
    z-index: 2
    display: flex
    padding: 0 var(--layout-center)
    gap: var(--layout-section-gap)
    align-items: center
    justify-content: space-between
    transition: var(--simple-transition)

    &__right-part,
    &__left-part
      flex: 1
      display: flex
      gap: var(--layout-column-gap)

    &__right-part
      justify-content: flex-end

    &__left-part
      justify-content: flex-start

    &__logotype
      width: var(--logotype-size)
      height: var(--logotype-size)

      svg
        transition: var(--grandma-transition)
        fill: v-bind(logotypeColor)

    &--stuck
      box-shadow: 0 var(--header-height-size) 64rem -64rem v-bind(background) inset

  @include device.mobile
    .main-menu
      gap: var(--layout-column-gap)
</style>
