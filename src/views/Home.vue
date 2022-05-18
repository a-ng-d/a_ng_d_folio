<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

  export default {
    name: 'Home',
    components: {
      Footer,
      Button,
      ArrowLeft,
      ArrowRight
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
    <section class="jumbotron">
      <div class="jumbotron__content" :data-theme="theme">
        <h1 class="jumbotron__author">
          <span class="jumbotron__author__instance">{{ $t("home.author") }}</span>
          <span class="jumbotron__author__instance">{{ $t("home.author") }}</span>
        </h1>
        <p class="jumbotron__baseline enhanced">{{ $t("home.baseline") }}</p>
        </div>
      <div class="jumbotron__actions">
        <Button
          type="secondary"
          path="/_id"
          layout="left-icon"
          :animation="['slide-up', '0']"
          :theme="theme"
        >
          <template #icon>
            <ArrowLeft
              :size="24"
            />
          </template>
          <template #label>
            {{ $t("home.id") }}
          </template>
        </Button>
        <Button
          type="primary"
          path="/_universes"
          layout="right-icon"
          :animation="['slide-up', '0']"
          :theme="theme"
        >
          <template #icon>
            <ArrowRight
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
      flex: 1
      flex-flow: column nowrap
      align-items: center
      gap: var(--layout-paragraph-gap)
      justify-content: center

    &__author
      display: flex
      width: 100vw

    &__author__instance
      display: block
      animation: across 16000ms infinite forwards linear

    &__actions
      display: flex
      justify-content: space-between
      gap: var(--spacing-xl-000)
</style>
