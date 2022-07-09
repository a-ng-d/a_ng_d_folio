<script lang="ts">
  import Button from '@/components/ui/Button.vue'

  export default {
    name: 'InteractiveContainer',
    components: {
      Button
    },
    props: {
      description: String,
      cta: String,
      href: String
    }
  }
</script>

<template>
  <div class="container">
    <div class="container__content">
      <slot name="icon"></slot>
      <p>{{ description }}</p>
      <Button
        type="secondary"
        :path="href"
        :label="cta"
        layout="simple"
        theme="default"
      />
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
      gap: var(--layout-column-gap)

    p
      flex: 1

  // Aspect
  .container
    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
    border: var(--border-size) solid transparent
    box-shadow: 0 0 0 var(--button-border-size) var(--outline-color)
</style>
