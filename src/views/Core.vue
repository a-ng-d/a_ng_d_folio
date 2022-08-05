<script lang="ts">
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'

  export default {
    name: 'Core',
    components: {
      Button,
      ScrollingText
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
    <article class="story">
      <section class="story__freeze">
        <Transition name="slide-up" style="--delay: var(--delay-turtoise)" appear>
          <ScrollingText
            :label="$t('core.intro.title')"
            :theme="theme"
          />
        </Transition>
        <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * .5))" appear>
          <ScrollingText
            :label="$t('core.intro.subtitle')"
            direction="RIGHT"
            isSubTitle
            :theme="theme"
            style="margin-left: calc(var(--sizing-s-000) * -1)"
          />
        </Transition>
      </section>
      <section class="story__freeze">
      </section>
      <section class="story__freeze">
      </section>
      <section class="story__freeze">
      </section>
      <section class="story__freeze">
      </section>
      <section class="story__freeze">
      </section>
      <section class="story__freeze">
      </section>
    </article>
  </main>
</template>

<style scoped lang="sass">
  // Structure
  .story
    grid-area: main
    margin-top: calc(var(--header-height-size) * -1)

    &[data-theme="DARK"]
      --text-color: var(--color-cream)

    &__freeze
      height: 100vh
      justify-content: center
</style>
