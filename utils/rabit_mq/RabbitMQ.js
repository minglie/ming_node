let amqp = require('amqplib');

/**
 * 类似 udp 只发消息
 * amqplib@0.8.0
 */
class RabbitMQ {
    constructor(rabitMqConfig) {
        const {rabbitMQAccount, rabbitMQPassword, rabbitMQHost,rabbitMQPort}=rabitMqConfig
        let amqpUrl = 'amqp://' + rabbitMQAccount + ':' + rabbitMQPassword + '@' + rabbitMQHost + ':'+rabbitMQPort;
        this.open = amqp.connect(amqpUrl);
    }
    sendQueueMsg(queueName, msg, callBack) {
        let self = this;

        self.open
            .then(conn => conn.createChannel())
            .then(channel => {
                return channel.assertQueue(queueName,{durable: true}).then(ok => {
                    return channel.sendToQueue(queueName, new Buffer(msg), {
                        persistent: true    // 消息持久化
                    });
                })
                    .then(data => {
                        if (data) {
                            callBack && callBack({
                                code: 200,
                                msg: '发送成功',
                                data: msg,
                            });
                            channel.close();
                        }
                    })
                    .catch(e => {
                        callBack && callBack({
                            code: -1,
                            msg: '发送失败',
                            data: e.stack,
                        });
                        setTimeout(() => {
                            if (channel) channel.close();
                        }, 500);
                    });
            });
    }

    async sendDelayMsg(delayExchange, delayQueue, deadLetterExchange, msg, expire) {
        const self = this;
        const conn = await self.open;
        const channel = await conn.createChannel();
        await channel.assertExchange(delayExchange, 'direct', { durable: true });
        await channel.assertExchange(deadLetterExchange, 'direct', { durable: true });
        const queueResult = await channel.assertQueue(delayQueue, {
            exclusive: false,
            deadLetterExchange,
        });
        await channel.bindQueue(queueResult.queue, delayExchange);

        await new Promise(resolve => {
            channel.publish(delayExchange, '', Buffer.from(msg), {
                expiration: expire,
                persistent: true,
            }, async () => resolve());
        });
        channel.close();

        return { code: 200 };
    }

    receiveQueueMsg(queueName, receiveCallBack, prefetchNum) {
        let self = this;

        self.open
            .then(conn => conn.createChannel())
            .then(async channel => {
                prefetchNum = prefetchNum || 10;
                await channel.prefetch(prefetchNum, false);
                return channel.assertQueue(queueName,{durable: true})
                    .then(ok => {
                        return channel.consume(queueName, msg => {
                            // if (msg !== null) {
                            // channel.ack(msg);
                            receiveCallBack && receiveCallBack(msg, channel);
                            // channel.close();
                            // }
                        });
                    })
            })
    }

    async receiveDelayMsg(deadLetterExchange, queueName, prefetchNum) {
        prefetchNum = prefetchNum || 10;
        const self = this;

        const conn = await self.open;
        const channel = await conn.createChannel();
        await channel.assertExchange(deadLetterExchange, 'direct', { durable: true });
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, deadLetterExchange);
        await channel.prefetch(prefetchNum, false);
        const msg = await new Promise(resolve => {
            channel.consume(queueName, msg => {
                resolve(JSON.parse(msg.content.toString()));
            }, { noAck: true });
        });
        return msg;
    }
}


module.exports = RabbitMQ;