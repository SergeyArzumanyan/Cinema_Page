import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { IUser } from "../interfaces/authorization.interface";

@Injectable( {
  providedIn: 'root'
} )

export class UserService {

  private loggedUser: IUser | null = localStorage.getItem( 'loggedUser' ) ? JSON.parse( localStorage.getItem( 'loggedUser' )! ) : null;

  public user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>( this.loggedUser );

  public logUser( user: IUser ): void {
    localStorage.setItem( 'signedIn', 'true' );
    localStorage.setItem( 'loggedUser', JSON.stringify( user ) );

    this.user$.next( user );
  }

  public logOutUser(): void {

    localStorage.removeItem( "loggedUser" );
    localStorage.setItem( 'signedIn', 'false' );

    this.user$.next( null );
  }

}
