<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Figure',
    props: {
      type: {
        type: String,
        default: 'image'
      },
      src: String,
      alt: String,
      caption: String
    },
    watch: {
      isMagnified(to) {
        to ? this.$emit('isMagnified', true) : this.$emit('isMagnified', false)
      }
    },
    data: function() {
      return {
        isMagnified: false as boolean,
        maxScale: 1 as number,
        pathX: 0 as number,
        pathY: 0 as number
      }
    },
    methods: {
      magnifier(e: any) {
        const target: HTMLElement = e.currentTarget!,
              x: number = target.getBoundingClientRect().x,
              y: number = target.getBoundingClientRect().y,
              w: number = target.getBoundingClientRect().width,
              h: number = target.getBoundingClientRect().height,
              refX: number = document.body.clientWidth / 2,
              refY: number = document.body.clientHeight / 2,
              scaleX: number = (document.body.clientWidth - (document.body.clientWidth * .08)) / w,
              scaleY: number = (document.body.clientHeight - (document.body.clientWidth * .16)) / h,
              refScale: number = Math.min(scaleX, scaleY)

        this.isMagnified = !this.isMagnified
        this.maxScale = refScale
        this.pathX = (refX - x - (w / 2)) / refScale
        this.pathY = (refY - y - (h / 2)) / refScale
      }
    }
  })
</script>

<template>
  <figure class="figure">
    <div class="figure__asset"
      :class="isMagnified ? 'figure__asset--magnified' : null"
      @click="magnifier"
      @wheel.passive="isMagnified = false"
      @touchmove.passive="isMagnified = false"
    >
      <img v-if="type === 'image'" v-lazy="src" :alt="alt" />
      <video v-else-if="type === 'video'" controls>
        <source :src="src" type="video/mp4" />
      </video>
    </div>
    <figcaption v-if="caption != ''" class="figure__caption"><p class="discrete" v-html="caption"></p></figcaption>
  </figure>
</template>

<style scoped lang="sass">
  // Structure
  .figure
    display: flex
    flex-flow: column
    gap: var(--layout-paragraph-gap)

    &__asset
      display: flex
      width: 100%
      border-radius: var(--asset-radius)
      box-shadow: var(--asset-border)
      justify-content: center
      align-items: center
      overflow: hidden
      transition: var(--simple-transition)
      cursor: zoom-in
      animation: loading var(--duration-turtoise) infinite linear

      &:before
        content: ''
        width: 200vw
        height: 200vh
        position: fixed
        background-color: hsla(var(--hsl-cream), var(--alpha))
        transition: var(--simple-transition)

      img, video
        width: 100%
        transition: var(--simple-transition)
        border-radius: var(--asset-radius)

      img[lazy=loading]
        transform: translateX(-100%)

      img[lazy=loaded]
        transform: translateX(0)

      &--magnified
        transform: scale(v-bind("maxScale")) translate(v-bind("`${pathX}px`"), v-bind("`${pathY}px`"))
        z-index: 5
        cursor: zoom-out
        overflow: visible

    &__caption p
      color: var(--caption-color)

  // Aspect
  .figure
    --color-1: var(--color-creamy-sun)
    --color-2: var(--color-soft-wind)
    --color-3: var(--color-candy-floss)
    --asset-border: var(--image-border)
    --asset-radius: var(--small-border-radius)
    --alpha: 0
    --caption-color: var(--color-sandstone)

    &__asset--magnified
      --asset-border: none
      --asset-radius: 0
      --alpha: .9

    &[data-theme="DARK"]
      --caption-color: var(--color-clay)
</style>
