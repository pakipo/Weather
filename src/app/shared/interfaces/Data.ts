import { IDailyForecast } from '../interfaces/DailyForecast'

export interface IData {
  
  name: string,
  coord: {
    lon: number,
    lat: number,
   
  },
  dt: number,
  hourly?: Array<any>,
  list: Array<IData>,

  weather: Array<{
    description: string,
    main: string,
    icon: string
  }>,
  main: {
    temp: number,
    humidity: number,
    feels_like: number,
    pressure: number
  },
  sys: {
    sunrise: number,
    sunset:number
  },

  wind: {
    speed: number,
    deg: number,
    gust: number
  },

  daily: Array<IDailyForecast>
 
}
