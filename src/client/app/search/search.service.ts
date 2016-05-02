import { Injectable } from 'angular2/core';
import { HTTP_PROVIDERS, Http, Response,Headers } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import { CONFIG } from '../config';

@Injectable()
export class SearchService {
  constructor(private _http: Http) { }

  getFlightSearchResults(from,to,departDate,maxPrice,adult,children,infants) {
   
    	let flightRequest = {
		  "request": {
			"slice": [
			  {
				"origin": from,
				"destination": to,
				"date": departDate
			  }
			],
			"passengers": {
			  "adultCount": adult,
			  "infantInLapCount": 0,
			  "infantInSeatCount": infants,
			  "childCount": children,
			  "seniorCount": 0
			},
			"solutions": 20,
			 "maxPrice": maxPrice,
			"refundable": false
		  }
	};
	
	

	let headers = new Headers();
	headers.append('content-type', 'application/json');
    console.log(flightRequest);

    return this._http.get('api/data.json',{headers: headers})
    //return this._http.post(CONFIG.qpxSearchURL+CONFIG.qpxapikey,JSON.stringify(flightRequest),{headers: headers})
	  .map((response: Response) => response.json())
      .do(data => {/* console.log(data)*/})
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
