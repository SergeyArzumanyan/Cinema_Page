import { FormControl } from "@angular/forms";

export interface IMovieForm {
  "id"?: FormControl<number>,
  "name": FormControl<string | null>,
  "description": FormControl<string | null>,
  "trailerUrl": FormControl<string | null>,
  "imgUrl": FormControl<string | null>
}