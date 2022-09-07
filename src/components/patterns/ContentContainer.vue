<script lang="ts">
  import { defineComponent } from 'vue'
  import Container from '@/components/ui/Container.vue'

  export default defineComponent({
    name: 'ContentContainer',
    components: {
      Container
    },
    props: {
      title: String,
      description: String,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  })
</script>

<template>
  <Container>
    <div class="content-container__content" :data-theme="theme">
      <slot name="icon"></slot>
      <template v-if="title != undefined">
        <h5>{{ title }}</h5>
      </template>
      <p>{{ description }}</p>
    </div>
  </Container>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .content-container
    &__content
      display: flex
      flex-flow: column nowrap
      gap: var(--layout-row-gap) 0

      :deep(svg)
        margin: 0 0 var(--layout-column-gap) 0

  @include device.mobile
    .content-container
      &__content
        flex-flow: column nowrap
        align-items: center

  // Aspect
  .content-container__content
    &[data-theme="DARK"]
      --text-color: var(--color-soil)
</style>
