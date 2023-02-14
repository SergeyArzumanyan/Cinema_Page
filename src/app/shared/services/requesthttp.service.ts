import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MovieInterface } from "../interfaces/movie.interface";
import { Observable } from "rxjs";
import { CinemaInterface } from "../interfaces/cinema.interface";

@Injectable( {
  providedIn: 'root'
} )
export class RequesthttpService {
  private REQUEST_URL = ' http://localhost:3000'

  constructor( private http: HttpClient ) {
  }

  public getCinemas(): Observable<CinemaInterface[]> {
    return this.http.get<CinemaInterface[]>( this.REQUEST_URL + '/cinemas' );
  }

  public getMovies(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>( this.REQUEST_URL + '/movies' );
  }

  public getMovie( query: string ): Observable<MovieInterface> {
    return this.http.get<MovieInterface>( this.REQUEST_URL + query );
  }
}
