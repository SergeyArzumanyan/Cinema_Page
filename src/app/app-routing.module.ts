import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: 'cinemas', loadChildren: () => import('./cinemas/cinemas.module').then(m => m.CinemasModule) },
  { path: 'movies' , loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) },
  { path: 'login' , loadChildren: () => import('./authorization/login/login.module').then( m => m.LoginModule) },
  { path: 'register' , loadChildren: () => import('./authorization/register/register.module').then( m => m.RegisterModule) },
  { path: 'shop' , loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  { path: '', redirectTo: 'cinemas', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule( {
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
