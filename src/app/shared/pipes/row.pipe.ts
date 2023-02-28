import { Pipe, PipeTransform } from "@angular/core"

@Pipe( {
  name: 'seatRow'
} )

export class RowPipe implements PipeTransform {
  transform( seatRow: string ): string {
    if ( seatRow.length === 7 ) {
      return seatRow.slice( 4, seatRow.length - 2 )
    } else {
      return seatRow.slice( 4, seatRow.length - 3 )
    }
  }
}
