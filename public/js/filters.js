'use strict';

/* Filters */

var printerFilters = angular.module('printerFilters', []);

printerFilters.filter('checkmark', ['$scope', 'Phone',
  function() {
     return function(input) {
        return input ? '\u2713' : '\u2718';
     };
}]);

