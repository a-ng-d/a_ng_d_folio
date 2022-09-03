<script lang="ts">
  import { defineComponent } from 'vue'
  import Button from '@/components/ui/Button.vue'
  import { Home } from 'lucide-vue-next'
  import { filters } from '@/utilities/colors'

  export default defineComponent ({
    name: 'Unknown',
    components: {
      Button,
      Home
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        filters : filters,
        pov: 'RESET',
        quality: 'HIGH',
        filter: 'CREAMY_SUN',
        glitch: false
      }
    },
    methods: {
      changeParam(event: any, message: any) {
        this[event] = typeof message != 'object' ? message : message.name
        this.$emit(event, message)
        this.$el.scrollTop = 0
      }
    }
  })
</script>

<template>
  <main class="page">
    <section class="unknown">
      <div class="unknown__content">
        <h3>{{ $t('unknown.intro.title') }}</h3>
        <p>{{ $t('unknown.intro.subtitle') }}</p>
        <Button
          type="primary"
          layout="ICON-LEFT"
          :label="$t('global.back.home')"
          path="/"
          :theme="theme"
        >
          <template #icon>
            <Home :size="24" />
          </template>
        </Button>
      </div>
      <div class="unknown__actions">
        <div class="unknown__actions__row">
          <p>Pov</p>
          <Button
            type="secondary"
            label="Reset"
            :theme="theme"
            @click="changeParam('pov', 'RESET')"
          />
          <Button
            type="secondary"
            label="Invert"
            :theme="theme"
            @click="changeParam('pov', 'INVERT')"
          />
          <Button
            type="secondary"
            label="Don't look up"
            :theme="theme"
            @click="changeParam('pov', 'DONTLOOKUP')"
          />
          <Button
            type="secondary"
            label="Mirror 1"
            :theme="theme"
            @click="$emit('pov', 'MIRROR_1')"
          />
          <Button
            type="secondary"
            label="Mirror 2"
            :theme="theme"
            @click="changeParam('pov', 'MIRROR_2')"
          />
          <Button
            type="secondary"
            label="Mirror 3"
            :theme="theme"
            @click="changeParam('pov', 'MIRROR_3')"
          />
          <Button
            type="secondary"
            label="Mirror 4"
            :theme="theme"
            @click="changeParam('pov', 'MIRROR_4')"
          />
          <Button
            type="secondary"
            label="Mirror 5"
            :theme="theme"
            @click="changeParam('pov', 'MIRROR_5')"
          />
          <Button
            type="secondary"
            label="Side"
            :theme="theme"
            @click="changeParam('pov', 'SIDE')"
          />
          <Button
            type="secondary"
            label="Global"
            :theme="theme"
            @click="changeParam('pov', 'GLOBAL')"
          />
        </div>
        <div class="unknown__actions__row">
          <p>Quality</p>
          <Button
            type="secondary"
            label="High quality"
            :theme="theme"
            @click="changeParam('quality', 'HIGH')"
          />
          <Button
            type="secondary"
            label="Low quality"
            :theme="theme"
            @click="changeParam('quality', 'LOW')"
          />
          <Button
            type="secondary"
            label="Glitch"
            :theme="theme"
            @click="changeParam('glitch', true)"
          />
          <Button
            type="secondary"
            label="Unglitch"
            :theme="theme"
            @click="changeParam('glitch', false)"
          />
        </div>
        <div class="unknown__actions__row">
          <p>Filter</p>
          <Button
            type="secondary"
            label="Creamy sun"
            :theme="theme"
            @click="changeParam('filter', filters.creamySun)"
          />
          <Button
            type="secondary"
            label="Soft wind"
            :theme="theme"
            @click="changeParam('filter', filters.softWind)"
          />
          <Button
            type="secondary"
            label="Candy floss"
            :theme="theme"
            @click="changeParam('filter', filters.candyFloss)"
          />
          <Button
            type="secondary"
            label="Grayscale"
            :theme="theme"
            @click="changeParam('filter', filters.grayscale)"
          />
          <Button
            type="secondary"
            label="Nightly"
            :theme="theme"
            @click="changeParam('filter', filters.nightly)"
          />
        </div>
      </div>
    </section>
    <Transition name="pull-up" style="--delay: var(--delay-turtoise)" appear>
      <Footer
        alignment="L"
        :theme="theme"
      />
    </Transition>
  </main>
</template>

<style scoped lang="sass">
  // Structure
  .unknown
    grid-area: main
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    padding: var(--spacing-xl-600) var(--layout-center)
    height: 10000rem

    &[data-theme="DARK"]
      --text-color: var(--color-cream)

    &__console
      position: fixed
      left: 0
      top: 200rem
      padding: var(--spacing-l-000)

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
