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
        triggers: [] as Array<any>,
        section: 'section-1',
        perspective: 300,
        translation: 0,
        opacity: 1,
        time: 0,
        remainingScroll: 0
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
        let animateScroll: any, progress: any

        this.time == 0 ? this.remainingScroll = (this.scrollLimit as number) - ((this.scrollLimit as number) - this.$el.scrollTop) : null

        this.time += 10
        progress = doMap(this.time, 0, (5 * 600), 1, 0)
        this.$el.scrollTop = this.remainingScroll * easeInOutQuart(progress)

        if (progress <= 0 || this.$el.scrollTop < 0) {
          cancelAnimationFrame(animateScroll)
          this.time = progress = this.remainingScroll = 0
        } else animateScroll = requestAnimationFrame(this.backToForeground)
      }
    },
    mounted: function() {
      const triggers: any = this.$el.children[0].children
      triggers.forEach((trigger: any) => {
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
            <h1 data-highlighted="true">{{ $t('core.personal.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3 data-highlighted="true">{{ $t('core.personal.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6 data-highlighted="true">{{ $t('core.personal.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6 data-highlighted="true">{{ $t('core.personal.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6 data-highlighted="true">{{ $t('core.personal.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-3' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1 data-highlighted="true">{{ $t('core.productDesign.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3 data-highlighted="true">{{ $t('core.productDesign.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6 data-highlighted="true">{{ $t('core.productDesign.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6 data-highlighted="true">{{ $t('core.productDesign.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6 data-highlighted="true">{{ $t('core.productDesign.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-4' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1 data-highlighted="true">{{ $t('core.creativeTechnology.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3 data-highlighted="true">{{ $t('core.creativeTechnology.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6 data-highlighted="true">{{ $t('core.creativeTechnology.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6 data-highlighted="true">{{ $t('core.creativeTechnology.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6 data-highlighted="true">{{ $t('core.creativeTechnology.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-5' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1 data-highlighted="true">{{ $t('core.facilitation.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3 data-highlighted="true">{{ $t('core.facilitation.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6 data-highlighted="true">{{ $t('core.facilitation.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6 data-highlighted="true">{{ $t('core.facilitation.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6 data-highlighted="true">{{ $t('core.facilitation.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-6' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1 data-highlighted="true">{{ $t('core.communication.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3 data-highlighted="true">{{ $t('core.communication.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6 data-highlighted="true">{{ $t('core.communication.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6 data-highlighted="true">{{ $t('core.communication.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6 data-highlighted="true">{{ $t('core.communication.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-7' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1 data-highlighted="true">{{ $t('core.human.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3 data-highlighted="true">{{ $t('core.human.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6 data-highlighted="true">{{ $t('core.human.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6 data-highlighted="true">{{ $t('core.human.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6 data-highlighted="true">{{ $t('core.human.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-8' ? 'story__content--centered' : null">
          <div class="story__content--order-1">
            <h1 data-highlighted="true">{{ $t('core.extra.title') }}</h1>
          </div>
          <div class="story__content--order-2">
            <h3 data-highlighted="true">{{ $t('core.extra.summary') }}</h3>
          </div>
          <div class="story__content--order-3">
            <h6 data-highlighted="true">{{ $t('core.extra.mission-1') }}</h6>
          </div>
          <div class="story__content--order-4">
            <h6 data-highlighted="true">{{ $t('core.extra.mission-2') }}</h6>
          </div>
          <div class="story__content--order-5">
            <h6 data-highlighted="true">{{ $t('core.extra.mission-3') }}</h6>
          </div>
        </div>
      </section>
      <section class="story__outro">
        <div class="story__content" :class="section === 'section-9' ? 'story__content--centered' : null">
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
        z-index: 6

      &--outro
        transform: perspective(v-bind("perspective + 'vh'")) translate3d(0, 0, v-bind("translation < 0 ? translation + 'vh' : 0"))
        opacity: v-bind("opacity")
        z-index: 6

      &--order-1
        transform: perspective(v-bind("perspective * .1 + 'vh'")) translate3d(0, 0, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        z-index: 5
        order: 2

      &--order-2
        transform: perspective(v-bind("perspective *.2 + 'vh'")) translate3d(0, 0, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        z-index: 4
        order: 3

      &--order-3
        transform: perspective(v-bind("perspective * .8 + 'vh'")) translate3d(0, 0, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        z-index: 3
        order: 1

      &--order-4
        transform: perspective(v-bind("perspective * .9 + 'vh'")) translate3d(0, 100%, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        z-index: 2
        order: 1

      &--order-5
        transform: perspective(v-bind("perspective + 'vh'")) translate3d(0, 200%, v-bind("translation + 'vh'"))
        opacity: v-bind("opacity")
        z-index: 1
        order: 1

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
