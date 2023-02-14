import { Component } from '@angular/core';
import { RequesthttpService } from "../../../shared/services/requesthttp.service";
import { MovieInterface } from "../../../shared/interfaces/movie.interface";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-cinema-two',
  templateUrl: './cinema-two.component.html',
  styleUrls: ['./cinema-two.component.scss']
})
export class CinemaTwoComponent {
  screenWidth: boolean = ( window.innerWidth <= 650 );
  public incomingMovies: MovieInterface[] = [];

  constructor(http: RequesthttpService) {
    http.getMovies()
      .subscribe( {
        next: ( data: MovieInterface[] ) => {
          this.incomingMovies = data;
          this.incomingMovies = this.incomingMovies.filter( (item: any) => item.cinemaId[1] === true)
        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )
  }
}
