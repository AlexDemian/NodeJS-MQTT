const mqtt = require('mqtt')
var cron = require('node-cron');

export var mqttMessage = "";
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', () => client.subscribe('presence'))

client.on('message', (topic: string, message: string) => {
    mqttMessage = message.toString()
})

cron.schedule('* * * * * *', () => {
    client.publish('presence', new Date().toISOString())
});