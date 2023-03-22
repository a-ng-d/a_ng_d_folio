const fetchUIColorPaletteVersion = fetch(
    'https://api.allorigins.win/raw?url=https://figma.com/api/plugins/profile/1716027'
  )
  .then((response) => response.json())
  .then((data) => `Version ${data.meta[0].versions[data.meta[0].current_plugin_version_id].version}`)
  .catch((error) => {
    throw new Error(error)
  })

export const getUIColorPaletteVersion = async () => {
  let version
  try {
    version = await fetchUIColorPaletteVersion
  }
  catch(error) {
    version = 'Some version'
  }  
  return version
}