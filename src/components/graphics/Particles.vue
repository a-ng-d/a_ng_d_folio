<script lang="ts">
  import P5 from 'p5'
  import { v4 as uuidv4 } from 'uuid'
  import { HSLColors } from '@/utilities/colors'
  import { random } from '@/utilities/operations'

  export default {
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
        type: String
      }
    },
    data() {
      return {
        uuid: uuidv4(),
        particles: null
      }
    },
    watch: {
      isExpanded(to, from) {
        to ? this.particles.expand() : this.particles.collapse()
      },
      movement(to, from) {
        const actions = {
          'go-up': () => this.particles.goUp(to),
          'go-right': () => this.particles.goRight(to),
          'go-down': () => this.particles.goDown(to),
          'go-left': () => this.particles.goLeft(to)
        }
        return actions[to]?.() ?? 'No pov change'
      }
    },
    mounted() {
        this.particles = new P5((sk) => {

        const
          colors = Object.values(HSLColors).filter(entry => entry.type === 'primary'),
          weight = this.weight

        let
          fps = 30,
          units = [],
          time = 0

        // Elements
        class Unit {

          constructor(props) {
            this.props = props
            this.position = {
              x1: this.props.x1,
              y1: this.props.y1,
              x2: this.props.x2,
              y2: this.props.y2
            }
            this.size = {
              width: (this.position.x2 - this.position.x1) > 0 ? (this.position.x2 - this.position.x1) : (this.position.y2 - this.position.y1)
            }
            this.params = {
              color: colors[random(0, colors.length)],
              weight: this.props.weight,
              move: this.size.width,
              speed: 0.1,
              order: 0,
              gap: 8,
              isExpanded: false,
              resetTime: false,
              movement: 'go-left'
            }
          }

          expand = (units) => {
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

          changeMovement = (movement) => this.params.movement = movement

          move = () => {
            if (this.params.isExpanded && sk.millis() - time > this.params.gap * this.params.order)
              this.params.move = sk.lerp(this.params.move, 0, this.params.speed * 2)
            else if (!this.params.isExpanded && sk.millis() - time > this.params.gap * this.params.order)
              this.params.move = sk.lerp(this.params.move, -(this.size.width + 1), this.params.speed * 4)

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

        sk.makeUnits = (direction) => {
          units = []

          if (direction === 'vertical')
            for (let limitX = 0 ; limitX <= sk.width + weight ;) {
              for (let limitY = 0 ; limitY <= sk.height ;) {
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
                for (let limitX = 0 ; limitX <= sk.width ;) {
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

          sk.createCanvas(this.$el.clientWidth, this.$el.clientHeight).parent(this.uuid)
          sk.colorMode(sk.HSL)
          sk.rectMode(sk.CENTER)

          sk.frameRate(fps)

          sk.makeUnits(this.direction)

        }

        sk.draw = () => {

          sk.clear()
          units.forEach(unit => unit.move())

        }

        // Events
        sk.expand = () => units.forEach(unit => unit.expand(units.length))

        sk.collapse = () => units.forEach(unit => unit.collapse())

        sk.goUp = (movement) => {
          sk.makeUnits('vertical')
          units.forEach(unit => unit.changeMovement(movement))
        }

        sk.goRight = (movement) => {
          sk.makeUnits('horizontal')
          units.forEach(unit => unit.changeMovement(movement))
        }

        sk.goDown = (movement) => {
          sk.makeUnits('vertical')
          units.forEach(unit => unit.changeMovement(movement))
        }

        sk.goLeft = (movement) => {
          sk.makeUnits('horizontal')
          units.forEach(unit => unit.changeMovement(movement))
        }

        sk.windowResized = () => {
          sk.resizeCanvas(this.$el.clientWidth, this.$el.clientHeight)
        }

      })
    }
  }
</script>

<template>
  <div :id="uuid" class="canvas-container"></div>
</template>

<style scoped lang="sass">
  .canvas-container
    width: 100%
    height: 100%
</style>
