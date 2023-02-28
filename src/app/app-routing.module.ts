import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: 'cinemas', loadChildren: () => import('./cinemas/cinemas.module').then( m => m.CinemasModule ) },
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then( m => m.MoviesModule ) },
  { path: 'auth', loadChildren: () => import("./authorization/auth.module").then( m => m.AuthModule ) },
  { path: '', redirectTo: 'cinemas', pathMatch: 'full' },
  { path: '**', redirectTo: 'cinemas', pathMatch: 'full' },
];

@NgModule( {
  declarations: [],
  imports: [
    RouterModule.forRoot( routes, {
      scrollPositionRestoration: "enabled"
    } )
  ],
  exports: [ RouterModule ]
} )

export class AppRoutingModule {
}
