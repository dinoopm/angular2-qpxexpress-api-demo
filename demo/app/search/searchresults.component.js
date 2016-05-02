System.register(['angular2/core', 'angular2/router', 'angular2/platform/browser', 'angular2/http', '../shared/rangeslider/rangeselector.component', './search.service', './searchform.component', '../pipes/dayofweek', '../pipes/extracttime', '../pipes/dayandmonth', '../pipes/daymonthyear'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, browser_1, http_1, rangeselector_component_1, search_service_1, searchform_component_1, dayofweek_1, extracttime_1, dayandmonth_1, daymonthyear_1;
    var SearchResultsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (rangeselector_component_1_1) {
                rangeselector_component_1 = rangeselector_component_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            },
            function (searchform_component_1_1) {
                searchform_component_1 = searchform_component_1_1;
            },
            function (dayofweek_1_1) {
                dayofweek_1 = dayofweek_1_1;
            },
            function (extracttime_1_1) {
                extracttime_1 = extracttime_1_1;
            },
            function (dayandmonth_1_1) {
                dayandmonth_1 = dayandmonth_1_1;
            },
            function (daymonthyear_1_1) {
                daymonthyear_1 = daymonthyear_1_1;
            }],
        execute: function() {
            SearchResultsComponent = (function () {
                function SearchResultsComponent(_searchService, _routeParams) {
                    this._searchService = _searchService;
                    this._routeParams = _routeParams;
                    this.filtered = [];
                    this.visible = true;
                    this.searchFormVisible = true;
                    this.searchFormData = {};
                    this.priceSortBySelValue = 0;
                    this.searchResultsVisible = false;
                    this.loadingMsg = false;
                    this.serverError = true;
                    this.dom = new browser_1.BrowserDomAdapter();
                }
                SearchResultsComponent.prototype.ngOnInit = function () {
                    this.searchFormData.from = this._routeParams.get('from');
                    this.searchFormData.to = this._routeParams.get('to');
                    this.searchFormData.departDate = this._routeParams.get('departDate');
                    this.searchFormData.maxPrice = this._routeParams.get('maxPrice');
                    this.searchFormData.adult = this._routeParams.get('adult');
                    this.searchFormData.children = this._routeParams.get('children');
                    this.searchFormData.infants = this._routeParams.get('infants');
                    this.searchResultsVisible = true;
                    this.getFlights(this.searchFormData.from, this.searchFormData.to, this.searchFormData.departDate, this.searchFormData.maxPrice, this.searchFormData.adult, this.searchFormData.children, this.searchFormData.infants);
                };
                SearchResultsComponent.prototype.getFlights = function (from, to, departDate, maxPrice, adult, children, infants) {
                    var _this = this;
                    this._searchService.getFlightSearchResults(from, to, departDate, maxPrice, adult, children, infants)
                        .subscribe(function (searchResults) {
                        _this.tripData = searchResults.trips.data;
                        _this.carrier = searchResults.trips.data.carrier;
                        _this.aircraft = searchResults.trips.data.aircraft;
                        //console.log(searchResults.trips);
                        _this.filterTripsFields(searchResults.trips.tripOption);
                        //console.log(this.filtered);
                        _this.searchResultsVisible = false;
                        _this.loadingMsg = true;
                    }, function (error) {
                        _this.errorMessage = error;
                        console.log(error.message);
                        if (error.message) {
                            _this.serverError = false;
                            _this.serverErrorMsg = error.message;
                            _this.searchForm.setSearchModel(_this.searchFormData.from, _this.searchFormData.to, _this.searchFormData.departDate, _this.searchFormData.maxPrice, _this.searchFormData.adult, _this.searchFormData.children, _this.searchFormData.infants);
                        }
                    });
                };
                SearchResultsComponent.prototype.filterTripsFields = function (options) {
                    var _this = this;
                    options.forEach(function (tripOption, index) {
                        var trip = {};
                        var legs = [];
                        var carrierCode = {};
                        var stops = [];
                        trip.saleTotal = tripOption['saleTotal'];
                        trip.duration = tripOption['slice'][0]['duration'];
                        trip.durationDisplay = _this.minutesToHours(tripOption['slice'][0]['duration']);
                        tripOption.slice[0].segment.forEach(function (seg, segindex, array) {
                            carrierCode[seg.flight.carrier] = "";
                            var totalDuration = 0;
                            seg.leg.forEach(function (l, legindex, legarray) {
                                var leg = {};
                                leg.airCraft = _this.getAircraftName(l.aircraft)[0]['name'];
                                leg.carrierName = _this.getCarrierName(seg.flight.carrier)[0]['name'];
                                leg.arrivalTime = l.arrivalTime;
                                leg.departureTime = l.departureTime;
                                leg.origin = l.origin;
                                leg.destination = l.destination;
                                leg.duration = l.duration;
                                leg.durationDisplay = _this.minutesToHours(l.duration);
                                stops.push(l.destination);
                                legs.push(leg);
                            });
                        });
                        trip.carrierCode = carrierCode;
                        trip.legs = legs;
                        switch (Object.keys(trip.carrierCode).length) {
                            case 1:
                                trip.carrierName = _this.getCarrierName(Object.keys(trip.carrierCode)[0])[0].name;
                                break;
                            default:
                                trip.carrierName = "Multiple Airlines";
                                break;
                        }
                        stops.pop(); // removed the last final destination
                        trip.stopsCount = stops.length;
                        trip.stops = stops.join(',');
                        trip.origin = _this.getOrgin(options[0]['slice'][0]['segment']);
                        trip.destination = _this.getDestination(options[0]['slice'][0]['segment']);
                        _this.filtered.push(trip);
                    });
                    this.priceSortBy('');
                    this.orginalResult = this.filtered.slice(0);
                    this.currency = this.filtered[0].saleTotal.match(/[^0-9\.]+/g);
                    this.minPrice = parseInt(this.filtered[0].saleTotal.match(/\d+/g));
                    this.maxPrice = parseInt(this.filtered[this.filtered.length - 1].saleTotal.match(/\d+/g));
                    this.count = this.filtered.length;
                    this.filterCount = this.filtered.length;
                    this.searchForm.setSearchModel(this.searchFormData.from, this.searchFormData.to, this.searchFormData.departDate, this.searchFormData.maxPrice, this.searchFormData.adult, this.searchFormData.children, this.searchFormData.infants);
                };
                SearchResultsComponent.prototype.getCarrierName = function (code) {
                    return this.carrier.filter(function (obj) {
                        return obj.code == code;
                    });
                };
                SearchResultsComponent.prototype.getAircraftName = function (code) {
                    return this.aircraft.filter(function (obj) {
                        return obj.code == code;
                    });
                };
                SearchResultsComponent.prototype.minutesToHours = function (minutes) {
                    var sign = '';
                    if (minutes < 0) {
                        sign = '-';
                    }
                    var leftPad = function (number) {
                        return ((number < 10 && number >= 0) ? '' : '') + number;
                    };
                    var hours = Math.floor(Math.abs(minutes) / 60);
                    var mins = leftPad(Math.abs(minutes) % 60);
                    return sign + hours + 'h ' + mins + 'm';
                };
                SearchResultsComponent.prototype.getOrgin = function (seg) {
                    return { "airport": seg[0]['leg'][0]['origin'], "date": seg[0]['leg'][0]['departureTime'] };
                };
                SearchResultsComponent.prototype.getDestination = function (seg) {
                    var lastSeg = seg.length - 1;
                    var lastLegInLastSeg = seg[lastSeg]['leg'].length - 1;
                    return {
                        "airport": seg[lastSeg]['leg'][lastLegInLastSeg]['destination'], "date": seg[lastSeg]['leg'][lastLegInLastSeg]['arrivalTime'] };
                };
                SearchResultsComponent.prototype.toggle = function (e) {
                    e.preventDefault();
                    var fightdetails = this.dom.querySelector(e.target.parentNode.parentNode.parentNode, ".flight-details");
                    if (fightdetails.style.display == 'none' || fightdetails.style.display == '') {
                        fightdetails.style.display = "block";
                    }
                    else {
                        fightdetails.style.display = "none";
                    }
                };
                SearchResultsComponent.prototype.changed = function (rangeValue) {
                    if (rangeValue) {
                        //console.log(rangeValue.srcElement.value);
                        var copyArray = this.orginalResult.slice(0);
                        var rangeFiltered = copyArray.filter(function (price) {
                            var saleTotal = price.saleTotal;
                            return parseInt(saleTotal.match(/\d+/g)) <= parseInt(rangeValue.srcElement.value);
                        });
                        this.filtered = rangeFiltered.slice(0);
                        this.filterCount = this.filtered.length;
                        this.priceSortBy('');
                    }
                };
                SearchResultsComponent.prototype.priceSortBy = function (flag) {
                    if (flag == true) {
                        this.priceSortBySelValue = (this.priceSortBySelValue == 0) ? 1 : 0;
                    }
                    if (this.priceSortBySelValue == 0 || flag == 'asc') {
                        this.filtered = this.filtered.sort(function (a, b) {
                            var comp1 = a.saleTotal;
                            var comp2 = b.saleTotal;
                            return parseInt(comp1.match(/\d+/g)) - parseInt(comp2.match(/\d+/g));
                        });
                        this.priceSortByDisplay = "Low to High";
                    }
                    else if (this.priceSortBySelValue == 1 || flag == 'dec') {
                        this.filtered = this.filtered.sort(function (a, b) {
                            var comp1 = a.saleTotal;
                            var comp2 = b.saleTotal;
                            return parseInt(comp2.match(/\d+/g)) - parseInt(comp1.match(/\d+/g));
                        });
                        this.priceSortByDisplay = "High to Low";
                    }
                };
                SearchResultsComponent.prototype.filterByAirline = function (carrier) {
                    //console.log(carrier);
                    var selected = carrier.filter(function (item) {
                        return item.selected;
                    }).map(function (item) {
                        return item.code;
                    });
                    //console.log(selected);
                };
                SearchResultsComponent.prototype.toggleSearchform = function () {
                    this.searchFormVisible = !this.searchFormVisible;
                };
                __decorate([
                    core_1.ViewChild(searchform_component_1.SearchFormComponent), 
                    __metadata('design:type', searchform_component_1.SearchFormComponent)
                ], SearchResultsComponent.prototype, "searchForm", void 0);
                SearchResultsComponent = __decorate([
                    core_1.Component({
                        selector: 'search-reults-page',
                        templateUrl: './app/search/searchresults.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, rangeselector_component_1.RangeSelectorComponent, searchform_component_1.SearchFormComponent],
                        pipes: [extracttime_1.ExtractTime, dayofweek_1.DayofWeek, dayandmonth_1.DayAndMonth, daymonthyear_1.DayMonthYear],
                        providers: [
                            search_service_1.SearchService,
                            http_1.HTTP_PROVIDERS
                        ]
                    }), 
                    __metadata('design:paramtypes', [search_service_1.SearchService, router_1.RouteParams])
                ], SearchResultsComponent);
                return SearchResultsComponent;
            }());
            exports_1("SearchResultsComponent", SearchResultsComponent);
        }
    }
});
//# sourceMappingURL=searchresults.component.js.map