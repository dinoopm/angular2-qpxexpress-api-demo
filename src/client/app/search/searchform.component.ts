import { Component,Input,Output } from 'angular2/core';
import { ROUTER_DIRECTIVES,Router, RouteParams } from 'angular2/router';
import { Search } from './model/search';

@Component({
  selector: 'search-form',
  templateUrl: './app/search/searchform.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class SearchFormComponent  {
  
  @Input() modifySearchForm: Boolean = false; 

  modifySearchForm1 : Boolean = true;
  submitted = false;

  constructor(
		private _router: Router
  ) {}


  searchModel = new Search("", "", "","", 1,0,0);
  
 
  setSearchModel(from,to,departDate,maxPrice,adult,children,infants){
    this.searchModel = new Search(from,to,departDate,maxPrice,adult,children,infants);
  }

  onSubmit() {

     this.submitted = true;  
		 this._router.navigate(['Flights',this.searchModel]);	
     
  }

  //get diagnostic() { return JSON.stringify(this.searchModel); }
}