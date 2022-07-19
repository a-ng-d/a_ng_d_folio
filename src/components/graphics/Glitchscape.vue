<script lang="ts">
  import P5 from 'p5'
  import { HSLColors } from '@/assets/Colors'

  export default {
    name: 'Glitchscape',
    props: {
      filter: {
        type: [Object, String],
        default: {
          hue: '0deg',
          brightness: '1',
          invert: '0',
          saturation: '0.5'
        }
      },
      pov: {
        type: String,
        default: 'RESET'
      },
      quality: {
        type: String,
        default: 'HIGH'
      },
      isGlitched: Boolean,
      scrollProgress: {
        type: Number,
        default: 0
      },
      scrollLimit: {
        type: Number,
        required: true
      },
      view: String,
      numberOfProjects: {
        type: Number,
        default: 3
      }
    },
    data() {
      return {
        glitchscape: null
      }
    },
    watch: {
      pov(to, from) {
        const actions = {
          RESET: () => this.glitchscape.povReset(),
          BIRDEYE_1: () => this.glitchscape.povBirdEye(1),
          BIRDEYE_2: () => this.glitchscape.povBirdEye(2),
          BIRDEYE_3: () => this.glitchscape.povBirdEye(3),
          BIRDEYE_4: () => this.glitchscape.povBirdEye(4),
          BIRDEYE_5: () => this.glitchscape.povBirdEye(5),
          WISEEYE: () => this.glitchscape.povWiseEye()
        }
        return actions[to]?.() ?? 'No pov change'
      },
      quality(to, from) {
        const actions = {
          LOW: () => this.glitchscape.lowQuality(),
          HIGH: () => this.glitchscape.highQuality()
        }
        return actions[to]?.() ?? 'No pov change'
      },
      isGlitched(to, from) {
        if (to)
          this.glitchscape.glitch()
        else
          this.glitchscape.unglitch()
      },
      scrollProgress(to, from) {
        return this.glitchscape.povZoom(this.scrollProgress, this.scrollLimit)
      },
      view(to, from) {
        const actions = {
          RESET: () => this.glitchscape.povReset()
        }
        return actions[this.pov]?.() ?? 'No pov change'
      }
    },
    mounted() {
      this.glitchscape = new P5((sk) => {

        const
          mNumber = 140,
          cNumber = mNumber / 4,
          quality = 50,
          colors = HSLColors,
          limitX = window.innerWidth * 5,
          limitZ = window.innerHeight * 5

        let
          fps = 30,
          speed = 2,
          alpha = 1,
          mountains = [],
          clouds = []

        const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

        // Elements
        class Mountain {

          constructor(props) {
            this.props = props
            this.size = {
              width: sk.int(random(this.props.widthRange[0], this.props.widthRange[1])),
              height: sk.int(random(this.props.heightRange[0], this.props.heightRange[1]))
            }
            this.position = {
              x: sk.int(this.props.x),
              y: sk.int(this.props.y),
              z: sk.int(random(this.props.zRange[0], this.props.zRange[1]))
            }
            this.params = {
              radius: sk.int(sk.abs(this.size.height / 4)),
              radians: sk.radians(90),
              speed: 0.1,
              order: 0,
              gap: 5,
              isGlitched: false,
              isStrokedOnly: false
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

          wireframe = () => this.params.isStrokedOnly = true

          unwireframe = () => this.params.isStrokedOnly = false

          move = () => {
            if (this.position.z <= 0)
              this.position.z += speed
            else
              this.position.z = this.props.zRange[0]

            if (sk.millis() > this.params.order * this.params.gap)
              this.params.radians = sk.lerp(this.params.radians, sk.radians(0), this.params.speed)

            if (this.params.isGlitched) {
              this.size.width = random(0, this.backup.size.width * 2)
              this.size.height = random(0, this.backup.size.height)
              this.params.radius = random(0, this.backup.params.radius)
            }

            this.draw()
          }

          extrusion = () => {
            sk.push()
              sk.rotateX(this.params.radians)
              sk.ellipse(0, this.size.height, this.params.radius, this.params.radius, quality)
              sk.rect((this.params.radius / 2), this.size.height, this.size.width, this.params.radius)
              sk.ellipse(this.size.width, this.size.height, this.params.radius, this.params.radius, quality)
              sk.rect(0, 0, (this.size.width + this.params.radius), (this.size.height + (this.params.radius / 2)))
            sk.pop()
          }

          reflect = () => {
            sk.push()
              sk.rotateX(-this.params.radians)
              sk.ellipse(0, -(this.size.height * 4), this.params.radius, this.params.radius, quality)
              sk.rect((this.params.radius / 2), -(this.size.height * 4), this.size.width, this.params.radius)
              sk.ellipse(this.size.width, -(this.size.height * 4), this.params.radius, this.params.radius, quality)
              sk.rect(0, 0, (this.size.width + this.params.radius), -(this.size.height * 4 - (this.params.radius / 2)))
            sk.pop()
          }

          draw = () => {
            const randomColor = Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]

            sk.push()
              sk.translate(this.position.x, this.position.y, this.position.z)
              sk.fill(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.stroke(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.strokeWeight(1)
              this.params.isGlitched ? sk.fill(randomColor.hue, randomColor.saturation, randomColor.lightness) : null
              this.params.isStrokedOnly ? sk.noFill() : null
              sk.rectMode(sk.CORNER)
              sk.ellipseMode(sk.CORNER)
              this.extrusion()
              this.reflect()
            sk.pop()
          }

        }

        class Cloud {

          constructor(props) {
            this.props = props
            this.size = {
              width: sk.int(random(this.props.widthRange[0], this.props.widthRange[1])),
              height: sk.int(random(this.props.heightRange[0], this.props.heightRange[1]))
            }
            this.position = {
              x: sk.int(this.props.x),
              y: sk.int(this.props.y),
              z: sk.int(random(this.props.zRange[0], this.props.zRange[1]))
            }
            this.params = {
              rows: [],
              speed: 0.1,
              order: 0,
              gap: 30,
              start: sk.height,
              isGlitched: false,
              isStrokedOnly: false
            }
            for (let i = 1 ; i < this.props.rows ; i++)
              this.params.rows.push({
                width: sk.int(this.size.width * random(0.5, 1)),
                height: sk.int(this.size.height * random(0.5, 1)),
                x: sk.int(random(-this.size.width / 4, this.size.width / 4))
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

          wireframe = () => this.params.isStrokedOnly = true

          unwireframe = () => this.params.isStrokedOnly = false

          move = () => {
            if (this.position.z <= 0)
              this.position.z += speed
            else
              this.position.z = this.props.zRange[0]

            if (this.position.x <= sk.width * 4)
              this.position.x += speed / 4
            else
              this.position.x = -sk.width * 4

            if (sk.millis() > this.params.order * this.params.gap)
              this.params.start = sk.lerp(this.params.start, this.position.y, this.params.speed)

            if (this.params.isGlitched) {
              this.params.rows.forEach(row => {
                row.width = random(0, this.size.width / 2)
                row.height = random(0, this.size.height / 2)
                row.x = random(-sk.width / 4, sk.width / 4)
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
            const randomColor = Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]

            sk.push()
              sk.translate(this.position.x, this.params.start, this.position.z)
              sk.fill(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.stroke(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.strokeWeight(1)
              this.params.isGlitched ? sk.fill(randomColor.hue, randomColor.saturation, randomColor.lightness) : null
              this.params.isStrokedOnly ? sk.noFill() : null
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
                }
              },
              progress: {
                x: 0,
                y: 0,
                z: 0
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
            this.params.progress.x = 0
            this.params.progress.y = 0
            this.params.progress.z = 0
          }

          move = () => {
            this.position.x = sk.lerp(this.position.x, this.params.progress.x == 0 ? this.params.target.position.x : this.params.progress.x, this.params.speed)
            this.position.y = sk.lerp(this.position.y, this.params.progress.y == 0 ? this.params.target.position.y : this.params.progress.y, this.params.speed)
            this.position.z = sk.lerp(this.position.z, this.params.progress.z == 0 ? this.params.target.position.z : this.params.progress.z, this.params.speed)
            this.center.x = sk.lerp(this.center.x, this.params.target.center.x, this.params.speed)
            this.center.y = sk.lerp(this.center.y, this.params.target.center.y, this.params.speed)
            this.center.z = sk.lerp(this.center.z, this.params.target.center.z, this.params.speed)

            if (this.params.isPushed) {
              this.position.x = sk.lerp(this.position.x, this.params.target.position.x + sk.map(sk.mouseX, 0, sk.width, sk.width * 0.1, -sk.width * 0.1), 0.1)
              this.position.y = sk.lerp(this.position.y, this.params.target.position.y + sk.map(sk.mouseY, 0, sk.height, sk.height * 0.1, -sk.height * 0.1), 0.1)
            }

            this.draw()
          }

          push = () => this.params.isPushed = true

          reset = () => this.animate(0.05, [0, -window.innerHeight * 0.2, 0], [0, 0, -window.innerHeight * 2])

          zoom = (scrollPosition, pageLimitMax) => {
            this.params.progress.x = sk.map(scrollPosition, 0, pageLimitMax, this.params.target.position.x, this.params.target.center.x)
            this.params.progress.y = sk.map(scrollPosition, 0, pageLimitMax, this.params.target.position.y, this.params.target.center.y)
            this.params.progress.z = sk.map(scrollPosition, 0, pageLimitMax, this.params.target.position.z, this.params.target.center.z)
            //this.params.speed = 0
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
          y: -window.innerHeight * 0.2,
          z: -window.innerHeight * 2,
          cX: 0,
          cY: 0,
          cZ: -window.innerHeight * 4
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
              x: random(-limitX, limitX),
              y: sk.height * 0.5,
              zRange: [-limitZ, 0],
              foreground: colors.cream,
              background: colors.creamySun
            }))
          for (let i = 0 ; i < cNumber ; i++)
            clouds.push(new Cloud({
              widthRange: [sk.width * 0.25, sk.width],
              heightRange: [-sk.height * 0.01, -sk.height * 0.05],
              x: random(-limitX, limitX),
              y: random(-sk.height * 0.2, sk.height * 0.4),
              zRange: [-limitZ, 0],
              rows: sk.int(random(3, 5)),
              foreground: colors.clay,
              background: colors.creamySun
            }))

          mountains.sort((a, b) => a.position.z - b.position.z)
          mountains.forEach((mountain, index) => { mountain.params.order = index })
          clouds.sort((a, b) => a.position.z - b.position.z)
          clouds.forEach((cloud, index) => { cloud.params.order = index })

        }

        sk.draw = () => {

          alpha = sk.lerp(alpha, 0.5, 0.01)

          sk.clear()

          sk.background(colors.creamySun.hue, colors.creamySun.saturation, colors.creamySun.lightness)

          // camera
          pov.move()

          sk.blendMode(sk.BLEND)

          // mountains
          mountains.forEach(mountain => mountain.move())

          // clouds
          clouds.forEach(cloud => cloud.move())

          // floor
          sk.push()
            sk.blendMode(sk.DIFFERENCE)
            sk.noStroke()
            sk.fill(colors.creamySun.hue, colors.creamySun.saturation, colors.creamySun.lightness, alpha)
            sk.translate(0, (sk.height * 0.5) - 10, 0)
            sk.rotateX(sk.PI / 2)
            sk.rect(0, 0, limitX * 3, limitX * 3)
          sk.pop()

        }

        // Events
        sk.povReset = () => pov.reset()

        sk.povBirdEye = (increment) => pov.animate(
          0.05,
          [
            sk.map(increment, 1, this.numberOfProjects, -limitX *.75, limitX *.75),
            -window.innerHeight * 2,
            window.innerHeight
          ],
          [
            sk.map(increment, 1, this.numberOfProjects, -limitX *.75, limitX *.75),
            0,
            -window.innerHeight * 2
          ]
        )

        sk.povWiseEye = () => pov.animate(
          0.05,
          [
            0,
            -window.innerHeight * 0.1
            ,
            0
          ],
          [
            0,
            -window.innerHeight,
            -window.innerHeight * 2
          ]
        )

        sk.povZoom = (scrollProgress, scrollLimit) => pov.zoom(scrollProgress, scrollLimit + 200)

        sk.lowQuality = () => {
          mountains.forEach(el => el.wireframe())
          clouds.forEach(el => el.wireframe())
        }

        sk.highQuality = () => {
          mountains.forEach(el => el.unwireframe())
          clouds.forEach(el => el.unwireframe())
        }

        sk.mouseMoved = () => pov.push()

        sk.touchMoved = () => pov.push()

        sk.glitch = () => {
          mountains.forEach(el => el.glitch())
          clouds.forEach(el => el.glitch())
        }

        sk.unglitch = () => {
          mountains.forEach(el => el.unglitch())
          clouds.forEach(el => el.unglitch())
        }

        sk.windowResized = () => sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
      })
    }
  }
</script>

<template>
  <div class="background" id="sketch" :style="`filter: hue-rotate(${filter.hue}) brightness(${filter.brightness}) invert(${filter.invert}) saturate(${filter.saturation})`">
  </div>
</template>

<style lang="sass">
  .background
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    transition: var(--slow-transition)
</style>
