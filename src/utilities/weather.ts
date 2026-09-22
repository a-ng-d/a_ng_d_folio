import { clamp } from '@/utilities/operations'

/**
 * Live weather, from Open-Meteo.
 *
 * Open-Meteo is free, open source and needs no key or registration, and its
 * own geocoding endpoint covers the second half of the problem: the browser
 * time zone is named after a city, so `Europe/Paris` resolves to coordinates
 * without ever asking the visitor for their location. One provider, no key,
 * no permission prompt — at the cost of a city rather than a street, which is
 * all the weather behind a landscape needs.
 *
 * Every failure is silent and returns null: a background is not worth an
 * error, and the scene simply keeps whatever it was set to.
 */
const GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search',
  FORECAST = 'https://api.open-meteo.com/v1/forecast',
  TIMEOUT = 6000

export interface LocalWeather {
  /** Rainfall mapped onto the scene dial, 0 to 1. */
  rain: number
  /** Raw WMO weather code, kept for whatever else may want it. */
  code: number
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

/** The city a time zone is named after, which is close enough to stand in. */
export const placeFromTimeZone = (): string | null => {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!zone) return null

    const city = zone.split('/').pop()
    return city ? city.replace(/_/g, ' ') : null
  } catch (error) {
    return null
  }
}

/**
 * WMO codes, turned into how hard it should rain on the scene. Drizzle barely
 * shows, a thunderstorm is a downpour.
 */
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
      '&current=precipitation,weather_code'
  )
  const current = reading && reading.current
  if (!current) return null

  const code = Number(current.weather_code) || 0

  return {
    code,
    rain: rainFromCode(code, Number(current.precipitation) || 0),
  }
}
