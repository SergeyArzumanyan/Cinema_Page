import { FormControl } from "@angular/forms";

export interface ICinema {
  id?: number,
  "cinemaId"?: number | null,
  "cinemaName"?: string | null,
  "cinemaImg"?: string | null,
  "cinemaDescription"?: string | null,
  "cinemaAddress"?: string | null
}

export interface ICinemaForm {
  "cinemaName": FormControl<string | null>,
  "cinemaDescription": FormControl<string | null>,
  "cinemaAddress": FormControl<string | null>,
  "cinemaImg": FormControl<string | null>
}
