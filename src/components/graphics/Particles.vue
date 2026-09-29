<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import type { ParticleProps, Path, HuSaLiTy, Size } from '@/utilities/types'
  import P5 from 'p5'
  import { v4 as uuidv4 } from 'uuid'
  import { HSLColors } from '@/utilities/colors'
  import { random } from '@/utilities/operations'

  export type Shape = 'line' | 'square' | 'triangle'

  interface ParticlesSketch extends P5 {
    makeUnits: (direction: string) => void
    expand: () => void
    collapse: () => void
    mouseReleased: () => void
    goUp: (movement: string) => void
    goRight: (movement: string) => void
    goDown: (movement: string) => void
    goLeft: (movement: string) => void
    setDirection: (direction: string) => void
    setShape: (shape: Shape) => void
    setSpeed: (speed: number) => void
    setSize: (size: number) => void
    setColors: (colors: Array<HuSaLiTy>) => void
    windowResized: () => void
    deviceTurned: () => void
  }

  export default defineComponent({
    name: 'Particles',
    props: {
      isExpanded: Boolean,
      weight: {
        type: Number,
        default: 16,
      },
      direction: {
        type: String,
        default: 'horizontal',
      },
      movement: {
        type: String,
        default: 'go-right',
      },
      shape: {
        type: String as PropType<Shape>,
        default: 'line',
      },
      speed: {
        type: Number,
        default: 0.1,
      },
      particleSize: {
        type: Number,
        default: 1,
      },
      colors: {
        type: Array as PropType<Array<HuSaLiTy>>,
        default: () => [],
      },
    },
    data: function () {
      return {
        uuid: uuidv4() as string,
        particles: null as ParticlesSketch | null,
      }
    },
    watch: {
      isExpanded(to) {
        to ? this.particles?.expand() : this.particles?.collapse()
      },
      movement(to) {
        const actions: { [key: string]: () => void } = {
          'go-up': () => this.particles?.goUp(to),
          'go-right': () => this.particles?.goRight(to),
          'go-down': () => this.particles?.goDown(to),
          'go-left': () => this.particles?.goLeft(to),
        }
        return actions[to]?.()
      },
      direction(to) {
        this.particles?.setDirection(to)
      },
      shape(to) {
        this.particles?.setShape(to)
      },
      speed(to) {
        this.particles?.setSpeed(to)
      },
      particleSize(to) {
        this.particles?.setSize(to)
      },
      colors(to) {
        this.particles?.setColors(to)
      },
    },
    mounted: function () {
      this.particles = new P5((sk: ParticlesSketch) => {
        let fps = 30,
          units: Array<Unit> = [],
          time = 0,
          collapseTimer = 0,
          weight: number = this.weight,
          speed: number = this.speed,
          particleSize: number = this.particleSize,
          shape: Shape = this.shape,
          currentDirection: string = this.direction,
          colors: Array<HuSaLiTy> =
            this.colors && this.colors.length > 0
              ? this.colors
              : Object.values(HSLColors).filter(
                  (entry: HuSaLiTy) => entry.type === 'primary'
                )

        // Elements
        class Unit {
          props: ParticleProps
          position: Path
          size: Size
          params: {
            color: HuSaLiTy
            weight: number
            weightRef: number
            move: number
            speed: number
            order: number
            gap: number
            isExpanded: boolean
            resetTime: boolean
            movement: string
            shape: Shape
          }

          constructor(props: ParticleProps) {
            this.props = props
            this.position = {
              x1: this.props.x1,
              y1: this.props.y1,
              x2: this.props.x2,
              y2: this.props.y2,
            }
            this.size = {
              width:
                this.position.x2 - this.position.x1 > 0
                  ? this.position.x2 - this.position.x1
                  : this.position.y2 - this.position.y1,
              height: 0,
            }
            this.params = {
              color: colors[random(0, colors.length)],
              weight: 0,
              weightRef: this.props.weight,
              move: this.size.width,
              speed: speed,
              order: 0,
              gap: 8,
              isExpanded: false,
              resetTime: false,
              movement: 'go-left',
              shape: shape,
            }
          }

          expand = (units: number) => {
            this.params.order == 0
              ? (this.params.order = sk.int(random(0, units)))
              : this.params.order == this.params.order
            if (!this.params.resetTime) {
              time = sk.millis()
              this.params.resetTime = true
            }
            this.params.isExpanded = true
            this.params.move = this.size.width
          }

          collapse = () => {
            if (this.params.resetTime) {
              time = sk.millis()
              this.params.resetTime = false
            }
            this.params.isExpanded = false
          }

          changeMovement = (movement: string) =>
            ((this.params.movement as string) = movement)

          changeShape = (shape: Shape) => (this.params.shape = shape)

          changeSpeed = (speed: number) => (this.params.speed = speed)

          changeColor = (palette: Array<HuSaLiTy>) =>
            (this.params.color = palette[random(0, palette.length)])

          move = () => {
            if (
              this.params.isExpanded &&
              sk.millis() - time > this.params.gap * this.params.order
            ) {
              this.params.move = sk.lerp(
                this.params.move,
                0,
                sk.constrain(this.params.speed * 2, 0, 1)
              )
              this.params.weight = sk.lerp(
                this.params.weight,
                this.params.weightRef,
                sk.constrain(this.params.speed * 4, 0, 1)
              )
            } else if (
              !this.params.isExpanded &&
              sk.millis() - time > this.params.gap * this.params.order
            ) {
              this.params.move = sk.lerp(
                this.params.move,
                -(this.size.width + 1),
                sk.constrain(this.params.speed * 4, 0, 1)
              )
              this.params.weight = sk.lerp(
                this.params.weight,
                0,
                sk.constrain(this.params.speed * 2, 0, 1)
              )
            }

            this.draw()
          }

          draw = () => {
            sk.push()

            this.params.shape === 'triangle'
              ? this.drawTriangle()
              : this.drawLine()

            sk.pop()
          }

          drawLine = () => {
            sk.stroke(
              this.params.color.hue,
              this.params.color.saturation,
              this.params.color.lightness
            )
            sk.strokeCap(this.params.shape === 'square' ? sk.SQUARE : sk.ROUND)
            sk.strokeWeight(this.params.weight)
            sk.drawingContext.setLineDash([
              this.size.width,
              this.size.width + 1,
            ])
            sk.drawingContext.lineDashOffset =
              this.params.movement === 'go-up'
                ? this.params.move
                : this.params.movement === 'go-left'
                ? this.params.move
                : -this.params.move
            sk.line(
              this.position.x1,
              this.position.y1,
              this.position.x2,
              this.position.y2
            )
          }

          drawTriangle = () => {
            sk.stroke(
              this.params.color.hue,
              this.params.color.saturation,
              this.params.color.lightness
            )
            sk.strokeCap(sk.SQUARE)
            sk.strokeWeight(this.params.weight)
            sk.drawingContext.setLineDash([
              this.size.width,
              this.size.width + 1,
            ])
            sk.drawingContext.lineDashOffset =
              this.params.movement === 'go-up'
                ? this.params.move
                : this.params.movement === 'go-left'
                ? this.params.move
                : -this.params.move
            sk.line(
              this.position.x1,
              this.position.y1,
              this.position.x2,
              this.position.y2
            )

            const width = this.size.width,
              move = this.params.move,
              forward =
                this.params.movement === 'go-up' ||
                this.params.movement === 'go-left',
              offset = forward ? move : -move,
              lo = sk.constrain(-offset, 0, width),
              hi = sk.constrain(width - offset, 0, width)

            if (hi <= lo) return

            const half = Math.min(this.params.weight / 2, (hi - lo) / 2)

            if (half <= 0) return

            const point = half * 2,
              isVertical = this.position.x1 === this.position.x2,
              startX = isVertical
                ? this.position.x1
                : sk.lerp(this.position.x1, this.position.x2, lo / width),
              startY = isVertical
                ? sk.lerp(this.position.y1, this.position.y2, lo / width)
                : this.position.y1,
              endX = isVertical
                ? this.position.x1
                : sk.lerp(this.position.x1, this.position.x2, hi / width),
              endY = isVertical
                ? sk.lerp(this.position.y1, this.position.y2, hi / width)
                : this.position.y1

            sk.noStroke()
            sk.fill(
              this.params.color.hue,
              this.params.color.saturation,
              this.params.color.lightness
            )
            isVertical
              ? sk.triangle(
                  startX - half,
                  startY,
                  startX + half,
                  startY,
                  startX,
                  startY - point
                )
              : sk.triangle(
                  startX,
                  startY - half,
                  startX,
                  startY + half,
                  startX - point,
                  startY
                )
            isVertical
              ? sk.triangle(
                  endX - half,
                  endY,
                  endX + half,
                  endY,
                  endX,
                  endY + point
                )
              : sk.triangle(
                  endX,
                  endY - half,
                  endX,
                  endY + half,
                  endX + point,
                  endY
                )
          }
        }

        sk.makeUnits = (direction: string) => {
          units = []
          currentDirection = direction

          if (direction === 'vertical')
            for (let limitX = 0; limitX <= sk.width + weight; ) {
              for (let limitY = 0; limitY <= sk.height + weight; ) {
                let rY = sk.int(random(weight, weight * 6) * particleSize)
                units.push(
                  new Unit({
                    x1: limitX,
                    y1: limitY,
                    x2: limitX,
                    y2: limitY + rY,
                    weight: weight,
                  })
                )
                limitY += rY
              }
              limitX += weight
            }
          else if (direction === 'horizontal')
            for (let limitY = 0; limitY <= sk.height + weight; ) {
              for (let limitX = 0; limitX <= sk.width + weight; ) {
                let rX = sk.int(random(weight, weight * 6) * particleSize)
                units.push(
                  new Unit({
                    x1: limitX,
                    y1: limitY,
                    x2: limitX + rX,
                    y2: limitY,
                    weight: weight,
                  })
                )
                limitX += rX
              }
              limitY += weight
            }
        }

        // Sketch
        sk.setup = () => {
          sk.createCanvas(
            this.$el.clientWidth + 8,
            this.$el.clientHeight + 8
          ).parent(this.uuid)
          sk.colorMode(sk.HSL)
          sk.rectMode(sk.CENTER)

          sk.frameRate(fps)

          sk.makeUnits(this.direction)

          sk.noLoop()
        }

        sk.draw = () => {
          sk.clear(0, 0, 0, 0)
          units.forEach((unit) => unit.move())
        }

        // Events
        sk.expand = () => {
          window.clearTimeout(collapseTimer)
          sk.loop()
          units.forEach((unit) => unit.expand(units.length))
        }

        sk.collapse = () => {
          window.clearTimeout(collapseTimer)
          sk.loop()
          units.forEach((unit) => unit.collapse())
          collapseTimer = window.setTimeout(() => {
            sk.noLoop()
          }, 2000)
        }

        sk.mouseReleased = () => sk.noLoop()

        sk.goUp = (movement: string) => {
          sk.makeUnits('vertical')
          units.forEach((unit) => unit.changeMovement(movement))
        }

        sk.goRight = (movement: string) => {
          sk.makeUnits('horizontal')
          units.forEach((unit) => unit.changeMovement(movement))
        }

        sk.goDown = (movement: string) => {
          sk.makeUnits('vertical')
          units.forEach((unit) => unit.changeMovement(movement))
        }

        sk.goLeft = (movement: string) => {
          sk.makeUnits('horizontal')
          units.forEach((unit) => unit.changeMovement(movement))
        }

        sk.setDirection = (direction: string) => {
          sk.makeUnits(direction)
        }

        sk.setShape = (nextShape: Shape) => {
          shape = nextShape
          units.forEach((unit) => unit.changeShape(nextShape))
        }

        sk.setSpeed = (nextSpeed: number) => {
          speed = nextSpeed
          units.forEach((unit) => unit.changeSpeed(nextSpeed))
        }

        sk.setSize = (nextSize: number) => {
          particleSize = nextSize
          sk.makeUnits(currentDirection)
        }

        sk.setColors = (palette: Array<HuSaLiTy>) => {
          colors = palette && palette.length > 0 ? palette : colors
          units.forEach((unit) => unit.changeColor(colors))
        }

        sk.windowResized = () => {
          sk.resizeCanvas(this.$el.clientWidth, this.$el.clientHeight)
          sk.makeUnits(currentDirection)
        }

        sk.deviceTurned = () => {
          sk.resizeCanvas(this.$el.clientWidth, this.$el.clientHeight)
          sk.makeUnits(currentDirection)
        }
      }) as ParticlesSketch
    },
  })
</script>

<template>
  <div :id="uuid" class="canvas-container"></div>
</template>

<style scoped lang="sass">
  .canvas-container
    width: 100%
    height: 100%
    pointer-events: none
    z-index: 3
    position: absolute
    display: flex
    justify-content: center
    align-items: center
</style>
