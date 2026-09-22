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

const REFERENCE_SPEED = 30

const painted = (sk: any, draw: () => void) => {
  const gl = sk._renderer && sk._renderer.GL

  if (!gl) return draw()

  gl.depthFunc(gl.ALWAYS)
  draw()
  gl.depthFunc(gl.LESS)
}

const MAX_SURGE = 420

const MIN_CURVATURE = 0.05

const SETTLE = 0.05

const SETTLE_EVERY = 12

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

  const counts = () => {
    const isMobile = options.device === 'MOBILE',
      base = isMobile ? 10 : 20,
      ceiling = isMobile ? 14 : 48,
      density = clamp(stage.scene.density, 0.3, 4),
      mountains = clamp(Math.round(base * density), 4, ceiling)

    return {
      mountains,
      clouds: clamp(Math.round(mountains / 2), 2, isMobile ? 7 : 24),
      stars: isMobile ? 24 : 80,
      drops: Math.round(clamp(stage.scene.rain, 0, 1) * (isMobile ? 20 : 60)),
    }
  }

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

    settling += 1
    if (settling % SETTLE_EVERY === 0) reconcile()
  }

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

  const reconcile = () => {
    if (!isReady) return

    const target = counts()

    let hasGrown = false

    const standing = mountains.filter(
        (mountain) => !mountain.params.isRetiring
      ),
      floating = clouds.filter((cloud) => !cloud.params.isRetiring)

    while (standing.length > target.mountains) standing.shift()?.retire()
    while (standing.length < target.mountains) {
      mountains.push(spawnMountain())
      standing.push(mountains[mountains.length - 1])
      hasGrown = true
    }
    while (floating.length > target.clouds) floating.shift()?.retire()
    while (floating.length < target.clouds) {
      clouds.push(spawnCloud())
      floating.push(clouds[clouds.length - 1])
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
      sk.translate(0, scene.altitude * bounds.height, 0)

      mountains.forEach((mountain) => mountain.advance(stage))
      if (mountains.some((mountain) => mountain.hasFolded()))
        mountains = mountains.filter((mountain) => !mountain.hasFolded())
      mountains.sort((a, b) => a.position.z - b.position.z)
      painted(sk, () => mountains.forEach((mountain) => mountain.draw(stage)))
      clouds.forEach((cloud) => cloud.move(stage))
      if (clouds.some((cloud) => cloud.hasFaded()))
        clouds = clouds.filter((cloud) => !cloud.hasFaded())
      stars.forEach((star) => star.move(stage))
      sk.pop()

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
