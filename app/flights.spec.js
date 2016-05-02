System.register(['angular2/testing', '../app/flights'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, flights_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (flights_1_1) {
                flights_1 = flights_1_1;
            }],
        execute: function() {
            testing_1.beforeEachProviders(function () { return [flights_1.FlightsApp]; });
            testing_1.describe('App: Flights', function () {
                testing_1.it('should have the `defaultMeaning` as 42', testing_1.inject([flights_1.FlightsApp], function (app) {
                    testing_1.expect(app.defaultMeaning).toBe(42);
                }));
                testing_1.describe('#meaningOfLife', function () {
                    testing_1.it('should get the meaning of life', testing_1.inject([flights_1.FlightsApp], function (app) {
                        testing_1.expect(app.meaningOfLife()).toBe('The meaning of life is 42');
                        testing_1.expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
                    }));
                });
            });
        }
    }
});
//# sourceMappingURL=flights.spec.js.map