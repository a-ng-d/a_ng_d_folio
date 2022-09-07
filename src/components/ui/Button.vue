<script lang="ts">
  import { defineComponent } from 'vue'
  import Particles from '@/components/graphics/Particles.vue'

  export default defineComponent({
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
      path: {
        type: String,
        default: ''
      },
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
      isInverted: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        isExtensible: this.extensible ? '100%' : 'fit-content',
        isExpanded: false,
        isExternal: false,
        movement: ''
      }
    },
    methods: {
      expandParticles(e: any) {
        const mouseX: number = e.layerX,
              buttonWidth: number = this.$el.clientWidth,
              buttonHalfWidth: number = buttonWidth / 2

        if (mouseX > buttonHalfWidth && mouseX <= buttonWidth + 10) this.movement = 'go-right'
        else this.movement = 'go-left'

        setTimeout(() => this.isExpanded = true, 50)
      },
      collapseParticles(e: any) {
        setTimeout(() => this.isExpanded = false, 50)
      }
    },
    created: function() {
      this.path.indexOf('http') == 0 ? this.isExternal = true : this.isExternal
      this.path.indexOf('mailto') == 0 ? this.isExternal = true : this.isExternal
    }
  })
</script>

<template>

  <template v-if="path === ''">
    <button
      class="button"
      :class="`button--${type}`"
      @mouseover="expandParticles"
      @mouseout="collapseParticles"
      @touchstart.passive="expandParticles"
      @touchend.passive="collapseParticles"
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
        <div v-if="layout === 'ICON-BOTH'" class="button__icon">
          <slot name="additional-icon"></slot>
        </div>
      </div>
      <div class="button__background">
        <Particles
          :isExpanded="isExpanded"
          :movement="movement"
          borderRadius="calc(var(--button-height-size) / 2)"
        />
      </div>
    </button>
  </template>

  <template v-else-if="!isExternal">
    <RouterLink
      :to="path"
      class="button"
      :class="`button--${type}`"
      @mouseover="expandParticles"
      @mouseout="collapseParticles"
      @touchstart.passive="expandParticles"
      @touchend.passive="collapseParticles"
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
        <div v-if="layout === 'ICON-BOTH'" class="button__icon">
          <slot name="additional-icon"></slot>
        </div>
      </div>
      <div class="button__background">
        <Particles
          :isExpanded="isExpanded"
          :movement="movement"
          borderRadius="calc(var(--button-height-size) / 2)"
        />
      </div>
    </RouterLink>
  </template>

  <template v-else>
    <a
      :href="path"
      class="button"
      :class="`button--${type}`"
      @mouseover="expandParticles"
      @mouseout="collapseParticles"
      @touchstart.passive="expandParticles"
      @touchend.passive="collapseParticles"
      :data-theme="theme"
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
        <Particles
          :isExpanded="isExpanded"
          :movement="movement"
          borderRadius="calc(var(--button-height-size) / 2)"
        />
      </div>
    </a>
  </template>

</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/text-styles.sass' as text

  // Structure
  .button
    --background-color: transparent

    display: flex
    align-items: stretch
    width: v-bind(isExtensible)
    height: var(--button-height-size)
    padding: 0
    top: var(--top)
    right: var(--right)
    background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
    border-radius: calc(var(--button-height-size) / 2)
    border: var(--button-border-size) solid transparent
    transform-origin: center center
    box-shadow: 0 0 0 var(--border-size) var(--outline-color)
    overflow: hidden
    transition: var(--simple-transition)
    cursor: pointer

    &:before
      content: ''
      background-color: var(--background-color)
      width: 100%
      height: 100%
      position: absolute
      top: 0
      transition: var(--slow-transition)

    &__content
      display: flex
      flex-direction: v-bind("isInverted ? 'row-reverse' : 'row'")
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
      background: linear-gradient(var(--color-cream), var(--color-cream)) padding-box, var(--gradient-biscarosse-sunset) border-box
      border-radius: calc(var(--button-height-size) / 2)
      border: var(--button-border-size) solid transparent
      overflow: hidden

      &--transparent
        --background-color: transparent

        background: transparent

      &:before
        content: ''
        background-color: var(--background-color)
        width: 100%
        height: 100%
        position: absolute
        top: 0
        transition: var(--slow-transition)

      &:deep(svg)
        width: var(--icon-size-regular)
        height: var(--icon-size-regular)
        transition: var(--slow-transition)

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
        padding: var(--spacing-xs-000) 0

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
    --background-color: var(--color-soil)

    .button__icon
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
    --background-color: var(--color-cream)

    .button__icon
      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

  //// Secondary
  .button--secondary
    --icon-color: var(--color-soil)
    --text-color: var(--color-soil)
    --outline-color: var(--color-soil)
    --background-color: var(--color-cream)

    .button__icon
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
    --background-color: var(--color-soil)

    .button__icon
      &:deep(svg)
        stroke: var(--icon-color)

    .button__label
      color: var(--text-color)

    &:hover
      --text-color: var(--color-soil)

      & .button__icon--transparent
        --icon-color: var(--color-soil)

  // Events
  .button
    &:hover
      --amplitude: var(--spacing-s-000)

      animation: excited var(--duration-running) var(--ease-peps)

    &:focus
      transform: var(--focus-scale)

    &:active
      transform: var(--active-scale)

    &:focus, &:active
      --outline-color: var(--color-clear-water)

      outline: none
      z-index: 2
</style>
