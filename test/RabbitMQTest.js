var M=require("../index");

rabitMqConfig= {
    rabbitMQAccount:"guest",
    rabbitMQPassword:"guest",
    rabbitMQHost:"localhost",
    rabbitMQPort:5672
}

async function main(){

    RabbitMq=await  M.import("http://localhost:9999/RabbitMQ.js")

    const {sendMQ,receiveMQ}=await M.import("mq",()=>{
        const sendMQ = new RabbitMq(rabitMqConfig);
        const receiveMQ = new RabbitMq(rabitMqConfig);
        return {sendMQ,receiveMQ}
    })

    sendMQ.sendQueueMsg('test01', JSON.stringify({ msg: 'testMsg' }), result => {
        console.log("test01",result);
    });

    receiveMQ.receiveQueueMsg('test01', (msg, channel) => {
        const content = msg.content.toString();
        console.log(content);
        // 执行成功后确认消息
        if (true) channel.ack(msg);
    });
}


main()