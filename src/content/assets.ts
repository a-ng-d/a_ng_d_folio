import { sizes } from 'virtual:asset-sizes'

export const naturalRatio = (src?: string): string | undefined => {
  if (src === undefined) return undefined
  const size = sizes[src.split('#')[0]]
  return size !== undefined ? `${size[0]} / ${size[1]}` : undefined
}
