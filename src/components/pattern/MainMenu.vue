<script lang="ts">
  export default {
    name: 'MainMenu',
    props: {
      logotypeColor: {
        type: String,
        default: 'var(--color-deep-black)'
      }
    },
    data() {
      return {
        fill: this.logotypeColor
      }
    }
  }
</script>

<template>
  <header class="main-menu">
    <slot name="left-action"></slot>
    <div class="main-menu__logotype">
      <svg width="128" height="128" viewBox="0 0 500 500" :style="{ fill }">
        <use href="#logotype" />
      </svg>
    </div>
    <slot name="right-action"></slot>
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

    .main-menu__logotype
      grid-column: 6 / 7
</style>
