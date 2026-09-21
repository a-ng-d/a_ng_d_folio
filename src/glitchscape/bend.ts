import type { FlowAxis, Vector3 } from '@/glitchscape/types'

/**
 * Bends the straight corridor into an arc.
 *
 * This is a placement transform, not a motion: particles keep travelling
 * towards the camera exactly as they do on a straight run, and this maps where
 * they land. The corridor curves away, its two walls become two concentric
 * circles — the outer one wider than the inner one — and the cards stay facing
 * the camera the whole way, never turning edge on.
 *
 * `turn` says which side the centre of the arc sits on, so a corridor bending
 * left is what exposes its right hand wall to a fixed camera.
 *
 * The distance travelled is the arc length, so `radius` alone sets how sharp
 * the bend is: the larger it is, the longer the corridor runs before it curves
 * out of frame.
 */
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
    // Offset of the particle from the centre line of the corridor: sideways
    // for a horizontal bend, vertical for a climbing one.
    offset = axis === 'ARC_Y' ? x : y,
    along = -radius * sin + offset * turn * sin,
    across = turn * radius * (1 - cos) + offset * cos

  return axis === 'ARC_Y'
    ? { x: across, y, z: along }
    : { x, y: across, z: along }
}
