<script lang="ts">
  export default {
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
    data() {
      return {
        isMagnified: false,
        maxScale: 1,
        pathX: 0,
        pathY: 0
      }
    },
    methods: {
      magnifier(e) {
        const x = e.target.getBoundingClientRect().x,
              y = e.target.getBoundingClientRect().y,
              w = e.target.getBoundingClientRect().width,
              h = e.target.getBoundingClientRect().height,
              refX = document.body.clientWidth / 2,
              refY = document.body.clientHeight / 2,
              scaleX = (document.body.clientWidth - (document.body.clientWidth * 0.08)) / w,
              scaleY = (document.body.clientHeight - (document.body.clientWidth * 0.16)) / h,
              refScale = Math.min(scaleX, scaleY)

        this.isMagnified = !this.isMagnified
        this.maxScale = refScale
        this.pathX = (refX - x - (w / 2)) / refScale
        this.pathY = (refY - y - (h / 2)) / refScale
      }
    }
  }
</script>

<template>
  <figure class="figure">
    <div class="figure__asset" :class="isMagnified ? 'figure__asset--magnified' : null" @click="magnifier" @wheel.passive="isMagnified = false" @touchmove="isMagnified = false">
      <img v-if="type === 'image'" :src="src" :alt="alt" />
      <video v-else-if="type === 'video'" controls>
        <source :src="src" type="video/mp4" />
      </video>
    </div>
    <figcaption v-if="caption === ''" class="figure__caption" v-html="caption"></figcaption>
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
      border-radius: var(--regular-border-radius)
      box-shadow: var(--image-border)
      justify-content: center
      align-items: center
      overflow: hidden
      transition: var(--simple-transition)
      cursor: zoom-in

      &:before
        --alpha: 0

        content: ''
        width: 200vw
        height: 200vh
        position: fixed
        background-color: hsla(var(--hsl-cream), var(--alpha))
        transition: var(--simple-transition)

      img, video
        width: 100%
        transition: var(--simple-transition)

      &--magnified
        box-shadow: none
        transform: scale(v-bind("maxScale")) translate(v-bind("`${pathX}px`"), v-bind("`${pathY}px`"))
        z-index: 5
        cursor: zoom-out
        border-radius: 0
        overflow: visible

        &:before
          --alpha: .9

    &__caption
      color: var(--color-sandstone)
</style>
