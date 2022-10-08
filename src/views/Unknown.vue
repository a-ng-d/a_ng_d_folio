<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import type { Option } from '@/utilities/types'
  import Button from '@/components/ui/Button.vue'
  import Dropdown from '@/components/ui/Dropdown.vue'
  import Container from '@/components/ui/Container.vue'
  import Label from '@/components/ui/Label.vue'
  import Switch from '@/components/ui/Switch.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import { Home } from 'lucide-vue-next'
  import { filters } from '@/utilities/colors'
  import { i18n } from '@/lang'

  export default defineComponent ({
    name: 'Unknown',
    components: {
      Button,
      Dropdown,
      Container,
      Label,
      Switch,
      Footer,
      Home
    },
    props: {
      filter: Object,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    watch: {
      filter(to) {
        to['name'] === 'NIGHTLY' ? this.$emit('theme', 'DARK') : this.$emit('theme', 'DEFAULT')
      }
    },
    data: function() {
      return {
        store,
        povs: [
          {
            name: i18n.global.t('unknown.pov.reset'),
            action: () => {
              this.$emit('pov', 'RESET')
              this.$el.scrollTop = 0
            },
            isActive: true
          },
          {
            name: i18n.global.t('unknown.pov.invert'),
            action: () => {
              this.$emit('pov', 'INVERT')
              this.$el.scrollTop = 0
            },
            isActive: false
          },
          {
            name: i18n.global.t('unknown.pov.dontLookUp'),
            action: () => {
              this.$emit('pov', 'DONTLOOKUP')
              this.$el.scrollTop = 0
            },
            isActive: false
          },
          {
            name: i18n.global.t('unknown.pov.dive'),
            action: () => {
              this.$emit('pov', 'DIVE_3')
              this.$el.scrollTop = 0
            },
            isActive: false
          },
          {
            name: i18n.global.t('unknown.pov.side'),
            action: () => {
              this.$emit('pov', 'SIDE')
              this.$el.scrollTop = 0
            },
            isActive: false
          },
          {
            name: i18n.global.t('unknown.pov.global'),
            action: () => {
              this.$emit('pov', 'GLOBAL')
              this.$el.scrollTop = 0
            },
            isActive: false
          }
        ] as Array<Option>,
        filters: [
          {
            name: i18n.global.t('unknown.filter.creamySun'),
            action: () => this.$emit('filter', filters.creamySun),
            isActive: true
          },
          {
            name: i18n.global.t('unknown.filter.softWind'),
            action: () => this.$emit('filter', filters.softWind),
            isActive: false
          },
          {
            name: i18n.global.t('unknown.filter.candyFloss'),
            action: () => this.$emit('filter', filters.candyFloss),
            isActive: false
          },
          {
            name: i18n.global.t('unknown.filter.grayscale'),
            action: () => this.$emit('filter', filters.grayscale),
            isActive: false
          },
          {
            name: i18n.global.t('unknown.filter.nightly'),
            action: () => this.$emit('filter', filters.nightly),
            isActive: false
          }
        ] as Array<Option>
      }
    }
  })
</script>

<template>
  <main class="page">
    <article class="unknown" :data-theme="theme">
      <section class="controler">
        <Transition name="slide-up" style="--delay: calc(var(--duration-turtoise) + (var(--duration-step) * 1))" appear>
          <div class="controler__content controler__content">
            <h3>{{ $t('unknown.intro.title') }}</h3>
            <p>{{ $t('unknown.intro.subtitle') }}</p>
            <Button
              type="primary"
              layout="ICON-LEFT"
              :label="$t('global.back.home')"
              path="/"
              :alt="$t('actions.home')"
              :theme="theme"
              extensible
            >
              <template #icon>
                <Home :size="24" />
              </template>
            </Button>
          </div>
        </Transition>
        <Transition name="slide-up" style="--delay: calc(var(--duration-turtoise) + (var(--duration-step) * 3))" appear>
          <div class="controler__scroll">
            <Label
              :label="$t('global.scrollDown')"
              :theme="theme"
            />
          </div>
        </Transition>
        <Transition name="slide-up" style="--delay: calc(var(--duration-turtoise) + (var(--duration-step) * 2))" appear>
          <div v-if="store.device != 'MOBILE'" class="controler__content controler__content">
            <Dropdown
              :label="$t('unknown.pov.title')"
              :options="povs"
              :alt="$t('actions.pov')"
              :theme="theme"
            />
            <Dropdown
              :label="$t('unknown.filter.title')"
              :options="filters"
              :alt="$t('actions.filter')"
              :theme="theme"
            />
            <Container>
              <div class="switch-container">
                <Switch
                  :label="$t('unknown.glitch.title')"
                  :on="() => $emit('glitch', true)"
                  :off="() => $emit('glitch', false)"
                  :alt="$t('actions.glitch')"
                  :theme="theme"
                />
              </div>
            </Container>
            <Container>
              <div class="switch-container">
                <Switch
                  :label="$t('unknown.quality.title')"
                  :on="() => $emit('quality', 'LOW')"
                  :off="() => $emit('quality', 'HIGH')"
                  :alt="$t('actions.quality')"
                  :theme="theme"
                />
              </div>
            </Container>
          </div>
        </Transition>
      </section>
    </article>
    <Transition name="pull-up" style="--delay: var(--delay-turtoise)" appear>
      <Footer
        alignment="L"
        :theme="theme"
      />
    </Transition>
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .unknown
    grid-area: main
    height: 10000rem

  .controler
    display: flex
    flex-flow: row nowrap
    justify-content: space-between
    align-items: flex-end
    padding: var(--header-height-size) var(--layout-center) var(--layout-center) var(--layout-center)
    gap: 0 var(--layout-column-gap)
    width: 100%
    height: 100%
    position: fixed
    top: 0
    pointer-events: none

    &__content
      display: flex
      flex-flow: column nowrap
      flex: 0 1 340rem
      gap: var(--layout-row-gap) 0
      pointer-events: all

  @include device.tablet
    .controler
      padding: var(--header-height-size) var(--layout-center) var(--spacing-xl-200) var(--layout-center)

  @include device.smartphone
    .controler
      flex-flow: column nowrap
      padding: var(--header-height-size) var(--layout-center) var(--spacing-xl-500) var(--layout-center)
      align-items: center

  // Aspect
  .unknown
    &[data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
