import type { FlowAxis, Vector3 } from '@/glitchscape/types'

export const bend = (
  axis: FlowAxis,
  turn: number,
  radius: number,
  x: number,
  y: number,
  z: number
): Vector3 => {
  if (axis === 'LINEAR' || turn === 0 || radius <= 0) return { x, y, z }

  const phi = -z / radius,
    cos = Math.cos(phi),
    sin = Math.sin(phi),
    offset = axis === 'ARC_Y' ? x : y,
    along = -radius * sin + offset * turn * sin,
    across = turn * radius * (1 - cos) + offset * cos

  return axis === 'ARC_Y'
    ? { x: across, y, z: along }
    : { x, y: across, z: along }
}
