import { Component, OnInit } from '@angular/core';
import { RequesthttpService } from "../../shared/services/requesthttp.service";
import { ICinema } from "../../shared/interfaces/cinema.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Component( {
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: [ './cinema.component.scss' ]
} )
export class CinemaComponent implements OnInit {
  public requestedCinemas?: ICinema[] = [];
  public cinemaInfo_1: ICinema | null = {}
  public cinemaInfo_2: ICinema | null = {}
  constructor(
    private http: RequesthttpService,
  ) {
  }

  ngOnInit(): void {
    this.http.getCinemas()
      .subscribe( {
        next: ( data: ICinema[] ) => {
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
