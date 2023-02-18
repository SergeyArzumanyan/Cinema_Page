import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICinema } from "../interfaces/cinema.interface";
import { IMovie } from "../interfaces/movie.interface";
import { ISession } from "../interfaces/session.interface";
import { IUser } from "../interfaces/authorization.interface";

@Injectable( {
  providedIn: 'root'
} )
export class RequesthttpService {
  private REQUEST_URL = ' http://localhost:3000'

  constructor( private http: HttpClient ) {
  }

  public getCinemas(): Observable<ICinema[]> {
    return this.http.get<ICinema[]>( this.REQUEST_URL + '/cinemas' );
  }

  public getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>( this.REQUEST_URL + '/movies' );
  }

  public getMovie( query: string ): Observable<IMovie> {
    return this.http.get<IMovie>( this.REQUEST_URL + query );
  }

  public getSession( sessionId: string | null ): Observable<ISession> {
    return this.http.get<ISession>( this.REQUEST_URL + '/sessions/' + sessionId );
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>( this.REQUEST_URL + '/users' );
  }
}
