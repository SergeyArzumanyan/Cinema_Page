import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequesthttpService } from "@project-services/requesthttp.service";
import { IMovie } from "@project-interfaces/movie.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component( {
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: [ './movies.component.scss' ]
} )
export class MoviesComponent implements OnInit, OnDestroy {
  public incomingMovies: IMovie[] = [];
  public isMobile: boolean = ( window.innerWidth <= 650 );
  public cinemaId!: string | null;
  private sub: Subscription | null | undefined

  constructor(
    private http: RequesthttpService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        this.cinemaId = params['cinema-id'];

        this.http.getMovies( this.cinemaId! )
          .subscribe( {
            next: ( movies: IMovie[] ) => {
              this.incomingMovies = movies;
              if ( this.incomingMovies.length === 0 ) {
                this.router.navigateByUrl( 'movies' ).then();
              }
            },
            error: () => {
              this.http.somethingWentWrong();
            }
          } )
      }
    )

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // public onScroll() {
  //   console.log("scrolled")
  //   this.spinner.show().then();
  // }
}






