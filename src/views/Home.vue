<script lang="ts">
  import MainMenu from '@/components/patterns/MainMenu.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { RotateCw } from 'lucide-vue-next'

  export default {
    name: 'Home',
    components: {
      MainMenu,
      Footer,
      Button,
      RotateCw
    },
    data() {
      return {
        theme: 'dark'
      }
    }
  }
</script>

<template>
  <main class="page">
    <MainMenu
      logotypeColor="url(#gradient-biscarosse-sunset)"
    />
    <section class="jumbotron">
      <div class="jumbotron__content" :data-theme="theme">
        <h1 class="jumbotron__author">{{ $t("home.author") }}</h1>
        <p class="jumbotron__baseline enhanced">{{ $t("home.baseline") }}</p>
      </div>
      <div class="jumbotron__actions">
        <Button type="secondary" path="/_id" layout="indicator" :theme="theme">
          <template #icon>
            <RotateCw
              :size="24"
            />
          </template>
          <template #label>
            {{ $t("home.id") }}
          </template>
        </Button>
        <Button type="primary" path="/_universes" layout="simple" :theme="theme">
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
    </section>
    <Footer
      alignment="left"
      :theme="theme"
    />
  </main>
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

    &[data-theme="dark"]
      --text-color: var(--color-cream)

    &__content
      display: flex
      align-items: center
      gap: var(--spacing-xl-000)

      & > *
        flex: 1

    &__actions
      display: flex
      justify-content: space-between
      gap: var(--spacing-xl-000)
</style>
