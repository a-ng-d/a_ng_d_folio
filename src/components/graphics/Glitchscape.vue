<script lang="ts">
  import P5 from 'p5'
  import { HSLColors } from '@/utilities/colors'
  import { doMap, random, twoRangesRandom } from '@/utilities/operations'

  export default {
    name: 'Glitchscape',
    props: {
      filter: {
        type: [Object, String],
        default: {
          hue: '0deg',
          brightness: '1',
          invert: '0',
          saturation: '.5'
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
      numberOfProjects: {
        type: Number,
        default: 3
      },
      view: String
    },
    data: function() {
      return {
        glitchscape: null
      }
    },
    watch: {
      pov(to, from) {
        const actions = {
          RESET: () => this.glitchscape.povReset(),
          MIRROR_1: () => this.glitchscape.povMirror(1),
          MIRROR_2: () => this.glitchscape.povMirror(2),
          MIRROR_3: () => this.glitchscape.povMirror(3),
          MIRROR_4: () => this.glitchscape.povMirror(4),
          MIRROR_5: () => this.glitchscape.povMirror(5),
          DONTLOOKUP: () => this.glitchscape.povDontLookUp(),
          GLOBAL: () => this.glitchscape.povGlobal(),
        }
        return actions[to]?.() ?? 'No POV matches'
      },
      quality(to, from) {
        const actions = {
          LOW: () => this.glitchscape.lowQuality(),
          HIGH: () => this.glitchscape.highQuality()
        }
        return actions[to]?.() ?? 'No quality matches'
      },
      isGlitched(to, from) {
        if (to)
          this.glitchscape.glitch()
        else
          this.glitchscape.unglitch()
      },
      scrollProgress(to, from) {
        return this.glitchscape.povZoom(this.scrollProgress, this.scrollLimit)
      }
    },
    mounted: function() {
      this.glitchscape = new P5((sk) => {

        const
          mNumber = 140,
          cNumber = mNumber / 4,
          sNumber = mNumber * 8,
          quality = 50,
          colors = HSLColors,
          scrWidth = window.innerWidth,
          scrHeight = window.innerHeight,
          limitX = scrWidth * 2.5,
          limitY = scrHeight * 10,
          limitZ = scrHeight * 20

        let
          fps = 30,
          speed = 2,
          alpha = 1,
          camera,
          mountains = [],
          clouds = [],
          stars = []

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
              speed: .1,
              order: 0,
              gap: 5,
              isGlitched: false,
              isStrokedOnly: false,
              alpha: 1
            }
            this.backup = {}
          }

          deepHue = () => doMap(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.hue, this.props.foreground.hue)

          deepSaturation = () => doMap(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.saturation, this.props.foreground.saturation)

          deepLightness = () => doMap(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.lightness, this.props.foreground.lightness)

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

            if (this.params.isStrokedOnly)
              this.params.alpha = sk.lerp(this.params.alpha, 0, this.params.speed)
            else
              this.params.alpha = sk.lerp(this.params.alpha, 1, this.params.speed)

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
              sk.translate(this.position.x - (this.size.width * .75), this.position.y, this.position.z)
              sk.fill(this.deepHue(), this.deepSaturation(), this.deepLightness(), this.params.alpha)
              sk.stroke(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.strokeWeight(1)
              this.params.isGlitched ? sk.fill(randomColor.hue, randomColor.saturation, randomColor.lightness) : null
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
              speed: .1,
              order: 0,
              gap: 30,
              start: sk.height,
              isGlitched: false,
              isStrokedOnly: false,
              alpha: 1
            }
            for (let i = 1 ; i < this.props.rows ; i++)
              this.params.rows.push({
                width: sk.int(this.size.width * random(.5, 1)),
                height: sk.int(this.size.height * random(.5, 1)),
                x: sk.int(random(-this.size.width / 4, this.size.width / 4))
              })
            this.backup = {}
          }

          deepHue = () => doMap(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.hue, this.props.foreground.hue)

          deepSaturation = () => doMap(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.saturation, this.props.foreground.saturation)

          deepLightness = () => doMap(this.position.z, this.props.zRange[0], this.props.zRange[1], this.props.background.lightness, this.props.foreground.lightness)

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
              this.position.x += speed / 2
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

            if (this.params.isStrokedOnly)
              this.params.alpha = sk.lerp(this.params.alpha, 0, this.params.speed)
            else
              this.params.alpha = sk.lerp(this.params.alpha, 1, this.params.speed)

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
              sk.fill(this.deepHue(), this.deepSaturation(), this.deepLightness(), this.params.alpha)
              sk.stroke(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.strokeWeight(1)
              this.params.isGlitched ? sk.fill(randomColor.hue, randomColor.saturation, randomColor.lightness) : null
              this.params.rows.forEach(row => {
                this.drow(row.x, offsetY, row.width, row.height)
                offsetY += row.height
              })
            sk.pop()
          }

        }

        class Star {

          constructor(props) {
            this.props = props
            this.size = sk.int(random(this.props.sizeRange[0], this.props.sizeRange[1]))
            this.position = {
              x: sk.int(this.props.x),
              y: sk.int(random(this.props.yRange[0], this.props.yRange[1])),
              z: sk.int(this.props.z)
            }
            this.params = {
              speed: .1,
              isGlitched: false,
              isStrokedOnly: false,
              alpha: 1
            }
            this.backup = {}
          }

          deepHue = () => doMap(this.position.y, this.props.yRange[0], this.props.yRange[1], this.props.background.hue, this.props.foreground.hue)

          deepSaturation = () => doMap(this.position.y, this.props.yRange[0], this.props.yRange[1], this.props.background.saturation, this.props.foreground.saturation)

          deepLightness = () => doMap(this.position.y, this.props.yRange[0], this.props.yRange[1], this.props.background.lightness, this.props.foreground.lightness)

          glitch = () => {
            this.backup = {
              position: {
                x: this.position.x,
                z: this.position.z
              }
            }
            this.params.isGlitched = true
          }

          unglitch = () => {
            this.params.isGlitched = false
            this.position.x = this.backup.position.x
            this.position.z = this.backup.position.z
          }

          wireframe = () => this.params.isStrokedOnly = true

          unwireframe = () => this.params.isStrokedOnly = false

          move = () => {
            if (this.params.isGlitched) {
              this.position.x = random(-limitX * 3, limitX * 3)
              this.position.z = random(-limitZ * 3, limitZ * 3)
            }

            if (this.params.isStrokedOnly)
              this.params.alpha = sk.lerp(this.params.alpha, 0, this.params.speed)
            else
              this.params.alpha = sk.lerp(this.params.alpha, 1, this.params.speed)

            this.draw()
          }

          draw = () => {
            const randomColor = Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]

            sk.push()
              sk.translate(this.position.x, this.position.y, this.position.z)
              sk.fill(this.deepHue(), this.deepSaturation(), this.deepLightness(), this.params.alpha)
              sk.stroke(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.strokeWeight(1)
              this.params.isGlitched ? sk.fill(randomColor.hue, randomColor.saturation, randomColor.lightness) : null
              sk.sphere(this.size, 3, 16)
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
              this.position.x = sk.lerp(this.position.x, this.params.target.position.x + doMap(sk.mouseX, 0, sk.width, sk.width * .1, -sk.width * .1), .1)
              this.position.y = sk.lerp(this.position.y, this.params.target.position.y + doMap(sk.mouseY, 0, sk.height, sk.height * .1, -sk.height * .1), .1)
            }
          }

          push = () => this.params.isPushed = true

          zoom = (scrollPosition, pageLimitMax) => {
            this.params.progress.x = doMap(scrollPosition, 0, pageLimitMax, this.params.target.position.x, this.params.target.center.x)
            this.params.progress.y = doMap(scrollPosition, 0, pageLimitMax, this.params.target.position.y, this.params.target.center.y)
            this.params.progress.z = doMap(scrollPosition, 0, pageLimitMax, this.params.target.position.z, this.params.target.center.z)
          }

        }

        // Sketch
        let pov = new Pov({
          x: 0,
          y: -window.innerHeight * .2,
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
          camera = sk.createCamera()

          // particles setting
          for (let i = 0 ; i < mNumber ; i++)
            mountains.push(new Mountain({
              widthRange: [sk.width * .25, sk.width],
              heightRange: [-sk.height * 2, -sk.height * 3],
              x: twoRangesRandom(-limitX, -sk.width * .75, sk.width * .75, limitX),
              y: sk.height * .5,
              zRange: [-limitZ, 0],
              foreground: colors.cream,
              background: colors.creamySun
            }))
          for (let i = 0 ; i < cNumber ; i++)
            clouds.push(new Cloud({
              widthRange: [sk.width * .25, sk.width],
              heightRange: [-sk.height * .05, -sk.height * .1],
              x: random(-limitX, limitX),
              y: random(-sk.height * .2, -sk.height * .8),
              zRange: [-limitZ, 0],
              rows: sk.int(random(3, 5)),
              foreground: colors.clay,
              background: colors.creamySun
            }))
          for (let i = 0 ; i < sNumber ; i++)
            stars.push(new Star({
              sizeRange: [-sk.height * .01, -sk.height * .02],
              x: random(-limitX * 3, limitX * 3),
              yRange: [-limitY * 0.5, -limitY],
              z: random(-limitZ * 3, limitZ * 3),
              foreground: colors.soil,
              background: colors.clay
            }))

          mountains.sort((a, b) => a.position.z - b.position.z)
          mountains.forEach((mountain, index) => { mountain.params.order = index })
          clouds.sort((a, b) => a.position.z - b.position.z)
          clouds.forEach((cloud, index) => { cloud.params.order = index })

        }

        sk.draw = () => {

          alpha = sk.lerp(alpha, .6, .01)

          sk.clear()

          sk.background(colors.creamySun.hue, colors.creamySun.saturation, colors.creamySun.lightness)

          // camera
          pov.move()
          camera.setPosition(
            pov.position.x,
            pov.position.y,
            pov.position.z
          )
          camera.lookAt(
            pov.center.x,
            pov.center.y,
            pov.center.z
          )
          camera.perspective(sk.PI / 3, sk.width / sk.height, 1, limitZ * 2)

          sk.blendMode(sk.BLEND)

          // mountains
          mountains.forEach(mountain => mountain.move())

          // clouds
          clouds.forEach(cloud => cloud.move())

          // stars
          stars.forEach(star => star.move())

          // floor
          sk.push()
            sk.blendMode(sk.DIFFERENCE)
            sk.noStroke()
            sk.fill(colors.creamySun.hue, colors.creamySun.saturation, colors.creamySun.lightness, alpha)
            sk.translate(0, (sk.height * .5) - 10, 0)
            sk.rotateX(sk.PI / 2)
            sk.rect(0, 0, limitX * 4, limitZ * 4)
          sk.pop()

        }

        // Events
        sk.povReset = () => setTimeout(() => pov.animate(
          .05,
          [
            0,
            -sk.height * .75,
            -sk.height * .1
          ],
          [
            0,
            -sk.height * .75,
            -limitZ
          ]
        ), 100)

        sk.povMirror = (increment) => setTimeout(() => pov.animate(
          .05,
          [
            doMap(increment, 1, this.numberOfProjects, -limitX *.75, limitX *.75),
            sk.height * 2,
            -sk.height * .1
          ],
          [
            doMap(increment, 1, this.numberOfProjects, -limitX *.75, limitX *.75),
            sk.height * 2,
            -limitZ
          ]
        ), 100)

        sk.povDontLookUp = () => setTimeout(() => pov.animate(
          .05,
          [
            0,
            -sk.height * .75,
            -sk.height * .1
          ],
          [
            0,
            -sk.height * 5,
            -limitZ * .5
          ]
        ), 100)

        sk.povGlobal = () => setTimeout(() => pov.animate(
          .05,
          [
            0,
            -sk.height * 10,
            sk.height * 5
          ],
          [
            0,
            -sk.height * .1,
            -limitZ * .5
          ]
        ), 100)

        sk.povZoom = (scrollProgress, scrollLimit) => pov.zoom(scrollProgress, scrollLimit + 200)

        sk.lowQuality = () => {
          setTimeout(() => {
            mountains.forEach(mountain => mountain.wireframe())
            clouds.forEach(cloud => cloud.wireframe())
            stars.forEach(star => star.wireframe())
          }, 100)

        }

        sk.highQuality = () => {
          setTimeout(() => {
            mountains.forEach(mountain => mountain.unwireframe())
            clouds.forEach(cloud => cloud.unwireframe())
            stars.forEach(star => star.unwireframe())
          }, 100)
        }

        sk.glitch = () => {
          mountains.forEach(mountain => mountain.glitch())
          clouds.forEach(cloud => cloud.glitch())
          stars.forEach(star => star.glitch())
        }

        sk.unglitch = () => {
          mountains.forEach(mountain => mountain.unglitch())
          clouds.forEach(cloud => cloud.unglitch())
          stars.forEach(star => star.unglitch())
        }

        sk.mouseMoved = () => pov.push()

        sk.touchMoved = () => pov.push()

        sk.windowResized = () => sk.resizeCanvas(sk.windowWidth, sk.windowHeight)
      })
    }
  }
</script>

<template>
  <Transition name="fade" appear>
    <div v-if="view === 'ID'" class="gradient"></div>
  </Transition>
  <div class="background" id="sketch" :style="`
    filter: hue-rotate(${filter.hue})
    brightness(${filter.brightness})
    invert(${filter.invert})
    saturate(${filter.saturation})
    grayscale(${filter.grayscale})
  `"></div>
</template>

<style lang="sass">
  .gradient
    width: 100vw
    height: 100vh
    position: fixed
    z-index: 0
    top: 0
    background-image: var(--gradient-biscarosse-sunset)
    mix-blend-mode: multiply

  .background
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    transition: var(--grandma-transition)
    z-index: -1
</style>
