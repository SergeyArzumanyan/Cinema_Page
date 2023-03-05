import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/components/login/login.component";
import { RegisterComponent } from "./register/components/register/register.component";
import { AuthGuard } from "../shared/guards/auth.guard";


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full' , canActivate: [AuthGuard] }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AuthRoutingModule {
}
