import { Component, OnInit,EventEmitter, Input, Output } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';



@Component({
  selector: 'range-selector',
  templateUrl: './app/shared/rangeslider/rangeselector.component.html',
  directives: [ROUTER_DIRECTIVES]
})


export class RangeSelectorComponent {

	 @Output() changed = new EventEmitter();

	 @Input()  maxPrice: number;
	 @Input()  minPrice: number;
	 
	selectedRangevalue: number;
	 
	select(selectedRangevalue: number) {
	    this.selectedRangevalue = selectedRangevalue;
	    this.changed.emit(selectedRangevalue);
	}

}