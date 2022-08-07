<script lang="ts">
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import { doMap } from '@/utilities/operations'

  export default {
    name: 'Core',
    components: {
      Button,
      ScrollingText,
      Footer
    },
    props: {
      scrollProgress: Number,
      scrollLimit: Number,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data() {
      return {
        triggers: [],
        section: 'section-1',
        scale: 1,
        opacity: 1
      }
    },
    watch: {
      scrollProgress(to, from) {
        this.triggers.forEach((trigger, index) => {
          if (to >= trigger.top && to < trigger.bottom) {
            const startScaling = index == 0 ? 1 : index == this.triggers.length - 1 ? 0 : 0,
                  endScaling = index == 0 ? 5 : index == this.triggers.length - 1 ? 10 : 5
            this.section = `section-${index + 1}`
            this.scale = doMap(to, trigger.top, trigger.bottom, startScaling, endScaling)
            to > trigger.middle ? this.opacity = doMap(to, trigger.middle, trigger.bottom, 1, 0) : this.opacity = 1
          }
        })
      }
    },
    mounted() {
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
        <div class="story__content--jumbotron" :class="section === 'section-1' ? 'story__content--moving' : null">
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
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-2' ? 'story__content--moving' : null">
          <ScrollingText
            :label="$t('core.productDesign.title')"
            :theme="theme"
          />
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-3' ? 'story__content--moving' : null">
          <ScrollingText
            :label="$t('core.creativeTechnology.title')"
            :theme="theme"
          />
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-4' ? 'story__content--moving' : null">
          <ScrollingText
            :label="$t('core.facilitation.title')"
            :theme="theme"
          />
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-5' ? 'story__content--moving' : null">
          <ScrollingText
            :label="$t('core.communication.title')"
            :theme="theme"
          />
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-6' ? 'story__content--moving' : null">
          <ScrollingText
            :label="$t('core.participatory.title')"
            :theme="theme"
          />
        </div>
      </section>
      <section class="story__stop">
        <div class="story__content" :class="section === 'section-7' ? 'story__content--moving' : null">
          <ScrollingText
            :label="$t('core.sustainable.title')"
            :theme="theme"
          />
        </div>
      </section>
      <section class="story__outro">
        <div class="story__content--jumbotron" :class="section === 'section-8' ? 'story__content--moving' : null">
          <Transition name="slide-up" style="--delay: var(--delay-turtoise)" appear>
            <ScrollingText
              :label="'bye_bye_'"
              :theme="theme"
            />
          </Transition>
          <Transition name="slide-up" style="--delay: calc(var(--delay-turtoise) + (var(--duration-step) * .5))" appear>
            <ScrollingText
              :label="'byebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebyebye'"
              direction="RIGHT"
              isSubTitle
              :theme="theme"
              style="margin-left: calc(var(--sizing-s-000) * -1)"
            />
          </Transition>
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

    &__intro, &__outro
      height: 100vh

    &__stop
      height: 200vh

    &__content
      transform: scale(0)

      &--jumbotron
        display: flex
        flex-flow: column nowrap
        gap: var(--layout-row-gap) 0
        transform: scale(0)

      &--moving
        position: fixed
        top: 50%
        left: 50%
        transform: translate(-50%, -50%) scale(v-bind("scale"))
        opacity: v-bind("opacity")
        pointer-events: none
</style>
