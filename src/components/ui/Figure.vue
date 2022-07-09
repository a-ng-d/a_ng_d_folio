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
      caption: String,
    }
  }
</script>

<template>
  <figure>
    <img v-if="type === 'image'" :src="src" :alt="alt" />
    <video v-else-if="type === 'video'" controls>
      <source :src="src" type="video/mp4" />
    </video>
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<style scoped lang="sass">
  // Structure
  figure
    display: flex
    flex-flow: column
    gap: var(--layout-paragraph-gap)

  img, video
    width: 100%
    border-radius: var(--regular-border-radius)
    border: var(--fine-border)

  figcaption
    color: var(--color-sandstone)
</style>
