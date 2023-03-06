import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { LoginComponent } from "./login/components/login/login.component";
import { RegisterComponent } from "./register/components/register/register.component";
import { AuthRoutingModule } from "./auth-routing.module";

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

@NgModule( {
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,

  ]
} )
export class AuthModule {
}
