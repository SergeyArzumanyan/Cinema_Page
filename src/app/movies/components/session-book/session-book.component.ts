import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RequesthttpService } from "../../../shared/services/requesthttp.service";
import { HttpErrorResponse } from "@angular/common/http";
import { IMovie } from "../../../shared/interfaces/movie.interface";
import { ISession } from "../../../shared/interfaces/session.interface";


@Component( {
  selector: 'app-session-book',
  templateUrl: './session-book.component.html',
  styleUrls: [ './session-book.component.scss' ]
} )
export class SessionBookComponent implements OnInit {
  public movie_id: string | null = "";
  public session_id: string | null = "";
  public selected_movie!: IMovie;
  public sessionInfo!: ISession;
  public dateInfo: string = "";
  public timeInfo: string = "";

  constructor(
    private http: RequesthttpService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    window.scrollTo( 0, 0 );
    this.movie_id = this.route.snapshot.paramMap.get( 'movie-id' );
    this.session_id = this.route.snapshot.paramMap.get( 'session-id' );

    this.http.getMovie( '/movies/' + this.movie_id )
      .subscribe( {
        next: ( movieData: IMovie ) => {
          this.selected_movie = movieData;
        },

        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } );
    this.http.getSession( this.session_id )
      .subscribe( {
        next: ( sessionData: ISession ) => {
          this.sessionInfo = sessionData;
          let year = new Date( this.sessionInfo.date ).getFullYear().toString();
          let day = new Date( this.sessionInfo.date ).getDate().toString();
          let month = ( new Date( this.sessionInfo.date ).getMonth() + 1 ).toString();
          let hours = new Date( this.sessionInfo.date ).getHours().toString();
          let minutes = new Date( this.sessionInfo.date ).getMinutes().toString();
          if ( hours === "0" ) {
            hours = "00";
          }
          if ( minutes === "0" ) {
            minutes = "00";
          }

          this.dateInfo = month + '/' + day + '/' + year;
          this.timeInfo = hours + ':' + minutes;

        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )

  }

}
