import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { CinemaComponent } from "./cinema/cinema.component";

const routes: Routes = [
  { path: '', component: CinemaComponent }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class CinemasRoutingModule {
}
