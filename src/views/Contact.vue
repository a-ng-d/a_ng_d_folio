<script lang="ts">
  import { defineComponent } from 'vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import { Mail } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Contact',
    components: {
      Footer,
      Button,
      ScrollingText,
      Mail
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  })
</script>

<template>
  <main class="page">
    <section class="jumbotron">
      <div class="jumbotron__content" :data-theme="theme">
        <Transition name="slide-up" style="--delay: var(--delay-turtoise)" appear>
          <ScrollingText
            :label="$t('contact.friendlyName')"
            :theme="theme"
          />
        </Transition>
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * .5))" appear>
          <p class="jumbotron__baseline">{{ $t("contact.description") }}</p>
        </Transition>
      </div>
      <div class="jumbotron__actions">
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * 1.5))" appear>
          <Button
            type="primary"
            :label="$t('contact.email')"
            path="mailto:a.grimaud@involt.io"
            layout="ICON-LEFT"
            :theme="theme"
          >
            <template #icon>
              <Mail :size="24" />
            </template>
          </Button>
        </Transition>
      </div>
    </section>
    <Transition name="pull-up" style="--delay: var(--delay-turtoise)" appear>
      <Footer
        alignment="L"
        :theme="theme"
      />
    </Transition>
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .page
    height: 100vh
    overflow: hidden

  .jumbotron
    grid-area: main
    display: flex
    flex-flow: column nowrap
    justify-content: space-evenly
    padding: 0 var(--layout-center)

    &[data-theme="DARK"]
      --text-color: var(--color-cream)

    &__content
      display: flex
      flex-flow: column nowrap
      align-items: center
      gap: var(--layout-row-gap) 0
      justify-content: center

    &__actions
      display: flex
      justify-content: space-around
      gap: var(--spacing-xl-000)

  @include device.mobile-landscape
    .jumbotron
      padding: var(--layout-paragraph-gap) var(--layout-center)
      gap: var(--layout-paragraph-gap)

      &__baseline
        display: none

  @include device.mobile
    .jumbotron
      padding: var(--layout-paragraph-gap) var(--layout-center)

      &__actions
        gap: var(--spacing-l-000)

</style>
