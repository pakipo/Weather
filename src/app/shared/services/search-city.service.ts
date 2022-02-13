import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  ApiRequestService,
  ILocation,
  CurrentDataService,
  IData,
  ICity
} from '../../index';
@Injectable({
  providedIn: 'root'
})
export class SearchCityService {
  city!: ICity;
  citySubj: Subject<ICity> = new Subject();

  constructor(
    private apiService: ApiRequestService,
    private currDataServis: CurrentDataService,
    private router: Router
  ) { }

  //определение местоположения при загрузке
  spotLocation() {

    navigator.geolocation.getCurrentPosition(
      // если есть доступ к геолакации
      (position) => {
        let coord = { lat: position.coords.latitude, lon: position.coords.longitude }
        this.searchCityCoord(coord)
      }, (error) => {
        // если нет доступа к геолакации
        if (localStorage.length) {
          this.setCityName(JSON.parse(localStorage.getItem('lastView')!))
        }
      });
  }

  // сохранить город в localStorage макс. 10 городов. 
  setCityLocalStorage(city: ICity) {

    let values: Array<string> = Object.values(localStorage)
    let arrCity: Array<any> = [];
    let addCity: boolean = true;
    let name = new RegExp(`${city.name}`, 'i')

    values.map(itm => { if (name.test(itm)) addCity = false })

    if (localStorage.length < 11 && addCity) {
      localStorage.setItem('lastView', JSON.stringify(city))
      localStorage.setItem(String(localStorage.length - 1), JSON.stringify(city))
    } else if (addCity) {

      let keys = Object.keys(localStorage)
      for (let key of keys) {
        if (key !== 'lastView' && key !== '0') {
          let val = localStorage.getItem(key);
          key = String(+key - 1)
          arrCity.push({ [key]: val })

        }
      }
      localStorage.clear();
      localStorage.setItem('lastView', JSON.stringify(city))
      localStorage.setItem('9', JSON.stringify(city))
      arrCity.map(obj => {
        localStorage.setItem(Object.keys(obj)[0], Object.values(obj)[0] as string)
      })
    } else { localStorage.setItem('lastView', JSON.stringify(city)) }
  }

  //при изменении города
  setCityName(city: ICity) {
    this.router.navigate(['CurrentWeather'])
    this.city = city;
    this.citySubj.next(city)
  }

  searchCityCoord(coord: { lat: number, lon: number }) {
    this.apiService.searchCityCoord(coord).subscribe(res => {
      let cityObj = res as Array<ICity>;
      this.setCityName({ name: cityObj[0]['local_names']!.ru, lat: cityObj[0].lat, lon: cityObj[0].lon })

    })
  }

  serchCityName(name: string) {
    return this.apiService.serchCityName(name).pipe(map(res => {
      let arr = res as Array<ICity>;
      let city: Array<ICity> = [];
      arr.map(el => {
        el.name = el['local_names'] ? el['local_names'].ru : el.name
        city.push(el)
      })
      return city
    }))
  }
}


