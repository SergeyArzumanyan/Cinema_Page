import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { IUser } from "../interfaces/authorization.interface";

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  private loggedUser: IUser | null = sessionStorage.getItem( 'loggedUser' ) ? JSON.parse( sessionStorage.getItem( 'loggedUser' )! ) : null;
  public user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>( this.loggedUser );

  public logUser( user: IUser ): void {
    sessionStorage.setItem( 'signedIn', 'true' );
    sessionStorage.setItem( 'loggedUser', JSON.stringify( user ) );
    this.user$.next( user );
  }

  public logOutUser(): void {
    sessionStorage.removeItem( "loggedUser" );
    sessionStorage.setItem( 'signedIn', 'false' );
    this.user$.next( null );
  }

}
