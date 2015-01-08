/**
 * Created by w44 on 15-1-7.
 */
var net = require('net');

var util = require('print_util');
var dataUtil = util.dataUtil;

var cons = require('print_constants');
var msgParam = cons.msgParam;

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
        console.log('######################################');
        data.copy(dataBuf, curBufLen, 0, data.length);
        //记录当前接收长度
        curBufLen += data.length;

        //第一步
        //判断是否可以获取包长
        if (curBufLen >= packageBufLen) {
            //读取数据长度
            dataBufLen = dataBuf.readInt32BE(0, packageBufLen);
            console.log('数据包长度：' + dataBufLen);
        } else {
            return;
        }
        //第二步
        //判断整个包是否已经获取完全(当前长度>=数据长度+包长信息)
        while (curBufLen >= dataBufLen + packageBufLen) {
            var headNode = dataUtil.parse(dataBuf);
            //如果头报文解析出错，重新试着接包
            if (headNode == null) {
                curBufLen = 0;
            } else {
                var bodyNodeBuf = new Buffer(curBufLen - msgParam.headBufLen);
                dataBuf.copy(bodyNodeBuf, 0, msgParam.headBufLen, dataBufLen);
                //可以分流处理不同接口了
                console.log(JSON.stringify(headNode));
                //处理完成后，如果对方一次性将多个命令报文一起发过来的处理
                if (curBufLen > dataBufLen + packageBufLen) {
                    console.log('本次有多余的字节需要处理');
                    var othersBufLen = curBufLen - dataBufLen - packageBufLen;
                    var othersBuf = new Buffer(othersBufLen);
                    //将收到的命令多余字节暂存起来,并清空数据流
                    dataBuf.copy(othersBuf, 0, dataBufLen + packageBufLen, curBufLen);
                    dataBuf.fill();
                    //将暂存的字符移动到数据流
                    othersBuf.copy(dataBuf, 0, 0, othersBufLen);
                    console.log('内容：' + dataBuf.readInt32BE(0, 4));
                    curBufLen = othersBufLen;
                    dataBufLen = 0;
                    if (curBufLen >= packageBufLen) {
                        //读取数据长度
                        dataBufLen = dataBuf.readInt32BE(0, packageBufLen);
                        console.log('数据包长度：' + dataBufLen);
                    }
                } else {
                    curBufLen = 0;
                }
            }
        };
        console.log("结束");
        // 回发该数据，客户端将收到来自服务端的数据
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