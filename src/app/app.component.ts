import { Component, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  selectBcgImgService,
  CurrentDataService,
  SearchCityService,
  ForecastService,
  EPeriod,
  ERegion,
  EFlag,

} from './index';
import { ElementRef } from '@angular/core';
import { ICity } from './shared/interfaces/City';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  flasgPath: string = '../assets/img/icons/fullScreen/flags/'
  date!: string;
  dayClass!: any
  selectCity: boolean = false;
  resetPeriod: boolean = false;
  searchList!: Array<ICity>;
  city!: ICity;
  constructor(

    private selectBcgService: selectBcgImgService,
    private dataService: CurrentDataService,
    private searchCityService: SearchCityService,
    private render: Renderer2,
    private forecastService: ForecastService,
    private router: Router,

  ) { }
  @ViewChild('period') period!: ElementRef;

  ngOnInit() {
    this.city = this.searchCityService.city
    this.searchCityService.citySubj.subscribe(res => {
      this.city = res as ICity
    }
    )
    this.dataService.currentSunriseSunsetSubj.subscribe(res => {
      let sun = res as { sunrise: number, sunset: number }
      this.dayClass = this.selectBcgService.getSunriseSunset(sun.sunrise, sun.sunset)
    })

    this.searchCityService.spotLocation();
    this.date = this.dataService.getCurrentDate()
  }
  ngAfterViewInit() { }


  periodClick(i: any) {
    if (i.target.className === 'period') {
      return
    } else {
      let currentActive = this.render.parentNode ? this.render.parentNode(i.target.closest('button')).querySelector(".active") : null;
      this.render.removeClass(currentActive, 'active')
      this.render.addClass(i.target.closest('button'), 'active')

      this.forecastService.setPeriod(EPeriod[i.target.closest('button').id as keyof typeof EPeriod])
    }
    this.router.navigate(['CurrentWeather'])
  }

  goToMain() {
    this.router.navigate(['CurrentWeather'])
  }

  search(inp: any) {
    let keys = Object.keys(localStorage)
    let city
    for (let key of keys) {
      if (JSON.parse(localStorage.getItem(key)!).name === inp) {
        city = JSON.parse(localStorage.getItem(key)!)
        break
      }
    }
    if (city) {
      //если город из localStorage
      this.setCity(city)

    } else {
      this.searchCityService.serchCityName(inp).subscribe(res => {
        this.searchList = res as Array<ICity>
        // список городов с одинаковым названием
        this.selectCity = true;
      })
    }
  }

  inputEnter(e: any, inp: any) {
    if (e.key === 'Enter') {
      this.search(inp)
      e.target.blur()
    }
  }

  //при загрузке нового города выставитьь период 1день
  reset() {
    let event = new Event("click", { bubbles: true });
    this.period.nativeElement.querySelector('#oneDay').dispatchEvent(event)
  }

  // регион на русском языке только для BY
  getRegion(region: string, country: string) {
    if (country === 'BY') {
      return ERegion[region as keyof typeof ERegion]
    } else {
      return region
    }
  }

  getFlag(country: string) {
    return EFlag[country as keyof typeof EFlag]
  }

  setCity(city: ICity) {
    this.reset()
    this.searchCityService.setCityName(city)
    if (this.selectCity) this.selectCity = false
  }
}


