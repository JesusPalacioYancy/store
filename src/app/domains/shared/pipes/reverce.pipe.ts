import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverce',
  standalone: true
})
export class RevercePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('').reverse().join('');
  };

};
