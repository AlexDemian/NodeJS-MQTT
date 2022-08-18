import { getRandomElem } from "./helpers";
import { mqttClient } from "./mqtt/client";

const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

export const memesTopic = "memes";
const memesDir = path.resolve(__dirname, "../../static/memes");
const memes = fs.readdirSync(memesDir);

const publishNewMeme = () => {
  const memeFname = getRandomElem(memes);
  const memePath = path.resolve(memesDir, memeFname);
  const image = fs.readFileSync(memePath, { encoding: "base64" });
  const extension = path.extname(memeFname);
  mqttClient.publish(memesTopic, `data:image/${extension};base64,${image}`);
};

cron.schedule("* * * * * *", publishNewMeme);
