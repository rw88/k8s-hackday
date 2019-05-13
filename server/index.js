const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const settings = require('./settings');

// Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;


// PG 
const { Pool } = require('pg');
const dbClient = new Pool({
  user: settings.PG_USER,
  host: settings.PG_HOST,
  database: settings.PG_DATABASE,
  password: settings.PG_PASSWORD,
  port: settings.PG_PORT
});

dbClient.on('error', () => console.log('The PG connection was lost'));
dbClient.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => console.log(err));


// Redis 
const redis = require('redis');
const redisClient = redis.createClient({
  host: settings.REDIS_HOST,
  port: settings.REDIS_PORT,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();


// Express Routes
app.get('/values/all', async (req, res) => {
  const values = await dbClient.query('SELECT * from values');

  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }

  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);
  dbClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});

app.listen(PORT, err => console.log('Running server'));
