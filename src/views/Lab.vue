<script lang="ts">
  import { defineComponent } from 'vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import AssetContainer from '@/components/ui/AssetContainer.vue'
  import { doMap, scrollVelocity } from '@/utilities/operations'
  import { easeInOutQuart } from '@/utilities/easings'
  import { ArrowLeft, ArrowRight } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Lab',
    components: {
      Footer,
      Button,
      AssetContainer,
      ArrowLeft,
      ArrowRight
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        shots: [
          {
            name: 'SCI-FI UI #1',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/6383160-SCI-FI-UI-1-WAVING-SQUARE-PARTICLE',
            sourceType: 'video',
            sourceFormat: 'mp4'
          },
          {
            name: 'SCI-FI UI #2',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/6932423-SCI-FI-UI-2-WAVING-SQUARE-DROPDOWN',
            sourceType: 'video',
            sourceFormat: 'mp4'
          },
          {
            name: 'All Around The World',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/15606194-All-Around-The-World',
            sourceType: 'video',
            sourceFormat: 'mp4'
          },
          {
            name: '💛 Funky 💜 Play button',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/11472664--Funky-Play-button',
            sourceType: 'video',
            sourceFormat: 'mp4'
          },
          {
            name: 'Ciblémie',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/5834075-Cibl-mie-Slider',
            sourceType: 'video',
            sourceFormat: 'mp4'
          },
          {
            name: 'What\'s in the gift?',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/3945533-Anniversary-What-s-in-the-gift',
            sourceType: 'image',
            sourceFormat: 'gif'
          },
          {
            name: 'Soundbox card',
            sourceName: 'Codepen',
            sourceLink: 'https://codepen.io/inVoltag/full/QdOVQQ',
            sourceType: 'video',
            sourceFormat: 'mp4'
          }
        ],
        slider: {
          velocity: 1,
          scale: 1,
          gap: 1,
          time: 0,
          slides: 0,
          slide: 1,
          start: 0,
          distance: 0,
          hasPrevButton: false,
          hasNextButton: true
        },
        active: '',
        isAppeared: false
      }
    },
    methods: {
      smoothScroll(e: any) {
        this.slider.velocity = scrollVelocity(e.target, e.target.scrollWidth - document.body.clientWidth, 'x')
        this.slider.scale = doMap(this.slider.velocity, 1, 1.5, 1, 2)
        this.slider.gap = doMap(this.slider.velocity, 1, 1.5, 1, 4)

        if (e.target.scrollLeft >= e.target.scrollWidth - document.body.clientWidth)
          this.slider.hasNextButton = false
        else if (e.target.scrollLeft <= 0)
          this.slider.hasPrevButton = false
        else
          this.slider.hasPrevButton = this.slider.hasNextButton = true

        for (let i = 1; i <= this.slider.slides!; i++)
          if (e.target.scrollLeft >= document.body.clientWidth * (i - 1) && e.target.scrollLeft < document.body.clientWidth * i) this.slider.slide = i
      },
      slideRight() {
        const scrollBox: HTMLElement = Array.from(document.getElementsByClassName('shots__scroll') as HTMLCollectionOf<HTMLElement>)[0]
        let animationScroll: any, progress: number

        this.slider.time == 0 ? this.slider.start = scrollBox.scrollLeft : null
        this.slider.time == 0 ? this.slider.distance = (document.body.clientWidth * this.slider.slide) - scrollBox.scrollLeft : null

        this.slider.time += 10
        progress = doMap(this.slider.time, 0, (1.6 * 600), 0, 1)
        scrollBox.scrollLeft = this.slider.start + (this.slider.distance * easeInOutQuart(progress))

        if (progress >= 1 || scrollBox.scrollLeft >= scrollBox.scrollWidth - document.body.clientWidth) {
          cancelAnimationFrame(animationScroll)
          this.slider.time = progress = 0
        } else animationScroll = requestAnimationFrame(this.slideRight)
      },
      slideLeft() {
        const scrollBox: HTMLElement = Array.from(document.getElementsByClassName('shots__scroll') as HTMLCollectionOf<HTMLElement>)[0]
        let animationScroll: any, progress: number, diff: number

        !this.slider.hasNextButton ? diff = this.slider.slide - 1 : diff = this.slider.slide - 2

        this.slider.time == 0 ? this.slider.start = scrollBox.scrollLeft : null
        this.slider.time == 0 ? this.slider.distance =  scrollBox.scrollLeft - (document.body.clientWidth * diff) : null

        this.slider.time += 10
        progress = doMap(this.slider.time, 0, (1.6 * 600), 0, 1)
        scrollBox.scrollLeft = this.slider.start - (this.slider.distance * easeInOutQuart(progress))

        if (progress >= 1 || scrollBox.scrollLeft <= 0) {
          cancelAnimationFrame(animationScroll)
          this.slider.time = progress = 0
        } else animationScroll = requestAnimationFrame(this.slideLeft)
      },
      makeSlides() {
        const scrollBox: HTMLElement = Array.from(document.getElementsByClassName('shots__scroll') as HTMLCollectionOf<HTMLElement>)[0]
        this.slider.slides = Math.ceil(scrollBox.scrollWidth / document.body.clientWidth) ?? 4
      }
    },
    created: function() {
      window.addEventListener("resize",  this.makeSlides)
    },
    mounted: function() {
      this.makeSlides()
    }
  })
