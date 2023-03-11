import { FormControl } from "@angular/forms";

export interface ISession {
  "date"?: any,
  "id"?: number | null,
  "movieId"?: number | null,
  "price"?: number | null,
  "seats"?: any
}


export interface ISessionForm {
  "date": FormControl<string | null>,
  "movieId": FormControl<number | null>,
  "price": FormControl<number | null>,
}
