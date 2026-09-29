/* eslint-disable @typescript-eslint/no-explicit-any */

interface RemoteStatOptions {
  timeout?: number
  pick?: (raw: any) => any
}

async function fetchWithTimeout(resource: string, options: any = {}) {
  const { timeout = 8000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  })
  clearTimeout(id)
  return response
}

export const useRemoteStat = (url: string, options: RemoteStatOptions = {}) => {
  const { timeout = 5000, pick = (raw: any) => raw } = options

  const payload = fetchWithTimeout(url, { timeout })
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject(new Error(`HTTP ${response.status}`))
    )
    .then(pick)

  return async (
    select: (data: any) => unknown,
    fallback: string
  ): Promise<string> => {
    try {
      const value = select(await payload)
      if (value === undefined || value === null) throw new Error('absent')
      return String(value)
    } catch (error) {
      return fallback
    }
  }
}

const readUIColorPaletteStat = useRemoteStat(
  'https://api.allorigins.win/raw?url=https://figma.com/api/plugins/profile/1716027',
  { pick: (raw: any) => raw.meta[0] }
)

export const getUIColorPaletteVersion = () =>
  readUIColorPaletteStat(
    (data) => data.versions[data.current_plugin_version_id].version,
    '🚀'
  )

export const getUIColorPaletteSaves = () =>
  readUIColorPaletteStat((data) => data.install_count, '❤️')

export const getUIColorPaletteRating = () =>
  readUIColorPaletteStat(
    (data) => `${data.community_rating_stats.avg_rating}/5`,
    '⭐️'
  )

export const getUIColorPaletteUsers = () =>
  readUIColorPaletteStat((data) => data.unique_run_count, '😃')
