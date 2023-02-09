import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaComponent } from './cinema/cinema.component';




@NgModule( {
  declarations: [
    CinemaComponent
  ],
  exports: [
    CinemaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CinemasModule { }
