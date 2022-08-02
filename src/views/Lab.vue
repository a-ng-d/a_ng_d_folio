<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import AssetContainer from '@/components/ui/AssetContainer.vue'

  export default {
    name: 'Lab',
    components: {
      Footer,
      Button,
      AssetContainer
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data() {
      return {
        shots: [
          {
            name: 'Soundbox card',
            sourceName: 'Codepen',
            sourceLink: 'https://codepen.io/inVoltag/full/QdOVQQ',
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
            name: 'Ciblémie',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/5834075-Cibl-mie-Slider',
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
            name: 'All Around The World',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/15606194-All-Around-The-World',
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
            name: 'SCI-FI UI #1',
            sourceName: 'Dribbble',
            sourceLink: 'https://dribbble.com/shots/6383160-SCI-FI-UI-1-WAVING-SQUARE-PARTICLE',
            sourceType: 'video',
            sourceFormat: 'mp4'
          }
        ],
        scrollParams: {
          currentPosition: NaN,
          snapPosition: NaN,
          velocity: 1,
          gap: 1
        }
      }
    },
    methods: {
      doMap(value, oldMin, oldMax, newMin, newMax) {
        const oldRange = oldMax - oldMin,
              newRange = newMax - newMin
        return ((value - oldMin) * newRange / oldRange) + newMin
      },
      smoothScroll(e) {
        let timer, delta
        const paddingLeft = parseFloat(window.getComputedStyle(e.target, null).getPropertyValue('padding-left')),
              paddingRight = parseFloat(window.getComputedStyle(e.target, null).getPropertyValue('padding-right')),
              maxScroll = Math.floor(e.target.children[0].clientWidth - e.target.clientWidth + paddingLeft + paddingRight)

        this.scrollParams.velocity = 1
        delta = 0
        this.scrollParams.currentPosition = e.target.scrollLeft
        clearTimeout(timer)
        timer = setInterval(() => {
          this.scrollParams.snapPosition = e.target.scrollLeft
        }, 10)
        delta = Math.abs(this.scrollParams.currentPosition - this.scrollParams.snapPosition)
        this.scrollParams.currentPosition == 0 ? this.scrollParams.velocity = 1 :
                                                 this.scrollParams.currentPosition > maxScroll - 1 ? this.scrollParams.velocity = 1 :
                                                 this.scrollParams.velocity = this.doMap(delta, 1, 400, 1, 1.5)
        this.scrollParams.gap = this.doMap(this.scrollParams.velocity, 1, 1.5, 1, 4)
      }
    }
  }
</script>

<template>
  <main class="page">
    <section class="shots" @scroll="smoothScroll">
      <div class="shots__container">
        <AssetContainer
          v-for="(shot, index) in shots"
          :title="shot.name"
          :thumbnail="`/src/assets/images/_lab/sd/asset-${index + 1}.png`"
          :hdnail="`/src/assets/images/_lab/hd/asset-${index + 1}.${shot.sourceFormat}`"
          :type="shot.sourceType"
          :sourceName="shot.sourceName"
          :sourceLink="shot.sourceLink"
          :key="`shot-${index + 1}`"
        />
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

  // Structure
  .page
    height: 100vh
    overflow: hidden

  .shots
    grid-area: main
    display: flex
    flex-flow: column nowrap
    padding: var(--spacing-xl-600) var(--layout-center)
    overflow: auto

    &__container
      --scale-y: v-bind("1 / scrollParams.velocity")
      --gap: v-bind("scrollParams.gap")

      display: flex
      width: max-content
      height: 100%
      flex-flow: row-reverse nowrap
      gap: 0 calc(var(--layout-column-gap) * var(--gap))
      align-items: stretch
      transition: all 200ms linear
      transform: scaleY(var(--scale-y))

      &::-webkit-scrollbar
        display: none
</style>