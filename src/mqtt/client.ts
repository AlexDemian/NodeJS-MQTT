import { mqttPort } from "../..";

const mqtt = require("mqtt");

export const mqttClient = mqtt.connect(`mqtt://localhost:${mqttPort}`);