</script>

<template>
  <main class="page">
    <section class="shots" >
      <Transition name="switch" appear>
        <Button
          v-if="slider.hasPrevButton"
          type="secondary"
          layout="ICON-ONLY"
          :theme="theme"
          @click="slideLeft"
          class="navigation-button navigation-button--left"
        >
          <template #icon>
            <ArrowLeft :size="24" />
          </template>
        </Button>
      </Transition>
      <div class="shots__scroll" @scroll.passive="smoothScroll">
        <div class="shots__container">
          <Transition v-for="(shot, index) in shots" name="slide-up" :style="`--delay: calc(var(--delay-turtoise) + (var(--duration-step) * ${(index * .5) - .5}))`" appear>
            <AssetContainer
              :title="shot.name"
              :thumbnail="`/images/_lab/sd/asset-${shots.length - index}.png`"
              :hdnail="`/images/_lab/hd/asset-${shots.length - index}.${shot.sourceFormat}`"
              :type="shot.sourceType"
              :sourceName="shot.sourceName"
              :sourceLink="shot.sourceLink"
              :key="`shot-${index + 1}`"
              @click.passive="active = `shot-${index + 1}`"
              @keyup.enter="active = `shot-${index + 1}`"
              :unmagnify="active === `shot-${index + 1}` ? false : true"
            />
          </Transition>
        </div>
      </div>
      <Transition name="switch" :style="`--delay: ${isAppeared ? '0ms' : 'var(--delay-turtoise)'}`" appear @after-enter="isAppeared = true">
        <Button
          v-if="slider.hasNextButton"
          type="secondary"
          layout="ICON-ONLY"
          :theme="theme"
          @click="slideRight"
          class="navigation-button navigation-button--right"
        >
          <template #icon>
            <ArrowRight :size="24" />
          </template>
        </Button>
      </Transition>
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

  .shots
    grid-area: main
    min-height: var(--sizing-xxl-000)
    padding: 0
    display: flex
    flex-flow: column nowrap
    justify-content: center

    .navigation-button
      position: absolute
      z-index: 2

      &--right
        right: calc(var(--layout-center) - (var(--button-height-size) / 2))

      &--left
        left: calc(var(--layout-center) - (var(--button-height-size) / 2))

    &__scroll
      overflow: auto
      scrollbar-width: none
      user-select: none
      height: 100%
      display: flex
      align-items: center

      &::-webkit-scrollbar
        display: none

    &__container
      --scale-y: v-bind("1 / slider.scale")
      --multiplier: v-bind("slider.gap")

      display: flex
      width: max-content
      height: 75%
      padding: 0 var(--layout-center)
      flex-flow: row nowrap
      gap: 0 calc(var(--layout-column-gap) * var(--multiplier))
      align-items: stretch
      transition: all 200ms linear
      transform: scaleY(var(--scale-y))

  @include device.mobile-landscape
    .navigation-button
      display: none

  @include device.mobile
    .navigation-button
      display: none
</style>
