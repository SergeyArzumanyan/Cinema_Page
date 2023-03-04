import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'shortText'
} )
export class ShortTextPipe implements PipeTransform {

  transform( text: string , count: number ): string {
    if ( text.length > count ) {
      return text.slice( 0, count ) + "..."
    } else {
      return text;
    }
  }

}
