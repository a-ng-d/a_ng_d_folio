<script lang="ts">
  import { defineComponent } from 'vue'
  import { withTheme } from '@/composables/theme'
  import VLazyImage from 'v-lazy-image'
  import { naturalRatio } from '@/content/assets'

  const NAMED_RATIOS: Record<string, string> = {
    square: '1 / 1',
    landscape: '4 / 3',
    wide: '16 / 9',
    ultrawide: '21 / 9',
    panorama: '3 / 1',
    portrait: '3 / 4',
    tall: '9 / 16',
  }

  export default defineComponent({
    name: 'Figure',
    mixins: [withTheme],
    components: {
      VLazyImage,
    },
    props: {
      type: {
        type: String,
        default: 'image',
      },
      src: String,
      altsrc: String,
      alt: String,
      caption: {
        type: Boolean,
        default: false,
      },
      ratio: {
        type: [String, Number],
        default: undefined,
      },
      width: {
        type: Number,
        default: undefined,
      },
      height: {
        type: Number,
        default: undefined,
      },
    },
    computed: {
      aspectRatio(): string {
        if (this.ratio !== undefined) {
          const named = NAMED_RATIOS[String(this.ratio)]
          return named ?? String(this.ratio)
        }
        const measured = naturalRatio(this.src)
        if (measured !== undefined) return measured
        if (this.width !== undefined && this.height !== undefined)
          return `${this.width} / ${this.height}`
        return 'auto'
      },
      assetHeight(): string {
        return this.aspectRatio === 'auto' ? 'auto' : '100%'
      },
    },
    watch: {
      isMagnified(to) {
        to ? this.$emit('isMagnified', true) : this.$emit('isMagnified', false)
      },
    },
    data: function () {
      return {
        isMagnified: false as boolean,
        maxScale: 1 as number,
        pathX: 0 as number,
        pathY: 0 as number,
      }
    },
    methods: {
      magnifier(e: Event) {
        const target: EventTarget | null = e.currentTarget,
          classes: Array<string> = (
            target as HTMLElement
          ).children[0].classList.value.split(' '),
          x: number = (target as HTMLElement).getBoundingClientRect().x,
          y: number = (target as HTMLElement).getBoundingClientRect().y,
          w: number = (target as HTMLElement).getBoundingClientRect().width,
          h: number = (target as HTMLElement).getBoundingClientRect().height,
          refX: number = document.body.clientWidth / 2,
          refY: number = document.body.clientHeight / 2,
          scaleX: number =
            (document.body.clientWidth - document.body.clientWidth * 0.08) / w,
          scaleY: number =
            (document.body.clientHeight - document.body.clientWidth * 0.16) / h,
          refScale: number = Math.min(scaleX, scaleY)

        if (
          classes.includes('v-lazy-image-loaded') ||
          classes.includes('v-lazy-video')
        ) {
          this.isMagnified = !this.isMagnified
          this.maxScale = refScale
          this.pathX = (refX - x - w / 2) / refScale
          this.pathY = (refY - y - h / 2) / refScale
        }
      },
    },
  })
</script>

<template>
  <figure class="figure" :data-theme="resolvedTheme">
    <div
      class="figure__asset"
      :class="isMagnified ? 'figure__asset--magnified' : null"
      @click="magnifier"
      @wheel.passive="isMagnified = false"
      @touchmove.passive="isMagnified = false"
    >
      <v-lazy-image v-if="type === 'image'" :src="src" :alt="alt" />
      <video
        v-else-if="type === 'video'"
        class="v-lazy-video"
        preload="metadata"
        controls
      >
        <source v-if="altsrc == undefined" :src="src" type="video/webm" />
        <source v-else :src="altsrc" type="video/mp4" />
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
      aspect-ratio: v-bind("aspectRatio")
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
        background-color: var(--overlay-color)
        transition: var(--simple-transition)

      img, video
        width: 100%
        height: v-bind("assetHeight")
        object-fit: cover
        transition: var(--simple-transition)
        border-radius: var(--asset-radius)

        &.v-lazy-image
          transform: translateY(50%)
          opacity: 0

        &.v-lazy-image.v-lazy-image-loaded
          transform: translateY(0)
          opacity: 1
          // cursor: zoom-in

      &--magnified
        transform: scale(v-bind("maxScale")) translate(v-bind("`${pathX}px`"), v-bind("`${pathY}px`"))
        z-index: 5
        // cursor: zoom-out
        overflow: visible

        .v-lazy-image-loaded
          // cursor: zoom-out

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
    
    &__asset--magnified
      --asset-border: none
      --asset-radius: 0
      --alpha: .9
      --overlay-color: hsla(var(--hsl-cream), var(--alpha))

    &[data-theme="DARK"]
      .figure__asset--magnified
        --overlay-color: hsla(var(--hsl-soil), var(--alpha)) !important
</style>
