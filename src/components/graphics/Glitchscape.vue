<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { store } from '@/utilities/store'
  import type { HuBrInSaGr } from '@/utilities/types'
  import type {
    GlitchscapeController,
    QualityKind,
    SceneConfig,
    SceneOverride,
  } from '@/glitchscape/types'
  import { createGlitchscape } from '@/glitchscape/sketch'
  import { DEFAULT_UNIVERSE, resolveScene } from '@/glitchscape/universes'
  import { HALO_INTENSITY } from '@/glitchscape/lighting'
  import { resolveLighting } from '@/glitchscape/ambience'
  import { resolveFlow } from '@/glitchscape/flow'
  import { filters } from '@/utilities/colors'
  import type { LocalWeather } from '@/utilities/weather'
  import { fetchLocalWeather } from '@/utilities/weather'

  /**
   * The living background.
   *
   * This component owns no drawing logic: it resolves an universe into a scene
   * and drives the sketch through its controller. Anything a page wants to say
   * about the background — its silhouette, its flow, its pace, its light — is
   * a prop, so a route or a view can reprogram the world it travels through.
   */
  export default defineComponent({
    name: 'Glitchscape',
    props: {
      /** Named universe, resolved from `@/glitchscape/universes`. */
      universe: {
        type: String,
        default: DEFAULT_UNIVERSE,
      },
      /** Partial scene layered over the universe. */
      scene: {
        type: Object as PropType<SceneOverride | null>,
        default: null,
      },
      /** CSS filter. Kept as the authoritative colour mechanism. */
      filter: {
        type: Object as PropType<Partial<HuBrInSaGr>>,
        default: () => filters.grayscale,
      },
      pov: {
        type: String,
        default: 'RESET',
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
      numberOfProjects: {
        type: Number,
        default: 3,
      },
      view: String,
    },
    data: function () {
      return {
        store,
        controller: null as GlitchscapeController | null,
        weather: null as LocalWeather | null,
        isAsking: false as boolean,
        watch: 0 as number,
      }
    },
    computed: {
      resolvedScene(): SceneConfig {
        return resolveScene(this.universe, this.scene || undefined)
      },
      /**
       * A route may hand over its own filter — that is how every project
       * recolors the very same world. It wins over the universe one.
       */
      resolvedFilter(): HuBrInSaGr {
        const custom = this.filter

        return custom !== null &&
          custom !== undefined &&
          custom.hue !== undefined
          ? (custom as HuBrInSaGr)
          : this.resolvedScene.filter
      },
      filterStyle(): string {
        const filter = this.resolvedFilter

        return [
          `hue-rotate(${filter.hue})`,
          `brightness(${filter.brightness})`,
          `invert(${filter.invert})`,
          `saturate(${filter.saturation})`,
          `grayscale(${filter.grayscale})`,
        ].join(' ')
      },
      /** Degrees of roll held while the journey leans into an endless turn. */
      roll(): number {
        const bearing = resolveFlow(
          this.resolvedScene.flow,
          this.resolvedScene.curvature
        ).bearing

        return (bearing.roll * 180) / Math.PI
      },
      transformStyle(): string {
        return this.roll === 0
          ? 'none'
          : `rotate(${this.roll.toFixed(2)}deg) scale(1.12)`
      },
      /**
       * The scene the sketch actually runs. Live weather is fetched out here
       * rather than inside the engine, which keeps the engine free of any
       * notion that a network exists — and portable because of it.
       */
      liveScene(): SceneConfig {
        const scene = this.resolvedScene

        return scene.ambience === 'LIVE' && this.weather !== null
          ? { ...scene, rain: this.weather.rain }
          : scene
      },
      /**
       * Haze lying along the bottom of the view, hiding where the range ends.
       *
       * It sits inside the filtered layer rather than over it, so it is
       * recoloured by the same pass as the canvas and cannot drift away from
       * the sky it is supposed to be made of.
       */
      mistStyle(): string {
        const ground = this.resolvedScene.palette.ground,
          tone = (alpha: number) =>
            `hsla(${ground.hue}, ${ground.saturation}%, ${ground.lightness}%, ${alpha})`

        // Solid for the first third, so the feet of the range are gone
        // rather than merely dimmed, then a long tail up into the sky.
        return [
          `height: ${Math.round(this.resolvedScene.mist * 100)}%`,
          `background-image: linear-gradient(to top, ${tone(1)} 0%, ${tone(
            1
          )} 24%, ${tone(0.88)} 44%, ${tone(0.5)} 68%, ${tone(
            0.16
          )} 86%, ${tone(0)} 100%)`,
        ].join('; ')
      },
      halo(): number {
        const lighting = resolveLighting(
          this.resolvedScene.ambience,
          this.resolvedScene.lighting
        )

        return HALO_INTENSITY[lighting] || 0
      },
      haloStyle(): string {
        const glow = this.resolvedScene.palette.glow,
          color = (alpha: number) =>
            `hsla(${glow.hue}, ${glow.saturation}%, ${glow.lightness}%, ${alpha})`

        return `radial-gradient(circle at 50% 30%, ${color(1)} 0%, ${color(
          0.35
        )} 35%, ${color(0)} 70%)`
      },
    },
    watch: {
      pov(to: string) {
        this.controller?.setPov(to)
      },
      quality(to: string) {
        this.controller?.setQuality(to)
      },
      isGlitched(to: boolean) {
        this.controller?.setGlitched(to)
      },
      scrollProgress(to: number) {
        this.controller?.setScroll(to, this.scrollLimit)
      },
      numberOfProjects(to: number) {
        this.controller?.setProjectsNumber(to)
      },
      resolvedScene: {
        handler(to: SceneConfig) {
          this.controller?.setScene(this.liveScene)
          if (to.ambience === 'LIVE') this.askWeather()
        },
        deep: true,
      },
      weather() {
        this.controller?.setScene(this.liveScene)
      },
    },
    methods: {
      async askWeather() {
        if (this.resolvedScene.ambience !== 'LIVE' || this.isAsking) return

        this.isAsking = true
        this.weather = await fetchLocalWeather()
        this.isAsking = false
      },
    },
    mounted: function () {
      this.controller = createGlitchscape({
        parent: 'sketch',
        scene: this.liveScene,
        pov: this.pov,
        quality: (this.quality === 'LOW' ? 'LOW' : 'HIGH') as QualityKind,
        device: this.store.device,
        projects: this.numberOfProjects,
      })

      this.askWeather()
      // A visit can outlast the weather it started in.
      this.watch = window.setInterval(this.askWeather, 900000)
    },
    unmounted: function () {
      window.clearInterval(this.watch)
      this.controller?.destroy()
      this.controller = null
    },
  })
</script>

<template>
  <Transition name="fade" appear>
    <div v-if="view === 'SHORT'" class="gradient"></div>
  </Transition>
  <div
    class="background"
    id="sketch"
    :style="`filter: ${filterStyle}; transform: ${transformStyle}`"
  >
    <div v-if="resolvedScene.mist > 0" class="mist" :style="mistStyle"></div>
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
    background-image: var(--gradient-biscarosse-sunset)
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

  .background
    width: 100%
    height: 100%
    position: fixed
    top: 0
    transition: var(--grandma-transition)
    transform-origin: 50% 50%
    z-index: 0

    .mist
      position: absolute
      left: 0
      right: 0
      bottom: 0
      z-index: 1
      pointer-events: none
      transition: var(--grandma-transition)
</style>
