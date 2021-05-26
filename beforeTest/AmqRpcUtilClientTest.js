var M=require("../index");

rabitMqConfig= {
    rabbitMQAccount:"guest",
    rabbitMQPassword:"guest",
    rabbitMQHost:"localhost",
    rabbitMQPort:5672,
    rpcQueueClient:"rpc_queue_client111",
    rpcQueueServer:"rpc_queue_server",
    mode:"client"  //如果是server 会开启监听
}


async function main(){
    AmqRpcUtil=await  M.import("http://localhost:9999/AmqRpcUtil.js")
    const rpc = new AmqRpcUtil(rabitMqConfig);

    setTimeout(()=>{
        //客户端调用
        rpc.call("getMemberList",{"AA":"ee"}).then(d=>{
            console.log(d)
        })
    },200)
}


main()