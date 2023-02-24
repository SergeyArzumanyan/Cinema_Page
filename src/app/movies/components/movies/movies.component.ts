import { Component, OnInit } from '@angular/core';
import { RequesthttpService } from "../../../shared/services/requesthttp.service";
import { IMovie } from "../../../shared/interfaces/movie.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component( {
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: [ './movies.component.scss' ]
} )
export class MoviesComponent implements OnInit {
  public incomingMovies: IMovie[] = [];
  public isMobile: boolean = ( window.innerWidth <= 650 );
  public cinemaId = this.route.snapshot.paramMap.get( 'cinema-id' );

  constructor(
    private http: RequesthttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.http.getMovies(this.cinemaId!)
      .subscribe( {
        next: ( movies: IMovie[] ) => {
          this.incomingMovies = movies;
        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )


    // if ( this.cinemaId === 'cinema-one' ) {
    //   this.http.getMovies()
    //     .subscribe( {
    //       next: ( data: IMovie[] ) => {
    //         this.incomingMovies = data;
    //         this.incomingMovies = this.incomingMovies.filter( (item: any) => item.cinemaId[0] === true);
    //       },
    //       error: ( err: HttpErrorResponse ) => {
    //         console.log( err );
    //       }
    //     } )
    // } else if ( this.cinemaId === 'cinema-two' ) {
    //   this.http.getMovies()
    //     .subscribe( {
    //       next: ( data: IMovie[] ) => {
    //         this.incomingMovies = data;
    //         this.incomingMovies = this.incomingMovies.filter( (item: any) => item.cinemaId[1] === true);
    //       },
    //       error: ( err: HttpErrorResponse ) => {
    //         console.log( err );
    //       }
    //     } )
    // } else {
    //   this.router.navigateByUrl("movies").then();
    // this.http.getMovies()
    //   .subscribe( {
    //     next: ( data: IMovie[] ) => {
    //       this.incomingMovies = data;
    //     },
    //     error: ( err: HttpErrorResponse ) => {
    //       console.log( err );
    //     }
    //   } )

  }
}




