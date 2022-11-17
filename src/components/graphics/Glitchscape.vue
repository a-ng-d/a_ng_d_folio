<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import type { MountainProps, CloudProps, StarProps, PovProps, Position, Center, Progress, Rotation, Size, Row } from '@/utilities/types'
  import P5 from 'p5'
  import { HSLColors, filters } from '@/utilities/colors'
  import { doMap, random, twoRangesRandom } from '@/utilities/operations'

  let glitchscape: any = null
  const povs: { [key: string]: () => void } = {
    RESET: () => glitchscape.povReset(),
    INVERT: () => glitchscape.povInvert(),
    DIVE_1: () => glitchscape.povDIVE(1),
    DIVE_2: () => glitchscape.povDIVE(2),
    DIVE_3: () => glitchscape.povDIVE(3),
    DIVE_4: () => glitchscape.povDIVE(4),
    DIVE_5: () => glitchscape.povDIVE(5),
    DIVE_6: () => glitchscape.povDIVE(6),
    DONTLOOKUP: () => glitchscape.povDontLookUp(),
    SIDE: () => glitchscape.povSide(),
    GLOBAL: () => glitchscape.povGlobal(),
  },
  qualities: { [key: string]: () => void } = {
    LOW: () => glitchscape.lowQuality(),
    HIGH: () => glitchscape.highQuality()
  }

  export default defineComponent({
    name: 'Glitchscape',
    props: {
      filter: {
        type: Object,
        default: filters.grayscale
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
        store,
        isRendered: false as boolean
      }
    },
    watch: {
      pov(to) {
        return povs[to]?.()
      },
      quality(to) {
        return qualities[to]?.()
      },
      isGlitched(to) {
        to ? glitchscape.glitch() : glitchscape.unglitch()
      },
      scrollProgress() {
        return glitchscape.povZoom(this.scrollProgress, this.scrollLimit)
      }
    },
    methods: {
      getParticlesNumber(): number {
        const device: string = this.store.device
        if (device === 'MOBILE') return 10
        else return 20
      }
    },
    mounted: function() {
      glitchscape = new P5((sk: any) => {
        const
          mNumber:number = this.getParticlesNumber(),
          cNumber: number = mNumber / 2,
          sNumber: number = mNumber * 4,
          quality = 50,
          scrWidth: number = window.innerWidth,
          scrHeight: number = window.innerHeight,
          limitX: number = scrWidth * 4,
          limitY: number = scrHeight * 40,
          limitZ: number = scrHeight * 80,
          multiplier: number = scrWidth < 461 ? 1.5 : scrWidth < 1281 ? 1.25 : 1.2

        let
          fps = 30,
          speed = 30,
          alpha = 1,
          camera: any,
          mountains: Array<Mountain> = [],
          clouds: Array<Cloud> = [],
          stars: Array<Star> = []

        const povs: { [key: string]: () => void } = {
          RESET: () => sk.povReset(),
          DIVE_1: () => sk.povDIVE(1),
          DIVE_2: () => sk.povDIVE(2),
          DIVE_3: () => sk.povDIVE(3),
          DIVE_4: () => sk.povDIVE(4),
          DIVE_5: () => sk.povDIVE(5),
          DIVE_6: () => glitchscape.povDIVE(6),
          DONTLOOKUP: () => sk.povDontLookUp(),
          SIDE: () => sk.povSide(),
          GLOBAL: () => sk.povGlobal(),
        },
        qualities: { [key: string]: () => void } = {
          LOW: () => sk.lowQuality(),
          HIGH: () => sk.highQuality()
        }

        // Elements
        class Mountain {

          props: MountainProps
          size: Size
          position: Position
          params: {
            radius: number,
            radians: number,
            speed: number,
            order: number,
            gap: number,
            isGlitched: boolean,
            isStrokedOnly: boolean,
            alpha: number
          }
          backup: {
            size: {
              width: number,
              height: number,
            },
            params: {
              radius: number
            }
          }

          constructor(props: MountainProps) {
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
              radius: sk.int(sk.abs(this.size.width / 4)),
              radians: sk.radians(90),
              speed: .05,
              order: 0,
              gap: 20,
              isGlitched: false,
              isStrokedOnly: true,
              alpha: 0
            }
            this.backup = {
              size: {
                width: this.size.width,
                height: this.size.height,
              },
              params: {
                radius: this.params.radius
              }
            }
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
              this.params.alpha = sk.lerp(this.params.alpha, 0, this.params.speed * .5)
            else
              this.params.alpha = sk.lerp(this.params.alpha, 1, this.params.speed * .5)

            this.draw()
          }

          extrusion = () => {
            sk.push()
              sk.rotateX(this.params.radians)
              sk.ellipse(0, this.size.height, this.params.radius, this.params.radius, quality)
              sk.rect((this.params.radius / 2), this.size.height, this.size.width, this.params.radius)
              sk.ellipse(this.size.width, this.size.height, this.params.radius, this.params.radius, quality)
              sk.rect(0, 0, (this.size.width + this.params.radius), (this.size.height + (this.params.radius / 2)))
              sk.ellipse(0, -(this.params.radius / 2), this.params.radius, this.params.radius, quality)
              sk.rect((this.params.radius / 2), -(this.params.radius / 2), this.size.width, this.params.radius)
              sk.ellipse(this.size.width, -(this.params.radius / 2), this.params.radius, this.params.radius, quality)
            sk.pop()
          }

          draw = () => {
            const randomColor: { [key: string]: number } = Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]

            sk.push()
              sk.translate(this.position.x < 0 ? this.position.x - (this.size.width * multiplier) : this.position.x, this.position.y, this.position.z)
              sk.fill(this.deepHue(), this.deepSaturation(), this.deepLightness(), this.params.alpha)
              sk.stroke(this.deepHue(), this.deepSaturation(), this.deepLightness())
              sk.strokeWeight(1)
              this.params.isGlitched ? sk.fill(randomColor.hue, randomColor.saturation, randomColor.lightness) : null
              sk.rectMode(sk.CORNER)
              sk.ellipseMode(sk.CORNER)
              this.extrusion()
            sk.pop()
          }

        }

        class Cloud {

          props: CloudProps
          size: Size
          position: Position
          params: {
            rows: Array<Row>,
            speed: number,
            order: number,
            gap: number,
            start: number,
            isGlitched: boolean,
            isStrokedOnly: boolean,
            alpha: number
          }
          backup: {
            rows: Array<Row>
          }

          constructor(props: CloudProps) {
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
              gap: 40,
              start: sk.height,
              isGlitched: false,
              isStrokedOnly: true,
              alpha: 0
            }
            for (let i = 1 ; i < this.props.rows ; i++)
              this.params.rows.push({
                width: sk.int(this.size.width * random(.5, 1)),
                height: sk.int(this.size.height * random(.5, 1)),
                x: sk.int(random(-this.size.width / 4, this.size.width / 4))
              })
            this.backup = {
              rows: []
            }
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

            if (this.position.x <= limitX * 4)
              this.position.x += speed / 2
            else
              this.position.x = -limitX * 4

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
              this.params.alpha = sk.lerp(this.params.alpha, 0, this.params.speed * .5)
            else
              this.params.alpha = sk.lerp(this.params.alpha, 1, this.params.speed * .5)

            this.draw()
          }

          drow = (x: number, y: number, width: number, height: number) => {
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
            const randomColor: { [key: string]: number } = Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]

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

          props: StarProps
          size: number
          position: Position
          params: {
            speed: number,
            isGlitched: boolean,
            isStrokedOnly: boolean,
            alpha: number
          }
          backup: {
            position: {
              x: number,
              z: number
            }
          }

          constructor(props: StarProps) {
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
            this.backup = {
              position: {
                x: this.position.x,
                z: this.position.z
              }
            }
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
            const randomColor: { [key: string]: number } = Object.values(HSLColors)[random(0, Object.values(HSLColors).length)]

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

          props: PovProps
          position: Position
          center: Center
          rotation: Rotation
          progress: Progress
          params: {
            target: {
              position: Position,
              center: Center,
              rotation: Rotation,
              progress: Progress
            },
            speed: number,
            scrollPosition: number,
            scrollLimit: number,
            alpha: number,
            beta: number,
            distance: number,
            isPushed: boolean,
            isOriented: boolean,
            isScrolling: boolean
          }

          constructor(props: PovProps) {
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
            this.rotation = {
              v: this.props.rV,
              h: this.props.rH
            }
            this.progress = {
              x: 0,
              y: 0,
              z: 0
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
                rotation: {
                  v: 0,
                  h: 0
                },
                progress: {
                  x: 0,
                  y: 0,
                  z: 0
                }
              },
              speed: 0.1,
              scrollPosition: 0,
              scrollLimit: 0,
              alpha: 0,
              beta: 75,
              distance: 0,
              isPushed: false,
              isOriented: false,
              isScrolling: false
            }
          }

          animate = (speed: number, position: Array<number>, center: Array<number>, rotation: Array<number>) => {
            this.params.speed = speed
            this.params.target.position.x = position[0]
            this.params.target.position.y = position[1]
            this.params.target.position.z = position[2]
            this.params.target.center.x = center[0]
            this.params.target.center.y = center[1]
            this.params.target.center.z = center[2]
            this.params.target.rotation.v = rotation[0]
            this.params.target.rotation.h = rotation[1]
            this.params.target.progress.z = 0
            this.params.distance = this.params.target.position.z - this.params.target.center.z
            this.params.isScrolling = false
          }

          move = () => {
            this.position.x = sk.lerp(this.position.x, this.params.target.position.x, this.params.speed)
            this.position.y = sk.lerp(this.position.y, this.params.target.position.y, this.params.speed)
            this.position.z = sk.lerp(this.position.z, this.params.target.position.z, this.params.speed)
            this.center.x = sk.lerp(this.center.x, this.params.target.center.x, this.params.speed)
            this.center.y = sk.lerp(this.center.y, this.params.target.center.y, this.params.speed)
            this.center.z = sk.lerp(this.center.z, this.params.target.center.z, this.params.speed)
            this.rotation.v = sk.lerp(this.rotation.v, this.params.target.rotation.v, this.params.speed)
            this.rotation.h = sk.lerp(this.rotation.h, this.params.target.rotation.h, this.params.speed)

            if (this.params.isPushed) {
              this.position.x = sk.lerp(this.position.x, this.params.target.position.x + doMap(sk.mouseX, 0, sk.width, sk.width * .2, -sk.width * .2), .1)
              this.position.y = sk.lerp(this.position.y, this.params.target.position.y + doMap(sk.mouseY, 0, sk.height, sk.height * .2, -sk.height * .2), .1)
            }

            if (this.params.isOriented) {
              this.position.x = sk.lerp(this.position.x, this.params.target.position.x + doMap(this.params.alpha, -90, 90, sk.width * .4, -sk.width * .4), .1)
              this.position.y = sk.lerp(this.position.y, this.params.target.position.y + doMap(this.params.beta, 0, 180, sk.height * .4, -sk.height * .4), .1)
            }

            if (this.params.isScrolling) {
              this.progress.z = sk.lerp(this.progress.z, doMap(this.params.scrollPosition, 0, this.params.scrollLimit, 0, this.params.distance < 0 ? this.params.distance : -this.params.distance), this.params.speed)
            } else {
              this.progress.z = sk.lerp(this.progress.z, this.params.target.progress.z, this.params.speed * 2)
            }
          }

          push = () => this.params.isPushed = true

          orient = (alpha: number, beta: number) => {
            this.params.isOriented = true
            this.params.alpha = alpha
            this.params.beta = beta
          }

          zoom = (scrollPosition: number, scrollLimit: number) => {
            this.params.isScrolling = true
            this.params.scrollPosition = scrollPosition
            this.params.scrollLimit = scrollLimit
          }

        }

        // Sketch
        let pov = new Pov({
          x: 0,
          y: -window.innerHeight * .75,
          z: -limitZ * 2,
          cX: 0,
          cY: -window.innerHeight * .75,
          cZ: -limitZ * 2,
          rH: 0,
          rV: 0
        })

        sk.setup = () => {

          sk.createCanvas(sk.windowWidth, sk.windowHeight, sk.WEBGL).parent('sketch')
          sk.colorMode(sk.HSL)
          sk.rectMode(sk.CENTER)
          sk.frameRate(fps)
          camera = sk.createCamera()
          sk.background(HSLColors.creamySun.hue, HSLColors.creamySun.saturation, HSLColors.creamySun.lightness)

          if (screen.orientation != undefined)
            screen.orientation.addEventListener('change', () => {
              setTimeout(() => sk.resizeCanvas(sk.windowWidth, sk.windowHeight, true), 100)
            }, true)
          else
            sk.windowResized = () => {
              sk.resizeCanvas(sk.windowWidth, sk.windowHeight, true)
            }

          if (window.DeviceOrientationEvent)
            window.addEventListener('deviceorientation', (e: any) => {
              pov.orient(e.alpha, e.beta)
            }, true)

          // particles setting
          for (let i = 0 ; i < mNumber ; i++)
            mountains.push(new Mountain({
              widthRange: [sk.width * 10, sk.width * 12],
              heightRange: [-sk.height * 20, -sk.height * 22],
              x: twoRangesRandom(-limitX, -sk.width, sk.width, limitX),
              y: sk.height * 10,
              zRange: [-limitZ, 0],
              foreground: HSLColors.cream,
              background: HSLColors.creamySun
            }))
          for (let i = 0 ; i < cNumber ; i++)
            clouds.push(new Cloud({
              widthRange: [sk.width, sk.width * 2],
              heightRange: [-sk.height * .1, -sk.height * .15],
              x: random(-limitX, limitX),
              y: random(-sk.height * 1, -sk.height * 2),
              zRange: [-limitZ, 0],
              rows: sk.int(random(3, 5)),
              foreground: HSLColors.clay,
              background: HSLColors.creamySun
            }))
          for (let i = 0 ; i < sNumber ; i++)
            stars.push(new Star({
              sizeRange: [-sk.height * .05, -sk.height * .15],
              x: random(-limitX * 4, limitX * 4),
              yRange: [-limitY * 0.5, -limitY],
              z: random(-limitZ * 3, limitZ * 3),
              foreground: HSLColors.soil,
              background: HSLColors.clay
            }))

          mountains.sort((a: Mountain, b: Mountain) => a.position.z - b.position.z)
          mountains.forEach((mountain: Mountain, index: number) => { mountain.params.order = index })
          clouds.sort((a: Cloud, b: Cloud) => a.position.z - b.position.z)
          clouds.forEach((cloud: Cloud, index: number) => { cloud.params.order = index })

          // default pov and quality
          povs[this.pov]?.()
          qualities[this.quality]?.()

        }

        sk.draw = () => {

          alpha = sk.lerp(alpha, .7, .01)

          sk.clear()

          sk.background(HSLColors.creamySun.hue, HSLColors.creamySun.saturation, HSLColors.creamySun.lightness)

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
          camera.perspective(Math.PI / 3, sk.width / sk.height, 100, limitZ * 2)
          camera.pan(pov.rotation.v)
          camera.tilt(pov.rotation.h)
          camera.move(0, 0, pov.progress.z)

          // mountains
          mountains.forEach(mountain => mountain.move())

          // clouds
          clouds.forEach(cloud => cloud.move())

          // stars
          stars.forEach(star => star.move())

          // floor
          sk.push()
            sk.noStroke()
            sk.fill(HSLColors.creamySun.hue, HSLColors.creamySun.saturation, HSLColors.creamySun.lightness, alpha)
            sk.box(limitX * 20, 5, limitZ * 20)
          sk.pop()

        }

        // Events
        sk.povReset = () => pov.animate(
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
          ],
          [
            0,
            0
          ]
        )

        sk.povInvert = () => pov.animate(
          .05,
          [
            0,
            -sk.height * .75,
            -limitZ
          ],
          [
            0,
            -sk.height * .75,
            -sk.height * .1
          ],
          [
            0,
            0
          ]
        )

        sk.povDIVE = (increment: number) => pov.animate(
          .05,
          [
            doMap(increment, 1, this.numberOfProjects, -limitX *.75, limitX *.75),
            sk.height * 5,
            -sk.height * .1
          ],
          [
            doMap(increment, 1, this.numberOfProjects, -limitX *.75, limitX *.75),
            sk.height * .75,
            -limitZ
          ],
          [
            0,
            0
          ]
        )

        sk.povDontLookUp = () => pov.animate(
          .05,
          [
            0,
            -sk.height * 2,
            -sk.height * .1
          ],
          [
            0,
            -sk.height * 10,
            -limitZ * .5
          ],
          [
            0,
            0
          ]
        )

        sk.povSide = () => pov.animate(
          .05,
          [
            limitX * 4,
            -sk.height * .75,
            -limitZ * .5
          ],
          [
            limitX * 4,
            -sk.height * .75,
            -limitZ
          ],
          [
            Math.PI / 2,
            0
          ]
        )

        sk.povGlobal = () => pov.animate(
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
          ],
          [
            0,
            0
          ]
        )

        sk.povZoom = (scrollProgress: number, scrollLimit: number) => pov.zoom(scrollProgress, scrollLimit + 200)

        sk.lowQuality = () => {
          mountains.forEach(mountain => mountain.wireframe())
          clouds.forEach(cloud => cloud.wireframe())
          stars.forEach(star => star.wireframe())
        }

        sk.highQuality = () => {
          mountains.forEach(mountain => mountain.unwireframe())
          clouds.forEach(cloud => cloud.unwireframe())
          stars.forEach(star => star.unwireframe())
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
      })
    }
  })
</script>

<template>
  <Transition name="fade" appear>
    <div v-if="view === 'SHORT'" class="gradient"></div>
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
    width: 100%
    height: 100%
    position: fixed
    z-index: 1
    top: 0
    background-image: var(--gradient-biscarosse-sunset)
    mix-blend-mode: color
    opacity: .75

  .background
    width: 100%
    height: 100%
    position: fixed
    top: 0
    transition: var(--grandma-transition)
    z-index: 0
</style>
