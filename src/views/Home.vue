<script setup lang="ts">
  import MainMenu from '@/components/pattern/MainMenu.vue'
  import Footer from '@/components/pattern/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { RotateCw } from 'lucide-vue-next'
</script>

<template>
  <MainMenu
    logotypeColor="url(#gradient-biscarosse-sunset)"
    context="logotype"
  />
  <main class="jumbotron">
    <div class="jumbotron__content">
      <h2 class="jumbotron__author">{{ $t("home.author") }}</h2>
      <p class="jumbotron__baseline enhanced">{{ $t("home.baseline") }}</p>
    </div>
    <div class="jumbotron__actions">
      <Button type="secondary" path="/_id" layout="indicator" inverted>
        <template #icon>
          <RotateCw
            :size="24"
          />
        </template>
        <template #label>
          {{ $t("home.id") }}
        </template>
      </Button>
      <Button type="primary" path="/_universes" layout="simple" inverted>
        <template #icon>
          <RotateCw
            :size="24"
          />
        </template>
        <template #label>
          {{ $t("home.menu") }}
        </template>
      </Button>
    </div>
  </main>
  <Footer
    alignment="left"
    inverted
  />
</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  // Structure
  .jumbotron
    grid-area: main
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    padding: var(--spacing-xl-600) var(--layout-center)
    color: var(--text-color-dark)

    &__content
      display: flex
      align-items: center
      gap: var(--spacing-xl-000)

      & > *
        flex: 1

    &__actions
      display: flex
      justify-content: space-between
</style>
