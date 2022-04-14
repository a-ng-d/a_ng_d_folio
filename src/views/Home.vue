<script setup lang="ts">
  import MainMenu from '@/components/pattern/MainMenu.vue'
  import Footer from '@/components/pattern/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { RotateCw } from 'lucide-vue-next'
</script>

<template>
  <MainMenu
    logotypeColor="url(#gradient-biscarosse-sunset)"
    type="0 action"
  />
  <main class="jumbotron">
    <div class="jumbotron__content">
      <h2 class="jumbotron__author">{{ $t("home.author") }}</h2>
      <p class="jumbotron__baseline enhanced">{{ $t("home.baseline") }}</p>
    </div>
    <div class="jumbotron__actions">
      <RouterLink to="/_id">
        <Button type="secondary" layout="indicator" inverted="true">
          <template #icon>
            <RotateCw
              :size="24"
            />
          </template>
          <template #label>
            {{ $t("home.id") }}
          </template>
        </Button>
      </RouterLink>
      <RouterLink to="/_universes" class="jumbotron__menu">
        <Button type="primary" layout="simple" inverted="true">
          <template #icon>
            <RotateCw
              :size="24"
            />
          </template>
          <template #label>
            {{ $t("home.menu") }}
          </template>
        </Button>
      </RouterLink>
    </div>
  </main>
  <Footer
    alignment="left"
    mode="dark"
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
