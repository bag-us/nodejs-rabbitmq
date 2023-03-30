const amqp = require('amqplib');

const exchange = 'logs';
const queue = 'hello';
const text = process.argv.slice(2).join(' ') || 'info: Hello World!';

(async () => {
  let connection;
  try {
    connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, 'fanout', { durable: false });
    channel.publish(exchange, queue, Buffer.from(text));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  }
  catch (err) {
    console.warn(err);
  }
  finally {
    if (connection) await connection.close();
  };
})(); 