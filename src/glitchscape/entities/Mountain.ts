import type { Position, Size } from '@/utilities/types'
import type {
  MountainProps,
  P5Instance,
  ShapeKind,
  Stage,
} from '@/glitchscape/types'
import type { Profile, ProfileSeed } from '@/glitchscape/profiles'
import {
  buildProfile,
  createSeed,
  morphProfile,
  resampleProfile,
  resolveShape,
  shatterProfile,
} from '@/glitchscape/profiles'
import {
  fadeAt,
  haze,
  hazeAt,
  rampAt,
  riseAt,
  stepDepth,
} from '@/glitchscape/ramp'
import { bend } from '@/glitchscape/bend'
import { HSLColors } from '@/utilities/colors'
import {
  clamp,
  lerp,
  random,
  randomFloat,
  toRadians,
  wrap,
} from '@/utilities/operations'

const PAPER_STEPS = 7

const PAPER_BLEND = 0.3

const SKIRT = 2

const WIRE_SPEED = 0.04

const WIRE_LINE_RAMP = 0.6

const RISE_BAND = 0.2

export const clampCorridor = (corridor: number) => clamp(corridor, 0.05, 3)

export const clampRelief = (relief: number) => clamp(relief, 0.2, 4)

export class Mountain {
  props: MountainProps
  size: Size
  position: Position
  seed: ProfileSeed
  shape: ShapeKind
  request: ShapeKind
  resolution: number
  turbulence: number
  spread: number
  lift: number
  stretch: number
  profile: Profile
  target: Profile
  params: {
    radians: number
    speed: number
    morphSpeed: number
    order: number
    gap: number
    wire: number
    wireTarget: number
    alpha: number
    isRetiring: boolean
    retirement: number
  }
  backup: {
    width: number
    height: number
  }

  constructor(stage: Stage, props: MountainProps) {
    this.props = props
    this.size = {
      width: Math.round(
        randomFloat(this.props.widthRange[0], this.props.widthRange[1])
      ),
      height: Math.round(
        randomFloat(this.props.heightRange[0], this.props.heightRange[1])
      ),
    }
    this.position = {
      x: Math.round(this.props.x),
      y: Math.round(this.props.y),
      z: Math.round(random(this.props.zRange[0], this.props.zRange[1])),
    }
    this.seed = createSeed()
    this.request = stage.scene.shape
    this.shape = resolveShape(this.request)
    this.resolution = stage.resolution
    this.turbulence = stage.scene.turbulence
    this.spread = clampCorridor(stage.scene.corridor)
    this.lift = clampRelief(stage.scene.relief)
    this.stretch = stage.stretch
    this.profile = this.build(stage)
    this.target = this.profile.slice()
    this.params = {
      radians: toRadians(90),
      speed: 0.05,
      morphSpeed: 0.05,
      order: 0,
      gap: 20,
      wire: 1,
      wireTarget: 1,
      alpha: 0,
      isRetiring: false,
      retirement: 0,
    }
    this.backup = {
      width: this.size.width,
      height: this.size.height,
    }
  }

  private build = (stage: Stage): Profile =>
    buildProfile(
      this.shape,
      this.resolution,
      this.seed,
      this.turbulence,
      (x: number) => stage.sk.noise(x)
    )

  private sync = (stage: Stage) => {
    const hasShapeChanged = stage.scene.shape !== this.request,
      hasResolutionChanged = stage.resolution !== this.resolution,
      hasTurbulenceChanged = stage.scene.turbulence !== this.turbulence

    if (!hasShapeChanged && !hasResolutionChanged && !hasTurbulenceChanged)
      return

    this.request = stage.scene.shape
    this.shape = hasShapeChanged ? resolveShape(this.request) : this.shape
    this.turbulence = stage.scene.turbulence

    const isLoweringDetail =
      hasResolutionChanged && stage.resolution < this.resolution

    if (
      hasResolutionChanged &&
      (!isLoweringDetail || this.params.wire >= 0.5)
    ) {
      this.resolution = stage.resolution
      this.profile = resampleProfile(this.profile, this.resolution)
      this.target = this.build(stage)
      return
    }

    this.target = this.build(stage)
  }

  glitch = () => {
    this.backup = {
      width: this.size.width,
      height: this.size.height,
    }
  }

  unglitch = () => {
    this.size.width = this.backup.width
    this.size.height = this.backup.height
  }

  retire = () => (this.params.isRetiring = true)

  hasFolded = () => this.params.retirement > 0.97

  wireframe = () => (this.params.wireTarget = 1)

  unwireframe = () => (this.params.wireTarget = 0)

  rescale = (widthRatio: number, heightRatio: number, depthRatio: number) => {
    this.props.widthRange = this.props.widthRange.map(
      (value) => value * widthRatio
    )
    this.props.heightRange = this.props.heightRange.map(
      (value) => value * heightRatio
    )
    this.props.zRange = this.props.zRange.map((value) => value * depthRatio)
    this.props.x *= widthRatio
    this.props.y *= heightRatio
    this.size.width *= widthRatio
    this.size.height *= heightRatio
    this.backup.width *= widthRatio
    this.backup.height *= heightRatio
    this.position.x *= widthRatio
    this.position.y *= heightRatio
    this.position.z *= depthRatio
  }

