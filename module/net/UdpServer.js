const dgram = require('dgram');
class UdpServer {
    static _EventCallBack={};

    constructor() {
        this.server = dgram.createSocket('udp4');
        this.remotePort=0;
        this.remoteIp=0;
        this.port=0;
        this.install();
    }

    set(url, callback) {
        UdpServer._EventCallBack[url]=callback;
    }

    listen(port){
        this.port=port;
        this.server.bind(port);

    }
    send(v,remoteIp,remotePort) {
        if(remoteIp){
            this.remoteIp=remoteIp;
        }
        if(remotePort){
            this.remoteIp=remotePort;
        }
        if(Array.isArray(v)){
            v=new Buffer(v)
        }
        this.server.send(v,this.remotePort,this.remoteIp)
    }

    install(app,server){
        let that=this;
        this.server.on('close',()=>{
            UdpServer._EventCallBack['close']? UdpServer._EventCallBack['close']():console.log('udp close');
        });

        this.server.on('error',(err)=>{
            UdpServer._EventCallBack['error']? UdpServer._EventCallBack['error'](): console.log(err);
        });

        this.server.on('listening',()=>{
            UdpServer._EventCallBack['listening']? UdpServer._EventCallBack['listening']():  console.log('udp listen on '+that.port);;

        });
        this.server.on('message',(msg,rinfo)=>{
            that.remoteIp=rinfo.address;
            that.remotePort=rinfo.port;
            let req={}
            req.rinfo=rinfo;
            req.ip=rinfo.address;
            req.port=rinfo.port;
            req.params=msg;
            let res=that;
            UdpServer._EventCallBack['message'](req,res)
        });

    }
}

module.exports =  UdpServer;