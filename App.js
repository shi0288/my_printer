/**
 * Created by w44 on 15-1-7.
 */
var net = require('net');

var util = require('print_util');
var dataUtil = util.dataUtil;

var cons=require('print_constants');
var msgParam=cons.msgParam;

var HOST = '127.0.0.1';
var PORT = 6969;


net.createServer(function (sock) {

    //此socket唯一
    var remoteAddress = sock.remoteAddress;
    var remotePort = sock.remotePort;
    var dataBuf = new Buffer(50 * 1024);
    //数据包长度固定
    var packageBufLen = msgParam.packageBufLen;
    //当前包长
    var curBufLen = 0;
    //数据类长度
    var dataBufLen = 0;
    //接收客户端信息
    console.log('有客户端接入：' + remoteAddress + ' ' + remotePort);
    sock.on('data', function (data) {

        //聚合数据流
        data.copy(dataBuf, curBufLen, 0, data.length);
        //记录当前接收长度
        curBufLen += data.length;
        //第一步
        //判断是否可以获取包长
        if (curBufLen >= packageBufLen) {
            //读取数据长度
            dataBufLen = dataBuf.readInt32BE(0, packageBufLen);
        }else{
            return;
        }
        if(dataBufLen>0){

        }
        //第二步
        //判断整个包是否已经获取完全(当前长度>=数据长度+包长信息)
        if (curBufLen >= dataBufLen + packageBufLen) {
             var headNode=dataUtil.parse(dataBuf);
             console.log(JSON.stringify(headNode));

        }else{
            return;
        }
        // 回发该数据，客户端将收到来自服务端的数据

        sock.write('You said "' + data + '"');
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function (data) {
        console.log('CLOSED: ' +
              remoteAddress + ' ' + remotePort);
    });

    sock.on('error', function () {
        console.log('ERROE: ' +
              remoteAddress + ' ' + remotePort);
    })


}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);