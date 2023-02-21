import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { IUser } from "../interfaces/authorization.interface";

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  public notSignedIn: boolean = true;
  public user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>( null );

  public logUser( user: IUser ): void {
      this.notSignedIn = false;
      this.user$.next( user );
  }

  public logOutUser(): void {
    this.notSignedIn = true;
  }

}
