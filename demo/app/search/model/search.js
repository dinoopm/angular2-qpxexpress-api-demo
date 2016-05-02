System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Search;
    return {
        setters:[],
        execute: function() {
            Search = (function () {
                function Search(from, to, departDate, maxPrice, adult, children, infants) {
                    this.from = from;
                    this.to = to;
                    this.departDate = departDate;
                    this.maxPrice = maxPrice;
                    this.adult = adult;
                    this.children = children;
                    this.infants = infants;
                }
                return Search;
            }());
            exports_1("Search", Search);
        }
    }
});
//# sourceMappingURL=search.js.map