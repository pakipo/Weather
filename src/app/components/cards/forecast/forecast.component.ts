import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {
  IForecast,
  ForecastService,
  selectBcgImgService,
  EPeriod,
} from '../../../index'


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit, AfterViewInit {
  sizeScreen!: string;
  mainIconPath!: string;

  constructor(
    private forecastService: ForecastService,
    private render: Renderer2,
    private router: Router,
    private selectImg: selectBcgImgService

  ) { }
  @Input('data') data!: IForecast
  @ViewChild('container') container!: ElementRef;

  ngOnInit(): void {

    this.sizeScreen = this.selectImg.getPathIcons()
    this.mainIconPath = `../../../assets/img/icons/${this.sizeScreen}/mainIconsForecast/${this.data.icon}`
  }

  ngAfterViewInit() {
    let container = this.container.nativeElement;
    if (this.forecastService.forecastPeriod !== EPeriod.oneDay) {
      this.render.listen(container, 'click', () => this.goToDetails(this.data.fullDate))
      this.render.listen(container, 'mouseenter',
        () => {
          this.render.setStyle(container, 'cursor', 'pointer')
        })
    }
  }

  goToDetails(date: number) {
    this.router.navigate(['Datails', date])
  }
}

