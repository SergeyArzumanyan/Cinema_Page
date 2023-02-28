import { Component, OnInit } from '@angular/core';

import { RequesthttpService } from "@project-services/requesthttp.service";
import { ICinema } from "@project-interfaces/cinema.interface";
import { Router } from "@angular/router";

@Component( {
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: [ './cinema.component.scss' ]
} )

export class CinemaComponent implements OnInit {

  public requestedCinemas?: ICinema[] = [];
  public cinemaInfo_1: ICinema = {}
  public cinemaInfo_2: ICinema = {}

  constructor(
    private http: RequesthttpService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCinemasData();
  }

  private getCinemasData(): void {
    this.http.getCinemas()
      .subscribe( {
        next: ( data: ICinema[] ) => {
          this.requestedCinemas = data;
          if ( this.requestedCinemas[0] && this.requestedCinemas[1] ) {
            this.cinemaInfo_1 = this.requestedCinemas[0];
            this.cinemaInfo_2 = this.requestedCinemas[1];
          }
        },
        error: () => {
          this.http.somethingWentWrong();
          this.router.navigateByUrl("movies").then();
        }
      } )
  }
}
