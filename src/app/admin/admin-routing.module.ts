import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminMoviesComponent } from "./components/admin-movies/admin-movies.component";
import { AdminSessionsComponent } from "./components/admin-sessions/admin-sessions.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminCinemasComponent } from "./components/admin-cinemas/admin-cinemas.component";
import { AdminGuard } from "../shared/guards/admin.guard";

const routes: Routes = [
  { path: "", component: AdminComponent, canActivate: [ AdminGuard ] },
  { path: "movies", component: AdminMoviesComponent, canActivate: [ AdminGuard ] },
  { path: "cinemas", component: AdminCinemasComponent, canActivate: [ AdminGuard ] },
  { path: "sessions", component: AdminSessionsComponent, canActivate: [ AdminGuard ] }


];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AdminRoutingModule {
}
