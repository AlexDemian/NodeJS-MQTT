import express, { Express, Request, Response } from 'express';

const app: Express = express();
app.use(express.static('public'));
app.set('view engine', 'pug');

const port = "8000";

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
  });

app.get('/api', function (req, res) {
    res.send({ title: 'Hey', message: 'Hello there!'});
  });