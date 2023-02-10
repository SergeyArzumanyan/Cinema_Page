import { Component, OnInit } from '@angular/core';
import { RequesthttpService } from "../../shared/services/requesthttp.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MovieInterface } from "../../shared/interfaces/movie.interface";

@Component( {
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: [ './cinema.component.scss' ]
} )
export class CinemaComponent implements OnInit {
  constructor( private http: RequesthttpService ) {
  }

  private sub = this.http.getMovies();

  ngOnInit(): void {
    this.sub.subscribe( {
      next: ( data: MovieInterface[] ) => {

      },
      error: ( err: HttpErrorResponse ) => {
        console.log( err );
      }
    } )
  }

}
