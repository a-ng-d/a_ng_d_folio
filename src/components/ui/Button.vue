<script lang="ts">
  export default {
    name: 'Button',
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
    </RouterLink>
  </template>
</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  // Structure
  .button
    display: flex
    align-items: stretch
    height: var(--sizing-xl-000)
    padding: 0
    border-radius: calc(var(--sizing-xl-000) / 2)
    border: var(--spacing-xs-000) solid transparent

    &__content
      display: flex

    &__icon
      display: flex
      width: var(--spacing-xl-000)
      justify-content: center
      align-items: center
      margin: calc(var(--sizing-xs-000) * -1)
      border-radius: calc(var(--sizing-xl-000) / 2)
      border: var(--spacing-xs-000) solid transparent

    &__label
      display: flex
      align-items: center
      padding: 0 var(--spacing-l-000)
      @include text.label

  // Events
  .button:focus
    transform: scale(1.25)

  // Variants
  .button--primary
    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
    box-shadow: 0 0 0 var(--sizing-xs-000) var(--color-cream)

    .button__icon
      background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &:deep(svg)
        stroke: var(--color-soil)

    .button__label
      color: var(--text-color-light)

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
