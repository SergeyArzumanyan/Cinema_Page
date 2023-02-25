import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IMovie } from "@project-interfaces/movie.interface";
import { ISession } from "@project-interfaces/session.interface";
import { UserService } from "@project-services/user.service";
import { SendhttpService } from "@project-services/sendhttp.service";
import { RequesthttpService } from "@project-services/requesthttp.service";
import { ToastrService } from "ngx-toastr";


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
  public ticketsArr: any[] = [];
  public ticketsAllPrice: number = 0;
  public reservedSeats: any[] = [];

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
    window.scrollTo( 0, 0 );
    this.movie_id = this.route.snapshot.paramMap.get( 'movie-id' );
    this.session_id = this.route.snapshot.paramMap.get( 'session-id' );

    this.requestHttp.getMovie( '/movies/' + this.movie_id )
      .subscribe( {
        next: ( movieData: IMovie ) => {
          this.selected_movie = movieData;
        },

        error: () => {
          this.router.navigateByUrl('movies/all').then();
          this.requestHttp.pageNotFoundError();
        }
      } );
    this.requestHttp.getSession( this.session_id )
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
    for ( let i = 0; i <   n; i++ ) {
      arr.push(i);
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
    if ( sessionStorage.getItem('signedIn') === 'false' ) {
      this.toaster.error( "You need to sign in.", "Error", {
        timeOut: 1000,
        closeButton: true,
        extendedTimeOut: 1000,
      } );
      this.router.navigate( [ '/auth/login' ] ).then();
    } else {
      this.toaster.success( "Reserved Successfully", "Done", {
        timeOut: 1000,
        closeButton: true,
        extendedTimeOut: 1000,
      } );


      this.updatedSessionInfo = this.sessionInfo;
      this.updateSeatsArr = this.ticketsArr.map( ( seat: any ) => seat.id );
      for ( let reservedSeat of this.updateSeatsArr ) {
        if ( !this.updatedSessionInfo.seats.includes( reservedSeat ) ) {
          this.updatedSessionInfo.seats.push( reservedSeat );
        }
      }
      this.sendHttp.sendReservedSeats( this.session_id, this.updatedSessionInfo )
        .subscribe( {
          next: ( data: ISession ) => {
            this.router.navigate( [ '/movies/all' ] ).then();
          },
          error: () => {
            this.requestHttp.somethingWentWrong();
          }
        } )
    }
  }

}
