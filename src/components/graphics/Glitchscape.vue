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
   * How far a page may brighten the world before the relief stops reading.
   *
   * The scene lives between the lightness of its sky and that of its nearest
   * crests, which is a narrow band to begin with. A tint meant for a card can
   * multiply straight through it — at 1.5 the sky lands on 93 and the crests
   * clip at 100, leaving seven points of relief where there were thirty.
   */
  const MAX_BRIGHTNESS = 1.1

  /**
   * A veil of the sky, over everything.
   *
   * The background is there to be read across, so it gives up a little of its
   * own contrast to whatever is written over it. Being the colour of the sky,
   * it takes the relief down towards the far distance rather than greying it.
   */
  const VEIL = 0.35

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
        const custom = this.filter,
          resolved =
            custom !== null && custom !== undefined && custom.hue !== undefined
              ? (custom as HuBrInSaGr)
              : this.resolvedScene.filter

        // The Work page hands over the tint of the project in view, and those
        // were drawn for a card behind an image rather than for a landscape.
        // Nothing may brighten the scene past the point where its own relief
        // disappears into its sky.
        return Number(resolved.brightness) > MAX_BRIGHTNESS
          ? { ...resolved, brightness: String(MAX_BRIGHTNESS) }
          : resolved
      },
      /**
       * The sky of a gradient ambient, or nothing at all.
       *
       * It used to hang off the Short page by name, which meant one page had
       * a sunset and no other could ask for one. It now comes with the
       * ambient, so any page choosing Biscarrosse gets the same sky.
       */
      ambientGradient(): string | null {
        return this.resolvedFilter.gradient || null
      },
      /**
       * Everything about the ambient that can be crossfaded.
       *
       * The inversion is not in here, and cannot be: a browser interpolates
       * a filter function by function, and `invert(0.5)` maps every pixel to
       * the same grey. Sliding from an inverted tint to an ordinary one takes
       * the whole scene through it — four of the eight project tints do —
       * which is a relief that dissolves and comes back for no reason a
       * viewer can see.
       */
      filterStyle(): string {
        const filter = this.resolvedFilter

        return [
          `hue-rotate(${filter.hue})`,
          `brightness(${filter.brightness})`,
          `saturate(${filter.saturation})`,
          `grayscale(${filter.grayscale})`,
        ].join(' ')
      },
      /**
       * The inversion, on a layer of its own and with no transition on it, so
       * it flips rather than fades through the flat grey in the middle. The
       * hue and the light keep gliding underneath it.
       */
      polarityStyle(): string {
        return `filter: invert(${this.resolvedFilter.invert})`
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
        if (this.roll === 0) return 'none'

        // A rotated rectangle only covers its frame again past this much
        // scale. It was a fixed guess before, and too small for the angle,
        // so the corners of the canvas were coming into view. Two stands in
        // for the widest aspect ratio worth covering.
        const radians = Math.abs((this.roll * Math.PI) / 180),
          cover = Math.cos(radians) + 2 * Math.sin(radians)

        return `rotate(${this.roll.toFixed(2)}deg) scale(${cover.toFixed(3)})`
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

        // Solid for its lower half, so the feet of the range are gone rather
        // than dimmed, then a long tail up into the sky. It lies over the
        // water plane drawn in the sketch and finishes the same job: the
        // surface stops the relief, this dissolves the seam above it.
        return [
          `height: ${Math.round(this.resolvedScene.mist * 100)}%`,
          `background-image: linear-gradient(to top, ${tone(1)} 0%, ${tone(
            1
          )} 38%, ${tone(0.92)} 56%, ${tone(0.62)} 72%, ${tone(
            0.24
          )} 88%, ${tone(0)} 100%)`,
        ].join('; ')
      },
      /** The veil itself, in the colour of the sky it is made of. */
      veilStyle(): string {
        const sky = this.resolvedScene.palette.sky

        return `background-color: hsla(${sky.hue}, ${sky.saturation}%, ${sky.lightness}%, ${VEIL})`
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
      quality(to: string) {
        this.controller?.setQuality(to)
      },
      isGlitched(to: boolean) {
        this.controller?.setGlitched(to)
      },
      scrollProgress(to: number) {
        this.controller?.setScroll(to, this.scrollLimit)
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
        quality: (this.quality === 'LOW' ? 'LOW' : 'HIGH') as QualityKind,
        device: this.store.device,
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
    <div
      v-if="ambientGradient !== null"
      class="gradient"
      :style="`background-image: ${ambientGradient}`"
    ></div>
  </Transition>
  <div class="polarity" :style="polarityStyle">
    <div
      class="background"
      id="sketch"
      :style="`filter: ${filterStyle}; transform: ${transformStyle}`"
    >
      <div class="veil" :style="veilStyle"></div>
      <div v-if="resolvedScene.mist > 0" class="mist" :style="mistStyle"></div>
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
    // Colour only: the luminosity stays the canvas's, so the relief keeps its
    // own light and only changes hue.
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

  .polarity
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 0
    // No transition, on purpose. See polarityStyle.

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
