<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { store } from '@/utilities/store'
  import type { HuBrInSaGr } from '@/utilities/types'
  import type {
    GlitchscapeController,
    LightKind,
    QualityKind,
    SceneConfig,
    SceneOverride,
  } from '@/glitchscape/types'
  import { createGlitchscape } from '@/glitchscape/sketch'
  import { DEFAULT_UNIVERSE, resolveScene } from '@/glitchscape/universes'
  import { HALO_INTENSITY } from '@/glitchscape/lighting'
  import {
    nightward,
    overcast,
    resolveLighting,
    tintPalette,
  } from '@/glitchscape/ambience'
  import { resolveFlow } from '@/glitchscape/flow'
  import { filters } from '@/utilities/colors'
  import { clamp } from '@/utilities/operations'
  import type { LocalWeather } from '@/utilities/weather'
  import { fetchLocalWeather } from '@/utilities/weather'

  const MAX_BRIGHTNESS = 1.1

  const VEIL = 0.35

  const DARK_SKY = 45

  const WEATHER_FLOOR = 600000

  const WEATHER_EVERY = 900000

  export default defineComponent({
    name: 'Glitchscape',
    emits: ['dark'],
    props: {
      universe: {
        type: String,
        default: DEFAULT_UNIVERSE,
      },
      scene: {
        type: Object as PropType<SceneOverride | null>,
        default: null,
      },
      filter: {
        type: Object as PropType<Partial<HuBrInSaGr>>,
        default: () => filters.grayscale,
      },
      quality: {
        type: String,
        default: 'HIGH',
      },
      isGlitched: Boolean,
      scrollProgress: {
        type: Number,
        default: 0,
      },
      scrollLimit: {
        type: Number,
        required: true,
      },
    },
    data: function () {
      return {
        store,
        controller: null as GlitchscapeController | null,
        weather: null as LocalWeather | null,
        isAsking: false as boolean,
        asked: 0 as number,
        watch: 0 as number,
        tick: 0 as number,
        clock: Date.now() as number,
      }
    },
    computed: {
      resolvedScene(): SceneConfig {
        return resolveScene(this.universe, this.scene || undefined)
      },
      resolvedFilter(): HuBrInSaGr {
        const custom = this.filter,
          resolved =
            custom !== null && custom !== undefined && custom.hue !== undefined
              ? (custom as HuBrInSaGr)
              : this.resolvedScene.filter

        return Number(resolved.brightness) > MAX_BRIGHTNESS
          ? { ...resolved, brightness: String(MAX_BRIGHTNESS) }
          : resolved
      },
      ambientGradient(): string | null {
        return this.resolvedFilter.gradient || null
      },
      lightStyle(): string {
        const filter = this.resolvedFilter

        return `hue-rotate(${filter.hue}) brightness(${filter.brightness})`
      },
      polarityStyle(): string {
        return `filter: invert(${this.resolvedFilter.invert})`
      },
      toneStyle(): string {
        const filter = this.resolvedFilter

        return `filter: saturate(${filter.saturation}) grayscale(${filter.grayscale})`
      },
      roll(): number {
        const bearing = resolveFlow(
          this.resolvedScene.flow,
          this.resolvedScene.curvature
        ).bearing

        return (bearing.roll * 180) / Math.PI
      },
      transformStyle(): string {
        if (this.roll === 0) return 'none'

        const radians = Math.abs((this.roll * Math.PI) / 180),
          cover = Math.cos(radians) + 2 * Math.sin(radians)

        return `rotate(${this.roll.toFixed(2)}deg) scale(${cover.toFixed(3)})`
      },
      isLive(): boolean {
        return this.resolvedScene.ambience === 'LIVE'
      },
      reading(): LocalWeather | null {
        return this.isLive ? this.weather : null
      },
      hour(): LightKind {
        const kind = resolveLighting(
          this.resolvedScene.ambience,
          this.resolvedScene.lighting,
          new Date(this.clock)
        )
        const reading = this.reading

        return reading !== null && !reading.isDay ? nightward(kind) : kind
      },
      lighting(): LightKind {
        return this.reading !== null && this.reading.isStorm
          ? 'STORM'
          : this.hour
      },
      liveScene(): SceneConfig {
        const scene = this.resolvedScene,
          reading = this.reading

        return {
          ...scene,
          lighting: this.lighting,
          palette: overcast(
            tintPalette(scene.palette, this.hour),
            reading !== null ? reading.cloud : 0
          ),
          rain: reading !== null ? reading.rain : scene.rain,
          mist:
            reading !== null && reading.isFoggy
              ? Math.max(scene.mist, 0.85)
              : scene.mist,
        }
      },
      mistStyle(): string {
        const ground = this.liveScene.palette.ground,
          tone = (alpha: number) =>
            `hsla(${ground.hue}, ${ground.saturation}%, ${ground.lightness}%, ${alpha})`

        return [
          `height: ${Math.round(this.liveScene.mist * 100)}%`,
          `background-image: linear-gradient(to top, ${tone(1)} 0%, ${tone(
            1
          )} 38%, ${tone(0.92)} 56%, ${tone(0.62)} 72%, ${tone(
            0.24
          )} 88%, ${tone(0)} 100%)`,
        ].join('; ')
      },
      veilStyle(): string {
        const sky = this.liveScene.palette.sky

        return `background-color: hsla(${sky.hue}, ${sky.saturation}%, ${sky.lightness}%, ${VEIL})`
      },
      litSky(): number {
        const sky = this.liveScene.palette.sky,
          filter = this.resolvedFilter,
          brightness = Number(filter.brightness) || 1,
          lit = clamp(sky.lightness * brightness, 0, 100)

        return Number(filter.invert) >= 0.5 ? 100 - lit : lit
      },
      isDark(): boolean {
        return this.litSky < DARK_SKY
      },
      halo(): number {
        return HALO_INTENSITY[this.lighting] || 0
      },
      haloStyle(): string {
        const glow = this.liveScene.palette.glow,
          color = (alpha: number) =>
            `hsla(${glow.hue}, ${glow.saturation}%, ${glow.lightness}%, ${alpha})`

        return `radial-gradient(circle at 50% 30%, ${color(1)} 0%, ${color(
          0.35
        )} 35%, ${color(0)} 70%)`
      },
    },
    watch: {
      quality(to: string) {
        this.controller?.setQuality(to)
      },
      isGlitched(to: boolean) {
        this.controller?.setGlitched(to)
      },
      scrollProgress(to: number) {
        this.controller?.setScroll(to, this.scrollLimit)
      },
      liveScene: {
        handler(to: SceneConfig) {
          this.controller?.setScene(to)
        },
        deep: true,
      },
      isLive(to: boolean) {
        if (to) this.askWeather()
      },
      isDark: {
        handler(to: boolean) {
          this.$emit('dark', to)
        },
        immediate: true,
      },
    },
    methods: {
      async askWeather() {
        const now = Date.now()

        if (!this.isLive || this.isAsking || now - this.asked < WEATHER_FLOOR)
          return

        this.isAsking = true
        this.asked = now
        this.weather = await fetchLocalWeather()
        this.isAsking = false
      },
    },
    mounted: function () {
      this.controller = createGlitchscape({
        parent: 'sketch',
        scene: this.liveScene,
        quality: (this.quality === 'LOW' ? 'LOW' : 'HIGH') as QualityKind,
        device: this.store.device,
      })

      this.askWeather()
      this.watch = window.setInterval(this.askWeather, WEATHER_EVERY)
      this.tick = window.setInterval(() => (this.clock = Date.now()), 60000)
    },
    unmounted: function () {
      window.clearInterval(this.watch)
      window.clearInterval(this.tick)
      this.controller?.destroy()
      this.controller = null
    },
  })
