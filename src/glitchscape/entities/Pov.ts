import type { Center, Position, Rotation } from '@/utilities/types'
import type { Bearing, PovProps, Stage } from '@/glitchscape/types'
import { doMap, lerp } from '@/utilities/operations'
import { bend } from '@/glitchscape/bend'

/**
 * The camera rig. It lerps towards a target framing and layers two optional
 * modifiers on top: a pointer push and a device orientation tilt.
 *
 * It does not travel. A scroll pushes the world down the corridor instead of
 * walking the camera along it — which is what keeps a bent corridor bent from
 * where you sit, and what leaves the journey without an end to reach.
 */
export class Pov {
  props: PovProps
  position: Position
  center: Center
  rotation: Rotation
  bearing: Bearing
  params: {
    target: {
      position: Position
      center: Center
      rotation: Rotation
    }
    speed: number
    alpha: number
    beta: number
    isPushed: boolean
    isOriented: boolean
  }

  constructor(props: PovProps) {
    this.props = props
    this.position = { x: props.x, y: props.y, z: props.z }
    this.center = { x: props.cX, y: props.cY, z: props.cZ }
    this.rotation = { v: props.rV, h: props.rH }
    this.bearing = { yaw: 0, pitch: 0, roll: 0 }
    this.params = {
      target: {
        position: { x: 0, y: 0, z: 0 },
        center: { x: 0, y: 0, z: 0 },
        rotation: { v: 0, h: 0 },
      },
      speed: 0.1,
      alpha: 0,
      beta: 75,
      isPushed: false,
      isOriented: false,
    }
  }

  animate = (
    speed: number,
    position: Array<number>,
    center: Array<number>,
    rotation: Array<number>
  ) => {
    this.params.speed = speed
    this.params.target.position = {
      x: position[0],
      y: position[1],
      z: position[2],
    }
    this.params.target.center = { x: center[0], y: center[1], z: center[2] }
    this.params.target.rotation = { v: rotation[0], h: rotation[1] }
  }

  push = () => (this.params.isPushed = true)

  orient = (alpha: number, beta: number) => {
    this.params.isOriented = true
    this.params.alpha = alpha
    this.params.beta = beta
  }

  move = (stage: Stage) => {
    const bounds = stage.bounds,
      target = this.params.target,
      speed = this.params.speed,
      eye = target.position.y,
      // Aim where the corridor goes, not where the nose points: on a bend the
      // gap between the two walls would otherwise drift off to one side.
      aimed = bend(
        stage.flow.axis,
        stage.flow.turn,
        stage.turnRadius,
        target.center.x,
        target.center.y,
        target.center.z
      )

    this.position.x = lerp(this.position.x, target.position.x, speed)
    this.position.y = lerp(this.position.y, eye, speed)
    this.position.z = lerp(this.position.z, target.position.z, speed)
    this.center.x = lerp(this.center.x, aimed.x, speed)
    this.center.y = lerp(this.center.y, aimed.y, speed)
    this.center.z = lerp(this.center.z, aimed.z, speed)

    // The flow bearing is an offset over whatever framing the route asked for.
    this.bearing.yaw = lerp(this.bearing.yaw, stage.flow.bearing.yaw, 0.02)
    this.bearing.pitch = lerp(
      this.bearing.pitch,
      stage.flow.bearing.pitch,
      0.02
    )
    this.bearing.roll = lerp(this.bearing.roll, stage.flow.bearing.roll, 0.02)

    this.rotation.v = lerp(
      this.rotation.v,
      target.rotation.v + this.bearing.yaw,
      speed
    )
    this.rotation.h = lerp(
      this.rotation.h,
      target.rotation.h + this.bearing.pitch,
      speed
    )

    if (this.params.isPushed) {
      this.position.x = lerp(
        this.position.x,
        target.position.x +
          doMap(
            stage.pointer.x,
            0,
            bounds.width,
            bounds.width * 0.2,
            -bounds.width * 0.2
          ),
        0.1
      )
      this.position.y = lerp(
        this.position.y,
        eye +
          doMap(
            stage.pointer.y,
            0,
            bounds.height,
            bounds.height * 0.2,
            -bounds.height * 0.2
          ),
        0.1
      )
    }

    if (this.params.isOriented) {
      this.position.x = lerp(
        this.position.x,
        target.position.x +
          doMap(
            this.params.alpha,
            -90,
            90,
            bounds.width * 0.4,
            -bounds.width * 0.4
          ),
        0.1
      )
      this.position.y = lerp(
        this.position.y,
        eye +
          doMap(
            this.params.beta,
            0,
            180,
            bounds.height * 0.4,
            -bounds.height * 0.4
          ),
        0.1
      )
    }
  }
}
