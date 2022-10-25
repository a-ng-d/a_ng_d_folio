<script lang="ts">
  import { defineComponent } from 'vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import { SkipBack } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'
  import { easeInOutQuart } from '@/utilities/easings'

  export default defineComponent({
    name: 'Core',
    components: {
      Button,
      ScrollingText,
      Footer,
      SkipBack
    },
    props: {
      scrollProgress: Number,
      scrollLimit: Number,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        triggers: [] as Array<{ element: HTMLElement, top: number, bottom: number, middle: number, height: number }>,
        section: 'section-1' as string,
        perspective: 300 as number,
        translation: 0 as number,
        opacity: 1 as number,
        time: 0 as number,
        remainingScroll: 0 as number,
        isScrollingTextStopped: false as boolean,
        stops: [
          'personal',
          'productDesign',
          'creativeTechnology',
          'facilitation',
          'communication',
          'human',
          'extra'
        ] as Array<string>
      }
    },
    watch: {
      scrollProgress(to) {
        to > 0 ? this.isScrollingTextStopped = true : this.isScrollingTextStopped = false
        this.triggers.forEach((trigger, index) => {
          if (to >= trigger.top && to < trigger.bottom) {
            const startScaling = index == 0 ? 0 : -this.perspective,
                  endScaling = this.perspective
            this.section = `section-${index + 1}`
            this.translation = doMap(to, trigger.top, trigger.bottom, startScaling, endScaling)
            to < trigger.middle ? index != 0 ? this.opacity = doMap(to, trigger.top, trigger.middle, 0, 1) : this.opacity = 1 : this.opacity = 1
          }
        })
      }
    },
    methods: {
      backToForeground() {
        let animateScroll: number, progress: number

        this.time == 0 ? this.remainingScroll = (this.scrollLimit as number) - ((this.scrollLimit as number) - this.$el.scrollTop) : null

        this.time += 10
        progress = doMap(this.time, 0, (5 * 600), 1, 0)
        this.$el.scrollTop = this.remainingScroll * easeInOutQuart(progress)

        animateScroll = requestAnimationFrame(this.backToForeground)

        if (progress <= 0 || this.$el.scrollTop < 0) {
          cancelAnimationFrame(animateScroll)
          this.time = progress = this.remainingScroll = 0
        }
      }
    },
    mounted: function() {
      const triggers: Array<HTMLElement> = this.$el.children[0].children
      triggers.forEach((trigger: HTMLElement) => {
        this.triggers.push({
          element: trigger,
          top: trigger.offsetTop,
          bottom: trigger.offsetTop + trigger.offsetHeight,
          middle: trigger.offsetTop + trigger.offsetHeight * .5,
          height: trigger.offsetHeight
        })
      })
    }
  })
</script>

<template>
  <main class="page">
    <article class="story" :data-theme="theme">
      <section class="story__intro">
        <div class="story__content" :class="section === 'section-1' ? 'story__content--centered' : null">
          <div class="story__label story__label--intro">
            <Transition name="slide-up" style="--delay: var(--delay-turtoise)" appear>
              <ScrollingText
                :label="$t('core.intro.title')"
                :stopped="isScrollingTextStopped"
                :theme="theme"
              />
            </Transition>
            <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * .5))" appear>
              <ScrollingText
                :label="$t('core.intro.subtitle')"
                direction="RIGHT"
                isSubTitle
                :stopped="isScrollingTextStopped"
                :theme="theme"
                style="margin-left: calc(var(--sizing-s-000) * -1)"
              />
            </Transition>
          </div>
        </div>
      </section>
      <section v-for="(stop, index) in stops" class="story__stop" :key="stop">
        <div class="story__content" :class="section === `section-${index + 2}` ? 'story__content--centered' : null">
          <div class="story__label story__label--order-1">
            <h1 data-highlighted="true">{{ $t(`core.${stop}.title`) }}</h1>
          </div>
          <div class="story__label story__label--order-2">
            <h3 data-highlighted="true">{{ $t(`core.${stop}.summary`) }}</h3>
          </div>
          <div class="story__label story__label--order-3">
            <h6 data-highlighted="true">{{ $t(`core.${stop}.mission-1`) }}</h6>
          </div>
          <div class="story__label story__label--order-4">
            <h6 data-highlighted="true">{{ $t(`core.${stop}.mission-2`) }}</h6>
          </div>
          <div class="story__label story__label--order-5">
            <h6 data-highlighted="true">{{ $t(`core.${stop}.mission-3`) }}</h6>
          </div>
        </div>
      </section>
      <section class="story__outro">
        <div class="story__content" :class="section === 'section-9' ? 'story__content--centered' : null">
          <div class="story__label story__label--outro">
            <h1>{{ $t('core.outro.title') }}</h1>
            <Button
              type="secondary"
              :label="$t('core.outro.retry')"
              layout="ICON-LEFT"
              :alt="$t('core.outro.retry')"
              :theme="theme"
              @click="backToForeground"
            >
              <template #icon>
                <SkipBack :size="24" />
              </template>
            </Button>
          </div>
        </div>
      </section>
    </article>
    <Transition name="pull-up" style="--delay: var(--delay-turtoise)" appear>
      <Footer
        alignment="L"
        :theme="theme"
      />
    </Transition>
  </main>
