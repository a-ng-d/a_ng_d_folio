let version, likes, comments, runs

const fetchUIColorPaletteStats = fetch(
    'https://api.allorigins.win/raw?url=https://figma.com/api/plugins/profile/1716027'
  )
  .then((response) => response.json())
  .then((data) => data.meta[0])
  .catch((error) => {
    throw new Error(error)
  })

export const getUIColorPaletteVersion = async () => {
  try {
    version = `Version ${(await fetchUIColorPaletteStats).versions[(await fetchUIColorPaletteStats).current_plugin_version_id].version}`
  }
  catch(error) {
    version = 'Version KO'
  }  
  return version
}

export const getUIColorPaletteLikes = async () => {
  try {
    likes = (await fetchUIColorPaletteStats).like_count.toString()
  }
  catch(error) {
    likes = 'KO'
  }  
  return likes
}

export const getUIColorPaletteComments = async () => {
  try {
    comments = (await fetchUIColorPaletteStats).comment_count.toString()
  }
  catch(error) {
    comments = 'KO'
  }  
  return comments
}

export const getUIColorPaletteRuns = async () => {
  try {
    runs = (await fetchUIColorPaletteStats).unique_run_count.toString()
  }
  catch(error) {
    runs = 'KO'
  }  
  return runs
}