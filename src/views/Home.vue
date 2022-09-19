<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import { ArrowLeft, ArrowDown, ArrowRight, Heart, Briefcase, FlaskConical, Mail, User } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Home',
    components: {
      Footer,
      Button,
      ScrollingText,
      ArrowLeft,
      ArrowDown,
      ArrowRight,
      Heart,
      Briefcase,
      FlaskConical,
      Mail,
      User
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        store
      }
    }
  })
</script>

<template>
  <main class="page">
    <section class="jumbotron">
      <div class="jumbotron__actions">
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * 2.5))" appear>
          <Button
            type="secondary"
            :label="$t('home.contact')"
            path="/_contact"
            :layout="store.device != 'MOBILE' ? 'ICON-BOTH' : 'ICON-ONLY'"
            :theme="theme"
            isInverted
            tabindex="4"
          >
            <template #icon>
              <Mail :size="24" />
            </template>
            <template #additional-icon>
              <ArrowLeft :size="24" />
            </template>
          </Button>
        </Transition>
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * 3))" appear>
          <Button
            type="secondary"
            :label="$t('home.id')"
            path="/_short"
            :layout="store.device != 'MOBILE' ? 'ICON-BOTH' : 'ICON-ONLY'"
            :theme="theme"
            tabindex="5"
          >
            <template #icon>
              <User :size="24" />
            </template>
            <template #additional-icon>
              <ArrowRight :size="24" />
            </template>
          </Button>
        </Transition>
      </div>
      <div class="jumbotron__content" :data-theme="theme">
        <Transition name="slide-up" style="--delay: var(--delay-turtoise)" appear>
          <ScrollingText
            :label="$t('home.author')"
            :theme="theme"
          />
        </Transition>
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * .5))" appear>
          <h4 class="jumbotron__baseline">{{ $t("home.baseline") }}</h4>
        </Transition>
      </div>
      <div class="jumbotron__actions">
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * 1.5))" appear>
          <Button
            type="secondary"
            :label="$t('home.core')"
            path="/_core"
            :layout="store.device != 'MOBILE' ? 'ICON-BOTH' : 'ICON-ONLY'"
            :theme="theme"
            isInverted
            tabindex="2"
          >
            <template #icon>
              <Heart :size="24" />
            </template>
            <template #additional-icon>
              <ArrowLeft :size="24" />
            </template>
          </Button>
        </Transition>
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * 1))" appear>
          <Button
            type="primary"
            :label="$t('home.work')"
            path="/_work"
            :layout="store.device != 'MOBILE' ? 'ICON-BOTH' : 'SIMPLE'"
            :theme="theme"
            tabindex="1"
          >
            <template #icon>
              <Briefcase :size="24" />
            </template>
            <template #additional-icon>
              <ArrowDown :size="24" />
            </template>
          </Button>
        </Transition>
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * 2))" appear>
          <Button
            type="secondary"
            :label="$t('home.lab')"
            path="/_lab"
            :layout="store.device != 'MOBILE' ? 'ICON-BOTH' : 'ICON-ONLY'"
            :theme="theme"
            tabindex="3"
          >
            <template #icon>
              <FlaskConical :size="24" />
            </template>
            <template #additional-icon>
              <ArrowRight :size="24" />
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
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .page
    height: 100%
    overflow: hidden

  .jumbotron
    grid-area: main
    display: flex
    flex-flow: column nowrap
    justify-content: space-evenly
    padding: 0

    &[data-theme="DARK"]
      --text-color: var(--color-cream)

    &__content
      display: flex
      flex-flow: column nowrap
      align-items: center
      gap: var(--layout-row-gap) 0
      justify-content: center

    &__baseline
      padding: 0 var(--layout-center)

    &__actions
      display: flex
      justify-content: space-around
      gap: var(--spacing-xl-000)
      padding: 0 var(--layout-center)

  @include device.smartphone-landscape
    .jumbotron
      gap: var(--layout-paragraph-gap)

      &__baseline
        display: none

  @include device.smartphone
    .jumbotron
      &__actions
        gap: var(--spacing-l-000)
</style>
