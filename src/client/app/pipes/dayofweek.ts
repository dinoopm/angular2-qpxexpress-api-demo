import { Pipe,PipeTransform } from 'angular2/core';
declare var moment: any;
@Pipe({
  name: 'dayofweek',
})


export class DayofWeek implements PipeTransform {
  transform(value: number, args: any[]) {
     return moment(value).format("dddd");
  }
}
