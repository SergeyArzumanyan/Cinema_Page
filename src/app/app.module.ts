import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CinemasModule } from "./cinemas/cinemas.module";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CinemaComponent } from "./cinemas/cinema/cinema.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CinemasModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'cinemas', component: CinemaComponent},
      {path: '', redirectTo: 'cinemas' , pathMatch: 'full'},
      {path: '**', redirectTo: 'cinemas' , pathMatch: 'full'},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
