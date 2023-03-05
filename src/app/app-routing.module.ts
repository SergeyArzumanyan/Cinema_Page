import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then( m => m.MoviesModule ) },
  { path: 'cinemas', loadChildren: () => import('./cinemas/cinemas.module').then( m => m.CinemasModule ) },
  { path: 'auth', loadChildren: () => import("./authorization/auth.module").then( m => m.AuthModule ) },
  { path: 'admin', loadChildren: () => import("./admin/admin.module").then( m => m.AdminModule ) },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: '**', redirectTo: 'movies', pathMatch: 'full' },
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
