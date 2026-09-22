import type { FlowField, FlowKind } from '@/glitchscape/types'

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
