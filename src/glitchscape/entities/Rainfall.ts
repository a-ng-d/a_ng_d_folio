import type { Stage } from '@/glitchscape/types'
import { shade } from '@/glitchscape/ramp'
import { clamp, randomFloat, wrap } from '@/utilities/operations'

interface Drop {
  x: number
  y: number
  z: number
  length: number
  speed: number
}

export class Rainfall {
  drops: Array<Drop>
  ceiling: number
  floor: number

  constructor(stage: Stage, count: number) {
    const bounds = stage.bounds

    this.ceiling = -bounds.height * 5
    this.floor = bounds.height * 2
    this.drops = []

    for (let i = 0; i < count; i++)
      this.drops.push({
        x: randomFloat(-bounds.width * 4, bounds.width * 4),
        y: randomFloat(this.ceiling, this.floor),
        z: randomFloat(-bounds.limitZ * 0.12, -bounds.height * 0.5),
        length: randomFloat(bounds.height * 0.06, bounds.height * 0.16),
        speed: randomFloat(0.8, 1.6),
      })
  }

  resize = (stage: Stage, count: number) => {
    while (this.drops.length > count) this.drops.pop()
    while (this.drops.length < count) {
      const seed = new Rainfall(stage, 1)
      this.drops.push(seed.drops[0])
    }
  }

  move = (stage: Stage) => {
    const sk = stage.sk,
      rain = clamp(stage.scene.rain, 0, 1)

    if (rain <= 0 || this.drops.length === 0) return

    const fall = stage.bounds.height * 0.22 * (0.6 + rain),
      tint = shade(
        {
          hue: stage.scene.palette.glow.hue,
          saturation: stage.scene.palette.glow.saturation,
          lightness: stage.scene.palette.glow.lightness,
        },
        18
      )

    sk.push()
    sk.noFill()
    sk.strokeWeight(1)
    sk.stroke(tint.hue, tint.saturation, tint.lightness, 0.15 + rain * 0.35)
    sk.beginShape(sk.LINES)
    this.drops.forEach((drop) => {
      drop.y = wrap(drop.y + fall * drop.speed, this.ceiling, this.floor)
      sk.vertex(drop.x, drop.y, drop.z)
      sk.vertex(drop.x, drop.y + drop.length, drop.z)
    })
    sk.endShape()
    sk.pop()
  }
}
