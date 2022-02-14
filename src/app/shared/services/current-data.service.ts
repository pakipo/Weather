import { Injectable } from '@angular/core';

import { Observable, Subject, interval, TimeInterval } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ApiRequestService,
  EdayConverter,
  EmonthConverter,
  IData
} from '../../index';
@Injectable({
  providedIn: 'root'
})
export class CurrentDataService {

  currentSunriseSunsetSubj = new Subject();
  timeSubj = new Subject();
  timer: Observable<number> = interval(1000);
  constructor(
    private apiService: ApiRequestService,
   ) { }

  getCurrentDate() {
    let date = new Date();
    return `${EdayConverter[date.getDay()]}, ${date.getDate()} ${EmonthConverter[date.getMonth()]}`;
  }

  getCurrentWeather(local: { lat: number, lon: number }) {
    return this.apiService.getCurrentWeatherData(local).pipe(map(res => {
      let data = res as IData;
      this.currentSunriseSunsetSubj.next({ sunrise: data.sys.sunrise, sunset: data.sys.sunset })
      return res
    }))

 
  }

 
}
