import { ISession } from "@project-interfaces/session.interface";

export interface IMovie {
  "cinemaId": string,
  "description": string,
  "id": number,
  "imgUrl": string,
  "name": string,
  "sessions": ISession[]
  "trailerUrl": string,
}
