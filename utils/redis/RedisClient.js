const redis = require("redis");

// "redis": "^3.1.2"
const redisClient_Server = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    family:4
});

const redisClient_Client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    family:4
});


//client.auth("");

redisClient_Server.get('sess:-QlNB5wuzGtLPG8IvGR2wYd583ZNxGIr', (err, result) => {
    console.log(result)
})

redisClient_Server.on("ready", function () {
    //订阅消息
    redisClient_Server.subscribe("dateStr");
    console.log('订阅成功')
});
redisClient_Server.on("message", function (channel, message) {
    console.log("我接收到信息了" + message);
});

function task(){
    redisClient_Client.publish('dateStr',Math.random().toString());
    console.log('发布成功');
}
setInterval(task,2000)