import { ISession } from "@project-interfaces/session.interface";
import { FormControl } from "@angular/forms";

export interface IMovie {
  "cinemaId"?: string[],
  "description"?: string | null,
  "id"?: number,
  "imgUrl"?: string | null,
  "name"?: string | null,
  "sessions"?: ISession[],
  "trailerUrl"?: string | null,
}


export interface IMovieForm {
  "id"?: FormControl<number>,
  "name": FormControl<string | null>,
  "description": FormControl<string | null>,
  "trailerUrl": FormControl<string | null>,
  "imgUrl": FormControl<string | null>
}
