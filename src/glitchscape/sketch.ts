import P5 from 'p5'
import type {
  Bounds,
  FlowField,
  GlitchscapeController,
  QualityKind,
  SceneConfig,
  Stage,
} from '@/glitchscape/types'
import { Mountain, clampCorridor } from '@/glitchscape/entities/Mountain'
import { Cloud } from '@/glitchscape/entities/Cloud'
import { Star } from '@/glitchscape/entities/Star'
import { Pov } from '@/glitchscape/entities/Pov'
import { Rainfall } from '@/glitchscape/entities/Rainfall'
import { resolveFlow } from '@/glitchscape/flow'
import { applyLighting } from '@/glitchscape/lighting'
import { resolveLighting } from '@/glitchscape/ambience'
import {
  clamp,
  lerp,
  randomFloat,
  toRadians,
  twoRangesRandom,
} from '@/utilities/operations'

/** Travel distance per frame at speed 1, unchanged from the original sketch. */
const REFERENCE_SPEED = 30

/**
 * Draws flat, sorted geometry without a depth test.
 *
 * Raising the precision of the depth buffer only ever made sheets at similar
 * depths fight more slowly. They are flat cards drawn back to front, so depth
 * order is already exact and the buffer has nothing to add: letting every
 * fragment through removes the contest instead of tightening it.
 *
 * Depth is still written, so whatever is drawn afterwards is occluded by them
 * correctly — and since they are sorted, the value left at each pixel is the
 * nearest one.
 */
const painted = (sk: any, draw: () => void) => {
  const gl = sk._renderer && sk._renderer.GL

  if (!gl) return draw()

  gl.depthFunc(gl.ALWAYS)
  draw()
  gl.depthFunc(gl.LESS)
}

/** Most extra travel per frame a scroll can add, on top of the drift. */
const MAX_SURGE = 420

/** Gentlest bend an arc flow will ever take, as a fraction of the depth. */
const MIN_CURVATURE = 0.05

/** How fast the live scene closes on the one asked for: ~1s at 60 frames. */
const SETTLE = 0.05

/** Frames between two head counts while the field is still changing size. */
const SETTLE_EVERY = 12

/** Below this much lean, a corridor is straight enough to change axis in. */
const STRAIGHT = 0.02

const RESOLUTIONS: { [key: string]: number } = {
  HIGH: 32,
  LOW: 14,
}

export interface GlitchscapeOptions {
  parent: string
  scene: SceneConfig
  quality: QualityKind
  device: string
}

const computeBounds = (): Bounds => {
  const width = window.innerWidth,
    height = window.innerHeight

  return {
    width,
    height,
    limitX: width * 4,
    limitY: height * 40,
    limitZ: height * 80,
  }
}

/**
 * Boots a Glitchscape and hands back a remote over it. Everything the sketch
 * reads lives in a single mutable `stage`, so the remote reconfigures the scene
 * by mutation — no teardown, no reset, the world morphs in place.
 */
