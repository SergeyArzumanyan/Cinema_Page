import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaComponent } from './cinema/cinema.component';
import { RouterLink } from "@angular/router";
import { CinemasRoutingModule } from "./cinemas-routing.module";




@NgModule( {
  declarations: [
    CinemaComponent
  ],
  exports: [
    CinemaComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        CinemasRoutingModule
    ]
})
export class CinemasModule { }
