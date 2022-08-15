import express, { Express } from 'express';
import {mqttMessage} from "./src/mqtt";

const app: Express = express();
app.use(express.static('public'));
app.set('view engine', 'pug');

const port = "8000";

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


app.get('/', function (req, res) {
  res.render('index', { title: 'MQTT Test', message: "MQTT current message:"});
});


app.get('/data', async function(req, res) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  res.write('retry: 10000\n\n');

  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.write(`data: ${mqttMessage}\n\n`);
  }
});