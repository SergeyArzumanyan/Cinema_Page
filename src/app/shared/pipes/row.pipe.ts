import { Pipe, PipeTransform } from "@angular/core"

@Pipe ({
  name: 'seatRow'
})

export class RowPipe implements PipeTransform {
  transform( seatRow: string ): string {
    return seatRow.slice(4 , seatRow.length - 2 )
  }
}
