import type { FlowField, FlowKind } from '@/glitchscape/types'

/**
 * A flow says how the world moves, and there are two ways it can.
 *
 * `LINEAR` is the historical one: particles drift along an axis and wrap
 * inside their bounds. The seam is hidden because it sits behind the camera.
 *
 * The turning flows are rings instead. The relief is laid out on concentric
 * circles around the journey, and the whole ring spins on itself — a larger
 * circle and a smaller one, turning at the same angular rate, which is what
 * produces the parallax of an endless bank. Nothing drifts and nothing wraps,
 * so no particle ever respawns in sight: a circle has no seam.
 *
 * `RING_Y` turns left or right, `RING_X` loops up or down.
 */
const FLOWS: { [key: string]: (curvature: number) => FlowField } = {
  STRAIGHT: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: 1 },
    spin: 0,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  BACKWARD: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: -1 },
    spin: 0,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  STILL: () => ({
    axis: 'LINEAR',
    drift: { x: 0, y: 0, z: 0 },
    spin: 0,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  // Turning right sweeps the world to the left, so the ring spins forward.
  RIGHT: (curvature: number) => ({
    axis: 'RING_Y',
    drift: { x: 0, y: 0, z: 0 },
    spin: 1,
    bearing: { yaw: 0, pitch: 0, roll: curvature * 0.4 },
  }),
  LEFT: (curvature: number) => ({
    axis: 'RING_Y',
    drift: { x: 0, y: 0, z: 0 },
    spin: -1,
    bearing: { yaw: 0, pitch: 0, roll: -curvature * 0.4 },
  }),
  UP: () => ({
    axis: 'RING_X',
    drift: { x: 0, y: 0, z: 0 },
    spin: 1,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
  DOWN: () => ({
    axis: 'RING_X',
    drift: { x: 0, y: 0, z: 0 },
    spin: -1,
    bearing: { yaw: 0, pitch: 0, roll: 0 },
  }),
}

export const resolveFlow = (kind: FlowKind, curvature: number): FlowField => {
  const factory = FLOWS[kind] || FLOWS.STRAIGHT

  return factory(curvature)
}

export const isRing = (field: FlowField) => field.axis !== 'LINEAR'

export const FLOW_KINDS: Array<FlowKind> = [
  'STRAIGHT',
  'BACKWARD',
  'LEFT',
  'RIGHT',
  'UP',
  'DOWN',
  'STILL',
]
