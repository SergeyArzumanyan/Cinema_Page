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
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { VirtualScrollerModule } from 'primeng/virtualscroller';


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
    ButtonModule,
    RippleModule,
    VirtualScrollerModule
  ]
} )
export class MoviesModule {
}
