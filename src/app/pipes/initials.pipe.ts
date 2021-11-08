import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      const arr = value.split(' ');
      return arr[0].substr(0, 1).toLocaleUpperCase() + arr[arr.length - 1].substr(0, 1).toLocaleUpperCase();
    }
    return '';
  }
}
