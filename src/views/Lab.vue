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
        ]
      }
    }
  }
</script>

<template>
  <main class="page">
    <section class="shots">
      <div class="shots__container">
        <AssetContainer
          v-for="(shot, index) in shots"
          :title="shot.name"
          :thumbnail="`/src/assets/images/_lab/sd/asset-${index + 1}.png`"
          :hdnail="`/src/assets/images/_lab/hd/asset-${index + 1}.${shot.sourceFormat}`"
          :type="shot.sourceType"
          :sourceName="shot.sourceName"
          :sourceLink="shot.sourceLink"
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
      display: flex
      width: max-content
      height: 100%
      flex-flow: row-reverse nowrap
      gap: var(--layout-column-gap)
      align-items: stretch
</style>
