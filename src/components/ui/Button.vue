<script lang="ts">
  export default {
    name: 'Button',
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      inverted: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        type: this.type,
        inverted: false
      }
    }
  }
</script>

<template>
  <button class="button" :class="['button--' + type, inverted ? 'button--' + type + '--inverted' : '']">
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
  </button>
</template>

<style lang="sass">
  @use '@/assets/text-styles.sass' as text

  .button
    display: flex
    align-items: stretch
    height: var(--sizing-xl-000)
    padding: 0
    border: 0
    border-radius: calc(var(--sizing-xl-000) / 2)

    &__content
      display: flex

    &__icon
      display: flex
      width: var(--spacing-xl-000)
      justify-content: center
      align-items: center

    &__label
      display: flex
      align-items: center
      padding: 0 var(--spacing-l-000)
      @include text.label



</style>
