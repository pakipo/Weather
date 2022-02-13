export interface IDailyForecast {
  dt: number,
  weather: Array<{
    icon: string
  }>
  temp: {
    day: number,
    min: number,
    max: number,
    eve: number,
    morn: number,
    night: number,
  },
  'wind_deg': number,
  'wind_speed': number,
  'wind_gust': number,
  'feels_like': {
    day: number,
    night: number,
    eve: number,
    morn: number
  }

  pressure: number,
  humidity: number,
  sunrise: number,
  sunset: number
  moonrise: number,
  moonset: number,
 
}
