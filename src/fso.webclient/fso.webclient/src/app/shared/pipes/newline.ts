import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'newline',pure:true })
export class NewlinePipe implements PipeTransform {
  transform(str: string) {
    if(str == null) return str;
    const res = str.replace(new RegExp('\n', 'g'), "<br />");
    return res;
  }
}