<script lang="ts">
  export default {
    name: 'FullWidthFigure',
    props: {
      caption: String,
      height: {
        type: Number,
      },
      isCentered: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default: 'transparent'
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  }
</script>

<template>
  <div class="full" :data-theme="theme">
    <figure class="figure">
      <div class="figure__asset">
        <slot name="asset"></slot>
      </div>
      <figcaption class="figure__caption" v-html="caption"></figcaption>
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
      height: v-bind("height == undefined ? 'fit-content' : height + 'rem'")
      box-shadow: var(--image-border)
      overflow: hidden
      padding: v-bind("isCentered ? '0 var(--layout-center)' : '0'")

      :deep(img), :deep(iframe)
        width: 100%

    &__caption
      padding: 0 var(--layout-center)
      color: var(--color-sandstone)

    // Aspect
    .figure
      &__asset
        background: v-bind('background')

    [data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
