import { Component } from '@angular/core';
import { RequesthttpService } from "../../../shared/services/requesthttp.service";
import { IMovie } from "../../../shared/interfaces/movie.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-cinema-one',
  templateUrl: './cinema-one.component.html',
  styleUrls: ['./cinema-one.component.scss']
})
export class CinemaOneComponent {
  screenWidth: boolean = ( window.innerWidth <= 650 );
  public incomingMovies: IMovie[] = [];

  constructor(http: RequesthttpService) {
    http.getMovies()
      .subscribe( {
        next: ( data: IMovie[] ) => {
          this.incomingMovies = data;
          this.incomingMovies = this.incomingMovies.filter( (item: any) => item.cinemaId[0] === true)
        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )
  }
}
