## NodeJS MQTT

### Description

Another one app just for fun and playing with MQTT client and server on NodeJS.

### Overview

Generally, app demonstrates how IoT device can be connected with Node server and web app interface via Server-Sent Events.

### Infrastructure

NodeJS/Express server
MQTT broker/server
MQTT client
Node-cron

### Installation & Startup

```
npm i
npm run dev
```

### What is going behind the scene?

1. NodeJS cron job, that emulates IoT device connected to MQTT broker, posts random base64 encoded image to MQTT broker every second
2. Client gets index page which initializes connection to NodeJS server via EventSource API.
3. Server accepts connection and every time handles images directly from MQTT broker to the opened connection just after images are exposed in the MQTT broker.
4. Client receives (wihout page reload or any kind of polling) encoded memes and shows it for user
   ![woohoo](https://user-images.githubusercontent.com/27147054/184895199-e31254ed-2306-49c9-8d77-e19ce9a380ac.gif)
