import { Component, OnInit} from '@angular/core';
import {
  CurrentDataService,
  SearchCityService,
  ForecastService,
  AuxiliaryService,
  IForecast,
  ICity
} from '../../index';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  forecastData!: Array<IForecast>;
  load: boolean = true;
  city!: ICity;


  constructor(
    private currentDataServis: CurrentDataService,
    private forecastService: ForecastService,
    private searchCityService: SearchCityService,
    private auxService: AuxiliaryService
  ) { }

  ngOnInit(): void {
    this.auxService.preloaderToggleSubj.subscribe(res => {
      this.load = res as boolean;
    })
    this.auxService.preloaderCtrl(false)

    this.searchCityService.citySubj.subscribe(res => {
      this.city = res as ICity
    })
    this.city = this.searchCityService.city
    if (this.forecastService.forecastData) {
      this.forecastData = this.forecastService.forecastData
      this.auxService.preloaderCtrl(true)
    }
    this.forecastService.forecastDataSubj.subscribe(res => {
      this.forecastData = res as Array<IForecast>

      this.auxService.preloaderCtrl(true)
    })
    if (!this.city) { this.auxService.preloaderCtrl(true) }
    this.forecastService.setCity()

  }

}


