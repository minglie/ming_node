const net = require('net');

class TcpClient {
    static _EventCallBack={};
    constructor(remoteIp,remotePort) {
        this.connected=false;
        this.remoteIp=remoteIp;
        this.remotePort=remotePort;
    }
    set(url, callback) {
        TcpClient._EventCallBack[url]=callback;
    }

    connect(){
        let that=this;
        if(that.connected){
            return
        }
        this.client = net.createConnection({
            port:this.remotePort  ,
            host:this.remoteIp
        });
        this.connected=true;
        //当套字节与服务端连接成功时触发connect事件
        this.client.on('connect', () =>{
            that.connected=true;
            TcpClient._EventCallBack['connect']? TcpClient._EventCallBack['connect'](): console.log("connect success");
        });
        //使用data事件监听服务端响应过来的数据
        this.client.on('data', (chunk) => {
            let req={};
            req.remoteIp=that.remoteIp;
            req.remotePort=that.remotePort;
            req.params=chunk;
            let res={};
            res.send=function (v){
                if(Array.isArray(v)){
                    v=new Buffer(v)
                }
                that.client.write(v)
            }
            TcpClient._EventCallBack['data'](req,res);

        });
        this.client.on('error', (err)=>{
            TcpClient._EventCallBack["error"]?TcpClient._EventCallBack["error"](client): console.error(err);
        });


        this.client.on('close', ()=>{
            that.connected=false;
            TcpClient._EventCallBack["error"]?TcpClient._EventCallBack["error"]():console.log("close");
        });
    }

    send(buffer){
        if(this.connected){
            this.client.write(buffer);
        }
    }

}

module.exports = TcpClient;