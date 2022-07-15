<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

  export default {
    name: 'Home',
    components: {
      Footer,
      Button,
      ScrollingText,
      ArrowLeft,
      ArrowRight
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  }
</script>

<template>
  <main class="page">
    <section class="jumbotron">
      <div class="jumbotron__content" :data-theme="theme">
        <Transition name="slide-up" appear style="--delay: calc(var(--duration-turtoise) + 0ms)">
          <ScrollingText
            :label="$t('home.author')"
            :theme="theme"
          />
        </Transition>
        <Transition name="slide-up" appear style="--delay: calc(var(--duration-turtoise) + 100ms)">
          <p class="jumbotron__baseline enhanced">{{ $t("home.baseline") }}</p>
        </Transition>
      </div>
      <div class="jumbotron__actions">
        <Transition name="slide-up" appear style="--delay: calc(var(--duration-turtoise) + 200ms)">
          <Button
            type="secondary"
            :label="$t('home.id')"
            path="/_id"
            layout="ICON-LEFT"
            :theme="theme"
          >
            <template #icon>
              <ArrowLeft :size="24" />
            </template>
          </Button>
        </Transition>
        <Transition name="slide-up" appear style="--delay: calc(var(--duration-turtoise) + 300ms)">
          <Button
            type="primary"
            :label="$t('home.menu')"
            path="/_universes"
            layout="ICON-RIGHT"
            :theme="theme"
          >
            <template #icon>
              <ArrowRight :size="24" />
            </template>
          </Button>
        </Transition>
      </div>
    </section>
    <Footer
      alignment="left"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/text-styles.sass' as text
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .jumbotron
    grid-area: main
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    padding: var(--spacing-xl-600) var(--layout-center)
    //color: var(--text-color-dark)

    &[data-theme="DARK"]
      --text-color: var(--color-cream)

    &__content
      display: flex
      flex: 1
      flex-flow: column nowrap
      align-items: center
      gap: var(--layout-paragraph-gap)
      justify-content: center

    &__actions
      display: flex
      justify-content: space-between
      gap: var(--spacing-xl-000)

  @include device.mobile-landscape
    .jumbotron
      padding: var(--layout-paragraph-gap) var(--layout-center)
      gap: var(--layout-paragraph-gap)
      justify-content: center

      &__baseline
        display: none

  @include device.mobile
    .jumbotron
      padding: var(--layout-paragraph-gap) var(--layout-center)

      &__actions
        flex-flow: column nowrap
        gap: var(--spacing-l-000)

        & > a
          width: 100%
</style>
