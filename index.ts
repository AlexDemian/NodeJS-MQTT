import express, { Express } from 'express';
import {memesTopic, mqttClient} from "./src/mqtt";

const port = "8000";
mqttClient.on('connect', () => mqttClient.subscribe(memesTopic))

const app: Express = express();
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './src/views');

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.get('/', function (req, res) {
  res.render('index', { title: 'MQTT Test', message: "MQTT current message:"});
});

app.get('/memes', async function(req, res) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  res.write('retry: 10000\n\n');
  const handleMessage = (_: string, message: string) => res.write(`data: ${message} \n\n`)
  mqttClient.on('message', handleMessage)
  res.on('close', ()=>mqttClient.removeListener('message', handleMessage));
});
