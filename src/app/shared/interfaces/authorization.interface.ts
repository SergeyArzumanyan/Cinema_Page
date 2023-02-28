import { FormControl } from "@angular/forms";

export interface IUser {
  "id"?: number,
  "age"?: number | null,
  "email"?: string | null,
  "name"?: string | null,
  "password"?: string | null,
  "surname"?: string | null
}

export interface IRegisterForm {
  "age": FormControl<number | null>,
  "email": FormControl<string | null>,
  "name": FormControl<string | null>,
  "password": FormControl<string | null>,
  "surname": FormControl<string | null>
}

export interface ILoginForm {
  "email": FormControl<string | null>,
  "password": FormControl<string | null>
}
