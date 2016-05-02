import { Component, OnInit,ViewChild} from 'angular2/core';
import { ROUTER_DIRECTIVES,Router, RouteParams } from 'angular2/router';
import {BrowserDomAdapter} from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';

import { RangeSelectorComponent } from '../shared/rangeslider/rangeselector.component';
import { SearchService } from './search.service';
import { SearchFormComponent } from './searchform.component';

import { Search } from './model/search';

import { DayofWeek } from '../pipes/dayofweek';
import { ExtractTime } from '../pipes/extracttime';
import { DayAndMonth } from '../pipes/dayandmonth';
import { DayMonthYear } from '../pipes/daymonthyear';

@Component({
  selector: 'search-reults-page',
  templateUrl: './app/search/searchresults.component.html',
  directives: [ROUTER_DIRECTIVES,RangeSelectorComponent,SearchFormComponent],
  pipes:[ExtractTime,DayofWeek,DayAndMonth,DayMonthYear],
  providers: [
    SearchService,
    HTTP_PROVIDERS
  ]
})

export class SearchResultsComponent {

  errorMessage: string;
  tripData: any;
  carrier: any[];
  aircraft: any[];
  count: number; 
  filterCount : number;
  filtered : any = [];
  visible: boolean = true;
  dom:BrowserDomAdapter;
  
  minPrice: number;
  maxPrice: number;
  
  searchFormVisible: boolean = true;
  
  searchFormData: any = {};
  
  @ViewChild(SearchFormComponent) searchForm:SearchFormComponent;
  
  priceSortByDisplay : string;
  priceSortBySelValue : number = 0;

  searchResultsVisible : boolean = false;
  loadingMsg : boolean = false;
  serverError : boolean = true;
  serverErrorMsg : string; 
  
  orginalResult: any;
  currency: string;

  constructor(
		private _searchService: SearchService,
		private _routeParams: RouteParams
  ) {
      this.dom = new BrowserDomAdapter();
  }

  ngOnInit() { 
  
    this.searchFormData.from = this._routeParams.get('from');
	this.searchFormData.to = this._routeParams.get('to');
	this.searchFormData.departDate = this._routeParams.get('departDate');
	this.searchFormData.maxPrice = this._routeParams.get('maxPrice');
	this.searchFormData.adult = this._routeParams.get('adult');
	this.searchFormData.children = this._routeParams.get('children');
	this.searchFormData.infants = this._routeParams.get('infants');
	
	this.searchResultsVisible = true; 

    this.getFlights(this.searchFormData.from,this.searchFormData.to,this.searchFormData.departDate,this.searchFormData.maxPrice,this.searchFormData.adult,this.searchFormData.children,this.searchFormData.infants); 

  }

