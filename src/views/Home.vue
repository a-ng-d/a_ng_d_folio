<script setup lang="ts">
  import MainMenu from '@/components/pattern/MainMenu.vue'
  import Footer from '@/components/pattern/Footer.vue'
</script>

<template>
  <MainMenu
    logotypeColor="url(#gradient-biscarosse-sunset)"
    type="0 action"
  />
  <main class="jumbotron">
    <h2 class="jumbotron__author">{{ $t("home.author") }}</h2>
    <p class="jumbotron__baseline enhanced">{{ $t("home.baseline") }}</p>
    <button class="jumbotron__id">{{ $t("home.id") }}</button>
    <button class="jumbotron__menu">{{ $t("home.menu") }}</button>
  </main>
  <Footer
    alignment="left"
    mode="dark"
  />
</template>

<style lang="sass">
  @use '@/assets/text-styles.sass' as text

  .jumbotron
    grid-area: main
    display: grid
    grid-template-columns: var(--layout-margin) repeat(9, 1fr) var(--layout-margin)
    grid-template-rows: auto auto
    gap: 0 var(--layout-gap)
    align-content: space-between
    align-items: center
    padding: var(--spacing-xl-600) 0
    color: var(--text-color-dark)

    &__author
      grid-area: 1 / 3 / 2 / 6

    &__baseline
      grid-area: 1 / 7 / 2 / 10

    &__id
      grid-area: 2 / 3 / 3 / 6

    &__menu
      grid-area: 2 / 7 / 3 / 10




</style>
