<script lang="ts">
  import P5 from 'p5'
  import { v4 as uuidv4 } from 'uuid'
  import { HSLColors } from '@/assets/Colors'

  export default {
    name: 'Particles V2',
    data() {
      return {
        uuid: uuidv4()
      }
    },
    mounted() {
      new P5((sk) => {
        const
          colors = Object.values(HSLColors).filter(entry => entry.type === 'primary'),
          weight = 8

        let
          fps = 60,
          units = [],
          time = 0

        class Unit {

          constructor(props) {
            this.props = props
            this.position = {
              x1: this.props.x1,
              y1: this.props.y1,
              x2: this.props.x2,
              y2: this.props.y2
            }
            this.params = {
              color: sk.random(colors),
              weight: this.props.weight,
              start: -this.position.x2,
              speed: 0.02,
              order: 0,
              delay: 2,
              isCollapsed: true,
              isExpanded: false
            }
          }

          expand = () => {
            this.params.isCollapsed = false
            this.params.isExpanded = true
          }

          collapse = () => {
            time = 0
            this.params.isCollapsed = true
            this.params.isExpanded = false
          }

          move = () => {
            if (this.params.isExpanded)
              this.params.start = sk.lerp(this.params.start, 0, this.params.speed * 4)
            if (this.params.isCollapsed)
              this.params.start = sk.lerp(this.params.start, -this.position.x2, this.params.speed)

            this.draw()
          }

          draw = () => {
            sk.stroke(this.params.color.hue, this.params.color.saturation, this.params.color.lightness)
            sk.strokeCap(sk.ROUND)
            sk.strokeWeight(this.params.weight)
            sk.drawingContext.setLineDash([this.position.x2, this.position.x2])
            sk.drawingContext.lineDashOffset = this.params.start
            sk.line(this.position.x1, this.position.y1, this.position.x2, this.position.y2)
          }

        }

        sk.setup = () => {

          sk.createCanvas(this.$el.clientWidth, this.$el.clientHeight).parent(this.uuid)
          sk.colorMode(sk.HSL)
          sk.rectMode(sk.CENTER)
          sk.frameRate(fps)

          for (let limitY = 0 ; limitY <= sk.height ;) {
            for (let limitX = 0 ; limitX <= sk.width ;) {
              let rX = sk.int(sk.random(8, 48))
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

          sk.mouseMoved = () => {
            if (sk.mouseX >= 0 && sk.mouseX <= sk.width)
              if (sk.mouseY >= 0 && sk.mouseY <= sk.height)
                units.forEach(unit => unit.expand())
              else
                units.forEach(unit => unit.collapse())
            else
              units.forEach(unit => unit.collapse())
          }

        }

        sk.draw = () => {

          sk.clear()
          units.forEach(unit => unit.move())

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
