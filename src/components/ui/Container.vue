<script lang="ts">
  export default {
    name: 'Container',
    props: {
      title: String,
      description: String
    }
  }
</script>

<template>
  <div class="container">
    <div class="container__content">
      <slot name="icon"></slot>
      <template v-if="title != undefined">
        <h5>{{ title }}</h5>
      </template>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
  // Structure
  .container
    padding: var(--spacing-l-200)
    border-radius: var(--regular-border-radius)
    transition: var(--simple-transition)
    transform-origin: center center

    &__content
      display: flex
      flex-flow: column nowrap
      gap: 0 var(--layout-title-gap)

  // Aspect
  .container
    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
    border: var(--border-size) solid transparent
    box-shadow: 0 0 0 var(--button-border-size) var(--outline-color)
</style>
