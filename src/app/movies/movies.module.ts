import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './components/movies/movies.component';
import { CinemaOneComponent } from './components/cinema-one/cinema-one.component';
import { CinemaTwoComponent } from './components/cinema-two/cinema-two.component';


@NgModule({
  declarations: [
    MoviesComponent,
    CinemaOneComponent,
    CinemaTwoComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
