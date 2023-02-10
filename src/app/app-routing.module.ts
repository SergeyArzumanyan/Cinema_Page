import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'cinemas', loadChildren: () => import('./cinemas/cinemas.module').then(m => m.CinemasModule) },
      { path: 'movies' , loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) },
      { path: 'login' , loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: '', redirectTo: 'cinemas', pathMatch: 'full' }
    ]
  },
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