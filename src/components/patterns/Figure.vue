<script lang="ts">
  import { defineComponent } from 'vue'
  import VLazyImage from 'v-lazy-image'

  export default defineComponent({
    name: 'Figure',
    components: {
      VLazyImage
    },
    props: {
      type: {
        type: String,
        default: 'image'
      },
      src: String,
      alt: String,
      caption: {
        type: Boolean,
        default: false
      },
      width: Number,
      height: Number,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
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
        pathY: 0 as number,
        ratio: 0 as number
      }
    },
    methods: {
      magnifier(e: any) {
        const target: HTMLElement = e.currentTarget!,
              status: string = target.children[0].classList[1]!,
              x: number = target.getBoundingClientRect().x,
              y: number = target.getBoundingClientRect().y,
              w: number = target.getBoundingClientRect().width,
              h: number = target.getBoundingClientRect().height,
              refX: number = document.body.clientWidth / 2,
              refY: number = document.body.clientHeight / 2,
              scaleX: number = (document.body.clientWidth - (document.body.clientWidth * .08)) / w,
              scaleY: number = (document.body.clientHeight - (document.body.clientWidth * .16)) / h,
              refScale: number = Math.min(scaleX, scaleY)

        if (status === 'v-lazy-image-loaded') {
          this.isMagnified = !this.isMagnified
          this.maxScale = refScale
          this.pathX = (refX - x - (w / 2)) / refScale
          this.pathY = (refY - y - (h / 2)) / refScale
        }
      },
      setRatio(parentWidth: number) {
        if (this.width != undefined || this.height != undefined)
          this.ratio = (parentWidth * this.height!) / this.width!
        else this.ratio = 640
      }
    },
    created: function() {
      window.addEventListener("resize", () => this.setRatio(this.$el.children[0].offsetWidth))
    },
    mounted: function() {
      this.setRatio(this.$el.children[0].offsetWidth)
    }
  })
</script>

<template>
  <figure class="figure" :data-theme="theme">
    <div class="figure__asset"
      :class="isMagnified ? 'figure__asset--magnified' : null"
      @click="magnifier"
      @wheel.passive="isMagnified = false"
      @touchmove.passive="isMagnified = false"
    >
      <v-lazy-image v-if="type === 'image'" :src="src" :alt="alt" />
      <video v-else-if="type === 'video'" preload="metadata" controls>
        <source :src="src" type="video/mp4" />
      </video>
    </div>
    <figcaption v-if="caption" class="figure__caption">
      <slot name="caption"></slot>
    </figcaption>
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
      height: v-bind("ratio + 'px'")
      border-radius: var(--asset-radius)
      box-shadow: var(--asset-border)
      justify-content: center
      align-items: center
      overflow: hidden
      transition: var(--simple-transition)
      animation: loading var(--duration-turtoise) infinite linear
      z-index: 2

      &:before
        content: ''
        width: 300vw
        height: 300vh
        position: fixed
        background-color: hsla(var(--hsl-cream), var(--alpha))
        transition: var(--simple-transition)

      img, video
        width: 100%
        transition: var(--simple-transition)
        border-radius: var(--asset-radius)

        &.v-lazy-image
          transform: translateY(50%)
          opacity: 0

        &.v-lazy-image.v-lazy-image-loaded
          transform: translateY(0)
          opacity: 1
          cursor: zoom-in

      &--magnified
        transform: scale(v-bind("maxScale")) translate(v-bind("`${pathX}px`"), v-bind("`${pathY}px`"))
        z-index: 5
        cursor: zoom-out
        overflow: visible

        .v-lazy-image-loaded
          cursor: zoom-out

    &__caption
      z-index: 1

      :deep(p)
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
