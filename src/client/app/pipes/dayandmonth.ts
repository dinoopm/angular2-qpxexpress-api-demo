import { Pipe,PipeTransform } from 'angular2/core';
declare var moment: any;
@Pipe({
  name: 'dayandmonth',
})


export class DayAndMonth implements PipeTransform {
  transform(value: number, args: any[]) {
     return moment(value).format("D-MMMM");
  }
}
