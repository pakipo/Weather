import { Injectable } from '@angular/core';
import {
  EBcgImgSource,
  EMainIcon
} from '../../index'
@Injectable({
  providedIn: 'root'
})
export class selectBcgImgService {

  constructor() { }

  getSunriseSunset(sunrise: number, sunset: number) {
    let time = new Date().getTime()
    if (time >= sunrise * 1000 && time < sunset * 1000) {
      return {
        day: true
      }
    }
    return {
      night: true
    }
  }

  getBcgImgSource(sunrise: number, sunset: number) {
    return EBcgImgSource[`${this.getSunriseSunset(sunrise, sunset)}` as keyof typeof EBcgImgSource]
  }


  getTimeOfDay() {
    let time = new Date().getHours()
    if (time >= 0 && time < 6) {
      return { 'night': true }
    } else if (time >= 6 && time < 12) {
      return { 'morning': true }
    } else if (time >= 12 && time < 18) {
      return { 'day': true }
    } else {
      return { 'evening': true }
    }
  }

  getTempIcon(temp: number) {
    return temp > 0 ? 'tempPlus.svg' : 'tempMinus.svg'
  }

  getWindIcon(temp: number) {
 
    if (temp >= 0 && temp <= 5) {
      return 'lightWind.svg'
    } else if (temp > 5 && temp <= 10) {
      return 'middeleWind.svg'
    } else if (temp > 10 && temp <= 20) {
      return 'strongWind.svg'
    } else {
      return 'hurricaneWind.svg'
    }
  }

  getdirectionWindIcon(deg: number) {
    if (deg >= 0 && deg <= 22.5) {
      return 'northWind.svg'
    } else if (deg > 22.5 && deg <= 67.5) {
      return 'northwestWind.svg'
    } else if (deg > 67.5 && deg <= 112.5) {
      return 'westWind.svg'
    } else if (deg > 112.5 && deg <= 157.5) {
      return 'southwestWind.svg'
    } else if (deg > 157.5 && deg <= 202.5) {
      return 'southWind.svg'
    } else if (deg > 202.5 && deg <= 247.5) {
      return 'southEastWind.svg'
    } else if (deg > 247.5 && deg <= 292.5) {
      return 'eastWind.svg'
    } else if (deg > 292.5 && deg <= 337.5) {
      return 'northEastWind.svg'
    } else { return 'northWind.svg'}
  }
  //часть  пути к icons в зависимости от разрешения экрана 
  getPathIcons() {
    if (document.documentElement.clientWidth >= 980) {
      return 'fullScreen'
    } else if (window.screen.width <= 980 && window.screen.width >= 768) {
      return 'tabletScreen'
    } else if (window.screen.width < 768 && window.screen.width >= 425) {
      return 'mobileScreen'
    } else {
      return 'smallScreen'
    }
  }

 
}
