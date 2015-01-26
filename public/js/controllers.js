'use strict';

/* Controllers */

var printerControllers = angular.module('printerControllers', []);


/*
 *  系统监控
 **/
printerControllers.controller('systemListCtrl', ['$scope', 'socket',
    function ($scope, socket) {
        //发送获取待出票命令


    }]);

/*
 *  配置管理
 **/
printerControllers.controller('configListCtrl', ['$scope', 'socket',
    function ($scope, socket) {
        /*初始化命令**/
        var data = {};
        var bodyNode = {};
        data.bodyNode = bodyNode;
        //初始化终端机列表状态
        data.cmd = 'terminalList';
        socket.emit('data', data);

        /*其它命令**/
        //接收终端机列表
        socket.on('terminalList', function (terminals) {
            $scope.terminals = terminals;
        });

    }]);

/*
 *  用户管理
 **/
printerControllers.controller('userListCtrl', ['$scope', 'socket',
    function ($scope, socket) {
        /*初始化命令**/
        var data = {};
        var bodyNode = {};
        data.bodyNode = bodyNode;
        //初始化客户列表
        data.cmd = 'userList';
        socket.emit('data', data);

        /*其它命令**/
        //接收用户列表
        socket.on('userList', function (users) {
            $scope.users = users;
        });
        $scope.addUser = function () {
            $scope.user = {};
        };
        $scope.editUser = function (user) {
            $scope.user= angular.copy(user);
        };
    }]);

/*
 *  Main页控制
 **/
printerControllers.controller('mainCtrl', ['$scope', 'socket',
    function ($scope, socket) {
        /*初始化命令**/
        var data = {};
        var bodyNode = {};
        data.bodyNode = bodyNode;
        //初始化取票状态
        data.cmd = 'queryCatchTicketsStatus';
        socket.emit('data', data);

        /*其它命令**/
        $scope.catchTicketsStatus = function () {
            data.cmd = 'catchTicketsStatus';
            socket.emit('data', data);
        };
        //接收公共取票状态
        socket.on('catchTicketsStatus', function (data) {
            if (data) {
                $scope.status = '停止取票';
                $scope.style = 'btn-danger';
            } else {
                $scope.status = '开启取票';
                $scope.style = 'btn-primary';
            }
        });
        //接收自查询取票状态
        socket.on('queryCatchTicketsStatus', function (data) {
            if (data) {
                $scope.status = '停止取票';
                $scope.style = 'btn-danger';
            } else {
                $scope.status = '开启取票';
                $scope.style = 'btn-primary';
            }
        });


    }]);
