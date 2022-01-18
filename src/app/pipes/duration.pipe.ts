import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${hours}h ${minutes}m`;
  }
}
