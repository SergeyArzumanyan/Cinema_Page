import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RequesthttpService } from "../../../shared/services/requesthttp.service";
import { IMovie } from "../../../shared/interfaces/movie.interface";
import { ISession } from "../../../shared/interfaces/session.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";

@Component( {
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: [ './movie-single.component.scss' ]
} )
export class MovieSingleComponent implements OnInit {
  public movie_id: string | null = "";
  public sessions: ISession[] = [];
  public selected_movie!: IMovie;
  public safeURL = this._sanitizer.bypassSecurityTrustResourceUrl( "" );
  // public safeURL!: any;
  public dayArr: any[] = [];
  public sessionsArr: any[] = [];
  public selectedDay: any;
  public selectedSession: any;
  public dateIsSelected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: RequesthttpService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private toaster: ToastrService
  ) {
  }


  ngOnInit(): void {
    window.scrollTo( 0, 0 );
    this.movie_id = this.route.snapshot.paramMap.get( 'movie-id' );


    this.http.getMovie( '/movies/' + this.movie_id + '?_embed=sessions' )
      .subscribe( {
        next: ( movieData: IMovie ) => {
          this.selected_movie = movieData;
          this.sessions = movieData.sessions;
          this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl( movieData.trailerUrl );
          this.filterDays( this.dayArr );
          this.selectedDay = this.dayArr[ 0 ];
          this.filterSessionsByDay( this.selectedDay, this.sessionsArr );
        },
        error: ( err: HttpErrorResponse ) => {
          this.router.navigate( [ '/movies' ] ).then();
          this.toaster.error( err.statusText, "Error", {
            timeOut: 1000,
            closeButton: true,
            extendedTimeOut: 1000,
          } );
        }
      } )


  }


  private filterDays( arr: any ): void {
    if ( this.selected_movie.sessions ) {
      this.selected_movie.sessions.map( ( session: any ) => {
        if ( !arr.includes( new Date( session.date ).getDate() ) ) {
          arr.push( new Date( session.date ).getDate() );
          arr.sort( ( a: any, b: any ) => a - b );
        }
      } );

    }
  }

  private filterSessionsByDay( day: any, arr: any ): void {
    this.selected_movie.sessions.map( ( session: any ) => {
      if ( new Date( session.date ).getDate() === day ) {
        arr.push( session );
      }
    } );
  }

  public pickDay( dayIndex: number ): void {
    this.selectedSession = null;
    this.sessionsArr = [];
    this.dateIsSelected = false;
    this.selectedDay = this.dayArr[ dayIndex ];
    this.filterSessionsByDay( this.selectedDay, this.sessionsArr )
  }


  public pickSession( sessionIndex: number ): void {
    this.dateIsSelected = true;
    this.selectedSession = this.sessionsArr[ sessionIndex ];
  }

}

