const amqp = require('amqplib/callback_api');

/**
 * 类似 http 数据可及时返回
 * amqplib@0.8.0
 */
class AmqRpcUtil {
     //请求2s超时
     static req_time_out=2000;
     static _dealService={};
     static _begin=()=>{};
     static _end=()=>{};
     callback=function (method,callback){
         AmqRpcUtil._dealService[method]=callback;
     }
     begin=function (callback){
         AmqRpcUtil._begin=callback;
     }
     end=function (callback){
        AmqRpcUtil._end=callback;
     }
    async call(method,params){
        const res = new Promise( (resolve, reject) => {
            try {
                const reqParam = {
                    method,
                    params
                }
                this.sendMsg(AmqRpcUtil.generateUuid(), reqParam, (res) => {
                    resolve(res)
                })
                if(AmqRpcUtil.req_time_out>0){
                    setTimeout(function(){
                        resolve({code:-1,msg:"time_out"})
                    }, AmqRpcUtil.req_time_out);
                }
            } catch (error) {
                reject(error)
                return error
            }
        }).then(res => {
            return res
        })
        return res
    }

    constructor(rabbitMQConfig) {
        const {rabbitMQAccount, rabbitMQPassword, rabbitMQHost,rabbitMQPort, rpcQueueClient,rpcQueueServer,mode}=rabbitMQConfig
        this.connection;
        this.channel;
        this.rpcQueueServer = rpcQueueServer||'rpc_queue_server';
        this.rpcQueueClient = rpcQueueClient || 'rpc_queue_client';
        this.amqpUrl = 'amqp://' + rabbitMQAccount + ':' + rabbitMQPassword + '@' + rabbitMQHost + ':'+rabbitMQPort;
        this.correlationIdPool = new Map();
        this.init().then(() => {
              if(mode=="server"){
                  this.listenMsg();
              }
        }).catch(e => {
            console.error(e)
            process.exit();
        });
    }

    async _createChannel() {
        this.channel = await new Promise(resolve => {
            this.connection.createChannel((err, channel) => {
                resolve(channel);
            });
        });
    }

   static  generateUuid() {
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    }

    async init() {
        await new Promise((resolve, reject) => {
            amqp.connect(this.amqpUrl, (error, conn) => {
                if (error) {
                    reject(error);
                } else {
                    this.connection = conn;
                    resolve();
                }
            });
        });
        await this._createChannel();
    }

    async dealerMsg(msgContent) {
        let result;
         try {
             result= AmqRpcUtil._begin(msgContent)
             if(result){
                 return result;
             }
             msgContent = JSON.parse(msgContent);
             if (AmqRpcUtil._dealService[msgContent.method]) {
                 result= await AmqRpcUtil._dealService[msgContent.method](msgContent.params)
             } else {
                 result={ code: -1, msg: "no method" }
             }
             let emdR= AmqRpcUtil._end(msgContent,result)
             if(emdR){
                 return emdRl
             }
         }catch (e) {
             result = { code: -1, msg: e.message };
         }


        return result;
    }

    async listenMsg() {
        this.channel.assertQueue(this.rpcQueueServer, { durable: false });
        this.channel.prefetch(1);

        this.channel.consume(this.rpcQueueServer, async msg => {
           // console.log("==========>",msg)
            const msgContent = msg.content.toString();
            let dealerResult;
            try {
                dealerResult = await this.dealerMsg(msgContent);
            } catch (e) {
                dealerResult = { code: -1, msg: e.message };
            }
            this.channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(dealerResult)), {
                correlationId: msg.properties.correlationId,
            });
        }, { noAck: true });
    }

    async sendMsg(correlationId, params, cb) {
        const q = await new Promise(resolve => {
            this.channel.assertQueue(this.rpcQueueClient, { exclusive: true }, (e, q) => {
                resolve(q);
            });
        });
        this.correlationIdPool.set(correlationId, cb);
        this.channel.consume(q.queue, msg => {
            if (this.correlationIdPool.has(msg.properties.correlationId)) {
                const cb = this.correlationIdPool.get(msg.properties.correlationId);
                cb(JSON.parse(msg.content.toString()));
                this.correlationIdPool.delete(msg.properties.correlationId);
            }
        }, { noAck: true });

        this.channel.sendToQueue(this.rpcQueueServer, Buffer.from(JSON.stringify(params)), {
            correlationId,
            replyTo: q.queue,
        });
    }
}

module.exports = AmqRpcUtil;
