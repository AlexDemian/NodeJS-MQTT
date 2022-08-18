import { Router } from "express";
import { mqttClient } from "./mqtt/client";

export const router = Router();

router.get("/", (req, res) =>
  res.render("index", { title: "MQTT Test", message: "MQTT current message:" })
);

router.get("/memes", async function (req, res) {
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  res.write("retry: 10000\n\n");
  const handleMessage = (_: string, message: string) =>
    res.write(`data: ${message} \n\n`);
  mqttClient.on("message", handleMessage);
  res.on("close", () => mqttClient.removeListener("message", handleMessage));
});
