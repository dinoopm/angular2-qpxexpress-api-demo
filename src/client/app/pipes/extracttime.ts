import { Pipe,PipeTransform } from 'angular2/core';
declare var moment: any;
@Pipe({
  name: 'extracttime',
})


export class ExtractTime implements PipeTransform {
  transform(value: number, args: any[]) {
     return moment(value).format("hh:mm A");
  }
}
