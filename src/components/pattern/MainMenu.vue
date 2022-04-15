<script lang="ts">
  export default {
    name: 'MainMenu',
    props: {
      logotypeColor: {
        type: String,
        default: 'var(--color-deep-black)'
      },
      context: {
        type: String,
        default: 'logotype'
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
  <template v-if="context === 'logotype'">
    <header class="main-menu">
      <div class="main-menu__logotype">
        <svg width="128" height="128" viewBox="0 0 500 500" :style="{ fill }">
          <use href="#logotype" />
        </svg>
      </div>
    </header>
  </template>
</template>

<style scoped lang="sass">
  // Structure
  .main-menu
    grid-area: header
    display: grid
    grid-template-columns: var(--layout-margin) repeat(9, 1fr) var(--layout-margin)
    gap: 0 var(--layout-gap)
    align-items: center

    &__logotype
      grid-column: 6 / 7
</style>
