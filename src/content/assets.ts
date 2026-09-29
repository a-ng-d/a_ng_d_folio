import { sizes } from 'virtual:asset-sizes'

/**
 * Le ratio natif d'une image, relevé dans le fichier au moment du build.
 *
 * Une figure qui n'impose pas de cadre n'a donc rien à déclarer : ni largeur,
 * ni hauteur. Ce qu'on n'écrit pas ne peut pas se désynchroniser.
 */
export const naturalRatio = (src?: string): string | undefined => {
  if (src === undefined) return undefined
  // Les URL de vidéo portent parfois un fragment de vignette (#t=0.5).
  const size = sizes[src.split('#')[0]]
  return size !== undefined ? `${size[0]} / ${size[1]}` : undefined
}
