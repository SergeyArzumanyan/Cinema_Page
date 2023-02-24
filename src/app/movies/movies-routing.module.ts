import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from "./components/movies/movies.component";
import { MovieSingleComponent } from "./components/movie-single/movie-single.component";
import { SessionBookComponent } from "./components/session-book/session-book.component";

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: ':cinema-id', component: MoviesComponent },
  { path: ':cinema-id/:movie-id', component: MovieSingleComponent },
  { path: ':cinema-id/:movie-id/:session-id', component: SessionBookComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class MoviesRoutingModule {
}
