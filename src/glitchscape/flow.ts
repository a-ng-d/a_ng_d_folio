import type { FlowField, FlowKind } from '@/glitchscape/types'

/**
 * A flow says where the world goes. In every case the camera is fixed and the
 * relief travels towards it — what changes is the shape of the track.
 *
 * `LINEAR` runs straight. The arc flows bend that same corridor into a circle
 * so the journey never stops turning, and `turn` picks which way it leans.
 *
 * The camera does none of it. It holds its heading and stays level: the
 * relief carries the turn on its own, and a rig that banks or swings into it
 * only ever announced the trick.
 */
const FLOWS: { [key: string]: (curvature: number) => FlowField } = {
  STRAIGHT: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: 1 },
    turn: 0,
    pinch: 1,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  BACKWARD: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: -1 },
    turn: 0,
    pinch: 1,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  STILL: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: 0 },
    turn: 0,
    pinch: 1,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  RIGHT: () => ({
    axis: 'ARC_Y',
    drift: { x: 0, y: 0, z: 1 },
    turn: 1,
    pinch: 1,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  LEFT: () => ({
    axis: 'ARC_Y',
    drift: { x: 0, y: 0, z: 1 },
    turn: -1,
    pinch: 1,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  // A climb reads as one only if it bends harder than a turn: there is no
  // roll to help sell it, and the eye forgives far less on the vertical.
  UP: () => ({
    axis: 'ARC_X',
    drift: { x: 0, y: 0, z: 1 },
    turn: -1,
    pinch: 1.3,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  DOWN: () => ({
    axis: 'ARC_X',
    drift: { x: 0, y: 0, z: 1 },
    turn: 1,
    pinch: 1.3,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
}

export const resolveFlow = (kind: FlowKind, curvature: number): FlowField => {
  const factory = FLOWS[kind] || FLOWS.STRAIGHT

  return factory(curvature)
}

export const isArc = (field: FlowField) => field.axis !== 'LINEAR'

export const FLOW_KINDS: Array<FlowKind> = [
  'STRAIGHT',
  'BACKWARD',
  'LEFT',
  'RIGHT',
  'UP',
  'DOWN',
  'STILL',
]
