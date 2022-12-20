<script lang="ts">
  import { defineComponent } from 'vue'
  import type { ParticleProps, Path, HuSaLiTy, Size } from '@/utilities/types'
  import P5 from 'p5'
  import { v4 as uuidv4 } from 'uuid'
  import { HSLColors } from '@/utilities/colors'
  import { random } from '@/utilities/operations'

  export default defineComponent({
    name: 'Particles',
    props: {
      isExpanded: Boolean,
      weight: {
        type: Number,
        default: 16
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      movement: {
        type: String,
        default: 'go-right'
      }
    },
    data: function() {
      return {
        uuid: uuidv4() as string,
        particles: null as any
      }
    },
    watch: {
      isExpanded(to) {
        to ? this.particles.expand() : this.particles.collapse()
      },
      movement(to) {
        const actions: { [key: string]: () => void } = {
          'go-up': () => this.particles.goUp(to),
          'go-right': () => this.particles.goRight(to),
          'go-down': () => this.particles.goDown(to),
          'go-left': () => this.particles.goLeft(to)
        }
        return actions[to]?.()
      }
    },
    mounted: function() {
        this.particles = new P5((sk: any) => {

        const
          colors: Array<HuSaLiTy> = Object.values(HSLColors).filter((entry: HuSaLiTy) => entry.type === 'primary'),
          weight: number = this.weight

        let
          fps = 30,
          units: Array<Unit> = [],
          time = 0

        // Elements
        class Unit {

          props: ParticleProps
          position: Path
          size: Size
          params: {
            color: HuSaLiTy,
            weight: number,
            weightRef: number,
            move: number,
            speed: number,
            order: number,
            gap: number,
            isExpanded: boolean,
            resetTime: boolean,
            movement: string
          }

          constructor(props: ParticleProps) {
            this.props = props
            this.position = {
              x1: this.props.x1,
              y1: this.props.y1,
              x2: this.props.x2,
              y2: this.props.y2
            }
            this.size = {
              width: (this.position.x2 - this.position.x1) > 0 ? (this.position.x2 - this.position.x1) : (this.position.y2 - this.position.y1),
              height: 0
            }
            this.params = {
              color: colors[random(0, colors.length)],
              weight: 0,
              weightRef: this.props.weight,
              move: this.size.width,
              speed: 0.1,
              order: 0,
              gap: 8,
              isExpanded: false,
              resetTime: false,
              movement: 'go-left'
            }
          }

          expand = (units: number) => {
            this.params.order == 0 ? this.params.order = sk.int(random(0, units)) : this.params.order == this.params.order
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

          changeMovement = (movement: string) => (this.params.movement as string) = movement

          move = () => {
            if (this.params.isExpanded && sk.millis() - time > this.params.gap * this.params.order) {
              this.params.move = sk.lerp(this.params.move, 0, this.params.speed * 2)
              this.params.weight = sk.lerp(this.params.weight, this.params.weightRef, this.params.speed * 4)
            }
            else if (!this.params.isExpanded && sk.millis() - time > this.params.gap * this.params.order) {
              this.params.move = sk.lerp(this.params.move, -(this.size.width + 1), this.params.speed * 4)
              this.params.weight = sk.lerp(this.params.weight, 0, this.params.speed * 2)
            }

            this.draw()
          }

          draw = () => {
            sk.stroke(this.params.color.hue, this.params.color.saturation, this.params.color.lightness)
            sk.strokeCap(sk.ROUND)
            sk.strokeWeight(this.params.weight)
            sk.drawingContext.setLineDash([this.size.width, this.size.width + 1])
            sk.drawingContext.lineDashOffset = this.params.movement === 'go-up' ? this.params.move : this.params.movement === 'go-left' ? this.params.move : -this.params.move
            sk.line(this.position.x1, this.position.y1, this.position.x2, this.position.y2)
          }

        }

        sk.makeUnits = (direction: string) => {
          units = []

          if (direction === 'vertical')
            for (let limitX = 0 ; limitX <= sk.width + weight ;) {
              for (let limitY = 0 ; limitY <= sk.height + weight ;) {
                let rY = sk.int(random(weight, weight * 6))
                units.push(new Unit({
                  x1: limitX,
                  y1: limitY,
                  x2: limitX,
                  y2: limitY + rY,
                  weight: weight
                }))
                limitY += rY
              }
              limitX += weight
            }
            else if (direction === 'horizontal')
              for (let limitY = 0 ; limitY <= sk.height + weight ;) {
                for (let limitX = 0 ; limitX <= sk.width + weight ;) {
                  let rX = sk.int(random(weight, weight * 6))
                  units.push(new Unit({
                    x1: limitX,
                    y1: limitY,
                    x2: limitX + rX,
                    y2: limitY,
                    weight: weight
                  }))
                  limitX += rX
                }
                limitY += weight
              }
        }

        // Sketch
        sk.setup = () => {

          sk.createCanvas(this.$el.clientWidth + 8, this.$el.clientHeight + 8).parent(this.uuid)
          sk.colorMode(sk.HSL)
          sk.rectMode(sk.CENTER)

          sk.frameRate(fps)

          sk.makeUnits(this.direction)

          sk.noLoop()

        }

        sk.draw = () => {

          sk.clear()
          units.forEach(unit => unit.move())

        }

        // Events
        sk.expand = () => {
          sk.loop()
          units.forEach(unit => unit.expand(units.length))
          setTimeout(() => {
            sk.noLoop()
          }, 8000)
        }

        sk.collapse = () => {
          sk.loop()
          units.forEach(unit => unit.collapse())
          setTimeout(() => {
            sk.noLoop()
          }, 8000)
        }

        sk.mouseReleased = () => sk.noLoop()

        sk.goUp = (movement: string) => {
          sk.makeUnits('vertical')
          units.forEach(unit => unit.changeMovement(movement))
        }

        sk.goRight = (movement: string) => {
          sk.makeUnits('horizontal')
          units.forEach(unit => unit.changeMovement(movement))
        }

        sk.goDown = (movement: string) => {
          sk.makeUnits('vertical')
          units.forEach(unit => unit.changeMovement(movement))
        }

        sk.goLeft = (movement: string) => {
          sk.makeUnits('horizontal')
          units.forEach(unit => unit.changeMovement(movement))
        }

        sk.windowResized = () => {
          sk.resizeCanvas(this.$el.clientWidth, this.$el.clientHeight)
          sk.makeUnits('horizontal')
        }

        sk.deviceTurned = () => {
          sk.resizeCanvas(this.$el.clientWidth, this.$el.clientHeight)
          sk.makeUnits('horizontal')
        }

      })
    }
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