</script>

<template>
  <Transition name="fade" appear>
    <div
      v-if="ambientGradient !== null"
      class="gradient"
      :style="`background-image: ${ambientGradient}`"
    ></div>
  </Transition>
  <div class="tone" :style="toneStyle">
    <div class="polarity" :style="polarityStyle">
      <div
        class="background"
        id="sketch"
        :style="`filter: ${lightStyle}; transform: ${transformStyle}`"
      >
        <div class="veil" :style="veilStyle"></div>
        <div v-if="liveScene.mist > 0" class="mist" :style="mistStyle"></div>
      </div>
    </div>
  </div>
  <div
    v-if="halo > 0"
    class="atmosphere"
    :style="`background-image: ${haloStyle}; opacity: ${halo}`"
  ></div>
</template>

<style lang="sass">
  .gradient
    width: 100%
    height: 100%
    position: fixed
    z-index: 1
    top: 0
    mix-blend-mode: color
    opacity: .75

  .atmosphere
    width: 100%
    height: 100%
    position: fixed
    z-index: 1
    top: 0
    left: 0
    pointer-events: none
    mix-blend-mode: soft-light
    transition: opacity 1.2s ease, background-image 1.2s ease

  .tone
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 0
    transition: var(--grandma-transition)

  .polarity
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0

  .background
    width: 100%
    height: 100%
    position: fixed
    top: 0
    transition: var(--grandma-transition)
    transform-origin: 50% 50%
    z-index: 0

    .veil
      position: absolute
      inset: 0
      z-index: 1
      pointer-events: none
      transition: var(--grandma-transition)

    .mist
      position: absolute
      left: 0
      right: 0
      bottom: 0
      z-index: 2
      pointer-events: none
      transition: var(--grandma-transition)
</style>
