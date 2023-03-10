import { Component, OnInit } from '@angular/core';
import { take } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { IMovie } from "@project-interfaces/movie.interface";
import { MessageToastsService } from "@project-services/toast.service";
import { LazyLoadEvent } from "primeng/api";


@Component( {
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: [ './movies.component.scss' ]
} )

export class MoviesComponent implements OnInit {

  public allMovies: IMovie[] = [];
  public incomingMovies: IMovie[] = [];
  public virtualMovies: IMovie[] = [];
  public isMobile: boolean = ( window.innerWidth <= 650 );
  public cinemaId: string = '';
  private page: number = 1;
  private moviesLimit: number = 6;
  public infiniteScrollDisabled: boolean = true

  constructor(
    private http: RequesthttpService,
    private route: ActivatedRoute,
    private router: Router,
    private toastMessage: MessageToastsService
  ) {
  }

  ngOnInit(): void {
    this.followRouteParamsChanges()
  }

  private followRouteParamsChanges() {

    this.route.params.subscribe(
      params => {

        this.infiniteScrollDisabled = true;
        this.page = 1;
        this.cinemaId = params['cinema-id'];

        this.getMovies();
      }
    )
  }

  private getMovies() {

    this.http.getMovies( this.cinemaId, this.page.toString(), this.moviesLimit.toString() )
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( movies: IMovie[] ) => {
          this.infiniteScrollDisabled = false;
          this.incomingMovies = movies;
          if ( this.incomingMovies.length === 0 ) {
            this.router.navigateByUrl( 'movies' ).then();
            this.toastMessage.somethingWentWrongMessage();
            return;
          }
          this.allMovies = this.incomingMovies;
        },
        error: () => {
          this.toastMessage.somethingWentWrongMessage();
        }
      } )
  }

  private requestMoreMovies(): void {

    this.http.getMovies( this.cinemaId, this.page.toString(), this.moviesLimit.toString() )
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( movies: IMovie[] ) => {
          this.incomingMovies = movies;
          this.allMovies = this.allMovies.concat( this.incomingMovies );
        },
        error: () => {
          this.toastMessage.somethingWentWrongMessage();
        }
      } )
  }

  public onScroll() {

    this.page++;
    this.requestMoreMovies();
    this.incomingMovies = [];
  }



}






