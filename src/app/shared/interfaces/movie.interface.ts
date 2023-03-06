import { ISession } from "@project-interfaces/session.interface";

export interface IMovie {
  "cinemaId"?: string[],
  "description"?: string | null,
  "id"?: number,
  "imgUrl"?: string | null,
  "name"?: string | null,
  "sessions"?: ISession[],
  "trailerUrl"?: string | null,
}
