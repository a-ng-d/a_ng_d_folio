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
      inverted: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<template>

  <template v-if="layout === 'simple'">
    <RouterLink :to="path" class="button" :class="['button--' + type, inverted ? 'button--' + type + '--inverted' : '']">
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

  <template v-if="layout === 'indicator'">
    <RouterLink :to="path" class="button" :class="['button--' + type, inverted ? 'button--' + type + '--inverted' : '']">
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

</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  // Structure
  .button
    display: flex
    align-items: stretch
    width: fit-content
    height: var(--sizing-xl-000)
    padding: 0
    border-radius: calc(var(--sizing-xl-000) / 2)
    border: var(--spacing-xs-000) solid transparent

    .button__content
      display: flex
      z-index: 1

    .button__icon
      display: flex
      flex: 0 0 var(--spacing-xl-000)
      width: var(--spacing-xl-000)
      justify-content: center
      align-items: center
      margin: calc(var(--sizing-xs-000) * -1)
      border-radius: calc(var(--sizing-xl-000) / 2)
      border: var(--spacing-xs-000) solid transparent

    .button__label
      display: flex
      align-items: center
      padding: 0 var(--spacing-l-000)
      text-align: center
      @include text.label

    .button__background
      position: absolute
      width: 100%
      height: 100%
      border-radius: calc(var(--sizing-xl-000) / 2)
      overflow: hidden

      svg
        width: 100%
        height: 100%

  // Events
  .button:hover
    :deep(.particle)
      transform: scale(1)

    &.button--secondary
      .button__label
        color: var(--text-color-light)

  .button:focus
    transform: scale(1.25)

  // Variants
  //// Primary
  .button--primary
    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
    box-shadow: 0 0 0 var(--sizing-xs-000) var(--color-cream)

    .button__icon
      background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &:deep(svg)
        stroke: var(--color-soil)

    .button__label
      color: var(--text-color-light)

  //// Secondary
  .button--secondary
    background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box, transparent
    box-shadow: 0 0 0 var(--sizing-xs-000) var(--color-cream)

    .button__icon
      background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &:deep(svg)
        stroke: var(--color-cream)

    .button__label
      color: var(--text-color-dark)
</style>
