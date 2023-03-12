<script lang="ts">
  import { defineComponent } from 'vue'
  import Logotype from '@/components/graphics/Logotype.vue'

  export default defineComponent({
    name: 'Header',
    components: {
      Logotype,
    },
    props: {
      background: {
        type: String,
        default: 'var(--color-deep-black)',
      },
      scrollProgress: {
        type: Number,
        default: 0,
      },
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
    data: function () {
      return {
        isStuck: false as boolean,
      }
    },
    watch: {
      scrollProgress() {
        this.scrollProgress > 0 ? (this.isStuck = true) : (this.isStuck = false)
      },
    },
    methods: {
      backHome() {
        (document.querySelector('#back-home') as HTMLElement).click()
      },
    },
  })
</script>

<template>
  <header
    class="main-menu"
    :class="isStuck ? 'main-menu--stuck' : null"
    :data-theme="theme"
  >
    <div class="main-menu__left-part">
      <slot name="left-part"></slot>
    </div>
    <div class="main-menu__logotype" @click="backHome">
      <RouterLink
        to="/"
        tabindex="-1"
        id="back-home"
        :aria-label="$t('actions.home')"
      >
      </RouterLink>
      <Logotype :theme="theme" />
    </div>
    <div class="main-menu__right-part">
      <slot name="right-part"></slot>
    </div>
  </header>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .main-menu
    --offset: calc(var(--header-height-size) * -2)

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
      --delay: var(--delay-running)

      justify-content: flex-end

    &__left-part
      --delay: var(--delay-hare)

      justify-content: flex-start

    &__logotype
      width: var(--logotype-size)
      height: var(--logotype-size)
      transition: var(--simple-transition)
      cursor: pointer

      svg
        z-index: 2

      a
        width: 100%
        height: 100%
        display: block
        position: absolute
        top: 0
        left: 0
        z-index: 1

    &--stuck
      --offset: -96rem

  @include device.smartphone
    .main-menu
      gap: 0 var(--layout-column-gap)

  // Event
  .main-menu
    &__logotype:active
      transform: var(--active-scale)
</style>
