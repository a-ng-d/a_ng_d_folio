<script lang="ts">
  import Button from '@/components/ui/Button.vue'

  export default {
    name: 'Empty',
    components: {
      Button
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  }
</script>

<template>
  <main class="page">
    <section class="empty">
      <div class="empty__actions">
        <Button
          type="secondary"
          label="Reset"
          :theme="theme"
          @click="$emit('pov', 'RESET')"
        />
        <Button
          type="secondary"
          label="Wise eye"
          :theme="theme"
          @click="$emit('pov', 'WISEEYE')"
        />
        <Button
          type="secondary"
          label="Bird eye 1"
          :theme="theme"
          @click="$emit('pov', 'BIRDEYE_1')"
        />
        <Button
          type="secondary"
          label="Bird eye 2"
          :theme="theme"
          @click="$emit('pov', 'BIRDEYE_2')"
        />
        <Button
          type="secondary"
          label="Bird eye 3"
          :theme="theme"
          @click="$emit('pov', 'BIRDEYE_3')"
        />
        <Button
          type="secondary"
          label="Bird eye 4"
          :theme="theme"
          @click="$emit('pov', 'BIRDEYE_4')"
        />
        <Button
          type="secondary"
          label="Bird eye 5"
          :theme="theme"
          @click="$emit('pov', 'BIRDEYE_5')"
        />
        <Button
          type="secondary"
          label="Global"
          :theme="theme"
          @click="$emit('pov', 'GLOBAL')"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="sass">
  // Structure
  .empty
    grid-area: main
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    padding: var(--spacing-xl-600) var(--layout-center)
    height: 10000rem

    &[data-theme="DARK"]
      --text-color: var(--color-cream)

    &__actions
      display: flex
      justify-content: space-between
      gap: var(--spacing-xl-000)
      width: 100%
      position: fixed
      left: 0
      bottom: 0
      padding: var(--spacing-l-000)
</style>
