<script lang="ts">
  import { defineComponent } from 'vue'
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
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        povs: [
          {
            name: i18n.global.t('unknown.pov.reset'),
            action: () => this.$emit('pov', 'RESET'),
            isActive: true
          },
          {
            name: i18n.global.t('unknown.pov.invert'),
            action: () => this.$emit('pov', 'INVERT'),
            isActive: false
          },
          {
            name: i18n.global.t('unknown.pov.dontLookUp'),
            action: () => this.$emit('pov', 'DONTLOOKUP'),
            isActive: false
          },
          {
            name: i18n.global.t('unknown.pov.mirror'),
            action: () => this.$emit('pov', 'MIRROR_3'),
            isActive: false
          },
          {
            name: i18n.global.t('unknown.pov.side'),
            action: () => this.$emit('pov', 'SIDE'),
            isActive: false
          },
          {
            name: i18n.global.t('unknown.pov.global'),
            action: () => this.$emit('pov', 'GLOBAL'),
            isActive: false
          }
        ],
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
        ]
      }
    }
  })
</script>

<template>
  <main class="page">
    <section class="unknown">
      <Transition name="slide-up" style="--delay: calc(var(--duration-turtoise) + (var(--duration-step) * 1))" appear>
        <div class="unknown__content unknown__content--left">
          <h3>{{ $t('unknown.intro.title') }}</h3>
          <p>{{ $t('unknown.intro.subtitle') }}</p>
          <Button
            type="primary"
            layout="ICON-LEFT"
            :label="$t('global.back.home')"
            path="/"
            :theme="theme"
            extensible
          >
            <template #icon>
              <Home :size="24" />
            </template>
          </Button>
        </div>
      </Transition>
      <Transition name="slide-up" style="--delay: calc(var(--duration-turtoise) + (var(--duration-step) * 2))" appear>
        <div class="unknown__content unknown__content--right">
          <Dropdown
            :label="$t('unknown.pov.title')"
            :options="povs"
            :theme="theme"
          />
          <Dropdown
            :label="$t('unknown.filter.title')"
            :options="filters"
            :theme="theme"
          />
          <Container>
            <div class="switch-container">
              <Switch
                :label="$t('unknown.glitch.title')"
                :on="() => $emit('glitch', true)"
                :off="() => $emit('glitch', false)"
              />
            </div>
          </Container>
          <Container>
            <div class="switch-container">
              <Switch
                :label="$t('unknown.quality.title')"
                :on="() => $emit('quality', 'LOW')"
                :off="() => $emit('quality', 'HIGH')"
              />
            </div>
          </Container>
        </div>
      </Transition>
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

    &__content
      display: flex
      flex-flow: column nowrap
      position: fixed
      width: 400rem
      top: var(--header-height-size)
      gap: var(--layout-row-gap) 0

      &--right
        right: var(--layout-center)

      &--left
        left: var(--layout-center)

  // Aspect
  .unknown
    &[data-theme="DARK"]
      --text-color: var(--color-cream)
</style>
