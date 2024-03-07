let version, saves, rating, users

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

const fetchUIColorPaletteStats = fetchWithTimeout(
  'https://api.allorigins.win/raw?url=https://figma.com/api/plugins/profile/1716027',
  {
    timeout: 5000,
  }
)
  .then((response) => (response.ok ? response.json() : Promise.reject()))
  .then((data) => data.meta[0])
  .catch((error) => {
    throw new Error(error)
  })

export const getUIColorPaletteVersion = async () => {
  try {
    version = (await fetchUIColorPaletteStats).versions[
      (await fetchUIColorPaletteStats).current_plugin_version_id
    ].version
  } catch (error) {
    version = '🚀'
  }
  return version
}

export const getUIColorPaletteSaves = async () => {
  try {
    saves = (await fetchUIColorPaletteStats).install_count.toString()
  } catch (error) {
    saves = '❤️'
  }
  return saves
}

export const getUIColorPaletteRating = async () => {
  try {
    rating = `${(
      await fetchUIColorPaletteStats
    ).community_rating_stats.avg_rating.toString()}/5`
  } catch (error) {
    rating = '⭐️'
  }
  return rating
}

export const getUIColorPaletteUsers = async () => {
  try {
    users = (await fetchUIColorPaletteStats).unique_run_count.toString()
  } catch (error) {
    users = '😃'
  }
  return users
}
