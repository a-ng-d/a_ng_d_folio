<script lang="ts">
  import P5 from 'p5'
  import { HSLColors } from '@/assets/Colors'

  export default {
    name: 'Landscape',
    props: {
      background: String
    },
    mounted() {
      new P5((sk) => {
        const
          mNumber = 400,
          cNumber = 40,
          quality = 50

        let
          fps = 60,
          speed = 2,
          mountains = [],
          clouds = []

        const colors = HSLColors

        // Elements
        class Mountain {

          constructor(props) {
            this.props = props
            this.size = {
              width: sk.int(sk.random(this.props.widthRange[0], this.props.widthRange[1])),
              height: sk.int(sk.random(this.props.heightRange[0], this.props.heightRange[1]))
            }
            this.position = {
              x: sk.int(this.props.x),
              y: sk.int(this.props.y),
              z: sk.int(sk.random(this.props.zRange[0], this.props.zRange[1]))
            }
            this.params = {
              radius: sk.int(sk.abs(this.size.height / 4)),
              radians: sk.radians(180),
              speed: 0.1,
              order: 0,
              delay: 5,
              isGlitched: false
            }
            this.backup = {}
          }

          deepHue = () => sk.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.hue, this.props.foreground.hue)

          deepSaturation = () => sk.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.saturation, this.props.foreground.saturation)

          deepLightness = () => sk.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.lightness, this.props.foreground.lightness)

          glitch = () => {
            this.backup = {
              size: {
                width: this.size.width,
                height: this.size.height,
              },
              params: {
                radius: this.params.radius
              }
            }
            this.params.isGlitched = true
          }

          unglitch = () => {
            this.params.isGlitched = false
            this.size = this.backup.size
            this.params.radius = this.backup.params.radius
          }

          move = () => {
            if (this.position.z <= 0)
              this.position.z += speed
            else
              this.position.z = this.props.zRange[0]

            if (sk.millis() > this.params.order * this.params.delay)
              this.params.radians = sk.lerp(this.params.radians, sk.radians(0), this.params.speed)

            if (this.params.isGlitched) {
              this.size.width = sk.random(this.backup.size.width * 2)
              this.size.height = sk.random(this.backup.size.height)
              this.params.radius = sk.random(this.backup.params.radius)
            }

            this.draw()
          }

          draw = () => {
            sk.push()
              sk.translate(this.position.x, this.position.y, this.position.z)
              sk.rotateX(this.params.radians)
              sk.noStroke()
              sk.fill(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.rectMode(sk.CORNER)
              sk.ellipseMode(sk.CORNER)
              sk.ellipse(0, this.size.height, this.params.radius, this.params.radius, quality)
              sk.rect((this.params.radius / 2), this.size.height, this.size.width, this.params.radius)
              sk.ellipse(this.size.width, this.size.height, this.params.radius, this.params.radius, quality)
              sk.rect(0, 0, (this.size.width + this.params.radius), (this.size.height + (this.params.radius / 2)))
            sk.pop()
          }

        }

        class Cloud {

          constructor(props) {
            this.props = props
            this.size = {
              width: sk.int(sk.random(this.props.widthRange[0], this.props.widthRange[1])),
              height: sk.int(sk.random(this.props.heightRange[0], this.props.heightRange[1]))
            }
            this.position = {
              x: sk.int(this.props.x),
              y: sk.int(this.props.y),
              z: sk.int(sk.random(this.props.zRange[0], this.props.zRange[1]))
            }
            this.params = {
              rows: [],
              speed: 0.1,
              order: 0,
              delay: 30,
              start: sk.height,
              isGlitched: false
            }
            for (let i = 1 ; i < this.props.rows ; i++)
              this.params.rows.push({
                width: sk.int(this.size.width * sk.random(0.5, 1)),
                height: sk.int(this.size.height * sk.random(0.5, 1)),
                x: sk.int(sk.random(-this.size.width / 4, this.size.width / 4))
              })
            this.backup = {}
          }

          deepHue = () => sk.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.hue, this.props.foreground.hue)

          deepSaturation = () => sk.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.saturation, this.props.foreground.saturation)

          deepLightness = () => sk.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.lightness, this.props.foreground.lightness)

          glitch = () => {
            this.backup.rows = this.params.rows.map(row => {
              return {
                width: row.width,
                height: row.height,
                x: row.x
              }
            })
            this.params.isGlitched = true
          }

          unglitch = () => {
            this.params.isGlitched = false
            this.params.rows = this.backup.rows
          }

          move = () => {
            if (this.position.z <= 0)
              this.position.z += speed
            else
              this.position.z = this.props.zRange[0]

            if (this.position.x <= sk.width * 4)
              this.position.x += speed / 4
            else
              this.position.x = -sk.width * 4

            if (sk.millis() > this.params.order * this.params.delay)
              this.params.start = sk.lerp(this.params.start, this.position.y, this.params.speed)

            if (this.params.isGlitched) {
              this.params.rows.forEach(row => {
                row.width = sk.random(this.size.width / 2)
                row.height = sk.random(this.size.height / 2)
                row.x = sk.random(-sk.width / 4, sk.width / 4)
              })
            }

            this.draw()
          }

          drow = (x, y, width, height) => {
            sk.push()
              sk.translate(x, y, 0)
              sk.rectMode(sk.CORNER)
              sk.ellipseMode(sk.CORNER)
              sk.ellipse(0, height, height, height, quality)
              sk.rect(-(height / 2), 0, width, height)
              sk.ellipse(width, height, height, height, quality)
            sk.pop()
          }

          draw = () => {
            let offsetY = 0
            sk.push()
              sk.translate(this.position.x, this.params.start, this.position.z)
              sk.noStroke()
              sk.fill(this.deepHue(), this.deepSaturation(), this.deepLightness())
              this.params.rows.forEach(row => {
                this.drow(row.x, offsetY, row.width, row.height)
                offsetY += row.height
              })
            sk.pop()
          }

        }

        class Pov {

          constructor(props) {
            this.props = props
            this.position = {
              x: this.props.x,
              y: this.props.y,
              z: this.props.z
            }
            this.center = {
              x: this.props.cX,
              y: this.props.cY,
              z: this.props.cZ
            }
            this.params = {
              target: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0
                },
                center: {
                  x: 0,
                  y: 0,
                  z: 0
                },
                details: {
                  x: 0,
                  y: 0,
                  z: 0
                }
              },
              speed: 0,
              isPushed: false
            }
          }

          animate = (speed, position, center) => {
            this.params.speed = speed
            this.params.target.position.x = position[0]
            this.params.target.position.y = position[1]
            this.params.target.position.z = position[2]
            this.params.target.center.x = center[0]
            this.params.target.center.y = center[1]
            this.params.target.center.z = center[2]
          }

          move = () => {
            this.position.x = sk.lerp(this.position.x, this.params.target.position.x, this.params.speed)
            this.position.y = sk.lerp(this.position.y, this.params.target.position.y, this.params.speed)
            this.position.z = sk.lerp(this.position.z, this.params.target.position.z, this.params.speed)
            this.center.x = sk.lerp(this.center.x, this.params.target.center.x, this.params.speed)
            this.center.y = sk.lerp(this.center.y, this.params.target.center.y, this.params.speed)
            this.center.z = sk.lerp(this.center.z, this.params.target.center.z, this.params.speed)

            if (this.params.isPushed) {
              this.position.x = sk.lerp(this.position.x, sk.map(sk.mouseX, 0, sk.width, sk.width * 0.1, -sk.width * 0.1), 0.1)
              this.position.y = sk.lerp(this.position.y, sk.map(sk.mouseY, 0, sk.height, sk.height * 0.1, -sk.height * 0.1), 0.1)
            }

            this.draw()
          }

          push = () => {
            this.params.isPushed = true
          }

          reset = () => {
            this.animate(0.1, [0, (-height * 0.1), 0], [0, 0, (-height * 2)])
          }

          draw = () => {
            sk.camera(
              this.position.x,
              this.position.y,
              this.position.z,
              this.center.x,
              this.center.y,
              this.center.z
            )
          }

        }

        // Sketch
        let pov = new Pov({
          x: 0,
          y: -window.innerHeight * 0.1,
          z: 0,
          cX: 0,
          cY: 0,
          cZ: -window.innerHeight * 2
        })

        sk.setup = () => {

          sk.createCanvas(sk.windowWidth, sk.windowHeight, sk.WEBGL).parent('sketch')
          sk.colorMode(sk.HSL)
          sk.rectMode(sk.CENTER)
          sk.frameRate(fps)

          // particles setting
          for (let i = 0 ; i < mNumber ; i++)
            mountains.push(new Mountain({
              widthRange: [sk.width * 0.25, sk.width],
              heightRange: [-sk.height * 0.2, -sk.height * 0.4],
              x: sk.random(-sk.width * 4, sk.width * 4),
              y: sk.height * 0.5,
              zRange: [-sk.height * 4, 0],
              foreground: colors.creamySun,
              background: colors.soil
            }))
          for (let i = 0 ; i < cNumber ; i++)
            clouds.push(new Cloud({
              widthRange: [sk.width * 0.25, sk.width],
              heightRange: [-sk.height * 0.05, -sk.height * 0.1],
              x: sk.random(-sk.width * 4, sk.width * 4),
              y: sk.random(-sk.height * 0.2, sk.height * 0.4),
              zRange: [-sk.height * 4, 0],
              rows: sk.int(sk.random(3, 5)),
              foreground: colors.cream,
              background: colors.soil
            }))

          mountains.sort((a, b) => b.position.z - a.position.z)
          mountains.forEach((mountain, index) => { mountain.params.order = index })
          clouds.sort((a, b) => b.position.z - a.position.z)
          clouds.forEach((cloud, index) => { cloud.params.order = index })

        }

        sk.draw = () => {

          sk.clear()

          sk.background(colors.soil.hue, colors.soil.saturation, colors.soil.lightness)

          // camera
          pov.move()

          // floor
          sk.push()
            sk.noStroke()
            sk.fill(colors.soil.hue, colors.soil.saturation, colors.soil.lightness)
            sk.translate(0, (sk.height * 0.5) - 1, 0)
            sk.rotateX(sk.PI / 2)
            sk.rect(0, 0, sk.width * 4, sk.height * 8)
          sk.pop()

          // mountains
          mountains.forEach(el => el.move())

          // clouds
          clouds.forEach(el => el.move())

        }

        // Events
        sk.povCore = () => pov.animate(0.1, [0, (-sk.height * 0.1), -sk.height * 1.75], [0, 0, (-sk.height * 2)])

        sk.povReset = () => pov.reset()

        sk.mouseMoved = () => pov.push()

        sk.mousePressed = () => {
          mountains.forEach(el => el.glitch())
          clouds.forEach(el => el.glitch())
        }

        sk.mouseReleased = () => {
          mountains.forEach(el => el.unglitch())
          clouds.forEach(el => el.unglitch())
        }
      })
    }
  }
</script>

<template>
  <div class="background" id="sketch">
    <div class="veil"></div>
  </div>
</template>

<style lang="sass">
  .background
    width: 100vw
    height: 100vh
    position: fixed
    top: 0

    .veil
      width: inherit
      height: inherit
      position: absolute
      z-index: 1
      mix-blend-mode: hard-light
      background: v-bind(background)
</style>
