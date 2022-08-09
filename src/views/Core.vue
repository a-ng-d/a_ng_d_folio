<script lang="ts">
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import { SkipBack } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'
  import { easeInOutExpo, easeInOutCubic } from '@/utilities/easings'

  export default {
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
        triggers: [],
        section: 'section-1',
        perspective: 300,
        translation: 0,
        opacity: 1,
        progress: 0
      }
    },
    watch: {
      scrollProgress(to, from) {
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
        let animateScroll
        this.progress += 0.01
        this.$el.scrollTop = easeInOutCubic(this.progress, this.scrollLimit, -this.scrollLimit - 10, 5)
        if (this.progress <= 5) animateScroll = requestAnimationFrame(this.backToForeground)
        else {
          cancelAnimationFrame(animateScroll)
          this.progress = 0
        }
      }
    },
    mounted: function() {
      const triggers = this.$el.children[0].children
      triggers.forEach(trigger => {
        this.triggers.push({
          element: trigger,
          top: trigger.offsetTop,
          bottom: trigger.offsetTop + trigger.offsetHeight,
          middle: trigger.offsetTop + trigger.offsetHeight * .5,
          height: trigger.offsetHeight
        })
      })
    }
  }
</script>

<template>
  <main class="page">
    <article class="story">
      <section class="story__intro">
        <div class="story__content" :class="section === 'section-1' ? 'story__content--centered' : null">
          <div class="story__content--intro">
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
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-2' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1>{{ $t('core.productDesign.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3>{{ $t('core.productDesign.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6>{{ $t('core.productDesign.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6>{{ $t('core.productDesign.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6>{{ $t('core.productDesign.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-3' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1>{{ $t('core.creativeTechnology.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3>{{ $t('core.creativeTechnology.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6>{{ $t('core.creativeTechnology.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6>{{ $t('core.creativeTechnology.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6>{{ $t('core.creativeTechnology.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-4' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1>{{ $t('core.facilitation.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3>{{ $t('core.facilitation.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6>{{ $t('core.facilitation.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6>{{ $t('core.facilitation.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6>{{ $t('core.facilitation.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-5' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1>{{ $t('core.communication.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3>{{ $t('core.communication.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6>{{ $t('core.communication.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6>{{ $t('core.communication.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6>{{ $t('core.communication.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-6' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1>{{ $t('core.human.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3>{{ $t('core.human.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6>{{ $t('core.human.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6>{{ $t('core.human.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6>{{ $t('core.human.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-7' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1>{{ $t('core.extra.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3>{{ $t('core.extra.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6>{{ $t('core.extra.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6>{{ $t('core.extra.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6>{{ $t('core.extra.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__outro">
        <div class="story__content" :class="section === 'section-8' ? 'story__content--centered' : null">
          <div class="story__content--outro">
            <h1>{{ $t('core.outro.title') }}</h1>
            <Button
              type="secondary"
              :label="$t('core.outro.retry')"
              layout="ICON-LEFT"
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

    &[data-theme="DARK"]
      --text-color: var(--color-cream)

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

      a
        pointer-events: visible

      &--centered
        position: fixed
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        pointer-events: none
        opacity: 1
        max-width: 100%
        display: flex
        justify-content: center
        align-items: center
        flex-flow: column

      &--intro, &--outro
        display: flex
        flex-flow: column nowrap
        gap: var(--layout-row-gap) 0
        align-items: center

      &--intro
        transform: perspective(v-bind("perspective + 'vh'")) translate3d(0, 0, v-bind("translation + 'vh'"))
        opacity: 1

      &--outro
        transform: perspective(v-bind("perspective + 'vh'")) translate3d(0, 0, v-bind("translation < 0 ? translation + 'vh' : 0"))
        opacity: v-bind("opacity")

      &--order-1
        transform: perspective(v-bind("perspective * .1 + 'vh'")) translate3d(0, 0, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        order: 2

      &--order-2
        transform: perspective(v-bind("perspective *.2 + 'vh'")) translate3d(0, 0, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        order: 3

      &--order-3
        transform: perspective(v-bind("perspective * .8 + 'vh'")) translate3d(0, 0, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        order: 1

      &--order-4
        transform: perspective(v-bind("perspective * .9 + 'vh'")) translate3d(0, 100%, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        order: 1

      &--order-5
        transform: perspective(v-bind("perspective + 'vh'")) translate3d(0, 200%, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        order: 1
</style>
