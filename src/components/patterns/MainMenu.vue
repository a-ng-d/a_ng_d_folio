<script lang="ts">
  export default {
    name: 'MainMenu',
    props: {
      logotypeColor: {
        type: String,
        default: 'var(--color-deep-black)'
      },
      background: {
        type: String,
        default: 'var(--color-deep-black)'
      }
    },
    data() {
      return {
        fill: this.logotypeColor,
        isStuck: false
      }
    },
    mounted() {
      window.onscroll = () => window.pageYOffset > 0 ? this.isStuck = true :  this.isStuck = false
    }
  }
</script>

<template>
  <header class="main-menu" :class="isStuck ? 'main-menu--stuck' : null">
    <div class="main-menu__left-part">
      <slot name="left-part"></slot>
    </div>
    <div class="main-menu__logotype">
      <svg width="128" height="128" viewBox="0 0 500 500" :style="{ fill }">
        <use href="#logotype" />
      </svg>
    </div>
    <div class="main-menu__right-part">
      <slot name="-right-part"></slot>
    </div>
  </header>
</template>

<style scoped lang="sass">
  // Structure
  .main-menu
    grid-area: header
    display: flex
    padding: 0 var(--layout-center)
    gap: 0 var(--layout-gap)
    align-items: center
    justify-content: space-between
    transition: var(--simple-transition)

    &__right-part,
    &__left-part
      flex: 1

    &--stuck
      width: 100%
      height: var(--sizing-xxl-600)
      position: fixed
      z-index: 2
      box-shadow: 0 var(--header-height-size) 64rem -64rem v-bind(background) inset
</style>
