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
  public ticketsArr: any[] = [];
  public ticketsAllPrice: number = 0;
  public reservedSeats: any[] = [];

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
          this.reservedSeats = this.sessionInfo.seats;
          for ( let seat of this.reservedSeats ) {
            document.getElementById( seat )?.classList.add( 'reserved' );
          }

        },
        error: ( err: HttpErrorResponse ) => {
          console.log( err );
        }
      } )


  }

  public selectSeat( target: any ): void {
    if ( target.className !== 'row' && !target.classList.contains('reserved') ) {
      target.classList.toggle( 'selected' );
      if ( !this.ticketsArr.includes( target ) ) {
        this.ticketsArr.push( target );
        this.ticketsAllPrice += this.sessionInfo.price;
      } else {
        this.ticketsAllPrice -= this.sessionInfo.price;
        this.ticketsArr.splice( this.ticketsArr.indexOf( target ), 1 );
      }
    }

  }

  public deleteTicket( ticket: any ) {
    ticket.classList.remove( 'selected' );
    this.ticketsAllPrice -= this.sessionInfo.price;
    this.ticketsArr.splice( this.ticketsArr.indexOf( ticket ), 1 );
  }
}
