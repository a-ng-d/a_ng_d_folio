let version, likes, comments, runs

async function fetchWithTimeout(resource: string, options: any = {}) {
  const { timeout = 8000 } = options
  
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  })
  clearTimeout(id)
  return response
}

const fetchUIColorPaletteStats = fetchWithTimeout(
  'https://api.allorigins.win/raw?url=https://figma.com/api/plugins/profile/1716027',
  {
    timeout: 5000
  }
)
  .then((response) => response.ok ? response.json() : Promise.reject())
  .then((data) => data.meta[0])
  .catch((error) => {
    throw new Error(error)
  })

export const getUIColorPaletteVersion = async () => {
  try {
    version = `v${(await fetchUIColorPaletteStats).versions[(await fetchUIColorPaletteStats).current_plugin_version_id].version}`
  } catch (error) {
    version = '🍌'
  }
  return version
}

export const getUIColorPaletteLikes = async () => {
  try {
    likes = (await fetchUIColorPaletteStats).like_count.toString()
  } catch (error) {
    likes = '❤️'
  }
  return likes
}

export const getUIColorPaletteComments = async () => {
  try {
    comments = (await fetchUIColorPaletteStats).comment_count.toString()
  } catch (error) {
    comments = '💬'
  }
  return comments
}

export const getUIColorPaletteRuns = async () => {
  try {
    runs = (await fetchUIColorPaletteStats).unique_run_count.toString()
  } catch (error) {
    runs = '▶️'
  }
  return runs
}
