System.register(['angular2/core', 'angular2/router', './model/search'], function(exports_1, context_1) {
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
    var core_1, router_1, search_1;
    var SearchFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (search_1_1) {
                search_1 = search_1_1;
            }],
        execute: function() {
            SearchFormComponent = (function () {
                function SearchFormComponent(_router) {
                    this._router = _router;
                    this.modifySearchForm = false;
                    this.modifySearchForm1 = true;
                    this.submitted = false;
                    this.searchModel = new search_1.Search("", "", "", "", 1, 0, 0);
                }
                SearchFormComponent.prototype.setSearchModel = function (from, to, departDate, maxPrice, adult, children, infants) {
                    this.searchModel = new search_1.Search(from, to, departDate, maxPrice, adult, children, infants);
                };
                SearchFormComponent.prototype.onSubmit = function () {
                    this.submitted = true;
                    this._router.navigate(['Flights', this.searchModel]);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], SearchFormComponent.prototype, "modifySearchForm", void 0);
                SearchFormComponent = __decorate([
                    core_1.Component({
                        selector: 'search-form',
                        templateUrl: './app/search/searchform.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], SearchFormComponent);
                return SearchFormComponent;
            }());
            exports_1("SearchFormComponent", SearchFormComponent);
        }
    }
});
//# sourceMappingURL=searchform.component.js.map