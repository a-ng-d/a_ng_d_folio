import type { Bounds, LightKind, ScenePalette } from '@/glitchscape/types'
import { clamp } from '@/utilities/operations'

/**
 * Light rigs. `FLAT` emits nothing, which leaves the historical unlit
 * rendering untouched — every other rig shades the very same geometry through
 * p5 lighting, so an universe can change its mood without changing its shapes.
 */
export const isLit = (kind: LightKind) => kind !== 'FLAT'

/** Relative strength of the CSS halo layered over the canvas. */
export const HALO_INTENSITY: { [key: string]: number } = {
  FLAT: 0,
  DAWN: 0.38,
  ZENITH: 0.22,
  DUSK: 0.45,
  NIGHT: 0.3,
  STORM: 0.5,
}

const shade = (lightness: number) => clamp(lightness, 0, 100)

export const applyLighting = (
  sk: any,
  kind: LightKind,
  palette: ScenePalette,
  bounds: Bounds,
  time: number
) => {
  if (!isLit(kind)) return

  const glow = palette.glow,
    sky = palette.sky,
    sway = Math.sin(time * 0.00018),
    drift = Math.cos(time * 0.00012)

  if (kind === 'DAWN') {
    sk.ambientLight(glow.hue, glow.saturation * 0.6, shade(42))
    sk.directionalLight(
      glow.hue,
      glow.saturation,
      shade(72),
      -0.6 + sway * 0.2,
      0.45,
      -0.65
    )
    return
  }

  if (kind === 'ZENITH') {
    sk.ambientLight(sky.hue, sky.saturation * 0.4, shade(62))
    sk.directionalLight(glow.hue, glow.saturation * 0.8, shade(80), 0, 1, -0.25)
    return
  }

  if (kind === 'DUSK') {
    sk.ambientLight(glow.hue, glow.saturation * 0.5, shade(28))
    sk.pointLight(
      glow.hue,
      glow.saturation,
      shade(78),
      bounds.limitX * sway,
      -bounds.height * 3,
      -bounds.limitZ * 0.35
    )
    sk.pointLight(
      sky.hue,
      sky.saturation,
      shade(52),
      -bounds.limitX * drift,
      -bounds.height * 6,
      -bounds.limitZ * 0.7
    )
    return
  }

  if (kind === 'NIGHT') {
    sk.ambientLight(sky.hue, sky.saturation * 0.35, shade(16))
    sk.pointLight(
      glow.hue,
      glow.saturation,
      shade(64),
      bounds.limitX * 0.4 * sway,
      -bounds.height * 8,
      -bounds.limitZ * 0.2
    )
    sk.directionalLight(sky.hue, sky.saturation, shade(34), 0.3, 0.8, -0.5)
    return
  }

  if (kind === 'STORM') {
    const strike = Math.pow(Math.abs(Math.sin(time * 0.0016)), 12)

    sk.ambientLight(sky.hue, sky.saturation * 0.3, shade(22 + strike * 55))
    sk.directionalLight(
      glow.hue,
      glow.saturation,
      shade(40 + strike * 50),
      sway,
      0.7,
      -0.4
    )
  }
}
