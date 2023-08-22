import net  from "net"
import os from 'os'

class TcpServer {
    static _EventCallBack={};
    static socketClientMap={};
    set(url, callback) {
        TcpServer._EventCallBack[url]=callback;
    }
    constructor() {
        this.localAddress=this.getIpAddress();
    }
    getIpAddress(){
        /**os.networkInterfaces() 返回一个对象，该对象包含已分配了网络地址的网络接口 */
        var interfaces = os.networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (
                    alias.family === "IPv4" &&
                    alias.address !== "127.0.0.1" &&
                    !alias.internal
                ) {
                    return alias.address;
                }
            }
        }
    }


    listen(port){
        let that=this;
        this.localPort=port;
        this.socketServer = net.createServer(function (client) {
            let endPoint= client.remoteAddress+":"+client.remotePort;
            TcpServer.socketClientMap[endPoint]=client;
            let req={};
            req.remoteIp=client.remoteAddress;
            req.remotePort=client.remotePort;
            TcpServer._EventCallBack['connect']? TcpServer._EventCallBack['connect'](req,null): console.log(endPoint+"connected");

            // 接收客户端的数据
            client.on('data', function (data) {
                let req={};
                req.remoteIp=client.remoteAddress;
                req.remotePort=client.remotePort;
                req.params=data;
                let res={};
                res.send=function (v){
                    if(Array.isArray(v)){
                        v=new Buffer(v)
                    }
                    client.write(v)
                }
                TcpServer._EventCallBack['data'](req,res);
            });

            // 客户端连接关闭
            client.on('close', function (err) {
                delete TcpServer.socketClientMap[endPoint];
                TcpServer._EventCallBack["close"]?TcpServer._EventCallBack["close"](client):"";
            });
            // 客户端连接错误
            client.on('error', function (err) {
                delete TcpServer.socketClientMap[endPoint];
                TcpServer._EventCallBack["error"]?TcpServer._EventCallBack["error"](client):"";
            });
        });
        this.socketServer.listen(
            {
                port: port,
                host: '0.0.0.0',
            },
            function () {
                //console.log('Tcpserver listen listen on '+that.localPort);
            }
        );

        //设置监听时的回调函数
        this.socketServer.on('listening', function () {
            const { address, port } =  that.socketServer.address();
            console.log('Tcpserver listen on '+port);
        });

        //设置关闭时的回调函数
        this.socketServer.on('close', function () {
            console.log('sever closed');
            TcpServer.socketClientMap={};
        });

        //设置出错时的回调函数
        this.socketServer.on('error', function () {
            console.log('sever error');
            TcpServer.socketClientMap={};
        });
    }

    send(buffer){
        let clientEndPointList= Object.keys(TcpServer.socketClientMap);
        for (let i=0;i<clientEndPointList.length;i++){
            TcpServer.socketClientMap[clientEndPointList[i]].write(buffer)
        }

    }

}

export default TcpServer;