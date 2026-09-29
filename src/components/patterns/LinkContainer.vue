<script lang="ts">
  import { defineComponent } from 'vue'
  import { withTheme } from '@/composables/theme'
  import Button from '@/components/ui/Button.vue'
  import Container from '@/components/ui/Container.vue'

  export default defineComponent({
    name: 'LinkContainer',
    mixins: [withTheme],
    components: {
      Button,
      Container,
    },
    props: {
      description: String,
      cta: String,
      href: String,
      alt: String,
    },
  })
</script>

<template>
  <Container>
    <div class="link-container__content" :data-theme="resolvedTheme">
      <div class="link-container__icon">
        <slot name="icon"></slot>
      </div>
      <div class="link-container__description">
        <p>{{ description }}</p>
      </div>
      <div class="link-container__cta">
        <Button
          type="secondary"
          :path="href"
          :label="cta"
          layout="SIMPLE"
          :alt="alt"
          :theme="resolvedTheme"
        />
      </div>
    </div>
  </Container>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .link-container
    &__content
      display: flex
      gap: var(--layout-row-gap) var(--layout-column-gap)

    &__icon
      padding: var(--spacing-s-000) 0

      :deep(svg)
        width: var(--icon-size-large)
        height: var(--icon-size-large)

    &__description
      flex: 1
      display: flex
      align-items: center

  @include device.tablet-portrait
    .link-container
      &__content
        flex-flow: column nowrap
        align-items: center

  @include device.smartphone
    .link-container
      &__content
        flex-flow: column nowrap
        align-items: center
</style>
