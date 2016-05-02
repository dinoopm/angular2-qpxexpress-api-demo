import { Pipe,PipeTransform } from 'angular2/core';
declare var moment: any;
@Pipe({
  name: 'daymonthyear',
})


export class DayMonthYear implements PipeTransform {
  transform(value: number, args: any[]) {
     return moment(value).format("D,MMMM,YYYY");
  }
}
