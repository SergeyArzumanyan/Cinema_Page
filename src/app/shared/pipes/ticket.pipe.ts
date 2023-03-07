import { Pipe, PipeTransform } from "@angular/core"

@Pipe( {
  name: 'Ticket'
} )

export class TicketPipe implements PipeTransform {
  transform( idString: string, type: string ): string {
    if ( type === 'seat' ) {
      return idString.slice( 6 );
    } else if ( type === 'row' && idString.length === 8 ) {
      return idString.slice( 4, idString.length - 3 );
    } else if ( type === 'row' && idString.length === 7 ) {
      return idString.slice( 4, idString.length - 2 );
    } else {
      return idString;
    }
  }
}
