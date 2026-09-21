import type { Position, Row, Size } from '@/utilities/types'
import type { CloudProps, Stage } from '@/glitchscape/types'
import { fogAt, haze, rampAt, shade } from '@/glitchscape/ramp'
import { bend } from '@/glitchscape/bend'
import { HSLColors } from '@/utilities/colors'
import { doMap, lerp, random, randomFloat, wrap } from '@/utilities/operations'

/**
 * Stacked capsules drifting across the range. Clouds keep their historical
 * silhouette — they are the soft counterpoint to the relief — but they now
 * follow the scene flow and fade at the edges of their own corridor.
 */
export class Cloud {
  props: CloudProps
  size: Size
  position: Position
  params: {
    rows: Array<Row>
    speed: number
    order: number
    gap: number
    start: number
    isStrokedOnly: boolean
    alpha: number
    beta: number
  }
  backup: {
    rows: Array<Row>
  }

  constructor(stage: Stage, props: CloudProps) {
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
    this.params = {
      rows: [],
      speed: 0.1,
      order: 0,
      gap: 40,
      start: stage.bounds.height,
      isStrokedOnly: true,
      alpha: 0,
      beta: 1,
    }

    for (let i = 1; i < this.props.rows; i++)
      this.params.rows.push({
        width: Math.round(this.size.width * randomFloat(0.5, 1)),
        height: Math.round(this.size.height * randomFloat(0.5, 1)),
        x: Math.round(randomFloat(-this.size.width / 4, this.size.width / 4)),
      })

    this.backup = {
      rows: this.params.rows.map((row) => ({ ...row })),
    }
  }

  glitch = () => {
    this.backup.rows = this.params.rows.map((row) => ({ ...row }))
  }

  unglitch = () => {
    this.params.rows = this.backup.rows.map((row) => ({ ...row }))
  }

  wireframe = () => {
    this.params.isStrokedOnly = true
    this.params.alpha = this.params.beta
  }

  unwireframe = () => (this.params.isStrokedOnly = false)

  move = (stage: Stage) => {
    const sk = stage.sk,
      bounds = stage.bounds,
      drift = stage.flow.drift,
      step = stage.speed,
      corridor = bounds.limitX * 2

    {
      this.position.z = wrap(
        this.position.z + drift.z * step,
        this.props.zRange[0],
        this.props.zRange[1]
      )
      // A constant breeze keeps the sky alive even when the journey stands still.
      this.position.x = wrap(
        this.position.x + (drift.x * 0.5 + 0.5) * step,
        -corridor,
        corridor
      )
      this.position.y = wrap(
        this.position.y + drift.y * step * 0.6,
        -bounds.limitY * 0.4,
        -bounds.height * 0.5
      )

      if (this.position.x <= -bounds.limitX)
        this.params.beta = doMap(
          this.position.x,
          -corridor,
          -bounds.limitX,
          0,
          1
        )
      else if (this.position.x >= bounds.limitX)
        this.params.beta = doMap(this.position.x, bounds.limitX, corridor, 1, 0)
      else this.params.beta = 1
    }

    if (sk.millis() > this.params.order * this.params.gap)
      this.params.start = lerp(
        this.params.start,
        this.position.y,
        this.params.speed
      )

    if (stage.isGlitched)
      this.params.rows.forEach((row) => {
        row.width = randomFloat(0, this.size.width / 2)
        row.height = randomFloat(0, this.size.height / 2)
        row.x = randomFloat(-bounds.width / 4, bounds.width / 4)
      })

    this.params.alpha = lerp(
      this.params.alpha,
      this.params.isStrokedOnly ? 0 : this.params.beta,
      this.params.speed * 0.5
    )

    this.draw(stage)
  }

  private drow = (
    sk: any,
    quality: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    sk.push()
    sk.translate(x, y, 0)
    sk.rectMode(sk.CORNER)
    sk.ellipseMode(sk.CORNER)
    sk.ellipse(0, height, height, height, quality)
    sk.rect(-(height / 2), 0, width, height)
    sk.ellipse(width, height, height, height, quality)
    sk.pop()
  }

  draw = (stage: Stage) => {
    const sk = stage.sk,
      quality = stage.quality === 'HIGH' ? 50 : 16,
      fog = fogAt(this.position.z, this.props.zRange[0], 0.5),
      tint = haze(
        rampAt(
          stage.scene.palette.clouds,
          this.position.z,
          this.props.zRange[0],
          this.props.zRange[1]
        ),
        stage.scene.palette.sky,
        fog
      ),
      lit = shade(tint, 4 * (1 - fog)),
      corrupted = stage.isGlitched
        ? Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]
        : null

    let offsetY = 0

    const placed = bend(
      stage.flow.axis,
      stage.flow.turn,
      stage.turnRadius,
      this.position.x,
      this.params.start,
      this.position.z
    )

    sk.push()
    sk.translate(placed.x, placed.y, placed.z)

    if (corrupted !== null)
      sk.fill(corrupted.hue, corrupted.saturation, corrupted.lightness)
    else
      sk.fill(
        lit.hue,
        lit.saturation,
        lit.lightness,
        this.params.isStrokedOnly
          ? this.params.alpha
          : this.params.alpha < 0.98
          ? this.params.alpha
          : this.params.beta
      )

    sk.stroke(tint.hue, tint.saturation, tint.lightness)
    sk.strokeWeight(this.params.beta)

    this.params.rows.forEach((row) => {
      this.drow(sk, quality, row.x, offsetY, row.width, row.height)
      offsetY += row.height
    })

    sk.pop()
  }
}
