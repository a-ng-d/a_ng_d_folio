import type { AmbienceKind, LightKind } from '@/glitchscape/types'

/**
 * Light taken from the local clock.
 *
 * The rig is picked from the hour the viewer is actually in, so a visit at
 * dusk is lit at dusk. It reads the clock rather than a location, which keeps
 * it exact enough to feel right and free of anything to ask permission for.
 */
export const lightingForHour = (hour: number): LightKind => {
  if (hour < 5) return 'NIGHT'
  if (hour < 8) return 'DAWN'
  if (hour < 17) return 'ZENITH'
  if (hour < 21) return 'DUSK'

  return 'NIGHT'
}

/** The rig a scene should use, once the clock has had its say. */
export const resolveLighting = (
  ambience: AmbienceKind,
  lighting: LightKind,
  now: Date = new Date()
): LightKind =>
  ambience === 'HOURLY' ? lightingForHour(now.getHours()) : lighting
