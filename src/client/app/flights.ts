import {Component} from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import { SearchFormComponent } from './search/searchform.component';
import { SearchResultsComponent } from './search/searchresults.component';


@Component({
  moduleId: __moduleName,
  selector: 'flights-app',
  providers: [ROUTER_PROVIDERS],
  templateUrl: 'flights.html',
  styleUrls: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  { path: '/home', name: 'Home', component: SearchFormComponent, useAsDefault: true },
  { path: '/flights/:from/:to/:departDate/:adult/:children/:infants', name: 'Flights', component: SearchResultsComponent }
])
export class FlightsApp {
  defaultMeaning: number = 42;

  meaningOfLife(meaning?: number) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}



