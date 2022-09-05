<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Container'
  })
</script>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped lang="sass">
  // Structure
  .container
    border-radius: var(--regular-border-radius)
    transition: var(--simple-transition)
    transform-origin: center center

  // Aspect
  .container
    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
    border: var(--border-size) solid transparent
    box-shadow: 0 0 0 var(--button-border-size) var(--outline-color)

  // Event
  .container
    &:focus
      --outline-color: var(--border-focus-color)
      transform: var(--focus-scale)
      outline: none
      z-index: 1
</style>
