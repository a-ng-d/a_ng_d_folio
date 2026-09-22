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
    FREE_DISPOSITION,
    INSPECTOR_DEFAULT,
    dispositions,
  } from '@/glitchscape/dispositions'
  import { FLOW_KINDS } from '@/glitchscape/flow'
  import { fineKnobs, knobs } from '@/glitchscape/knobs'
  import { i18n } from '@/lang'

  /** How far the panel fades out at an edge it has content beyond. */
  const FADE = 48

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
    computed: {
      isFree(): boolean {
        return this.disposition === FREE_DISPOSITION
      },
      /** Where every geometry dimension actually sits right now. */
      effective(): { [key: string]: number | string | undefined } {
        return {
          ...(dispositions[this.disposition] as {
            [key: string]: number | string | undefined
          }),
          ...this.fine,
        }
      },
      /**
       * Built from the values in play rather than fixed at startup, so opening
       * Free shows what the disposition you came from had set — which is the
       * point: seeing how a disposition moves each dial before moving it.
       */
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
        // Kept apart: a disposition owns the geometry, so picking one must
        // not wipe the weather or the light you set alongside it.
        fine: {} as { [key: string]: number | string },
        atmosphere: {} as { [key: string]: number | string | boolean },
        generation: 0 as number,
        // Height of the fade at each edge, in pixels. Tracking the scroll
        // rather than toggling a class keeps the mask from popping, and
        // leaves it at zero when nothing overflows at all.
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
      pickDisposition(key: string) {
        // Free inherits what you were just looking at; anything else replaces it.
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
        // Only the switches carry booleans, and none of them is a fine
        // dimension, so geometry stays numbers and names.
        if (fineKnobs.some((knob) => knob.field === field))
          this.fine = { ...this.fine, [field]: value as number | string }
        else this.atmosphere = { ...this.atmosphere, [field]: value }

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
            <!--The geometry only opens on the disposition that allows moving it.
                Remounting on each pick is what lets every dial show where the
                disposition you came from had left it.-->
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

      // One ordered list, however long it gets. The dropdowns render to the
      // body, so nothing here can clip the list one of them opens.
      //
      // The padding keeps the edges of the controls off the scroll box,
      // which would otherwise shave their outlines. The basis grows by the
      // same amount instead of a negative margin clawing it back, so the
      // controls keep their width without the panel reaching outside the
      // container. The mask dissolves whatever runs past an edge.
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
