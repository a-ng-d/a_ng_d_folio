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
      label: String,
      path: String,
      layout: {
        type: String,
        default: 'SIMPLE'
      },
      extensible: {
        type: Boolean,
        default: false
      },
      animation: {
        type: Array,
        default: ['normal', '0']
      },
      position: String,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data() {
      return {
        isExtensible: this.extensible ? '100%' : 'fit-content',
        randomPosition: `position: absolute ; top: ${this.random(0, 80)}% ; left: ${this.random(0, 80)}%`,
        isExpanded: false,
        isExternal: false
      }
    },
    methods: {
      random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
      }
    },
    created() {
      this.path.indexOf('http') == 0 ? this.isExternal = true : this.isExternal
    }
  }
</script>

<template>

  <template v-if="!isExternal">
    <RouterLink
      :to="path"
      class="button"
      :class="`button--${type}`"
      @mouseover="isExpanded = !isExpanded"
      @mouseout="isExpanded = !isExpanded"
      :style="position === 'random' ? randomPosition : ''"
      :data-theme="theme"
    >
      <div class="button__content">
        <div v-if="layout != 'SIMPLE'" class="button__icon" :class="layout === 'ICON-ONLY' ? 'button__icon--transparent' : null">
          <slot name="icon"></slot>
        </div>
        <div v-if="layout != 'ICON-ONLY'" class="button__label">
          <span>
            {{ label }}
          </span>
        </div>
      </div>
      <div class="button__background">
        <Particles :isExpanded="isExpanded" />
      </div>
    </RouterLink>
  </template>

  <template v-else>
    <a
      :href="path"
      class="button"
      :class="`button--${type}`"
      @mouseover="isExpanded = !isExpanded"
      @mouseout="isExpanded = !isExpanded"
      :data-theme="theme"
      :style="position === 'random' ? randomPosition : ''"
      target="_blank"
    >
      <div class="button__content">
        <div v-if="layout != 'SIMPLE'" class="button__icon" :class="layout === 'ICON-ONLY' ? 'button__icon--transparent' : null">
          <slot name="icon"></slot>
        </div>
        <div v-if="layout != 'ICON-ONLY'" class="button__label">
          <span>
            {{ label }}
          </span>
        </div>
      </div>
      <div class="button__background">
        <Particles :isExpanded="isExpanded" />
      </div>
    </a>
  </template>

</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/text-styles.sass' as text

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
      pointer-events: none

    &__icon
      display: flex
      flex: 0 0 var(--button-height-size)
      order: v-bind("layout === 'ICON-RIGHT' ? '1' : '0' ")
      width: var(--button-height-size)
      justify-content: center
      align-items: center
      margin: calc(var(--button-border-size) * -1)
      border-radius: calc(var(--button-height-size) / 2)
      border: var(--button-border-size) solid transparent

      &:deep(svg)
        width: var(--icon-size-regular)
        height: var(--icon-size-regular)

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
      pointer-events: none

  // Variants
  //// Primary
  .button--primary
    --icon-color: var(--color-cream)
    --text-color: var(--color-cream)
    --outline-color: var(--color-soil)

    background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box

    .button__icon
      background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &--transparent
        background: transparent

      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

    &:hover
      --text-color: var(--color-soil)

      .button__icon--transparent
        --icon-color: var(--color-soil)


  .button--primary[data-theme="DARK"]
    --icon-color: var(--color-soil)
    --text-color: var(--color-soil)
    --outline-color: var(--color-cream)

    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box

    .button__icon
      background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &--transparent
        background: transparent

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

      &--transparent
        background: transparent

      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

    &:hover
      --text-color: var(--color-soil)

  .button--secondary[data-theme="DARK"]
    --icon-color: var(--color-cream)
    --text-color: var(--color-cream)
    --outline-color: var(--color-cream)

    background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box, transparent

    .button__icon
      background: linear-gradient(var(--color-soil), var(--color-soil)) padding-box, var(--gradient-biscarosse-sunset) border-box

      &--transparent
        background: transparent

      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

    &:hover
      --text-color: var(--color-soil)

      & .button__icon--transparent
        --icon-color: var(--color-soil)

  // Events
  .button:hover
    --amplitude: var(--spacing-s-000)

    animation: excited var(--duration-running) var(--ease-peps)

  .button:focus
    --outline-color: var(--color-clear-water)

    transform: var(--focus-scale)
    z-index: 2
</style>
