import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ICity,
  EdayConverter,
  EmonthConverter,
  ForecastService,
  IDailyForecast,
  AuxiliaryService
} from '../../index'

@Component({
  selector: 'app-datails',
  templateUrl: './datails.component.html',
  styleUrls: ['./datails.component.scss']
})
export class DatailsComponent implements OnInit {
  date!: number;
  data!: Array<IDailyForecast>;
  city!: ICity;
  load: boolean = true;

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "initialSlide": 0,
    "prevArrow": "<img class='slick-prev'  src='../../../../assets/img/nav/left-arrow.svg'>",
    "nextArrow": "<img class='slick-next' src='../../../../assets/img/nav/right-arrow.svg'>"
  };

  constructor(
    private route: ActivatedRoute,
    private forecastService: ForecastService,
    private auxService: AuxiliaryService

  ) { }

  ngOnInit(): void {

    this.forecastService.setCity()
    this.auxService.preloaderToggleSubj.subscribe(res => {
      this.load = res as boolean
    })
    this.auxService.preloaderCtrl(false)
    this.date = +this.route.snapshot.params.date
    this.forecastService.getDayForecast().subscribe(res => {
      this.data = res;
      this.slideConfig.initialSlide = this.data.findIndex(el => {
      return  el.dt === this.date
      })
      this.city = this.forecastService.city;
      this.auxService.preloaderCtrl(true)
    })
  }


  getDate() {
    let date = new Date(this.date * 1000)
    return `${date.getDate()} ${EmonthConverter[date.getMonth()]}, ${EdayConverter[date.getDay()]}`;

  }
 
}

 
 

  

