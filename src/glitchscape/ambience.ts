import type { AmbienceKind, LightKind } from '@/glitchscape/types'

export const lightingForHour = (hour: number): LightKind => {
  if (hour < 5) return 'NIGHT'
  if (hour < 8) return 'DAWN'
  if (hour < 17) return 'ZENITH'
  if (hour < 21) return 'DUSK'

  return 'NIGHT'
}

export const resolveLighting = (
  ambience: AmbienceKind,
  lighting: LightKind,
  now: Date = new Date()
): LightKind =>
  ambience === 'LIVE' ? lightingForHour(now.getHours()) : lighting
