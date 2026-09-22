/**
 * Glitchscape — the procedural background of the whole journey.
 *
 * The engine is split so each dimension can be reasoned about alone:
 *
 *   profiles.ts   silhouettes, as morphable normalised height profiles
 *   flow.ts       where the world tends to, and how the camera leans into it
 *   lighting.ts   the light rigs, plus the strength of the CSS halo
 *   ramp.ts       depth driven colour, which gives the aerial perspective
 *   universes.ts  named, interchangeable colored worlds
 *   dispositions.ts named arrangements of the relief, direction excluded
 *   entities/     Mountain, Cloud, Star, Pov
 *   sketch.ts     the p5 host, and the remote handed back to the component
 *
 * Nothing here imports Vue: the whole thing is drivable from any runtime,
 * which is what a React port will need.
 */
export * from '@/glitchscape/types'
export { createGlitchscape } from '@/glitchscape/sketch'
export type { GlitchscapeOptions } from '@/glitchscape/sketch'
export {
  DEFAULT_UNIVERSE,
  UNIVERSE_KEYS,
  palettes,
  resolveScene,
  universes,
} from '@/glitchscape/universes'
export { FLOW_KINDS, resolveFlow } from '@/glitchscape/flow'
export { DISPOSITION_KEYS, dispositions } from '@/glitchscape/dispositions'
export type { Disposition } from '@/glitchscape/dispositions'
export { HALO_INTENSITY, applyLighting, isLit } from '@/glitchscape/lighting'
export { SHAPES, buildProfile, resolveShape } from '@/glitchscape/profiles'
export type { Profile, ProfileSeed } from '@/glitchscape/profiles'
