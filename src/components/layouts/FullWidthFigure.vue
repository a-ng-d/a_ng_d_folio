<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'FullWidthFigure',
    props: {
      caption: String,
      height: {
        type: Number,
      },
      center: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default: 'var(--color-creamy-sun)'
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  })
</script>

<template>
  <div class="full" :data-theme="theme">
    <figure class="figure">
      <div class="figure__asset">
        <slot name="asset"></slot>
      </div>
      <figcaption v-if="caption != ''" class="figure__caption"><p class="discrete" v-html="caption"></p></figcaption>
    </figure>
  </div>
</template>

<style scoped lang="sass">
  // Structure
  .full
    width: 100%

  .figure
    display: flex
    flex-flow: column
    gap: var(--layout-paragraph-gap)

    &__asset
      width: 100%
      display: v-bind("height == undefined ? 'flex' : 'block'")
      height: 640rem
      box-shadow: var(--asset-border)
      overflow: hidden
      padding: v-bind("center ? '0 var(--layout-center)' : '0'")
      justify-content: v-bind("center ? 'center' : 'flex-start'")
      background: var(--asset-background)

      :deep(img)
        width: 100%
        height: fit-content
        transition: var(--duration-turtoise) opacity ease

      :deep(img[lazy=loading])
        opacity: 0

      :deep(img[lazy=loaded])
        opacity: 1

    &__caption p
      padding: 0 var(--layout-center)
      color: var(--caption-color)


  // Aspect
  .figure
    --asset-background: v-bind('background')
    --asset-border: var(--image-border)
    --caption-color: var(--color-sandstone)

    &[data-theme="DARK"]
      --caption-color: var(--color-clay)
</style>
