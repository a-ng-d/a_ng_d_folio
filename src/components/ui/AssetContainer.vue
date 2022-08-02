<script lang="ts">
  import Button from '@/components/ui/Button.vue'
  import { Dribbble, Codepen } from 'lucide-vue-next'

  export default {
    name: 'AssetContainer',
    components: {
      Button,
      Dribbble,
      Codepen
    },
    props: {
      title: String,
      thumbnail: String,
      hdnail: String,
      alt: String,
      type: String,
      sourceName: String,
      sourceLink: String
    },
    data() {
      return {
        isMagnified: false,
        assetWidth: 0
      }
    },
    methods: {
      magnifier(e) {
        const width = e.target.children[0].children[0].children[0].offsetWidth

        this.isMagnified = !this.isMagnified
        this.assetWidth = width + 100 + 'rem'
      }
    }
  }
</script>

<template>
  <div class="asset-container" @click="magnifier">
    <div class="asset-container__content">
      <div class="asset-container__asset">
        <Transition name="fade" mode="in-out">
          <img v-if="!isMagnified" :src="thumbnail" :alt="alt" />
          <video v-else-if="isMagnified && type === 'video'" autoplay mute loop>
            <source :src="hdnail" type="video/mp4" />
          </video>
          <img v-else-if="isMagnified && type === 'image'" :src="hdnail" :alt="alt" />
        </Transition>
      </div>
      <div class="asset-container__description">
        <h5>{{ title }}</h5>
        <Transition name="switch" mode="out-in" style="--delay: var(--delay-hare)">
          <Button
            v-if="isMagnified"
            type="secondary"
            :path="sourceLink"
            layout="ICON-ONLY"
            theme="DEFAULT"
          >
            <template #icon>
              <Component :is="sourceName" :size="24" />
            </template>
          </Button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .asset-container
    width: v-bind("isMagnified ? assetWidth : '20vw'")
    padding: var(--spacing-l-200)
    border-radius: var(--regular-border-radius)
    transition: var(--simple-transition)
    transform-origin: center center
    cursor: pointer

    &__content
      display: flex
      flex-flow: column nowrap
      gap: var(--layout-column-gap)
      height: 100%
      pointer-events: none

    &__asset
      flex: 1
      display: flex
      justify-content: center
      overflow: hidden
      box-shadow: var(--inner-border)
      border-radius: var(--small-border-radius)
      transition: var(--simple-transition)
      opacity: v-bind("isMagnified ? '1' : '.6'")

      img, video
        height: 100%

    &__description
      display: flex
      flex: 0 0 var(--sizing-xl-000)
      flex-flow: row nowrap
      align-items: center

      & > h5
        flex: 1
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

      & > a.button
        pointer-events: auto

  // Aspect
  .asset-container
    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
    border: var(--border-size) solid transparent
    box-shadow: 0 0 0 var(--button-border-size) var(--outline-color)
</style>
