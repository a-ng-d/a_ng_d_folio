import type { AmbienceKind, LightKind } from '@/glitchscape/types'

/**
 * Light taken from the local clock.
 *
 * The rig is picked from the hour the viewer is actually in, so a visit at
 * dusk is lit at dusk. It reads the clock, which needs no permission and no
 * network. Live weather is fetched outside the engine and arrives as a plain
 * rain value, so nothing in here has to know the world exists.
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
  ambience === 'LIVE' ? lightingForHour(now.getHours()) : lighting
