import P5 from 'p5'
import type {
  Bounds,
  GlitchscapeController,
  QualityKind,
  SceneConfig,
  Stage,
} from '@/glitchscape/types'
import { Mountain, clampCorridor } from '@/glitchscape/entities/Mountain'
import { Cloud } from '@/glitchscape/entities/Cloud'
import { Star } from '@/glitchscape/entities/Star'
import { Pov } from '@/glitchscape/entities/Pov'
import { resolveFlow } from '@/glitchscape/flow'
import { applyLighting } from '@/glitchscape/lighting'
import {
  clamp,
  doMap,
  lerp,
  randomFloat,
  toRadians,
  twoRangesRandom,
} from '@/utilities/operations'

/** Travel distance per frame at speed 1, unchanged from the original sketch. */
const REFERENCE_SPEED = 30

const RESOLUTIONS: { [key: string]: number } = {
  HIGH: 32,
  LOW: 14,
}

export interface GlitchscapeOptions {
  parent: string
  scene: SceneConfig
  pov: string
  quality: QualityKind
  device: string
  projects: number
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
    multiplier: width < 461 ? 1.5 : width < 1281 ? 1.25 : 1.2,
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
      scene: options.scene,
      flow: resolveFlow(options.scene.flow, options.scene.curvature),
      quality: options.quality,
      resolution: RESOLUTIONS[options.quality] || RESOLUTIONS.HIGH,
      speed: REFERENCE_SPEED,
      boost: 1,
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
    floor = 1,
    projects = options.projects,
    requestedPov = options.pov,
    isReady = false,
    onOrientationChange: (() => void) | null = null,
    onDeviceOrientation: ((e: any) => void) | null = null

  const povs: { [key: string]: () => void } = {
    RESET: () =>
      pov.animate(
        0.05,
        [0, -bounds.height * 0.75, -bounds.height * 0.1],
        [0, -bounds.height * 0.75, -bounds.limitZ],
        [0, 0]
      ),
    INVERT: () =>
      pov.animate(
        0.05,
        [0, -bounds.height * 0.75, -bounds.limitZ],
        [0, -bounds.height * 0.75, -bounds.height * 0.1],
        [0, 0]
      ),
    DONTLOOKUP: () =>
      pov.animate(
        0.05,
        [0, -bounds.height * 2, -bounds.height * 0.1],
        [0, -bounds.height * 10, -bounds.limitZ * 0.5],
        [0, 0]
      ),
    SIDE: () =>
      pov.animate(
        0.05,
        [bounds.limitX * 4, -bounds.height * 0.75, -bounds.limitZ * 0.5],
        [bounds.limitX * 4, -bounds.height * 0.75, -bounds.limitZ],
        [Math.PI / 2, 0]
      ),
    GLOBAL: () =>
      pov.animate(
        0.05,
        [0, -bounds.height * 10, bounds.height * 5],
        [0, -bounds.height * 0.1, -bounds.limitZ * 0.5],
        [0, 0]
      ),
  }

  const dive = (increment: number) => {
    const reach = bounds.limitX * 0.75 * clampCorridor(stage.scene.corridor),
      lane = doMap(increment, 1, projects, -reach, reach)

    pov.animate(
      0.05,
      [lane, bounds.height * 5, -bounds.height * 0.1],
      [lane, bounds.height * 0.75, -bounds.limitZ],
      [0, 0]
    )
  }

  const applyPov = (name: string) => {
    requestedPov = name

    if (!isReady) return

    const dived = /^DIVE_(\d+)$/.exec(name)
    if (dived !== null) return dive(parseInt(dived[1], 10))

    const preset = povs[name]
    if (preset !== undefined) preset()
  }

  const applyQuality = (quality: string) => {
    const resolved: QualityKind = quality === 'LOW' ? 'LOW' : 'HIGH'

    stage.quality = resolved
    stage.resolution = RESOLUTIONS[resolved]

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
    const base = options.device === 'MOBILE' ? 10 : 20,
      density = clamp(stage.scene.density, 0.3, 2),
      mountains = Math.max(4, Math.round(base * density))

    return {
      mountains,
      clouds: Math.max(2, Math.round(mountains / 2)),
      stars: Math.max(8, Math.round(mountains * 4)),
    }
  }

  const spawnMountain = () => {
    const sk = stage.sk,
      corridor = clampCorridor(stage.scene.corridor)

    return new Mountain(stage, {
      widthRange: [sk.width * 14, sk.width * 16],
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

    if (!hasGrown) return

    order()
    applyQuality(stage.quality)
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

      if (screen.orientation !== undefined) {
        onOrientationChange = () =>
          setTimeout(
            () => sk.resizeCanvas(sk.windowWidth, sk.windowHeight, true),
            100
          )
        screen.orientation.addEventListener('change', onOrientationChange, true)
      } else
        sk.windowResized = () =>
          sk.resizeCanvas(sk.windowWidth, sk.windowHeight, true)

      if (window.DeviceOrientationEvent) {
        onDeviceOrientation = (e: any) => pov.orient(e.alpha, e.beta)
        window.addEventListener('deviceorientation', onDeviceOrientation, true)
      }

      populate()

      isReady = true
      applyPov(requestedPov)
      applyQuality(stage.quality)
    }

    sk.draw = () => {
      const scene = stage.scene,
        sky = scene.palette.sky,
        ground = scene.palette.ground

      stage.time = sk.millis()
      stage.pointer.x = sk.mouseX
      stage.pointer.y = sk.mouseY
      stage.bounds.width = sk.width
      stage.bounds.height = sk.height

      // Scrolling rushes the world forward, then the boost decays back.
      const delta = Math.abs(scroll.position - scroll.previous)
      scroll.previous = scroll.position
      stage.boost = lerp(stage.boost, 1 + clamp(delta / 24, 0, 2), 0.12)
      stage.speed = REFERENCE_SPEED * scene.speed * stage.boost

      floor = lerp(floor, 0.7, 0.01)

      sk.clear()
      sk.background(sky.hue, sky.saturation, sky.lightness)

      pov.move(stage)
      camera.setPosition(pov.position.x, pov.position.y, pov.position.z)
      camera.lookAt(pov.center.x, pov.center.y, pov.center.z)
      camera.perspective(
        toRadians(clamp(scene.fov, 20, 110)),
        sk.width / sk.height,
        100,
        bounds.limitZ * 2
      )
      camera.pan(pov.rotation.v)
      camera.tilt(pov.rotation.h)
      camera.move(0, 0, pov.progress.z)

      applyLighting(sk, scene.lighting, scene.palette, bounds, stage.time)

      mountains.forEach((mountain) => mountain.move(stage))
      clouds.forEach((cloud) => cloud.move(stage))
      stars.forEach((star) => star.move(stage))

      sk.push()
      sk.noStroke()
      sk.fill(ground.hue, ground.saturation, ground.lightness, floor)
      sk.box(bounds.limitX * 20, 5, bounds.limitZ * 20)
      sk.pop()
    }

    sk.mouseMoved = () => pov.push()
    sk.touchMoved = () => pov.push()
  })

  return {
    setPov: (name: string) => applyPov(name),
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
      pov.zoom(progress, limit + 200)
    },
    setScene: (scene: SceneConfig) => {
      stage.scene = scene
      stage.flow = resolveFlow(scene.flow, scene.curvature)
      reconcile()
    },
    setProjectsNumber: (value: number) => (projects = value),
    destroy: () => {
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
      isReady = false
      instance.remove()
    },
  }
}
