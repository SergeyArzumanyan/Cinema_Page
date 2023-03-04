import { FormControl } from "@angular/forms";

export interface ICinemaForm {
  "cinemaName": FormControl<string | null>,
  "cinemaDescription": FormControl<string | null>,
  "cinemaAddress": FormControl<string | null>,
}
