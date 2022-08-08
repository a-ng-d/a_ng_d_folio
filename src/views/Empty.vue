<script lang="ts">
  import Button from '@/components/ui/Button.vue'
  import { filters } from '@/utilities/colors'

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
    },
    data: function() {
      return {
        filters : filters
      }
    }
  }
</script>

<template>
  <main class="page">
    <section class="empty">
      <div class="empty__actions">
        <div class="empty__actions__row">
          <p>Camera</p>
          <Button
            type="secondary"
            label="Reset"
            :theme="theme"
            @click="$emit('pov', 'RESET')"
          />
          <Button
            type="secondary"
            label="Wise"
            :theme="theme"
            @click="$emit('pov', 'WISEEYE')"
          />
          <Button
            type="secondary"
            label="Bird 1"
            :theme="theme"
            @click="$emit('pov', 'BIRDEYE_1')"
          />
          <Button
            type="secondary"
            label="Bird 2"
            :theme="theme"
            @click="$emit('pov', 'BIRDEYE_2')"
          />
          <Button
            type="secondary"
            label="Bird 3"
            :theme="theme"
            @click="$emit('pov', 'BIRDEYE_3')"
          />
          <Button
            type="secondary"
            label="Bird 4"
            :theme="theme"
            @click="$emit('pov', 'BIRDEYE_4')"
          />
          <Button
            type="secondary"
            label="Bird 5"
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
        <div class="empty__actions__row">
          <p>Quality</p>
          <Button
            type="secondary"
            label="High quality"
            :theme="theme"
            @click="$emit('quality', 'HIGH')"
          />
          <Button
            type="secondary"
            label="Low quality"
            :theme="theme"
            @click="$emit('quality', 'LOW')"
          />
          <Button
            type="secondary"
            label="Glitch"
            :theme="theme"
            @click="$emit('glitch', true)"
          />
          <Button
            type="secondary"
            label="Unglitch"
            :theme="theme"
            @click="$emit('glitch', false)"
          />
        </div>
        <div class="empty__actions__row">
          <p>Filter</p>
          <Button
            type="secondary"
            label="Creamy sun"
            :theme="theme"
            @click="$emit('filter', filters.creamySun)"
          />
          <Button
            type="secondary"
            label="Soft wind"
            :theme="theme"
            @click="$emit('filter', filters.softWind)"
          />
          <Button
            type="secondary"
            label="Candy floss"
            :theme="theme"
            @click="$emit('filter', filters.candyFloss)"
          />
          <Button
            type="secondary"
            label="Grayscale"
            :theme="theme"
            @click="$emit('filter', filters.greyscale)"
          />
          <Button
            type="secondary"
            label="Nightly"
            :theme="theme"
            @click="$emit('filter', filters.nightly)"
          />
        </div>
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
      flex-flow: column
      width: 100%
      position: fixed
      left: 0
      bottom: 0
      padding: var(--spacing-l-000)
      gap: var(--spacing-l-000)

      &__row
        display: flex
        flex-flow: row nowrap
        gap: var(--spacing-m-000)
        align-items: center

        & > p
          flex: 0 1 100rem

        & > a
          flex: 1
</style>
