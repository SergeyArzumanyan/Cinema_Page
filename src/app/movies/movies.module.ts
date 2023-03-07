import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { MoviesComponent } from './components/movies/movies.component';
import { MovieSingleComponent } from './components/movie-single/movie-single.component';
import { SessionBookComponent } from './components/session-book/session-book.component';

import { TicketPipe } from "../shared/pipes/ticket.pipe";
import { SafePipe } from "../shared/pipes/safe.pipe";

import { ScrollPanelModule } from 'primeng/scrollpanel';


@NgModule( {
  declarations: [
    MoviesComponent,
    MovieSingleComponent,
    SessionBookComponent,
    TicketPipe,
    SafePipe
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    InfiniteScrollModule,
    ScrollPanelModule,
  ]
} )
export class MoviesModule {
}
