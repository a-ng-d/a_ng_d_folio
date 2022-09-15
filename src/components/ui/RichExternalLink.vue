<script lang="ts">
  import { defineComponent } from 'vue'
  import Audio from '@/components/ui/Audio.vue'

  export default defineComponent({
    name: 'RichExternalLink',
    components: {
      Audio
    },
    props: {
      title: String,
      description: String,
      color: {
        type: String,
        default: 'var(color-soil)'
      },
      href: String,
      alt: String,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        state: ''
      }
    }
  })
</script>

<template>
  <a
    class="rich-external-link"
    :href="href"
    target="_blank"
    :alt="alt"
    @mouseover="state = 'OVER'"
    @mouseout="state = 'NORMAL'"
    @touchstart.passive="state = 'OVER'"
    @touchend.passive="state = 'NORMAL'"
    @focus="state = 'FOCUS'"
    @blur="state = 'NORMAL'"
    :data-theme="theme"
  >
    <div class="rich-external-link__icon" :style="`background-color: ${color}`">
      <slot name="icon"></slot>
    </div>
    <div class="rich-external-link__content">
      <h5>{{ title }}</h5>
      <p>{{ description }}</p>
    </div>
    <Audio
      v-if="state === 'OVER'"
      src="/sounds/interaction-over.mp3"
      autoplay
      :volume=".5"
    />
    <Audio
      v-else-if="state === 'FOCUS'"
      src="/sounds/interaction-focus.mp3"
      autoplay
      :volume=".5"
    />
  </a>
</template>

<style scoped lang="sass">
  // Structure
  .rich-external-link
    display: flex
    gap: var(--layout-row-gap) var(--layout-column-gap)
    padding: var(--spacing-l-000)
    border: var(--border-size) solid transparent
    border-radius: var(--regular-border-radius)
    transition: var(--simple-transition)
    transform-origin: center center
    box-shadow: 0 0 0 var(--button-border-size) var(--outline-color)

    &__icon
      display: flex
      flex: 0 0 var(--rich-external-link-size)
      width: var(--rich-external-link-size)
      height: var(--rich-external-link-size)
      justify-content: center
      align-items: center
      border-radius: calc(var(--rich-external-link-size) / 2)
      border: var(--border-large-size) solid var(--border-color)
      transition: var(--simple-transition)

      &:deep(svg)
        width: var(--icon-size-large)
        height: var(--icon-size-large)

    &__content
      display: flex
      flex-flow: column nowrap
      justify-content: center
      gap: var(--layout-label-gap) 0

      h5, p
        transition: var(--simple-transition)

      p
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        overflow: hidden

  // Aspect
  .rich-external-link
    --container-color: transparent
    --outline-color: transparent

    color: var(--text-color)
    background: var(--container-color)

    &__icon :deep(svg)
      stroke: var(--icon-color)

    &[data-theme="DARK"]
      --icon-color: var(--color-soil)
      --text-color: var(--color-cream)
      --border-color: var(--color-cream)

  // Events
  .rich-external-link
    &:hover
      --amplitude: var(--spacing-s-000)
      --container-color: inherit
      --outline-color: var(--color-soil)

      animation: excited var(--duration-running) var(--ease-peps)

    &:focus
      transform: var(--focus-scale)

    &:active
      transform: var(--active-scale)

    &:focus, &:active
      --container-color: inherit
      --outline-color: var(--border-focus-color)

      z-index: 2

    &[data-theme="DARK"]
      &:hover, &:focus
        --text-color: var(--color-soil)
        --border-color: var(--color-soil)
        --outline-color: var(--color-cream)
</style>
