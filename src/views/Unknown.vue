<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import type { HuSaLiTy, Option } from '@/utilities/types'
  import Button from '@/components/ui/Button.vue'
  import Dropdown from '@/components/ui/Dropdown.vue'
  import Container from '@/components/ui/Container.vue'
  import Label from '@/components/ui/Label.vue'
  import Switch from '@/components/ui/Switch.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Particles from '@/components/graphics/Particles.vue'
  import type { Shape } from '@/components/graphics/Particles.vue'
  import { Home } from 'lucide-vue-next'
  import { filters, HSLColors } from '@/utilities/colors'
  import type { DispositionKind } from '@/glitchscape/dispositions'
  import {
    DISPOSITION_KEYS,
    FREE_DISPOSITION,
    INSPECTOR_DEFAULT,
    dispositions,
  } from '@/glitchscape/dispositions'
  import { FLOW_KINDS } from '@/glitchscape/flow'
  import { SCENE_DEFAULTS } from '@/glitchscape/universes'
  import { fineKnobs, knobs } from '@/glitchscape/knobs'
  import { i18n } from '@/lang'

  const FADE = 48

  type ParticlesField = 'shape' | 'speed' | 'weight' | 'grain' | 'movement'

  interface ParticlesKnobStep {
    key: string
    value: number | string
  }

  interface ParticlesKnob {
    field: ParticlesField
    alt: string
    steps: Array<ParticlesKnobStep>
  }

  const particlesKnobs: Array<ParticlesKnob> = [
    {
      field: 'shape',
      alt: 'actions.particlesShape',
      steps: [
        { key: 'line', value: 'line' },
        { key: 'square', value: 'square' },
        { key: 'triangle', value: 'triangle' },
      ],
    },
    {
      field: 'speed',
      alt: 'actions.particlesSpeed',
      steps: [
        { key: 'slow', value: 0.05 },
        { key: 'steady', value: 0.1 },
        { key: 'brisk', value: 0.25 },
        { key: 'racing', value: 0.5 },
      ],
    },
    {
      field: 'weight',
      alt: 'actions.particlesWeight',
      steps: [
        { key: 'thin', value: 8 },
        { key: 'even', value: 16 },
        { key: 'thick', value: 32 },
        { key: 'massive', value: 64 },
      ],
    },
    {
      field: 'grain',
      alt: 'actions.particlesGrain',
      steps: [
        { key: 'fine', value: 0.4 },
        { key: 'regular', value: 1 },
        { key: 'coarse', value: 2 },
        { key: 'chunky', value: 4 },
      ],
    },
    {
      field: 'movement',
      alt: 'actions.particlesMovement',
      steps: [
        { key: 'up', value: 'go-up' },
        { key: 'right', value: 'go-right' },
        { key: 'down', value: 'go-down' },
        { key: 'left', value: 'go-left' },
      ],
    },
  ]

  export default defineComponent({
    name: 'Unknown',
    components: {
      Button,
      Dropdown,
      Container,
      Label,
      Switch,
      Footer,
      Particles,
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
    computed: {
      defaults(): typeof SCENE_DEFAULTS {
        return SCENE_DEFAULTS
      },
      isFree(): boolean {
        return this.disposition === FREE_DISPOSITION
      },
      effective(): { [key: string]: number | string | undefined } {
        return {
          ...(dispositions[this.disposition] as {
            [key: string]: number | string | undefined
          }),
          ...this.fine,
        }
      },
      fineControls(): Array<{ field: string; options: Array<Option> }> {
        return fineKnobs.map((knob) => {
          const current = this.effective[knob.field]
          let active = knob.steps.findIndex((step) => step.value === current)
          if (active < 0) active = 0

          return {
            field: knob.field,
            options: knob.steps.map((step, index: number) => ({
              name: i18n.global.t(`unknown.${knob.field}.${step.key}`),
              action: () => this.pickKnob(knob.field, step.value),
              isActive: index === active,
            })) as Array<Option>,
          }
        })
      },
      effectiveParticles(): { [key: string]: number | string } {
        return {
          shape: this.particlesShape,
          speed: this.particlesSpeed,
          weight: this.particlesWeight,
          grain: this.particlesGrain,
          movement: this.particlesMovement,
        }
      },
      particlesControls(): Array<{
        field: string
        alt: string
        options: Array<Option>
      }> {
        return particlesKnobs.map((knob) => {
          const current = this.effectiveParticles[knob.field]
          let active = knob.steps.findIndex((step) => step.value === current)
          if (active < 0) active = 0

          return {
            field: knob.field,
            alt: knob.alt,
            options: knob.steps.map((step, index: number) => ({
              name: i18n.global.t(
                `unknown.particles.${knob.field}.${step.key}`
              ),
              action: () => this.pickParticlesKnob(knob.field, step.value),
              isActive: index === active,
            })) as Array<Option>,
          }
        })
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
          {
            name: i18n.global.t('unknown.filter.softSteel'),
            action: () => this.$emit('filter', filters.softSteel),
            isActive: false,
          },
          {
            name: i18n.global.t('unknown.filter.biscarosse'),
            action: () => this.$emit('filter', filters.biscarosse),
            isActive: false,
          },
        ] as Array<Option>,
        disposition: INSPECTOR_DEFAULT as DispositionKind,
        flow: FLOW_KINDS[0] as string,
        arrangements: DISPOSITION_KEYS.map((key: DispositionKind) => ({
          name: i18n.global.t(`unknown.disposition.${key.toLowerCase()}`),
          action: () => this.pickDisposition(key),
          isActive: key === INSPECTOR_DEFAULT,
        })) as Array<Option>,
        flows: FLOW_KINDS.map((kind: string, index: number) => ({
          name: i18n.global.t(`unknown.flow.${kind.toLowerCase()}`),
          action: () => this.pickFlow(kind),
          isActive: index === 0,
        })) as Array<Option>,
        fine: {} as { [key: string]: number | string },
        atmosphere: {} as { [key: string]: number | string | boolean },
        generation: 0 as number,
        fadeTop: 0 as number,
        fadeBottom: 0 as number,
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
        particlesShape: 'line' as Shape,
        particlesSpeed: 0.1 as number,
        particlesWeight: 64 as number,
        particlesGrain: 1 as number,
        particlesMovement: 'go-right' as string,
        particlesExpanded: false as boolean,
        particlesColors: [] as Array<HuSaLiTy>,
        particlesGeneration: 0 as number,
        particlesPalettes: [
          {
            name: i18n.global.t('unknown.particles.colors.primary'),
            action: () => this.pickParticlesPalette('primary'),
            isActive: true,
          },
          {
            name: i18n.global.t('unknown.particles.colors.grayscale'),
            action: () => this.pickParticlesPalette('grayscale'),
            isActive: false,
          },
          {
            name: i18n.global.t('unknown.particles.colors.spectrum'),
            action: () => this.pickParticlesPalette('spectrum'),
            isActive: false,
          },
        ] as Array<Option>,
      }
    },
    methods: {
      measureFades() {
        const panel = this.$refs.panel as HTMLElement | undefined
        if (panel === undefined) return

        const hidden = panel.scrollHeight - panel.clientHeight

        this.fadeTop = Math.min(panel.scrollTop, FADE)
        this.fadeBottom = Math.min(Math.max(hidden - panel.scrollTop, 0), FADE)
      },
      pickDisposition(key: DispositionKind) {
        this.fine =
          key === FREE_DISPOSITION
            ? ({ ...this.effective } as { [key: string]: number | string })
            : {}
        this.disposition = key
        this.generation += 1
        this.applyScene()
        this.$nextTick(this.measureFades)
      },
      pickKnob(field: string, value: number | string | boolean) {
        if (fineKnobs.some((knob) => knob.field === field))
          this.fine = { ...this.fine, [field]: value as number | string }
        else this.atmosphere = { ...this.atmosphere, [field]: value }

        this.applyScene()
      },
      pickParticlesKnob(field: ParticlesField, value: number | string) {
        const setters: { [key: string]: (v: number | string) => void } = {
          shape: (v) => (this.particlesShape = v as Shape),
          speed: (v) => (this.particlesSpeed = v as number),
          weight: (v) => (this.particlesWeight = v as number),
          grain: (v) => (this.particlesGrain = v as number),
          movement: (v) => (this.particlesMovement = v as string),
        }
        setters[field]?.(value)
        this.particlesGeneration += 1
      },
      pickParticlesPalette(kind: 'primary' | 'grayscale' | 'spectrum') {
        this.particlesColors =
          kind === 'spectrum'
            ? Object.values(HSLColors)
            : Object.values(HSLColors).filter(
                (entry: HuSaLiTy) => entry.type === kind
              )
      },
      pickFlow(kind: string) {
        this.flow = kind
        this.applyScene()
      },
      applyScene() {
        this.$emit('scene', {
          ...dispositions[this.disposition],
          flow: this.flow,
          ...this.fine,
          ...this.atmosphere,
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
      this.measureFades()
      window.addEventListener('resize', this.measureFades)
      this.mouseOffsetCatching()
      this.clickCatching()
      this.touchCatching()
      this.fadeInterval = setInterval(this.fadeOutUI, 4000)
    },
    unmounted: function () {
      window.removeEventListener('resize', this.measureFades)
      this.$el.onmousemove = null
      this.$el.onclick = null
      clearInterval(this.fadeInterval)
    },
  })
</script>

<template>
  <main class="page">
    <article class="unknown" :data-theme="theme">
      <div class="particles-test">
        <Particles
          :weight="particlesWeight"
          :shape="particlesShape"
          :speed="particlesSpeed"
          :particleSize="particlesGrain"
          :movement="particlesMovement"
          :colors="particlesColors"
          :isExpanded="particlesExpanded"
        />
      </div>
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
            class="controler__content controler__content--scrolling"
            ref="panel"
            @scroll.passive="measureFades"
            :style="`--fade-top: ${fadeTop}px; --fade-bottom: ${fadeBottom}px`"
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
            <Dropdown
              v-for="control in isFree ? fineControls : []"
              :key="`${control.field}-${generation}`"
              :label="$t(`unknown.${control.field}.title`)"
              :options="control.options"
              :alt="$t(`actions.${control.field}`)"
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
                  :label="$t('unknown.endless.title')"
                  :on="() => pickKnob('endless', true)"
                  :off="() => pickKnob('endless', false)"
                  :alt="$t('actions.endless')"
                  :theme="theme"
                />
                <Switch
                  :label="$t('unknown.quality.title')"
                  :on="() => $emit('quality', 'LOW')"
                  :off="() => $emit('quality', 'HIGH')"
                  :alt="$t('actions.quality')"
                  :theme="theme"
                />
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
              <div class="switch-row">
                <Dropdown
                  v-for="control in particlesControls"
                  :key="`${control.field}-${particlesGeneration}`"
                  :label="$t(`unknown.particles.${control.field}.title`)"
                  :options="control.options"
                  :alt="$t(control.alt)"
                  :theme="theme"
                />
                <Dropdown
                  :label="$t('unknown.particles.colors.title')"
                  :options="particlesPalettes"
                  :alt="$t('actions.particlesColors')"
                  :theme="theme"
                />
                <Switch
                  :label="$t('unknown.particles.expanded.title')"
                  :active="particlesExpanded"
                  :on="() => (particlesExpanded = true)"
                  :off="() => (particlesExpanded = false)"
                  :alt="$t('actions.particlesExpanded')"
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

  .particles-test
    position: fixed
    inset: 0
    z-index: 1
    pointer-events: none

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
    z-index: 2
    pointer-events: none

    &__content
      display: flex
      flex-flow: column nowrap
      flex: 0 1 340rem
      gap: var(--layout-row-gap) 0
      pointer-events: all

      &--scrolling
        flex-basis: calc(340rem + (var(--spacing-m-300) * 2))
        max-height: 100%
        overflow-y: auto
        overflow-x: hidden
        overscroll-behavior: contain
        padding: var(--spacing-m-300)
        -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 var(--fade-top, 0px), #000 calc(100% - var(--fade-bottom, 0px)), transparent 100%)
        mask-image: linear-gradient(to bottom, transparent 0, #000 var(--fade-top, 0px), #000 calc(100% - var(--fade-bottom, 0px)), transparent 100%)

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
