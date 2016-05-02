System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var RangeSelectorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            RangeSelectorComponent = (function () {
                function RangeSelectorComponent() {
                    this.changed = new core_1.EventEmitter();
                }
                RangeSelectorComponent.prototype.select = function (selectedRangevalue) {
                    this.selectedRangevalue = selectedRangevalue;
                    this.changed.emit(selectedRangevalue);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], RangeSelectorComponent.prototype, "changed", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], RangeSelectorComponent.prototype, "maxPrice", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], RangeSelectorComponent.prototype, "minPrice", void 0);
                RangeSelectorComponent = __decorate([
                    core_1.Component({
                        selector: 'range-selector',
                        templateUrl: './app/shared/rangeslider/rangeselector.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], RangeSelectorComponent);
                return RangeSelectorComponent;
            }());
            exports_1("RangeSelectorComponent", RangeSelectorComponent);
        }
    }
});
//# sourceMappingURL=rangeselector.component.js.map