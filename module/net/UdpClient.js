const dgram = require('dgram');
class UdpClient {
    static _EventCallBack={};

    constructor(remoteIp,remotePort) {
        this.server = dgram.createSocket('udp4');
        this.remotePort=remotePort ;
        this.remoteIp=remoteIp;
        this.port=0;
        this.install();
    }

    set(url, callback) {
        UdpClient._EventCallBack[url]=callback;
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
            UdpClient._EventCallBack['close']? UdpClient._EventCallBack['close']():console.log('udp close');
        });

        this.server.on('error',(err)=>{
            UdpClient._EventCallBack['error']? UdpClient._EventCallBack['error'](): console.log(err);
        });

        this.server.on('listening',()=>{
            UdpClient._EventCallBack['listening']? UdpClient._EventCallBack['listening']():  console.log('udp listen on '+that.port);;

        });
        this.server.on('message',(msg,rinfo)=>{
            let req={}
            req.rinfo=rinfo;
            req.remoteIp=rinfo.address;
            req.remotePort=rinfo.port;
            req.params=msg;
            let res={};
            res.send=function (v){
                if(Array.isArray(v)){
                    v=new Buffer(v)
                }
                that.server.send(v,rinfo.port ,rinfo.address)
            }
            UdpClient._EventCallBack['message'](req,res)
        });

    }
}

module.exports =  UdpClient;