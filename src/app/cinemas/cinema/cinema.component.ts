import { Component, OnInit } from '@angular/core';
import { RequesthttpService } from "../../shared/services/requesthttp.service";
import { CinemaInterface } from "../../shared/interfaces/cinema.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Component( {
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: [ './cinema.component.scss' ]
} )
export class CinemaComponent implements OnInit {
  public requestedCinemas?: CinemaInterface[] = [];
  public cinemaInfo_1: CinemaInterface | null = {}
  public cinemaInfo_2: CinemaInterface | null = {}
  constructor(
    private http: RequesthttpService,
  ) {
  }

  ngOnInit(): void {
    this.http.getCinemas()
      .subscribe( {
        next: ( data: CinemaInterface[] ) => {
          this.requestedCinemas = data;
          if ( this.requestedCinemas[0] && this.requestedCinemas[1] ) {
            this.cinemaInfo_1 = this.requestedCinemas[0];
            this.cinemaInfo_2 = this.requestedCinemas[1];
          }
        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )
  }
}
