import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieSingleComponent } from './components/movie-single/movie-single.component';
import { SessionBookComponent } from './components/session-book/session-book.component';
import { RowPipe } from "../shared/pipes/row.pipe";
import { SeatPipe } from "../shared/pipes/seat.pipe";
import { SafePipe } from "../shared/pipes/safe.pipe";
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    MoviesComponent,
    MovieSingleComponent,
    SessionBookComponent,
    RowPipe,
    SeatPipe,
    SafePipe
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    NgxSpinnerModule
  ]
})
export class MoviesModule { }
