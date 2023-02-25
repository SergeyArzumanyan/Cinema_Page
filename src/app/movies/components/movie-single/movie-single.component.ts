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
  public sessions: ISession[] = [];
  public selected_movie!: IMovie;
  public dayArr: any[] = [];
  public sessionsArr: any[] = [];
  public selectedDay: any;
  public selectedSession: any;
  public dateIsSelected: boolean = false;

  public isClicked = false;

  public toggleWithClick(): void {
    this.isClicked = !this.isClicked;
  }

  constructor(
    private route: ActivatedRoute,
    private http: RequesthttpService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    window.scrollTo( 0, 0 );
    this.cinema_id = this.route.snapshot.paramMap.get( 'cinema-id' );
    this.movie_id = this.route.snapshot.paramMap.get( 'movie-id' );


    this.http.getMovie( '/movies/' + this.movie_id + '?_embed=sessions' )
      .subscribe( {
        next: ( movieData: IMovie ) => {
          this.selected_movie = movieData;
          this.selected_movie.trailerUrl += '?autoplay=1&amp;mute=1&amp;&amp;showinfo=0&amp;rel=0&amp;loop=0';
          this.sessions = this.selected_movie.sessions;
          this.filterDays( this.dayArr );
          this.selectedDay = this.dayArr[0];
          this.filterSessionsByDay( this.selectedDay, this.sessionsArr );
        },
        error: () => {
          this.router.navigate( [ '/movies' ] ).then();
          this.http.pageNotFoundError();
        }
      } )

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

}