  getFlights(from,to,departDate,maxPrice,adult,children,infants) {
    this._searchService.getFlightSearchResults(from,to,departDate,maxPrice,adult,children,infants)
      .subscribe(
        searchResults=> {
		
            this.tripData	= searchResults.trips.data;		
			this.carrier  = searchResults.trips.data.carrier; 
			this.aircraft = searchResults.trips.data.aircraft;
		    //console.log(searchResults.trips);
			this.filterTripsFields(searchResults.trips.tripOption);
           
            //console.log(this.filtered);
                 
			this.searchResultsVisible = false;  
			this.loadingMsg = true;
			
			},
        error => {
           this.errorMessage = <any>error
            console.log(error.message); 
            if(error.message){
                 this.serverError = false; 
                 this.serverErrorMsg  = error.message;
                 	this.searchForm.setSearchModel(this.searchFormData.from,this.searchFormData.to,this.searchFormData.departDate,this.searchFormData.maxPrice,this.searchFormData.adult,this.searchFormData.children,this.searchFormData.infants);  


            }

        } 
    );
  }
  filterTripsFields(options){
    
    options.forEach((tripOption,index )=>{
		


		var trip: any = {};

		var legs : any[] = [];
		var carrierCode: any ={};
		var stops : any[] = [];
		
		trip.saleTotal = tripOption['saleTotal'];

		trip.duration = tripOption['slice'][0]['duration'];
		trip.durationDisplay = this.minutesToHours(tripOption['slice'][0]['duration']);
		
		tripOption.slice[0].segment.forEach((seg,segindex,array) =>{
		   
			carrierCode[seg.flight.carrier]=""; 
			
			 let totalDuration = 0; 

			 seg.leg.forEach((l,legindex,legarray) =>{

			    
			     var leg: any ={};		

				 leg.airCraft =   this.getAircraftName(l.aircraft)[0]['name'];
				 leg.carrierName =   this.getCarrierName(seg.flight.carrier)[0]['name'];
				 leg.arrivalTime =   l.arrivalTime;
				 leg.departureTime =   l.departureTime;
				 leg.origin =   l.origin;
				 leg.destination =   l.destination;
				 leg.duration =   l.duration;
				 leg.durationDisplay  =  this.minutesToHours(l.duration);
			

			     stops.push(l.destination);
                   

				 legs.push(leg);

				  
			 });
			 
		})
		trip.carrierCode = carrierCode;
		trip.legs = legs;
       
	    switch(Object.keys(trip.carrierCode).length){	
		  case 1:
		     trip.carrierName = this.getCarrierName(Object.keys(trip.carrierCode)[0])[0].name;
		     break;
		  default:
		    trip.carrierName = "Multiple Airlines";
		   break;
		}
		 stops.pop(); // removed the last final destination
		 trip.stopsCount = stops.length;
         trip.stops = stops.join(','); 	
         trip.origin = this.getOrgin(options[0]['slice'][0]['segment']);
         trip.destination = this.getDestination(options[0]['slice'][0]['segment']);	 

		 this.filtered.push(trip);
		
	});
	
	this.priceSortBy('');
	
	this.orginalResult = this.filtered.slice(0);
	
	this.currency = this.filtered[0].saleTotal.match(/[^0-9\.]+/g);
	this.minPrice = parseInt(this.filtered[0].saleTotal.match(/\d+/g));
	this.maxPrice = parseInt(this.filtered[this.filtered.length-1].saleTotal.match(/\d+/g));

	this.count = this.filtered.length;  
	this.filterCount = this.filtered.length;
	this.searchForm.setSearchModel(this.searchFormData.from,this.searchFormData.to,this.searchFormData.departDate,this.searchFormData.maxPrice,this.searchFormData.adult,this.searchFormData.children,this.searchFormData.infants);
	
	
	
  }
  getCarrierName(code){
    return this.carrier.filter(obj =>{
		return obj.code == code;
	});

  }
  getAircraftName(code){
	return this.aircraft.filter(obj =>{
		return obj.code == code;
	});
  }
  minutesToHours(minutes: number){
	 let sign ='';  
	 if(minutes < 0){  
	  sign = '-';  
	 }  
	 
	let leftPad = function(number) {    
			return ((number < 10 && number >= 0) ? '' : '') + number;  
	} 
  
	 let hours   = Math.floor(Math.abs(minutes) / 60);  
	 let mins = leftPad(Math.abs(minutes) % 60);  
	  
	 return sign + hours +'h '+mins + 'm';  
    
   }
   getOrgin(seg){
		return {"airport":seg[0]['leg'][0]['origin'],"date":seg[0]['leg'][0]['departureTime']}
   }
   getDestination(seg){
     let lastSeg = seg.length -1;
	 let lastLegInLastSeg = seg[lastSeg]['leg'].length -1;

	 return {
	"airport":seg[lastSeg]['leg'][lastLegInLastSeg]['destination'],"date":seg[lastSeg]['leg'][lastLegInLastSeg]['arrivalTime']}
   }
   toggle(e){
   
      e.preventDefault();
	  	  
	  var fightdetails = this.dom.querySelector(e.target.parentNode.parentNode.parentNode,".flight-details");
	  	  
	  if(fightdetails.style.display == 'none' || fightdetails.style.display==''){
	    fightdetails.style.display="block";
	  }
	  else{
	    fightdetails.style.display="none"
	  }
   }
   changed(rangeValue: any) {
    if (rangeValue) {
      //console.log(rangeValue.srcElement.value);
	  
	   let copyArray = this.orginalResult.slice(0);
 
	   let rangeFiltered = copyArray.filter(function(price){
	      let saleTotal = price.saleTotal;
	      return parseInt(saleTotal.match(/\d+/g)) <=  parseInt(rangeValue.srcElement.value);
	   });
	   
	   this.filtered = rangeFiltered.slice(0);
	   this.filterCount = this.filtered.length;
	   
	   this.priceSortBy(''); 

	  
    }
  }
  priceSortBy(flag){
    
	if(flag==true){
	   this.priceSortBySelValue = (this.priceSortBySelValue==0) ? 1 : 0; 
    }
	
    if(this.priceSortBySelValue==0 || flag=='asc'){
	
	    this.filtered = this.filtered.sort(function(a, b){
		   let comp1 =  a.saleTotal; 
		   let comp2 =  b.saleTotal; 
          
		   return parseInt(comp1.match(/\d+/g))-parseInt(comp2.match(/\d+/g));
		}); 
		
		this.priceSortByDisplay = "Low to High";
	}
	else if(this.priceSortBySelValue==1 ||flag=='dec'){
	    
       
	     this.filtered = this.filtered.sort(function(a, b){
		   let comp1 =  a.saleTotal; 
		   let comp2 =  b.saleTotal; 
		  
		   return parseInt(comp2.match(/\d+/g))-parseInt(comp1.match(/\d+/g));
		}); 
		
		this.priceSortByDisplay = "High to Low";

	}
  }
  
  filterByAirline(carrier){
  
    //console.log(carrier);

    let selected =  carrier.filter((item)=>{
		return item.selected; 
	}).map(item =>{
		return item.code;
	});
	
	//console.log(selected);
  }
  toggleSearchform(){
	 this.searchFormVisible = !this.searchFormVisible;
  }

}