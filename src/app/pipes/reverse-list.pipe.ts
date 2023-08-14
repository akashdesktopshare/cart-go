import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseList'
})
export class ReverseListPipe implements PipeTransform {

  transform(value?: any, ...args: any[]) {


    return value.reverse();
   
  }

}
