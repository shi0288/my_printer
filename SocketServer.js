/**
 * Created by Administrator on 2015/1/23.
 */

var io = require('socket.io')();
var control = require('print_control');
var SocketControl =control.socketControl;
var SocketServer = function(){
};


io.on('connection', function (socket) {
    console.log(socket.id+'进入');
    socket.emit('this','active');
    var socketControl = new SocketControl(io,socket);
    socketControl.init();
    socket.on('disconnect',function(){
        console.log('this',this.id+'走了');
        socket.broadcast.emit('this',this.id+'走了');
    });



})

SocketServer.prototype.run=function(server){
    io.listen(server);
}

module.exports = new SocketServer();