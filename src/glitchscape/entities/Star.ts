import type { Position } from '@/utilities/types'
import type { StarProps, Stage } from '@/glitchscape/types'
import { rampAt } from '@/glitchscape/ramp'
import { HSLColors } from '@/utilities/colors'
import { clamp, lerp, random, randomFloat, wrap } from '@/utilities/operations'

/**
 * The high field. Stars are cheap spheres scattered above the range; they
 * twinkle on a noise clock and drift with the flow, which is what sells a
 * vertical journey.
 */
export class Star {
  props: StarProps
  size: number
  position: Position
  seed: number
  params: {
    speed: number
    isStrokedOnly: boolean
    alpha: number
    twinkle: number
  }
  backup: {
    x: number
    z: number
  }

  constructor(stage: Stage, props: StarProps) {
    this.props = props
    this.size = Math.round(
      randomFloat(this.props.sizeRange[0], this.props.sizeRange[1])
    )
    this.position = {
      x: Math.round(this.props.x),
      y: Math.round(random(this.props.yRange[0], this.props.yRange[1])),
      z: Math.round(this.props.z),
    }
    this.seed = randomFloat(0, 1000)
    this.params = {
      speed: 0.1,
      isStrokedOnly: false,
      alpha: 1,
      twinkle: 1,
    }
    this.backup = {
      x: this.position.x,
      z: this.position.z,
    }
  }

  glitch = () => {
    this.backup = {
      x: this.position.x,
      z: this.position.z,
    }
  }

  unglitch = () => {
    this.position.x = this.backup.x
    this.position.z = this.backup.z
  }

  wireframe = () => (this.params.isStrokedOnly = true)

  unwireframe = () => (this.params.isStrokedOnly = false)

  move = (stage: Stage) => {
    const sk = stage.sk,
      bounds = stage.bounds,
      drift = stage.flow.drift,
      step = stage.speed

    if (stage.isGlitched) {
      this.position.x = randomFloat(-bounds.limitX * 3, bounds.limitX * 3)
      this.position.z = randomFloat(-bounds.limitZ * 3, bounds.limitZ * 3)
    } else if (stage.flow.axis === 'LINEAR') {
      this.position.z = wrap(
        this.position.z + drift.z * step * 0.4,
        -bounds.limitZ * 3,
        bounds.limitZ * 3
      )
      this.position.x = wrap(
        this.position.x + drift.x * step * 0.4,
        -bounds.limitX * 4,
        bounds.limitX * 4
      )
      this.position.y = wrap(
        this.position.y + drift.y * step,
        this.props.yRange[1],
        this.props.yRange[0]
      )
    }
    // On a ring the field turns with the world, so it needs no drift of its own.

    this.params.twinkle = clamp(
      0.45 + sk.noise(this.seed + stage.time * 0.0006) * 0.85,
      0,
      1
    )
    this.params.alpha = lerp(
      this.params.alpha,
      this.params.isStrokedOnly ? 0 : this.params.twinkle,
      this.params.speed
    )

    this.draw(stage)
  }

  draw = (stage: Stage) => {
    const sk = stage.sk,
      detail = stage.quality === 'HIGH' ? 16 : 6,
      tint = rampAt(
        stage.scene.palette.stars,
        this.position.y,
        this.props.yRange[0],
        this.props.yRange[1]
      ),
      corrupted = stage.isGlitched
        ? Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]
        : null

    sk.push()
    sk.translate(this.position.x, this.position.y, this.position.z)

    if (corrupted !== null)
      sk.fill(corrupted.hue, corrupted.saturation, corrupted.lightness)
    else sk.fill(tint.hue, tint.saturation, tint.lightness, this.params.alpha)

    sk.stroke(tint.hue, tint.saturation, tint.lightness)
    sk.strokeWeight(1)
    sk.sphere(this.size, 3, detail)
    sk.pop()
  }
}
