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
    }
  }
</script>

<template>
  <figure class="figure">
    <div class="figure__asset">
      <img v-if="type === 'image'" :src="src" :alt="alt" />
      <video v-else-if="type === 'video'" controls>
        <source :src="src" type="video/mp4" />
      </video>
    </div>
    <figcaption class="figure__caption" v-html="caption"></figcaption>
  </figure>
</template>

<style scoped lang="sass">
  // Structure
  .figure
    display: flex
    flex-flow: column
    gap: var(--layout-paragraph-gap)

    &__asset
      width: 100%
      border-radius: var(--regular-border-radius)
      box-shadow: var(--image-border)
      overflow: hidden

      img, video
        width: 100%

    &__caption
      color: var(--color-sandstone)
</style>
