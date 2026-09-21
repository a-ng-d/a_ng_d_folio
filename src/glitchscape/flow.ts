import type { FlowField, FlowKind } from '@/glitchscape/types'

/**
 * A flow is a drift applied to every particle plus a bearing held by the
 * camera. The drift is what makes the trip endless — particles wrap inside
 * their bounds — while the bearing is bounded on purpose: the camera leans
 * into the turn instead of spinning forever, which keeps the horizon readable.
 */
const FLOWS: { [key: string]: (curvature: number) => FlowField } = {
  STRAIGHT: () => ({
    drift: { x: 0, y: 0, z: 1 },
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  BACKWARD: () => ({
    drift: { x: 0, y: 0, z: -1 },
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  LEFT: (curvature: number) => ({
    drift: { x: 0.65, y: 0, z: 0.85 },
    bearing: { yaw: -curvature, pitch: 0, roll: -curvature * 0.4 },
  }),
  RIGHT: (curvature: number) => ({
    drift: { x: -0.65, y: 0, z: 0.85 },
    bearing: { yaw: curvature, pitch: 0, roll: curvature * 0.4 },
  }),
  UP: (curvature: number) => ({
    drift: { x: 0, y: 0.5, z: 0.85 },
    bearing: { yaw: 0, pitch: -curvature, roll: 0 },
  }),
  DOWN: (curvature: number) => ({
    drift: { x: 0, y: -0.5, z: 0.85 },
    bearing: { yaw: 0, pitch: curvature, roll: 0 },
  }),
  STILL: () => ({
    drift: { x: 0, y: 0, z: 0 },
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
}

export const resolveFlow = (kind: FlowKind, curvature: number): FlowField => {
  const factory = FLOWS[kind] || FLOWS.STRAIGHT

  return factory(curvature)
}

export const FLOW_KINDS: Array<FlowKind> = [
  'STRAIGHT',
  'BACKWARD',
  'LEFT',
  'RIGHT',
  'UP',
  'DOWN',
  'STILL',
]
