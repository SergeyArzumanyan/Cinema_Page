import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RequesthttpService } from "../../../shared/services/requesthttp.service";
import { MovieInterface } from "../../../shared/interfaces/movie.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";

@Component( {
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: [ './movie-single.component.scss' ]
} )
export class MovieSingleComponent implements OnInit {
  public movie_id: string | null = "";
  public sessions: any[] = [];
  public days: string[] = [];
  public selected_movie: any = {};
  public safeURL = this._sanitizer.bypassSecurityTrustResourceUrl( 'https://www.youtube.com/embed/Ck8lPxJoXO4?playlist=Ck8lPxJoXO4&amp;autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=0' );
  selectedDay: any;

  constructor(
    private route: ActivatedRoute,
    private http: RequesthttpService,
    private _sanitizer: DomSanitizer
  ) {
  }


  ngOnInit(): void {
    window.scrollTo( 0, 0 )
    this.movie_id = this.route.snapshot.paramMap.get( 'movie-id' );


    this.http.getMovie( '/movies/' + this.movie_id )
      .subscribe( {
        next: ( data: MovieInterface ) => {
          this.selected_movie = data;
          this.days = data.days;
          this.selectedDay = this.days[0];
          this.sessions = data.sessions[ 0 ];
        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )
  }

  public showSession( dayIndex: number ): void {
    this.sessions = this.selected_movie.sessions[ dayIndex ];
    this.selectedDay = this.days[dayIndex];
  }
}
