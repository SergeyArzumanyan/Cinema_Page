import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from "./components/movies/movies.component";
import { CinemaOneComponent } from "./components/cinema-one/cinema-one.component";
import { CinemaTwoComponent } from "./components/cinema-two/cinema-two.component";
import { MovieSingleComponent } from "./components/movie-single/movie-single.component";

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'cinema-one', component: CinemaOneComponent },
  { path: 'cinema-two', component: CinemaTwoComponent },
  { path: ':movie-id', component: MovieSingleComponent },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class MoviesRoutingModule {
}
