import type { Position, Row, Size } from '@/utilities/types'
import type { CloudProps, P5Instance, Stage } from '@/glitchscape/types'
import { fadeAt, haze, hazeAt, rampAt, riseAt, shade } from '@/glitchscape/ramp'
import { bend } from '@/glitchscape/bend'
import { HSLColors } from '@/utilities/colors'
import { doMap, lerp, random, randomFloat, wrap } from '@/utilities/operations'

const WIRE_SPEED = 0.04

const RISE_BAND = 0.2

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
    wire: number
    wireTarget: number
    isRetiring: boolean
    retirement: number
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
      wire: 1,
      wireTarget: 1,
      isRetiring: false,
      retirement: 0,
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
    this.position.x *= widthRatio
    this.position.y *= heightRatio
    this.position.z *= depthRatio
    this.params.start *= heightRatio
    this.params.rows.forEach((row) => {
      row.width *= widthRatio
      row.height *= heightRatio
      row.x *= widthRatio
    })
    this.backup.rows.forEach((row) => {
      row.width *= widthRatio
      row.height *= heightRatio
      row.x *= widthRatio
    })
  }

  retire = () => (this.params.isRetiring = true)

  hasFaded = () => this.params.retirement > 0.97

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
        this.params.isRetiring ? bounds.height : this.position.y,
        this.params.speed
      )

    if (this.params.isRetiring)
      this.params.retirement = lerp(
        this.params.retirement,
        1,
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
      this.params.isRetiring ? 0 : this.params.beta,
      this.params.speed * (this.params.isRetiring ? 1 : 0.5)
    )

    const woven = lerp(this.params.wire, this.params.wireTarget, WIRE_SPEED)
    this.params.wire =
      Math.abs(woven - this.params.wireTarget) < 0.002
        ? this.params.wireTarget
        : woven

    this.draw(stage)
  }

  private drow = (
    sk: P5Instance,
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
      fog = hazeAt(this.position.z, this.props.zRange[0], 0.5),
      opacity =
        this.params.alpha *
        (1 - fadeAt(this.position.z, this.props.zRange[0], 0.08, 0.02)) *
        riseAt(this.position.z, this.props.zRange[0], RISE_BAND),
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

    if (opacity <= 0.01) return

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

    const wire = this.params.wire

    if (wire > 0.995) sk.noFill()
    else if (corrupted !== null)
      sk.fill(
        corrupted.hue,
        corrupted.saturation,
        corrupted.lightness,
        1 - wire
      )
    else
      sk.fill(
        lit.hue,
        lit.saturation,
        lit.lightness,
        Math.min(opacity, this.params.beta) * (1 - wire)
      )

    sk.stroke(tint.hue, tint.saturation, tint.lightness, opacity)
    sk.strokeWeight(this.params.beta)

    this.params.rows.forEach((row) => {
      this.drow(sk, quality, row.x, offsetY, row.width, row.height)
      offsetY += row.height
    })

    sk.pop()
  }
}
