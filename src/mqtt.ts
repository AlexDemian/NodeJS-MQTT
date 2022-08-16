const mqtt = require('mqtt');
const aedes = require('aedes')()
const net = require('net')
var cron = require('node-cron');
var fs = require('fs');
var path = require('path');
import { getRandomElem } from "./helpers";

const server = net.createServer(aedes.handle)
export const memesTopic = "memes"
const port = 1883
const memes = [
    "1.jpeg",
    "2.png",
    "3.jpeg",
    "4.jpeg",
    "5.png",
]

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})

export const mqttClient  = mqtt.connect(`mqtt://localhost:${port}`)

const publishNewMeme = () => {
    const memeFname = getRandomElem(memes)
    const memePath = path.resolve(__dirname, `../../src/memes/${memeFname}`)
    const image = fs.readFileSync(memePath, {encoding: "base64"})
    const extension = memeFname.split(".").pop();
    mqttClient.publish(memesTopic, `data:image/${extension};base64,${image}`)
}

cron.schedule('* * * * * *', publishNewMeme);
