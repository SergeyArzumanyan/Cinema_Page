import { Pipe, PipeTransform } from "@angular/core"

@Pipe( {
  name: 'seat'
} )

export class SeatPipe implements PipeTransform {
  transform( seat: string ): string {
    return seat.slice( 6 );
  }
}
