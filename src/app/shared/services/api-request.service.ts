import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  endpoint: string = 'https://api.openweathermap.org'

  constructor(private http: HttpClient,

  ) { }

  getCurrentWeatherData(local: { lat: number, lon: number }) {

    return this.http.get(`${this.endpoint}/data/2.5/weather?lat=${local.lat}&lon=${local.lon}&appid=06342ea10677138428e7ba50bdc8b5d0&lang=ru&units=metric`)
  }

  getHourlyForecast(local: { lat: number, lon: number }) {

    return this.http.get(`${this.endpoint}/data/2.5/forecast?lat=${local.lat}&lon=${local.lon}&exclude={part}&appid=06342ea10677138428e7ba50bdc8b5d0&lang=ru&units=metric`)
  }

  getOneCall(local: { lat: number, lon: number }) {
    return this.http.get(`${this.endpoint}/data/2.5/onecall?lat=${local.lat}&lon=${local.lon}&exclude={part}&appid=06342ea10677138428e7ba50bdc8b5d0&lang=ru&units=metric`)
  }


  serchCityName(city: string) {
   
    return this.http.get(`${this.endpoint}/geo/1.0/direct?q=${city},643&limit=5&appid=06342ea10677138428e7ba50bdc8b5d0&lang=ru&units=metric`)
  }

  searchCityCoord(coord: { lat: number, lon: number }) {
    return this.http.get(`${this.endpoint}/geo/1.0/reverse?lat=${coord.lat}&lon=${coord.lon}&limit=5&appid=06342ea10677138428e7ba50bdc8b5d0&lang=ru`)
  }

}
