import { mqttPort } from "../..";

const aedes = require("aedes")();
const net = require("net");

export const runMqttServer = () => {
  const server = net.createServer(aedes.handle);
  server.listen(mqttPort, function () {
    console.log("server started and listening on port ", mqttPort);
  });
};
