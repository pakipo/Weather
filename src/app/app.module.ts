import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule } from "@angular/forms";
//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import {
  ApiRequestService,
  selectBcgImgService,
  MainComponent,
  CurrentDataService,
  SearchCityService,
  CurrentWeatherComponent,
  ForecastComponent,
  DatailsComponent,
  InputHintDirective,
  DailyForecastComponent,
  AuxiliaryService,
  PreloaderComponent,
  ForecastService
} from './index';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    DatailsComponent,
    DailyForecastComponent,
    InputHintDirective,
    PreloaderComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

   //Material
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
   
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  providers: [ApiRequestService, selectBcgImgService, CurrentDataService, SearchCityService, AuxiliaryService, ForecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
