'use strict';

/* Controllers */

var printerControllers = angular.module('printerControllers', []);

printerControllers.controller('systemListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

printerControllers.controller('configListCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {

  }]);

 printerControllers.controller('mainCtrl', ['$scope','socket',
  function($scope,socket) {
      var is = true;
      socket.on('this',function(data){
          console.log(data);
          $scope.status = data;
      });
      $scope.send = function(){
          if(is){
              socket.emit('hellow','nosql');
              is=!is;
          }else{
              socket.emit('hellow','active');
              is=!is;
          }

      };
  }]);