  advance = (stage: Stage) => {
    const sk = stage.sk,
      bounds = stage.bounds,
      drift = stage.flow.drift,
      step = stage.speed,
      band = Math.abs(this.size.height) * 0.5

    this.sync(stage)

    const corridor = clampCorridor(stage.scene.corridor)
    if (Math.abs(corridor - this.spread) > 0.0005) {
      const next = lerp(this.spread, corridor, 0.04),
        ratio = next / this.spread
      this.position.x *= ratio
      this.spread = next
    }

    if (Math.abs(stage.stretch - this.stretch) > 0.0005) {
      const next = lerp(this.stretch, stage.stretch, 0.04),
        ratio = next / this.stretch
      this.size.width *= ratio
      this.backup.width *= ratio
      this.stretch = next
    }

    const relief = clampRelief(stage.scene.relief)
    if (Math.abs(relief - this.lift) > 0.0005) {
      const next = lerp(this.lift, relief, 0.04),
        ratio = next / this.lift
      this.size.height *= ratio
      this.backup.height *= ratio
      this.lift = next
    }

    this.position.z = wrap(
      this.position.z + drift.z * step,
      this.props.zRange[0],
      this.props.zRange[1]
    )
    this.position.x = wrap(
      this.position.x + drift.x * step * 0.5,
      -bounds.limitX * 1.5 * this.spread,
      bounds.limitX * 1.5 * this.spread
    )
    this.position.y = wrap(
      this.position.y + drift.y * step * 0.35,
      this.props.y - band,
      this.props.y + band
    )

    if (sk.millis() > this.params.order * this.params.gap)
      this.params.radians = lerp(
        this.params.radians,
        this.params.isRetiring ? toRadians(90) : 0,
        this.params.speed
      )

    if (this.params.isRetiring)
      this.params.retirement = lerp(
        this.params.retirement,
        1,
        this.params.speed
      )

    if (stage.isGlitched) {
      this.size.width = randomFloat(0, this.backup.width * 2)
      this.size.height = randomFloat(0, this.backup.height)
      this.profile = shatterProfile(this.target, 0.65)
    } else {
      this.profile = morphProfile(
        this.profile,
        this.target,
        this.params.morphSpeed
      )
    }

    const woven = lerp(this.params.wire, this.params.wireTarget, WIRE_SPEED)
    this.params.wire =
      Math.abs(woven - this.params.wireTarget) < 0.002
        ? this.params.wireTarget
        : woven

    const opacity = lerp(
      this.params.alpha,
      this.params.isRetiring ? 0 : 1,
      this.params.speed * (this.params.isRetiring ? 1 : 0.5)
    )
    this.params.alpha = opacity > 0.99 ? 1 : opacity
  }

  private face = (sk: P5Instance) => {
    const steps = this.profile.length

    const skirt = Math.abs(this.size.height) * SKIRT

    sk.beginShape(sk.TRIANGLE_STRIP)
    for (let i = 0; i < steps; i++) {
      const x = (i / (steps - 1)) * this.size.width
      sk.vertex(x, skirt, 0)
      sk.vertex(x, this.size.height * this.profile[i], 0)
    }
    sk.endShape()
  }

  private outline = (sk: P5Instance) => {
    const steps = this.profile.length,
      skirt = Math.abs(this.size.height) * SKIRT

    sk.beginShape()
    sk.vertex(0, skirt, 0)
    for (let i = 0; i < steps; i++)
      sk.vertex(
        (i / (steps - 1)) * this.size.width,
        this.size.height * this.profile[i],
        0
      )
    sk.vertex(this.size.width, skirt, 0)
    sk.endShape(sk.CLOSE)
  }

  draw = (stage: Stage) => {
    const sk = stage.sk,
      fog = hazeAt(this.position.z, this.props.zRange[0], 0.5),
      opacity =
        this.params.alpha *
        (1 - fadeAt(this.position.z, this.props.zRange[0], 0.08, 0.02)) *
        riseAt(this.position.z, this.props.zRange[0], RISE_BAND),
      tint = haze(
        rampAt(
          stage.scene.palette.mountains,
          stepDepth(
            this.position.z,
            this.props.zRange[0],
            this.props.zRange[1],
            PAPER_STEPS,
            PAPER_BLEND
          ),
          this.props.zRange[0],
          this.props.zRange[1]
        ),
        stage.scene.palette.sky,
        fog
      ),
      corrupted = stage.isGlitched
        ? Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]
        : null

    if (opacity <= 0.01) return

    const placed = bend(
      stage.flow.axis,
      stage.flow.turn,
      stage.turnRadius,
      this.position.x < 0 ? this.position.x - this.size.width : this.position.x,
      this.position.y,
      this.position.z
    )

    const shown = corrupted !== null ? corrupted : tint,
      wire = this.params.wire,
      lineFade = clamp(wire / WIRE_LINE_RAMP, 0, 1)

    sk.push()
    sk.translate(placed.x, placed.y, placed.z)
    sk.rotateX(this.params.radians)

    if (wire < 0.995) {
      sk.noStroke()
      sk.fill(
        shown.hue,
        shown.saturation,
        shown.lightness,
        opacity * (1 - wire)
      )
      this.face(sk)
    }

    if (wire > 0.005) {
      sk.noFill()
      sk.stroke(
        shown.hue,
        shown.saturation,
        shown.lightness,
        opacity * lineFade
      )
      sk.strokeWeight(1)
      this.outline(sk)
    }

    sk.pop()
  }
}
