import { Component } from '@angular/core';
import { RequesthttpService } from "../../../shared/services/requesthttp.service";
import { MovieInterface } from "../../../shared/interfaces/movie.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Component( {
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: [ './movies.component.scss' ]
} )
export class MoviesComponent {
  public incomingMovies: MovieInterface[] = [];
  screenWidth: boolean = ( window.innerWidth <= 650 );

  constructor( private http: RequesthttpService ) {
    this.http.getMovies()
      .subscribe( {
        next: ( data: MovieInterface[] ) => {
          this.incomingMovies = data;
        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )
  }
}
