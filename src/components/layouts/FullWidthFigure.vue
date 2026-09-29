<script lang="ts">
  import { defineComponent } from 'vue'
  import { withTheme } from '@/composables/theme'

  export default defineComponent({
    name: 'FullWidthFigure',
    mixins: [withTheme],
    props: {
      center: {
        type: Boolean,
        default: false,
      },
      background: {
        type: String,
        default: 'var(--color-creamy-sun)',
      },
      caption: {
        type: Boolean,
        default: false,
      },
    },
  })
</script>

<template>
  <div class="full" :data-theme="resolvedTheme">
    <figure class="figure">
      <div class="figure__asset">
        <slot name="asset"></slot>
      </div>
      <figcaption v-if="caption" class="figure__caption">
        <slot name="caption"></slot>
      </figcaption>
    </figure>
  </div>
</template>

<style scoped lang="sass">
  // Une vidéo brute posée dans le slot #asset. La règle était recopiée dans
  // trois projets ; elle appartient au composant qui l'accueille.
  :deep(.full-width-video)
    max-width: 100%
    max-height: 100%

  // Structure
  .full
    width: 100%

  .figure
    display: flex
    flex-flow: column
    gap: var(--layout-paragraph-gap)

    &__asset
      width: 100%
      display: flex
      height: 640rem
      box-shadow: var(--asset-border)
      overflow: hidden
      padding: v-bind("center ? '0 var(--layout-center)' : '0'")
      justify-content: v-bind("center ? 'center' : 'flex-start'")
      background: var(--asset-background)

      :deep(img)
        height: fit-content
        transition: var(--duration-turtoise) opacity ease

        &.v-lazy-image
          opacity: 0

        &.v-lazy-image.v-lazy-image-loaded
          opacity: 1

    &__caption :deep(p)
      padding: 0 var(--layout-center)
      color: var(--caption-color)


  // Aspect
  .figure
    --asset-background: v-bind('background')
    --asset-border: var(--image-border)
</style>
