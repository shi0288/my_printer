/**
 * Created by Administrator on 2015/1/22.
 */
var express = require('express');
var app = express();
var socketServer = require('./SocketServer.js');



var WebServer = function(){
};


WebServer.prototype.start=function(){

//设置视图
    app.set('views', __dirname + '/views');

//设置视图解析
    app.set('view engine', 'jade')

//public文件夹下面的文件，都暴露出来，客户端访问的时候，不需要使用public路径
    app.use(express.static(__dirname + '/public'));


//每次都运行的，且必须有next才会向下执行
//    app.use(function (req, res, next) {
//        console.log('Time: %d', Date.now());
//        next();
//    });

    app.get('/', function (req, res) {
        res.render('index', { title: 'Hey', message: 'Hello there!'});
    });

    var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
        socketServer.run(server);
        console.log('SocketServer  Run');
    });
};


var webServer = new WebServer();
webServer.start();


