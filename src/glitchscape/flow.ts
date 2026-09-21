import type { FlowField, FlowKind } from '@/glitchscape/types'

/**
 * A flow says where the world goes. In every case the camera is fixed and the
 * relief travels towards it — what changes is the shape of the track.
 *
 * `LINEAR` runs straight. The arc flows bend that same corridor into a circle
 * so the journey never stops turning, and `turn` picks which way it leans. The
 * camera aims down the corridor rather than straight ahead, so the gap between
 * the two walls stays centred and the turn is travelled, not watched.
 */
const FLOWS: { [key: string]: (curvature: number) => FlowField } = {
  STRAIGHT: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: 1 },
    turn: 0,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  BACKWARD: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: -1 },
    turn: 0,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  STILL: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: 0 },
    turn: 0,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  RIGHT: (curvature: number) => ({
    axis: 'ARC_Y',
    drift: { x: 0, y: 0, z: 1 },
    turn: 1,
    bearing: { yaw: 0, pitch: 0, roll: -curvature * 0.15 },
  }),
  LEFT: (curvature: number) => ({
    axis: 'ARC_Y',
    drift: { x: 0, y: 0, z: 1 },
    turn: -1,
    bearing: { yaw: 0, pitch: 0, roll: curvature * 0.15 },
  }),
  UP: () => ({
    axis: 'ARC_X',
    drift: { x: 0, y: 0, z: 1 },
    turn: -1,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  DOWN: () => ({
    axis: 'ARC_X',
    drift: { x: 0, y: 0, z: 1 },
    turn: 1,
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
