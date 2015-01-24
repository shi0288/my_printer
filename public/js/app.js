'use strict';

/* App Module */

var printerApp = angular.module('printerApp', [
  'ngRoute',
  'printerControllers',
  'printerFilters',
  'printerServices'
]);


printerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/system', {
        templateUrl: '../partials/system-list.html',
        controller: 'systemListCtrl'
      }).
      when('/config', {
        templateUrl: '../partials/config-list.html',
        controller: 'configListCtrl'
      }).
      otherwise({
        redirectTo: '/system'
      });
  }]);
