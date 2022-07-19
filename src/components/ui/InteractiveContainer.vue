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
      <div class="container__icon">
        <slot name="icon"></slot>
      </div>
      <div class="container__description">
        <p>{{ description }}</p>
      </div>
      <div class="container__cta">
        <Button
          type="secondary"
          :path="href"
          :label="cta"
          layout="SIMPLE"
          theme="DEFAULT"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .container
    padding: var(--spacing-l-200)
    border-radius: var(--regular-border-radius)
    transition: var(--simple-transition)
    transform-origin: center center

    &__content
      display: flex
      gap: var(--layout-column-gap)

    &__icon
      padding: var(--spacing-xs-000) 0

    &__description
      flex: 1
      display: flex
      align-items: center

  @include device.mobile
    .container
      &__content
        flex-flow: column nowrap
        align-items: center

  // Aspect
  .container
    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
    border: var(--border-size) solid transparent
    box-shadow: 0 0 0 var(--button-border-size) var(--outline-color)
</style>
