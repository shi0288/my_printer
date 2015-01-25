'use strict';

/* Services */

var printerServices = angular.module('printerServices', ['ngResource']);

printerServices.factory('Phone', ['$resource',
    function ($resource) {
        return $resource('phones/:phoneId.json', {}, {
            query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
        });
    }]);
var socket;
printerServices.factory('socket', ['$rootScope',
    function ($rootScope) {
        socket = io.connect('127.0.0.1:3000');
        //连接Socket,注册身份
        var data = {};
        var cmd = 'login';
        var bodyNode = {};
        data.cmd = cmd;
        data.bodyNode = bodyNode;
        var userName = $rootScope.userName;
        bodyNode.userName = userName;
        socket.emit('data', data);
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        };
                    });
                })
            }
        };
    }]);
  
 
