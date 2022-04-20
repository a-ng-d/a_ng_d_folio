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

    .main-menu__right-part,
    .main-menu__left-part
      flex: 1
</style>
