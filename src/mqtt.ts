const mqtt = require('mqtt');
const aedes = require('aedes')()
const net = require('net')
var cron = require('node-cron');

export var mqttMessage = "";

const server = net.createServer(aedes.handle)
const port = 1883

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})

const client  = mqtt.connect(`mqtt://localhost:${port}`)

client.on('connect', () => client.subscribe('presence'))

client.on('message', (topic: string, message: string) => {
    mqttMessage = message.toString()
})

cron.schedule('* * * * * *', () => {
    client.publish('presence', new Date().toISOString())
});
