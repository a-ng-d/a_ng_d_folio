<script lang="ts">
  import P5 from 'p5'

  export default {
    name: 'Landscape',
    props: {
      background: String
    },
    mounted() {
      new P5((p5) => {
        const
          mNumber = 400,
          cNumber = 40,
          quality = 50

        let
          fps = 60,
          speed = 2,
          mountains = [],
          clouds = []

        // Style guide
        const colors = {
          deepBlack: {
            hue: 240,
            saturation: 100,
            lightness: 8
          },
          titaniumWhite: {
            hue: 0,
            saturation: 0,
            lightness: 100
          },
          soil: {
            hue: 340,
            saturation: 2,
            lightness: 30
          },
          sandstone: {
            hue: 345,
            saturation: 2,
            lightness: 61
          },
          clay: {
            hue: 3,
            saturation: 4,
            lightness: 78
          },
          cream: {
            hue: 3,
            saturation: 14,
            lightness: 96
          },
          creamySun: {
            hue: 49,
            saturation: 90,
            lightness: 62
          },
          softWind: {
            hue: 209,
            saturation: 96,
            lightness: 89
          },
          candyFloss: {
            hue: 266,
            saturation: 60,
            lightness: 89
          },
          clearWater: {
            hue: 209,
            saturation: 96,
            lightness: 69
          }
        }

        // Elements
        class Mountain {

          constructor(props) {
            this.props = props
            this.size = {
              width: p5.int(p5.random(this.props.widthRange[0], this.props.widthRange[1])),
              height: p5.int(p5.random(this.props.heightRange[0], this.props.heightRange[1]))
            }
            this.position = {
              x: p5.int(this.props.x),
              y: p5.int(this.props.y),
              z: p5.int(p5.random(this.props.zRange[0], this.props.zRange[1]))
            }
            this.params = {
              radius: p5.int(p5.abs(this.size.height / 4)),
              radians: p5.radians(180),
              speed: 0.1,
              order: 0,
              delay: 5,
              isGlitched: false
            }
            this.backup = {}
          }

          deepHue = () => p5.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.hue, this.props.foreground.hue)

          deepSaturation = () => p5.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.saturation, this.props.foreground.saturation)

          deepLightness = () => p5.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.lightness, this.props.foreground.lightness)

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

            if (p5.millis() > this.params.order * this.params.delay)
              this.params.radians = p5.lerp(this.params.radians, p5.radians(0), this.params.speed)

            if (this.params.isGlitched) {
              this.size.width = p5.random(this.backup.size.width * 2)
              this.size.height = p5.random(this.backup.size.height)
              this.params.radius = p5.random(this.backup.params.radius)
            }

            this.draw()
          }

          draw = () => {
            p5.push()
              p5.translate(this.position.x, this.position.y, this.position.z)
              p5.rotateX(this.params.radians)
              p5.noStroke()
              p5.fill(this.deepHue(), this.deepSaturation(), this.deepLightness())
              p5.rectMode(p5.CORNER)
              p5.ellipseMode(p5.CORNER)
              p5.ellipse(0, this.size.height, this.params.radius, this.params.radius, quality)
              p5.rect((this.params.radius / 2), this.size.height, this.size.width, this.params.radius)
              p5.ellipse(this.size.width, this.size.height, this.params.radius, this.params.radius, quality)
              p5.rect(0, 0, (this.size.width + this.params.radius), (this.size.height + (this.params.radius / 2)))
            p5.pop()
          }

        }

        class Cloud {

          constructor(props) {
            this.props = props
            this.size = {
              width: p5.int(p5.random(this.props.widthRange[0], this.props.widthRange[1])),
              height: p5.int(p5.random(this.props.heightRange[0], this.props.heightRange[1]))
            }
            this.position = {
              x: p5.int(this.props.x),
              y: p5.int(this.props.y),
              z: p5.int(p5.random(this.props.zRange[0], this.props.zRange[1]))
            }
            this.params = {
              rows: [],
              speed: 0.1,
              order: 0,
              delay: 30,
              start: p5.height,
              isGlitched: false
            }
            for (let i = 1 ; i < this.props.rows ; i++)
              this.params.rows.push({
                width: p5.int(this.size.width * p5.random(0.5, 1)),
                height: p5.int(this.size.height * p5.random(0.5, 1)),
                x: p5.int(p5.random(-this.size.width / 4, this.size.width / 4))
              })
            this.backup = {}
          }

          deepHue = () => p5.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.hue, this.props.foreground.hue)

          deepSaturation = () => p5.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.saturation, this.props.foreground.saturation)

          deepLightness = () => p5.map(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.lightness, this.props.foreground.lightness)

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

            if (this.position.x <= p5.width * 4)
              this.position.x += speed / 4
            else
              this.position.x = -p5.width * 4

            if (p5.millis() > this.params.order * this.params.delay)
              this.params.start = p5.lerp(this.params.start, this.position.y, this.params.speed)

            if (this.params.isGlitched) {
              this.params.rows.forEach(row => {
                row.width = p5.random(this.size.width / 2)
                row.height = p5.random(this.size.height / 2)
                row.x = p5.random(-p5.width / 4, p5.width / 4)
              })
            }

            this.draw()
          }

          drow = (x, y, width, height) => {
            p5.push()
              p5.translate(x, y, 0)
              p5.rectMode(p5.CORNER)
              p5.ellipseMode(p5.CORNER)
              p5.ellipse(0, height, height, height, quality)
              p5.rect(-(height / 2), 0, width, height)
              p5.ellipse(width, height, height, height, quality)
            p5.pop()
          }

          draw = () => {
            let offsetY = 0
            p5.push()
              p5.translate(this.position.x, this.params.start, this.position.z)
              p5.noStroke()
              p5.fill(this.deepHue(), this.deepSaturation(), this.deepLightness())
              this.params.rows.forEach(row => {
                this.drow(row.x, offsetY, row.width, row.height)
                offsetY += row.height
              })
            p5.pop()
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
            this.position.x = p5.lerp(this.position.x, this.params.target.position.x, this.params.speed)
            this.position.y = p5.lerp(this.position.y, this.params.target.position.y, this.params.speed)
            this.position.z = p5.lerp(this.position.z, this.params.target.position.z, this.params.speed)
            this.center.x = p5.lerp(this.center.x, this.params.target.center.x, this.params.speed)
            this.center.y = p5.lerp(this.center.y, this.params.target.center.y, this.params.speed)
            this.center.z = p5.lerp(this.center.z, this.params.target.center.z, this.params.speed)

            if (this.params.isPushed) {
              this.position.x = p5.lerp(this.position.x, p5.map(p5.mouseX, 0, p5.width, p5.width * 0.1, -p5.width * 0.1), 0.1)
              this.position.y = p5.lerp(this.position.y, p5.map(p5.mouseY, 0, p5.height, p5.height * 0.1, -p5.height * 0.1), 0.1)
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
            p5.camera(
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

        p5.setup = () => {

          p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent('p5Canvas')
          p5.colorMode(p5.HSL)
          p5.rectMode(p5.CENTER)
          p5.frameRate(fps)

          // particles setting
          for (let i = 0 ; i < mNumber ; i++)
            mountains.push(new Mountain({
              widthRange: [p5.width * 0.25, p5.width],
              heightRange: [-p5.height * 0.2, -p5.height * 0.4],
              x: p5.random(-p5.width * 4, p5.width * 4),
              y: p5.height * 0.5,
              zRange: [-p5.height * 4, 0],
              foreground: colors.creamySun,
              background: colors.soil
            }))
          for (let i = 0 ; i < cNumber ; i++)
            clouds.push(new Cloud({
              widthRange: [p5.width * 0.25, p5.width],
              heightRange: [-p5.height * 0.05, -p5.height * 0.1],
              x: p5.random(-p5.width * 4, p5.width * 4),
              y: p5.random(-p5.height * 0.2, p5.height * 0.4),
              zRange: [-p5.height * 4, 0],
              rows: p5.int(p5.random(3, 5)),
              foreground: colors.cream,
              background: colors.soil
            }))

          mountains.sort((a, b) => b.position.z - a.position.z)
          mountains.forEach((mountain, index) => { mountain.params.order = index })
          clouds.sort((a, b) => b.position.z - a.position.z)
          clouds.forEach((cloud, index) => { cloud.params.order = index })

        }

        p5.draw = () => {

          p5.clear()

          p5.background(colors.soil.hue, colors.soil.saturation, colors.soil.lightness)

          // camera
          pov.move()

          // floor
          p5.push()
            p5.noStroke()
            p5.fill(colors.soil.hue, colors.soil.saturation, colors.soil.lightness)
            p5.translate(0, (p5.height * 0.5) - 1, 0)
            p5.rotateX(p5.PI / 2)
            p5.rect(0, 0, p5.width * 4, p5.height * 8)
          p5.pop()

          // mountains
          mountains.forEach(el => el.move())

          // clouds
          clouds.forEach(el => el.move())

        }

        // Events
        p5.povCore = () => pov.animate(0.1, [0, (-p5.height * 0.1), -p5.height * 1.75], [0, 0, (-p5.height * 2)])

        p5.povReset = () => pov.reset()

        p5.mouseMoved = () => pov.push()

        p5.mousePressed = () => {
          mountains.forEach(el => el.glitch())
          clouds.forEach(el => el.glitch())
        }

        p5.mouseReleased = () => {
          mountains.forEach(el => el.unglitch())
          clouds.forEach(el => el.unglitch())
        }
      })
    }
  }
</script>

<template>
  <div class="background" id="p5Canvas">
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
