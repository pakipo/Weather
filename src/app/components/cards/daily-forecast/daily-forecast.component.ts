import { Component, OnInit, Input } from '@angular/core';
import {

  ICity,
  selectBcgImgService,
  EMainIcon,
  IDailyForecast,
  EmonthConverter,
  EdayConverter
} from '../../../index'

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit {
  mainIcon!: string
  sizeScreen: string = 'fullScreen';
  iconPath: string = `../../../assets/img/icons/${this.sizeScreen}/iconsDailyForecast/`;


  @Input('data') data!: IDailyForecast;
  @Input('city') city!: ICity;

  constructor(public selectImgService: selectBcgImgService) { }

  ngOnInit(): void {
    this.sizeScreen = this.selectImgService.getPathIcons()
    this.mainIcon = EMainIcon[this.data.weather[0].icon as keyof typeof EMainIcon]
  }

  getDate() {
    let date = new Date(this.data.dt * 1000)
    return `${date.getDate()} ${EmonthConverter[date.getMonth()]}, ${EdayConverter[date.getDay()]}`;
  }

  getTimeSun(time: number) {
    let date = new Date(time * 1000)
    let minuts = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    return `${hours}:${minuts}`
  }

  roundingValues(values: number) {
    return Math.round(values)
  }
}
