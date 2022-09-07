<script lang="ts">
  import { defineComponent } from 'vue'
  import Particles from '@/components/graphics/Particles.vue'
  import { doMap } from '@/utilities/operations'

  export default defineComponent({
    name: 'Switch',
    components: {
      Particles
    },
    props: {
      label: String,
      state: {
        type: Boolean,
        default: false
      },
      on: {
        type: Function,
        required: true
      },
      off: {
        type: Function,
        required: true
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        isActive: this.state
      }
    },
    methods: {
      moveSwitch() {
        this.isActive = !this.isActive
        this.isActive ? this.on() : this.off()
      }
    }
  })
</script>

<template>
  <div class="switch" :data-theme="theme">
    <input type="checkbox" name="swt" @click="moveSwitch" @key.space="moveSwitch" />
    <div class="switch__item">
      <label v-if="label != undefined" class="switch__label" for="swt"><p>{{ label }}</p></label>
      <div class="switch__indicator">
        <div class="switch__slide">
          <div class="switch__knob"></div>
          <div class="switch__background">
            <Particles
              :weight="16"
              :isExpanded="isActive"
              borderRadius="calc(var(--button-height-size) / 4)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
  // Structure
  .switch
    &__item
      display: flex
      gap: 0 var(--layout-column-gap)

    &__label
      flex: 1

    &__indicator
      display: flex
      align-items: center

    &__slide
      --slide-padding: var(--spacing-xs-000)

      width: var(--sizing-xl-200)
      height: calc(var(--button-height-size) / 2)
      border-radius: calc(var(--button-height-size) / 4)
      background-color: var(--color-cream)
      padding: var(--slide-padding)
      box-shadow: 0 0 0 var(--sizing-xs-000) var(--slide-border)
      transition: var(--simple-transition)

    &__knob
      width: var(--spacing-l-000)
      height: calc((var(--button-height-size) / 2) - (var(--slide-padding) * 2))
      border-radius: calc(((var(--button-height-size) / 2) - (var(--slide-padding) * 2)) / 2)
      background-color: var(--knob-background)
      z-index: 1
      animation: smooth-slide-off var(--duration-running) var(--ease-vroom) forwards

    &__background
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0

    input
      position: absolute
      width: 100%
      height: 100%
      z-index: 3
      appearance: unset
      top: 0
      left: 0
      cursor: pointer

  // Aspect
  .switch
    --slide-background: transparent
    --slide-border: var(--color-soil)
    --knob-background: var(--color-clay)

  // Event
  .switch
    input:checked ~ &__item &__indicator
      --knob-background: var(--color-soil)

    input:checked ~ &__item &__knob
      animation: smooth-slide-on var(--duration-running) var(--ease-vroom) forwards

    input:focus
      outline: none

    input:focus ~ &__item &__slide
      --slide-border: var(--color-clear-water)
      transform: var(--focus-scale)
      z-index: 2

    input:active ~ &__item &__slide
      transform: var(--active-scale)

    &:hover
      --amplitude: var(--spacing-s-000)
      --item-background: var(--color-soft-wind)

      animation: excited var(--duration-running) var(--ease-peps)

  @keyframes smooth-slide-on
    0%
      transform: translateX(0) scale(1, 1)
      animation-timing-function: ease-in
    50%
      transform: translateX(20rem) scale(1.4, .6)
      animation-timing-function: linear
    100%
      transform: translateX(40rem) scale(1, 1)
      animation-timing-function: ease-out

  @keyframes smooth-slide-off
    0%
      transform: translateX(40rem) scale(1, 1)
      animation-timing-function: ease-in
    50%
      transform: translateX(20rem) scale(1.4, .6)
      animation-timing-function: linear
    100%
      transform: translateX(0rem) scale(1, 1)
      animation-timing-function: ease-out
</style>
