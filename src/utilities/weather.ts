import { clamp } from '@/utilities/operations'

const GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search',
  FORECAST = 'https://api.open-meteo.com/v1/forecast',
  TIMEOUT = 6000

export interface LocalWeather {
  rain: number
  code: number
  cloud: number
  isStorm: boolean
  isFoggy: boolean
  isDay: boolean
}

const ask = async (url: string) => {
  const controller = new AbortController(),
    timer = setTimeout(() => controller.abort(), TIMEOUT)

  try {
    const response = await fetch(url, { signal: controller.signal })
    return response.ok ? await response.json() : null
  } catch (error) {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export const placeFromTimeZone = (): string | null => {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!zone) return null

    const parts = zone.split('/')
    if (parts.length < 2 || parts[0] === 'Etc') return null

    const city = parts[parts.length - 1]
    if (city === '' || /[+0-9]/.test(city)) return null

    return city.replace(/_/g, ' ')
  } catch (error) {
    return null
  }
}

export const rainFromCode = (code: number, millimetres: number): number => {
  if (code >= 95) return 1
  if (code >= 80) return 0.75
  if (code >= 71) return 0.5
  if (code >= 61) return clamp(0.45 + millimetres * 0.2, 0.45, 1)
  if (code >= 51) return 0.3

  return 0
}

export const fetchLocalWeather = async (): Promise<LocalWeather | null> => {
  const place = placeFromTimeZone()
  if (place === null) return null

  const found = await ask(
    `${GEOCODING}?name=${encodeURIComponent(place)}&count=1&format=json`
  )
  const spot = found && found.results && found.results[0]
  if (!spot) return null

  const reading = await ask(
    `${FORECAST}?latitude=${spot.latitude}&longitude=${spot.longitude}` +
      '&current=precipitation,weather_code,cloud_cover,is_day'
  )
  const current = reading && reading.current
  if (!current) return null

  const code = Number(current.weather_code) || 0

  return {
    code,
    rain: rainFromCode(code, Number(current.precipitation) || 0),
    cloud: clamp((Number(current.cloud_cover) || 0) / 100, 0, 1),
    isStorm: code >= 95,
    isFoggy: code === 45 || code === 48,
    isDay: Number(current.is_day) === 1,
  }
}
