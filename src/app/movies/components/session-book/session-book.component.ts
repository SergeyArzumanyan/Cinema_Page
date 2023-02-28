import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { RequesthttpService } from "@project-services/requesthttp.service";
import { IMovie } from "@project-interfaces/movie.interface";
import { ISession } from "@project-interfaces/session.interface";
import { UserService } from "@project-services/user.service";
import { SendhttpService } from "@project-services/sendhttp.service";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs";


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
  private updatedSessionInfo!: ISession;
  private updateSeatsArr: string[] = [];
  public ticketsArr: HTMLDivElement[] = [];
  public ticketsAllPrice: number = 0;
  public reservedSeats: string[] = [];

  constructor(
    private requestHttp: RequesthttpService,
    private sendHttp: SendhttpService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getParamsData();
    this.getMovieInfo();
    this.getSessionInfo();
  }

  private getParamsData(): void {
    this.movie_id = this.route.snapshot.paramMap.get( 'movie-id' );
    this.session_id = this.route.snapshot.paramMap.get( 'session-id' );
  }

  private getMovieInfo(): void {
    this.requestHttp.getMovie( '/movies/' + this.movie_id )
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( movieData: IMovie ) => {
          this.selected_movie = movieData;
        },

        error: () => {
          this.router.navigateByUrl( 'movies/all' ).then();
          this.requestHttp.pageNotFoundError();
        }
      } );
  }

  private getSessionInfo(): void {
    this.requestHttp.getSession( this.session_id )
      .pipe( take( 1 ) )
      .subscribe( {
        next: ( sessionData: ISession ) => {
          this.sessionInfo = sessionData;
          this.reservedSeats = this.sessionInfo.seats;
          for ( let seat of this.reservedSeats ) {
            document.getElementById( seat )?.classList.add( 'reserved' );
          }

        },
        error: () => {
          this.requestHttp.somethingWentWrong();
        }
      } )
  }

  public generateTimes( n: number ): any {
    let arr = [];
    for ( let i = 0; i < n; i++ ) {
      arr.push( i );
    }

    return arr;
  }

  public selectSeat( target: any ): void {
    if ( target.className !== 'row' && !target.classList.contains( 'reserved' ) ) {
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


  public reserveSeats(): void {

    this.checkSignInState();
    this.reserveSeatsSuccessfullyVisual();
    this.modifySelectedSeats();
    this.sendReservedSeatsToDB();
  }


  private checkSignInState(): void {

    if ( localStorage.getItem( 'signedIn' ) === 'false' ) {
      this.toaster.error( "You need to sign in.", "Error", {
        timeOut: 1000,
        closeButton: true,
        extendedTimeOut: 1000,
      } );

      this.router.navigate( [ '/auth/login' ] ).then();
      return;
    }
  }


  private reserveSeatsSuccessfullyVisual(): void {

    this.toaster.success( "Reserved Successfully", "Done", {
      timeOut: 1000,
      closeButton: true,
      extendedTimeOut: 1000,
    } );
  }


  private modifySelectedSeats(): void {

    this.updatedSessionInfo = this.sessionInfo;
    this.updateSeatsArr = this.ticketsArr.map( ( seat: any ) => seat.id );

    for ( let reservedSeat of this.updateSeatsArr ) {
      if ( !this.updatedSessionInfo.seats.includes( reservedSeat ) ) {
        this.updatedSessionInfo.seats.push( reservedSeat );
      }
    }
  }


  private sendReservedSeatsToDB(): void {

    this.sendHttp.sendReservedSeats( this.session_id, this.updatedSessionInfo )
      .pipe( take( 1 ) )
      .subscribe( {
        next: () => {
          this.router.navigate( [ '/movies/all' ] ).then();
        },
        error: () => {
          this.requestHttp.somethingWentWrong();
        }
      } )
  }
}