export const createGlitchscape = (
  options: GlitchscapeOptions
): GlitchscapeController => {
  const bounds = computeBounds(),
    stage: Stage = {
      sk: null,
      bounds,
      scene: { ...options.scene },
      flow: resolveFlow(options.scene.flow, options.scene.curvature),
      quality: options.quality,
      resolution: RESOLUTIONS[options.quality] || RESOLUTIONS.HIGH,
      speed: REFERENCE_SPEED,
      surge: 0,
      turnRadius: 0,
      time: 0,
      pointer: { x: 0, y: 0 },
      isGlitched: false,
    },
    scroll = { position: 0, limit: 0, previous: 0 },
    pov = new Pov({
      x: 0,
      y: -bounds.height * 0.75,
      z: -bounds.limitZ * 2,
      cX: 0,
      cY: -bounds.height * 0.75,
      cZ: -bounds.limitZ * 2,
      rH: 0,
      rV: 0,
    })

  let mountains: Array<Mountain> = [],
    clouds: Array<Cloud> = [],
    stars: Array<Star> = [],
    camera: any = null,
    rainfall: Rainfall | null = null,
    resizing = 0,
    isReady = false,
    target: SceneConfig = options.scene,
    targetFlow: FlowField = resolveFlow(
      options.scene.flow,
      options.scene.curvature
    ),
    settling = 0,
    onOrientationChange: (() => void) | null = null,
    onDeviceOrientation: ((e: any) => void) | null = null

  /**
   * The one framing there is: low in the corridor, level, looking down it.
   *
   * A set of named points of view used to live here, from when the camera was
   * the thing that moved. It is not any more — the world travels past a fixed
   * rig, and how high the eye sits and how wide it sees belong to the
   * disposition now, as `altitude` and `fov`. What was left could only argue
   * with them, and one preset did worse than that: it sat the camera at the
   * far end of the corridor looking back, which paints the sheets in exactly
   * the order the sort exists to prevent.
   */
  const frame = () =>
    pov.animate(
      0.05,
      [0, -bounds.height * 0.75, -bounds.height * 0.1],
      [0, -bounds.height * 0.75, -bounds.limitZ],
      [0, 0]
    )

  const applyQuality = (quality: string) => {
    const resolved: QualityKind = quality === 'LOW' ? 'LOW' : 'HIGH',
      detail = RESOLUTIONS[resolved]

    stage.quality = resolved
    stage.resolution =
      options.device === 'MOBILE' ? Math.min(detail, 16) : detail

    if (!isReady) return

    if (resolved === 'LOW') {
      mountains.forEach((mountain) => mountain.wireframe())
      clouds.forEach((cloud) => cloud.wireframe())
      stars.forEach((star) => star.wireframe())
    } else {
      mountains.forEach((mountain) => mountain.unwireframe())
      clouds.forEach((cloud) => cloud.unwireframe())
      stars.forEach((star) => star.unwireframe())
    }
  }

  /** Head count for the current density. */
  const counts = () => {
    const isMobile = options.device === 'MOBILE',
      base = isMobile ? 10 : 20,
      // Density is a wish; this is what the device will actually carry.
      ceiling = isMobile ? 14 : 48,
      density = clamp(stage.scene.density, 0.3, 4),
      mountains = clamp(Math.round(base * density), 4, ceiling)

    return {
      mountains,
      clouds: clamp(Math.round(mountains / 2), 2, isMobile ? 7 : 24),
      // The high field stays out of the density budget: crowding the corridor
      // is the point, and stars are the one thing a tight one never shows.
      stars: isMobile ? 24 : 80,
      drops: Math.round(clamp(stage.scene.rain, 0, 1) * (isMobile ? 20 : 60)),
    }
  }

  /**
   * Walks the live scene towards the one that was asked for.
   *
   * A page change used to be a jump: a new altitude, a new framing, a new
   * count of summits, all in one frame — which the curtain over the route
   * change was hiding rather than solving. Every dimension that can be read
   * as a quantity is eased instead, so the relief is seen rearranging itself.
   *
   * The silhouette and its roughness are left to change at once: a mountain
   * already morphs from one profile to the next on its own, and easing the
   * roughness would have every one of them rebuilt on every frame of it.
   */
  const settle = () => {
    const live = stage.scene,
      near = (from: number, to: number) => lerp(from, to, SETTLE)

    live.shape = target.shape
    live.turbulence = target.turbulence
    live.flow = target.flow
    live.lighting = target.lighting
    live.ambience = target.ambience
    live.endless = target.endless
    live.palette = target.palette
    live.filter = target.filter

    live.speed = near(live.speed, target.speed)
    live.curvature = near(live.curvature, target.curvature)
    live.density = near(live.density, target.density)
    live.corridor = near(live.corridor, target.corridor)
    live.relief = near(live.relief, target.relief)
    live.breadth = near(live.breadth, target.breadth)
    live.altitude = near(live.altitude, target.altitude)
    live.fov = near(live.fov, target.fov)
    live.rain = near(live.rain, target.rain)
    live.mist = near(live.mist, target.mist)

    // The bend is eased as one signed quantity, so a corridor that turned
    // right straightens out before it starts turning left rather than
    // snapping across. The axis is only ever swapped at the moment it is
    // straight, where a swap cannot be seen.
    const flow = stage.flow,
      lean = flow.turn * flow.pinch,
      wanted =
        flow.axis === targetFlow.axis ? targetFlow.turn * targetFlow.pinch : 0,
      eased = near(lean, wanted)

    if (Math.abs(eased) < STRAIGHT && flow.axis !== targetFlow.axis) {
      flow.axis = targetFlow.axis
      flow.turn = 0
      flow.pinch = 0
    } else {
      flow.turn = Math.abs(eased) < STRAIGHT ? 0 : Math.sign(eased)
      flow.pinch = Math.abs(eased)
    }

    flow.drift.z = near(flow.drift.z, targetFlow.drift.z)

    // Density is a count, so it only lands on whole summits. Checking now and
    // then is enough, and spares the field a rebuild on every frame.
    settling += 1
    if (settling % SETTLE_EVERY === 0) reconcile()
  }

  /**
   * Radius of the bend. Because a particle's depth is read as the arc length
   * it has travelled, this alone decides how far the corridor runs before it
   * curls out of frame.
   */
  const turnRadius = () =>
    bounds.limitZ /
    clamp(stage.scene.curvature * stage.flow.pinch, MIN_CURVATURE, 2.5)

  const spawnMountain = () => {
    const sk = stage.sk,
      corridor = clampCorridor(stage.scene.corridor)

    const breadth = clamp(stage.scene.breadth, 0.15, 3)

    return new Mountain(stage, {
      widthRange: [sk.width * 14 * breadth, sk.width * 16 * breadth],
      heightRange: [-sk.height * 20, -sk.height * 22],
      x: twoRangesRandom(
        -bounds.limitX * corridor,
        -sk.width * corridor,
        sk.width * corridor,
        bounds.limitX * corridor
      ),
      y: sk.height * 10,
      zRange: [-bounds.limitZ, 0],
    })
  }

  const spawnCloud = () => {
    const sk = stage.sk

    return new Cloud(stage, {
      widthRange: [sk.width, sk.width * 2],
      heightRange: [-sk.height * 0.1, -sk.height * 0.15],
      x: randomFloat(-bounds.limitX * 2, bounds.limitX * 2),
      y: randomFloat(-sk.height, -sk.height * 2),
      zRange: [-bounds.limitZ, 0],
      rows: Math.round(randomFloat(3, 5)),
    })
  }

  const spawnStar = () => {
    const sk = stage.sk

    return new Star(stage, {
      sizeRange: [-sk.height * 0.05, -sk.height * 0.15],
      x: randomFloat(-bounds.limitX * 4, bounds.limitX * 4),
      yRange: [-bounds.limitY * 0.5, -bounds.limitY],
      z: randomFloat(-bounds.limitZ * 3, bounds.limitZ * 3),
    })
  }

  /** Depth order drives the staggered unfolding of the range. */
  const order = () => {
    mountains.sort((a, b) => a.position.z - b.position.z)
    mountains.forEach((mountain, index) => (mountain.params.order = index))
    clouds.sort((a, b) => a.position.z - b.position.z)
    clouds.forEach((cloud, index) => (cloud.params.order = index))
  }

  const populate = () => {
    const target = counts()

    for (let i = 0; i < target.mountains; i++) mountains.push(spawnMountain())
    for (let i = 0; i < target.clouds; i++) clouds.push(spawnCloud())
    for (let i = 0; i < target.stars; i++) stars.push(spawnStar())

    rainfall = new Rainfall(stage, target.drops)

    order()
  }

  /**
   * Density is a live dimension like any other: a scene change grows or trims
   * the field in place. It also covers the cold start, where the sketch boots
   * on the defaults a moment before the router hands over the real route.
   */
  const reconcile = () => {
    if (!isReady) return

    const target = counts()

    let hasGrown = false

    while (mountains.length > target.mountains) mountains.pop()
    while (mountains.length < target.mountains) {
      mountains.push(spawnMountain())
      hasGrown = true
    }
    while (clouds.length > target.clouds) clouds.pop()
    while (clouds.length < target.clouds) {
      clouds.push(spawnCloud())
      hasGrown = true
    }
    while (stars.length > target.stars) stars.pop()
    while (stars.length < target.stars) {
      stars.push(spawnStar())
      hasGrown = true
    }

    rainfall?.resize(stage, target.drops)

    if (!hasGrown) return

    order()
    applyQuality(stage.quality)
  }

  /**
   * A viewport change moves every bound the field was laid out against, so the
   * scene is played again rather than stretched: the corridor, the depth of
   * the range and the size of every silhouette are all read off the window.
   *
   * Debounced, because dragging a window edge fires this by the frame.
   */
  const measure = () => {
    const next = computeBounds()

    bounds.width = next.width
    bounds.height = next.height
    bounds.limitX = next.limitX
    bounds.limitY = next.limitY
    bounds.limitZ = next.limitZ
  }

  const replay = () => {
    if (!isReady) return

    measure()
    mountains = []
    clouds = []
    stars = []
    populate()
    applyQuality(stage.quality)
    frame()
  }

  const onResize = () => {
    const sk = stage.sk
    if (sk === null) return

    sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
    window.clearTimeout(resizing)
    resizing = window.setTimeout(replay, 250)
  }

  const instance = new P5((sk: any) => {
    stage.sk = sk

    sk.setup = () => {
      sk.createCanvas(sk.windowWidth, sk.windowHeight, sk.WEBGL).parent(
        options.parent
      )
      sk.colorMode(sk.HSL)
      sk.rectMode(sk.CENTER)
      sk.frameRate(30)
      camera = sk.createCamera()

      const sky = stage.scene.palette.sky
      sk.background(sky.hue, sky.saturation, sky.lightness)

      // A desktop browser exposes `screen.orientation` too, so branching on
      // it left the window resize path unregistered on the very machines that
      // have a window to resize. Both are wired now, and the sketch keeps its
      // own listener rather than relying on p5 calling back.
      sk.windowResized = onResize
      window.addEventListener('resize', onResize)

      if (screen.orientation !== undefined) {
        onOrientationChange = () => setTimeout(onResize, 100)
        screen.orientation.addEventListener('change', onOrientationChange, true)
      }

      if (window.DeviceOrientationEvent) {
        onDeviceOrientation = (e: any) => pov.orient(e.alpha, e.beta)
        window.addEventListener('deviceorientation', onDeviceOrientation, true)
      }

      populate()

      isReady = true
      frame()
      applyQuality(stage.quality)
    }

    sk.draw = () => {
      const scene = stage.scene,
        sky = scene.palette.sky

      settle()

      stage.time = sk.millis()
      stage.pointer.x = sk.mouseX
      stage.pointer.y = sk.mouseY
      stage.bounds.width = sk.width
      stage.bounds.height = sk.height

      // A scroll pushes the world down the corridor rather than walking the
      // camera along it. The relief keeps coming and keeps wrapping, so there
      // is no end of the track to arrive at — scrolling illustrates the
      // infinite instead of running out of it.
      const delta = Math.abs(scroll.position - scroll.previous)
      scroll.previous = scroll.position
      stage.surge = lerp(
        stage.surge,
        scene.endless ? clamp(delta * 6, 0, MAX_SURGE) : 0,
        0.2
      )
      stage.speed = REFERENCE_SPEED * scene.speed + stage.surge

      stage.turnRadius = turnRadius()
      sk.clear()
      sk.background(sky.hue, sky.saturation, sky.lightness)

      pov.move(stage)
      camera.setPosition(pov.position.x, pov.position.y, pov.position.z)
      camera.lookAt(pov.center.x, pov.center.y, pov.center.z)
      // Depth precision is set by the ratio of these two. Nothing is drawn
      // within the near plane — the corridor has finished fading before a
      // sheet reaches it — and the far plane clears the top corner of the
      // tallest relief, which was being cut off and putting it back.
      camera.perspective(
        toRadians(clamp(scene.fov, 20, 110)),
        sk.width / sk.height,
        bounds.height * 0.6,
        bounds.limitZ * 1.5
      )
      camera.pan(pov.rotation.v)
      camera.tilt(pov.rotation.h)

      applyLighting(
        sk,
        resolveLighting(scene.ambience, scene.lighting),
        scene.palette,
        bounds,
        stage.time
      )

      sk.push()
      // Altitude is a move of the world, not of the rig: lifting the range
      // towards a fixed eye drops the horizon without ever putting the ground
      // plane overhead or uncovering the foot of the mountains.
      sk.translate(0, scene.altitude * bounds.height, 0)

      // Move everything first, then sort, then draw. Flat cards make depth
      // order exact, but only against where they have actually ended up:
      // sorting on the previous frame lets a sheet that has just wrapped to
      // the far end still be painted last, over the whole range.
      mountains.forEach((mountain) => mountain.advance(stage))
      mountains.sort((a, b) => a.position.z - b.position.z)
      painted(sk, () => mountains.forEach((mountain) => mountain.draw(stage)))
      clouds.forEach((cloud) => cloud.move(stage))
      stars.forEach((star) => star.move(stage))
      sk.pop()

      // The water. It lies at a fixed depth below the eye rather than at a
      // height in the world, so it stays a horizon whatever the journey is
      // flying at, and it is a surface with no thickness — the slab this
      // replaces was five units thick across a million and fought with
      // everything it touched.
      if (scene.mist > 0) {
        const surface = scene.palette.ground

        sk.push()
        sk.noStroke()
        sk.translate(0, pov.position.y + bounds.height * 0.75, 0)
        sk.rotateX(Math.PI / 2)
        sk.fill(
          surface.hue,
          surface.saturation,
          surface.lightness,
          clamp(0.45 + scene.mist * 0.55, 0, 1)
        )
        sk.plane(bounds.limitX * 10, bounds.limitZ * 1.4)
        sk.pop()
      }

      // Weather falls around the camera, outside the bend and outside the
      // altitude of the journey.
      rainfall?.move(stage)
    }

    sk.mouseMoved = () => pov.push()
    sk.touchMoved = () => pov.push()
  })

  return {
    setQuality: (quality: string) => applyQuality(quality),
    setGlitched: (isGlitched: boolean) => {
      if (isGlitched === stage.isGlitched) return

      if (isGlitched) {
        mountains.forEach((mountain) => mountain.glitch())
        clouds.forEach((cloud) => cloud.glitch())
        stars.forEach((star) => star.glitch())
      } else {
        mountains.forEach((mountain) => mountain.unglitch())
        clouds.forEach((cloud) => cloud.unglitch())
        stars.forEach((star) => star.unglitch())
      }

      stage.isGlitched = isGlitched
    },
    setScroll: (progress: number, limit: number) => {
      scroll.position = progress
      scroll.limit = limit
    },
    setScene: (scene: SceneConfig) => {
      target = scene
      targetFlow = resolveFlow(scene.flow, scene.curvature)
    },
    destroy: () => {
      window.clearTimeout(resizing)
      window.removeEventListener('resize', onResize)
      if (onOrientationChange !== null && screen.orientation !== undefined)
        screen.orientation.removeEventListener(
          'change',
          onOrientationChange,
          true
        )
      if (onDeviceOrientation !== null)
        window.removeEventListener(
          'deviceorientation',
          onDeviceOrientation,
          true
        )

      mountains = []
      clouds = []
      stars = []
      rainfall = null
      isReady = false
      instance.remove()
    },
  }
}
