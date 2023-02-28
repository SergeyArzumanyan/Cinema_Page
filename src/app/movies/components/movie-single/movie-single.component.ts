import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { IMovie } from "@project-interfaces/movie.interface";
import { ISession } from "@project-interfaces/session.interface";

@Component( {
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: [ './movie-single.component.scss' ]
} )

export class MovieSingleComponent implements OnInit {

  public cinema_id: string | null = "";
  public movie_id: string | null = "";
  public selected_movie!: IMovie;

  public sessions: ISession[] = [];
  public dayArr: string[] = [];
  public sessionsArr: ISession[] = [];
  public selectedDay: string = "";
  public selectedSession: ISession | null = null;
  public dateIsSelected: boolean = false;
  public isClicked = false;

  constructor(
    private route: ActivatedRoute,
    private http: RequesthttpService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getMovieData();
  }

  private getParamsData(): void {
    this.cinema_id = this.route.snapshot.paramMap.get( 'cinema-id' );
    this.movie_id = this.route.snapshot.paramMap.get( 'movie-id' );
  }

  private getMovieData(): void {
    this.getParamsData();
    this.http.getMovie( '/movies/' + this.movie_id + '?_embed=sessions' )
      .subscribe( {
        next: ( movieData: IMovie ) => {
          this.selected_movie = movieData;
          this.addTrailerUrlParams();
          this.sessions = this.selected_movie.sessions;
          this.setStartingSessionStates();
        },
        error: () => {
          this.router.navigateByUrl( "movies" ).then();
          this.http.pageNotFoundError();
        }
      } )
  }

  private addTrailerUrlParams(): void {
    this.selected_movie.trailerUrl += '?autoplay=1&amp;mute=1&amp;&amp;showinfo=0&amp;rel=0&amp;loop=0';
  }

  private setStartingSessionStates(): void {
    this.filterDays( this.dayArr );
    this.selectedDay = this.dayArr[0];
    this.filterSessionsByDay( this.selectedDay, this.sessionsArr );
  }

  private filterDays( arr: any ): void {
    this.selected_movie?.sessions.map( ( session: any ) => {
      if ( !arr.includes( new Date( session.date ).getDate() ) ) {
        arr.push( new Date( session.date ).getDate() );
        arr.sort( ( a: any, b: any ) => a - b );
      }
    } );
  }

  private filterSessionsByDay( day: any, arr: any ): void {
    this.selected_movie.sessions.map( ( session: any ) => {
      if ( new Date( session.date ).getDate() === day ) {
        arr.push( session );
        arr.sort( ( a: any, b: any ) => new Date( a.date ).getTime() - new Date( b.date ).getTime() );
      }
    } );
  }

  public pickDay( dayIndex: number ): void {
    this.selectedSession = null;
    this.sessionsArr = [];
    this.dateIsSelected = false;
    this.selectedDay = this.dayArr[dayIndex];
    this.filterSessionsByDay( this.selectedDay, this.sessionsArr );
  }

  public pickSession( sessionIndex: number ): void {
    this.dateIsSelected = true;
    this.selectedSession = this.sessionsArr[sessionIndex];
  }

  public toggleWithClick(): void {
    this.isClicked = !this.isClicked;
  }
}

