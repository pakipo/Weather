import { Component, OnInit, OnDestroy} from '@angular/core';
import { map, concatMap } from 'rxjs/operators';
import {
  IData,
  CurrentDataService,
  selectBcgImgService,
  SearchCityService,
  EMainIcon
} from '../../../index'
import { ICity } from '../../../shared/interfaces/City';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  sizeScreen: string = 'fullScreen';
  mainIconPath: string = `../../../assets/img/icons/${this.sizeScreen}/mainIcons/`
  mainIcon!: string;
  iconPath: string = `../../../assets/img/icons/${this.sizeScreen}/`
  directionWindIconPath: string = `../../../assets/img/icons/${this.sizeScreen}/directionWind/`
  data!: IData;
  load: boolean = true;
  timer!: any;
  time!: string;
  city!: ICity;
  date!: string;
  constructor(
    private dataServis: CurrentDataService,
    public selectImgService: selectBcgImgService,
    private searchService: SearchCityService
  ) {
  }

  ngOnInit(): void {

    this.load = false
    this.date = this.dataServis.getCurrentDate()
    this.city = this.searchService.city
    this.sizeScreen = this.selectImgService.getPathIcons()
    this.timer = this.dataServis.timer.subscribe(s => {
      let date = new Date();
      let minuts = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      this.time = `${hours}:${minuts}`
    })

    //при изменении города
      this.searchService.citySubj.pipe(map(res => {
        this.city = res as ICity
        return
      }),
        concatMap(() => {
          return this.dataServis.getCurrentWeather({ lat: this.city.lat, lon: this.city.lon })
        })).subscribe(res => {
          this.data = res as IData
          this.searchService.setCityLocalStorage({
            name: this.data.name,
            lat: this.data.coord.lat,
            lon: this.data.coord.lon
          })
          this.mainIcon = this.mainIconPath + EMainIcon[this.data.weather[0].icon as keyof typeof EMainIcon]

          this.load = true;
        })
    // город выбран
    if (this.city) {
      this.dataServis.getCurrentWeather({ lat: this.city.lat, lon: this.city.lon }).subscribe(res => {
        this.data = res as IData
      
        this.searchService.setCityLocalStorage({
          name: this.data.name,
          lat: this.data.coord.lat,
          lon:this.data.coord.lon
        })
        this.mainIcon = this.mainIconPath + EMainIcon[this.data.weather[0].icon as keyof typeof EMainIcon]
        this.load = true;
      }

      )
    }

  }

  roundingValues(values: number) {
    return Math.round(values)
  }

  ngOnDestroy() {
    this.timer.unsubscribe()
  }

}
