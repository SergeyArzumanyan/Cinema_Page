import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MovieInterface } from "../interfaces/movie.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequesthttpService {
  private REQUEST_URL = '../../../assets/db.json'

  constructor(private http: HttpClient) {}

  getMovies(): Observable<MovieInterface[]> {
      return this.http.get<MovieInterface[]>(this.REQUEST_URL);
  }
}
