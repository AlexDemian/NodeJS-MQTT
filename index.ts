import express, { Express } from "express";
import { memesTopic } from "./src/cronJobs";
import { mqttClient } from "./src/mqtt/client";
import { runMqttServer } from "./src/mqtt/server";
import { router } from "./src/routes";
const kill = require('kill-port');

const port = 8000;
export const mqttPort = 1883;

runMqttServer();
mqttClient.on("connect", () => {
  mqttClient.subscribe(memesTopic);
});

const app: Express = express();
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(router);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

const exit = () => {
  kill(port, 'tcp')
  kill(mqttPort, 'tcp')
}

process.on('exit', exit)
process.on('SIGINT', exit)
process.on('SIGTERM', exit)
process.on('SIGQUIT', exit)