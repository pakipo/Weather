import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  selectBcgImgService,
  CurrentDataService,
  SearchCityService,
  ApiRequestService,
  EPeriod,
  EMainIcon,
  ERegion,
  EFlag,
  IForecast,
  IData,
  EabrDayConverter

} from '../../index';
import { ICity } from '../interfaces/City';
@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  forecastPeriod: EPeriod = EPeriod.oneDay;
  city!: ICity;
  forecastData!: Array<IForecast>;
  forecastDataSubj: Subject<Array<IForecast>> = new Subject();
  constructor(
    private apiService: ApiRequestService,
    private searchCityService: SearchCityService
  ) { }

  getData() {

    switch (this.forecastPeriod) {

      case 1: this.getHourlyForecast()
        break;

      case 2: this.getThreeDaysForecast()
        break;

      case 3: this.getWeekForecast()
        break;
    }
  }

  getHourlyForecast() {

    this.apiService.getHourlyForecast({ lat: this.city.lat, lon: this.city.lon }).subscribe(res => {
      let data = res as IData;
      let arr = []
      for (let i = 0; i < 8; i++) {

        arr.push(
          {
            fullDate: data.list[i].dt,
            date: this.getDate(data.list[i].dt),
            temp: Math.round(data.list[i].main.temp),
            icon: EMainIcon[data.list[i].weather[0].icon as keyof typeof EMainIcon]
          }
        )
      }
      this.forecastData = arr;
      this.forecastDataSubj.next(this.forecastData)
    })
  }

  getThreeDaysForecast() {
    this.apiService.getOneCall({ lat: this.city.lat, lon: this.city.lon }).subscribe(res => {
      let data = res as IData;
      let arr = []
      for (let i = 1; i < 4; i++) {

        arr.push(
          {
            fullDate: data.daily[i].dt,
            date: this.getDataDay(data.daily[i].dt),
            temp: this.getAverageTemp(data.daily[i].temp),
            icon: EMainIcon[data.daily[i].weather[0].icon as keyof typeof EMainIcon]
          }
        )
      }
      this.forecastData = arr;
      this.forecastDataSubj.next(this.forecastData)
    })
  }

  getWeekForecast() {

    this.apiService.getOneCall({ lat: this.city.lat, lon: this.city.lon }).subscribe(res => {
      let data = res as IData;
      let arr = []
      console.log(data)
      for (let i = 1; i < 8; i++) {

        arr.push(
          {
            fullDate: data.daily[i].dt,
            date: this.getDataDay(data.daily[i].dt),
            temp: this.getAverageTemp(data.daily[i].temp),
            icon: EMainIcon[data.daily[i].weather[0].icon as keyof typeof EMainIcon]
          }
        )
      }
      this.forecastData = arr;
      this.forecastDataSubj.next(this.forecastData)
    })
  }

  getDayForecast() {
    return this.apiService.getOneCall({ lat: this.city.lat, lon: this.city.lon }).pipe(map(
      res => {
        let data = res as IData;
        return data.daily

      }
    ))
  }


  setPeriod(period: EPeriod) {
    this.forecastPeriod = period;
    this.getData();
  }

  setCity() {
    this.city = this.searchCityService.city;
    if (this.city) { this.getData() }
    this.searchCityService.citySubj.subscribe(res => {
      this.city = res as ICity
      this.getData()
    })
  }

  getDate(fullDate: number) {
    let date = new Date(fullDate * 1000)
    return `${date.getHours()}:00`
  }
  getDataDay(fullDate: number) {
    let date = new Date(fullDate * 1000)
    return `${date.getDate()}, ${EabrDayConverter[date.getDay()]}`
  }

  getAverageTemp(temp: any) {
    let averge = (temp.max + temp.min) / 2;
    return Math.round(averge)
  }
}
