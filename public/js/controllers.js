'use strict';

/* Controllers */

var printerControllers = angular.module('printerControllers', []);

var data = {};
var bodyNode = {};
data.bodyNode = bodyNode;
printerControllers.controller('systemListCtrl', ['$scope', 'socket',
    function ($scope, socket) {
        //发送获取待出票命令


    }]);

printerControllers.controller('configListCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {

    }]);

printerControllers.controller('mainCtrl', ['$scope', 'socket',
    function ($scope, socket) {
        /*初始化命令**/

        //初始化取票状态
        data.cmd='queryCatchTicketsStatus';
        socket.emit('data',data);

        /*其它命令**/
        $scope.catchTicketsStatus=function(){
            data.cmd='catchTicketsStatus';
            socket.emit('data',data);
        };
        //接收公共取票状态
        socket.on('catchTicketsStatus',function(data){
            if(data){
                $scope.status='停止取票';
            }else{
                $scope.status='开启取票';
            }
        });
        //接收自查询取票状态
        socket.on('queryCatchTicketsStatus',function(data){
            if(data){
                $scope.status='停止取票';
            }else{
                $scope.status='开启取票';
            }
        });


    }]);
