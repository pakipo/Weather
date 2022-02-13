import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatailsComponent, MainComponent } from './index';

const routes: Routes = [
  { path: 'CurrentWeather', component: MainComponent },
  { path: 'Datails/:date', component: DatailsComponent },
  { path: "", redirectTo: "CurrentWeather", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
