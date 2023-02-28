import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { ISession } from "../interfaces/session.interface";
import { IRegisterForm, IUser } from "../interfaces/authorization.interface";

@Injectable( {
  providedIn: 'root'
} )

export class SendhttpService {

  private SEND_USER_URL = 'http://localhost:3000/users';
  private SEND_SEATS_URL = 'http://localhost:3000/sessions/';

  private httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    } )
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  public sendUserData( user: IUser ): Observable<IRegisterForm> {
    return this.http.post<IRegisterForm>( this.SEND_USER_URL, user, this.httpOptions );
  }

  public sendReservedSeats( sessionId: string | null, newSessionInfo: ISession ): Observable<ISession> {
    return this.http.put<ISession>( this.SEND_SEATS_URL + sessionId, newSessionInfo, this.httpOptions );
  }
}
