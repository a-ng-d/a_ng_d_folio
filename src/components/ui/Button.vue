<script lang="ts">
  import Particles from '@/components/graphics/Particles.vue'

  export default {
    name: 'Button',
    components: {
      Particles
    },
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      path: {
        type: String
      },
      layout: {
        type: String,
        default: 'simple'
      },
      extensible: {
        type: Boolean,
        default: false
      },
      animation: {
        type: Array,
        default: ['normal', '0']
      },
      theme: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        isExtensible: this.extensible ? '100%' : 'fit-content'
      }
    }
  }
</script>

<template>

  <template v-if="layout === 'simple'">
    <RouterLink :to="path" class="button" :class="`button--${type}`" :data-theme="theme">
      <div class="button__content">
        <div class="button__label">
          <span>
            <slot name="label"></slot>
          </span>
        </div>
      </div>
      <div class="button__background">
        <Particles />
      </div>
    </RouterLink>
  </template>

  <template v-if="layout === 'icon-only'">
    <RouterLink :to="path" class="button" :class="`button--${type}`" :data-theme="theme">
      <div class="button__content">
        <div class="button__icon">
          <slot name="icon"></slot>
        </div>
      </div>
      <div class="button__background">
        <Particles />
      </div>
    </RouterLink>
  </template>

  <template v-else-if="layout === 'left-icon'">
    <RouterLink :to="path" class="button" :class="`button--${type}`" :data-theme="theme">
      <div class="button__content">
        <div class="button__icon">
          <slot name="icon"></slot>
        </div>
        <div class="button__label">
          <span>
            <slot name="label"></slot>
          </span>
        </div>
      </div>
      <div class="button__background">
        <Particles />
      </div>
    </RouterLink>
  </template>

  <template v-else-if="layout === 'right-icon'">
    <RouterLink :to="path" class="button" :class="`button--${type}`" :data-theme="theme">
      <div class="button__content">
        <div class="button__label">
          <span>
            <slot name="label"></slot>
          </span>
        </div>
        <div class="button__icon">
          <slot name="icon"></slot>
        </div>
      </div>
      <div class="button__background">
        <Particles />
      </div>
    </RouterLink>
  </template>

</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  // Structure
  .button
    display: flex
    align-items: stretch
    width: v-bind(isExtensible)
    height: var(--button-height-size)
    padding: 0
    border-radius: calc(var(--button-height-size) / 2)
    border: var(--button-border-size) solid transparent
    transform-origin: center center
    box-shadow: 0 0 0 var(--border-size) var(--outline-color)
    transition: var(--simple-transition)

    &__content
      display: flex
      flex: 1
      z-index: 1

    &__icon
      display: flex
      flex: 0 0 var(--button-height-size)
      width: var(--button-height-size)
      justify-content: center
      align-items: center
      margin: calc(var(--button-border-size) * -1)
      border-radius: calc(var(--button-height-size) / 2)
      border: var(--button-border-size) solid transparent

    &__label
      display: flex
      flex: 1
      align-items: center
      justify-content: center
      padding: 0 calc(var(--button-height-size) / 2)
      text-align: center
      @include text.label
      transition: var(--slow-transition)

      span
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden

    &__background
      position: absolute
      width: 100%
      height: 100%
      border-radius: calc(var(--button-height-size) / 2)
      overflow: hidden

  // Variants
  //// Primary
  .button--primary
    --icon-color: var(--color-cream)
    --text-color: var(--color-cream)
    --outline-color: var(--color-soil)

    background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box

    .button__icon
      background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

    &:hover
      --text-color: var(--color-soil)

  .button--primary[data-theme="dark"]
    --icon-color: var(--color-soil)
    --text-color: var(--color-soil)
    --outline-color: var(--color-cream)

    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box

    .button__icon
      background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

  //// Secondary
  .button--secondary
    --icon-color: var(--color-soil)
    --text-color: var(--color-soil)
    --outline-color: var(--color-soil)

    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box, transparent

    .button__icon
      background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

    &:hover
      --text-color: var(--color-soil)

  .button--secondary[data-theme="dark"]
    --icon-color: var(--color-cream)
    --text-color: var(--color-cream)
    --outline-color: var(--color-cream)

    background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box, transparent

    .button__icon
      background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

    &:hover
      --text-color: var(--color-soil)

  // Events
  .button:hover
    --amplitude: var(--spacing-s-000)

    animation: excited var(--duration-running) var(--ease-peps)

  .button:focus
    --outline-color: var(--color-clear-water)

    transform: var(--focus-scale)
    z-index: 2
</style>
