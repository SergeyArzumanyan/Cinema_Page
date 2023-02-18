import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IRegisterForm, IUser } from "../interfaces/authorization.interface";

@Injectable( {
  providedIn: 'root'
} )
export class SendhttpService {
  private SEND_URL = 'http://localhost:3000/users'

  private httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    } )
  };

  constructor( private http: HttpClient ) {
  }

  public sendUserData( user: IUser ) {
    return this.http.post<IRegisterForm>( this.SEND_URL, user , this.httpOptions )
  }
}
