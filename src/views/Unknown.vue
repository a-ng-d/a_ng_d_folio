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
  import {
    DISPOSITION_KEYS,
    INSPECTOR_DEFAULT,
    dispositions,
  } from '@/glitchscape/dispositions'
  import { FLOW_KINDS } from '@/glitchscape/flow'
  import { knobs } from '@/glitchscape/knobs'
  import { i18n } from '@/lang'

  export default defineComponent({
    name: 'Unknown',
    components: {
      Button,
      Dropdown,
      Container,
      Label,
      Switch,
      Footer,
      Home,
    },
    props: {
      filter: Object,
      ui: {
        type: Boolean,
        default: true,
      },
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
    watch: {
      filter(to) {
        to['name'] === 'NIGHTLY'
          ? this.$emit('theme', 'DARK')
          : this.$emit('theme', 'DEFAULT')
      },
    },
    data: function () {
      return {
        store,
        filters: [
          {
            name: i18n.global.t('unknown.filter.creamySun'),
            action: () => this.$emit('filter', filters.creamySun),
            isActive: true,
          },
          {
            name: i18n.global.t('unknown.filter.softWind'),
            action: () => this.$emit('filter', filters.softWind),
            isActive: false,
          },
          {
            name: i18n.global.t('unknown.filter.candyFloss'),
            action: () => this.$emit('filter', filters.candyFloss),
            isActive: false,
          },
          {
            name: i18n.global.t('unknown.filter.grayscale'),
            action: () => this.$emit('filter', filters.grayscale),
            isActive: false,
          },
          {
            name: i18n.global.t('unknown.filter.nightly'),
            action: () => this.$emit('filter', filters.nightly),
            isActive: false,
          },
        ] as Array<Option>,
        disposition: INSPECTOR_DEFAULT as string,
        flow: FLOW_KINDS[0] as string,
        // Every arrangement of the relief, by name, so they can be compared
        // one against another. Direction is picked apart from them: two pages
        // facing opposite ways share a disposition and differ only by flow.
        arrangements: DISPOSITION_KEYS.map((key: string) => ({
          name: i18n.global.t(`unknown.disposition.${key.toLowerCase()}`),
          action: () => this.pickDisposition(key),
          isActive: key === INSPECTOR_DEFAULT,
        })) as Array<Option>,
        flows: FLOW_KINDS.map((kind: string, index: number) => ({
          name: i18n.global.t(`unknown.flow.${kind.toLowerCase()}`),
          action: () => this.pickFlow(kind),
          isActive: index === 0,
        })) as Array<Option>,
        // One dropdown per dimension of the scene, laid over whatever the
        // disposition already set, so each can be judged on its own.
        overrides: {} as { [key: string]: number | string },
        controls: knobs.map((knob) => ({
          field: knob.field,
          options: knob.steps.map((step, index: number) => ({
            name: i18n.global.t(`unknown.${knob.field}.${step.key}`),
            action: () => this.pickKnob(knob.field, step.value),
            isActive: index === 0,
          })) as Array<Option>,
        })),
        interval: 0 as number,
        currentInterval: 0 as number,
        fadeInterval: 0,
      }
    },
    methods: {
      pickDisposition(key: string) {
        this.disposition = key
        this.overrides = {}
        this.applyScene()
      },
      pickKnob(field: string, value: number | string) {
        this.overrides = { ...this.overrides, [field]: value }
        this.applyScene()
      },
      pickFlow(kind: string) {
        this.flow = kind
        this.applyScene()
      },
      applyScene() {
        this.$emit('scene', {
          ...dispositions[this.disposition],
          flow: this.flow,
          ...this.overrides,
        })
      },
      mouseOffsetCatching() {
        this.$el.onmousemove = (e: MouseEvent) => {
          this.currentInterval = e.clientX - e.clientY
          this.$emit('isUIHere', true)
        }
      },
      clickCatching() {
        this.$el.onclick = (e: MouseEvent) => {
          this.$emit('isUIHere', true)
          clearInterval(this.fadeInterval)
          this.fadeInterval = setInterval(this.fadeOutUI, 4000)
        }
      },
      touchCatching() {
        this.$el.ontouchstart = (e: TouchEvent) => {
          this.$emit('isUIHere', true)
          clearInterval(this.fadeInterval)
          this.fadeInterval = setInterval(this.fadeOutUI, 4000)
        }
      },
      fadeOutUI() {
        this.interval === this.currentInterval
          ? this.$emit('isUIHere', false)
          : this.$emit('isUIHere', true)
        this.interval = this.currentInterval
      },
    },
    mounted: function () {
      this.mouseOffsetCatching()
      this.clickCatching()
      this.touchCatching()
      this.fadeInterval = setInterval(this.fadeOutUI, 4000)
    },
    unmounted: function () {
      this.$el.onmousemove = null
      this.$el.onclick = null
      clearInterval(this.fadeInterval)
    },
  })
</script>

<template>
  <main class="page">
    <article class="unknown" :data-theme="theme">
      <section class="controler">
        <Transition
          name="slide-up"
          style="
            --delay: calc(
              var(--duration-turtoise) + (var(--duration-step) * 1)
            );
          "
          appear
        >
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
        <Transition
          name="slide-up"
          style="
            --delay: calc(
              var(--duration-turtoise) + (var(--duration-step) * 3)
            );
          "
          appear
        >
          <div class="controler__scroll">
            <Label :label="$t('global.scrollDown')" :theme="theme" />
          </div>
        </Transition>
        <Transition
          name="slide-up"
          style="
            --delay: calc(
              var(--duration-turtoise) + (var(--duration-step) * 2)
            );
          "
          appear
        >
          <div
            v-if="store.device != 'MOBILE'"
            class="controler__content controler__content"
          >
            <Dropdown
              :label="$t('unknown.disposition.title')"
              :options="arrangements"
              :alt="$t('actions.disposition')"
              :theme="theme"
            />
            <Dropdown
              :label="$t('unknown.flow.title')"
              :options="flows"
              :alt="$t('actions.flow')"
              :theme="theme"
            />
            <Dropdown
              v-for="control in controls"
              :key="control.field"
              :label="$t(`unknown.${control.field}.title`)"
              :options="control.options"
              :alt="$t(`actions.${control.field}`)"
              :theme="theme"
            />
            <Dropdown
              :label="$t('unknown.filter.title')"
              :options="filters"
              :alt="$t('actions.filter')"
              :theme="theme"
            />
            <Container>
              <div class="switch-row">
                <Switch
                  :label="$t('unknown.ambience.title')"
                  :on="() => pickKnob('ambience', 'LIVE')"
                  :off="() => pickKnob('ambience', 'FIXED')"
                  :alt="$t('actions.ambience')"
                  :theme="theme"
                />
                <Switch
                  :label="$t('unknown.glitch.title')"
                  :on="() => $emit('glitch', true)"
                  :off="() => $emit('glitch', false)"
                  :alt="$t('actions.glitch')"
                  :theme="theme"
                />
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
      <Footer alignment="L" :theme="theme" />
    </Transition>
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .unknown
    grid-area: main
    height: 10000rem
    transition: var(--slow-transition)
    opacity: v-bind("ui ? 1 : 0")

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

  .switch-row
    display: flex
    flex-flow: column nowrap
    gap: var(--layout-row-gap) 0

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
