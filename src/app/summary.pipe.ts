import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (!value) {
      return null;
    }
    const limit = args ? args : 50;
    const nValue = value.substr(0, limit);
    if (nValue.endsWith(' ') || nValue.endsWith('\n') || nValue === value) {
      return nValue;
    } else {
      let index = nValue.length - 1;
      while (nValue.charAt(index) !== ' ' && index > (limit - 10 < 0 ? 0 : limit - 10)) {
        index--;
      }

      return nValue.substr(0, index);
    }
  }

}
