import express, { Express } from 'express';
import {mqttMessage} from "./mqtt";

const app: Express = express();
app.use(express.static('public'));
app.set('view engine', 'pug');

const port = "8000";

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.get('/', function (req, res) {
  res.render('index', { title: 'MQTT Test', message: mqttMessage});
});
