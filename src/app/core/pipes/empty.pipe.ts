import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'empty'})
export class EmptyPipe implements PipeTransform {
  transform(property: any): string {
    if (property === null || property === undefined || property === '' || property === '0' || property === 'Jan 1, 1970, 1:00:00 AM') {
      return 'N/A';
    } else {
      return property;
    }
  }
}