</template>

<style scoped lang="sass">
  // Structure
  .story
    grid-area: main
    margin-top: calc(var(--header-height-size) * -1)

    &__intro
      height: 100vh

    &__outro
      height: 200vh

    &__stop
      height: 300vh

    &__content
      opacity: 0

      h1, h3, h6
        white-space: nowrap
        -webkit-font-smoothing: subpixel-antialiased

      [data-highlighted="true"]
        &:after
          content: ''
          width: 100%
          height: 50%
          position: absolute
          left: calc(var(--border-size) * 4)
          bottom: calc(var(--border-size) * -1)
          border-radius: var(--full-border-radius)
          background: var(--border-color)
          z-index: -1

      .button
        pointer-events: visible

      &--centered
        position: fixed
        top: 50%
        left: 50%
        pointer-events: none
        opacity: 1
        max-width: 100%
        display: flex
        justify-content: center
        align-items: center
        flex-flow: column
        transform: translate3d(-50%, -50%, 0)
        -webkit-transform: translate3d(-50%, -50%, 0)
        transform-style: preserve-3d

    &__label
      --translation-y: 0
      --translation-z: v-bind("translation + 'vh'")
      --perspective: v-bind("perspective + 'vh'")

      transform: perspective(var(--perspective)) translate3d(0, var(--translation-y), var(--translation-z)) scale(1, 1)
      backface-visibility: hidden
      z-index: var(--index)
      opacity: var(--opacity)
      order: var(--order)
      transform-style: preserve-3d

      &--intro, &--outro
        display: flex
        flex-flow: column nowrap
        gap: var(--layout-row-gap) 0
        align-items: center

      &--intro
        --opacity: 1
        --index: 6
        --order: 1

      &--outro
        --translation-z: v-bind("translation < 0 ? translation + 'vh' : 0")
        --opacity: v-bind("opacity")
        --index: 6
        --order: 1

      &--order-1
        --perspective: v-bind("perspective * .1 + 'vh'")
        --opacity: v-bind("opacity")
        --index: 5
        --order: 2

      &--order-2
        --perspective: v-bind("perspective * .2 + 'vh'")
        --opacity: v-bind("opacity")
        --index: 4
        --order: 3

      &--order-3
        --perspective: v-bind("perspective * .8 + 'vh'")
        --opacity: v-bind("opacity")
        --index: 3
        --order: 1

      &--order-4
        --translation-y: 100%
        --perspective: v-bind("perspective * .9 + 'vh'")
        --opacity: v-bind("opacity")
        --index: 2
        --order: 1

      &--order-5
        --translation-y: 200%
        --opacity: v-bind("opacity")
        --index: 1
        --order: 1

  // Aspect
  .story
    &[data-theme="DARK"]
      --text-color: var(--color-cream)
      --border-color: var(--color-clay)

      [data-highlighted="true"]
        --border-color: var(--color-sandstone)

    [data-highlighted="true"]
      --border-color: var(--color-cream)

    h1[data-highlighted="true"],
    h3[data-highlighted="true"]
      --border-color: var(--color-creamy-sun)
</style>
