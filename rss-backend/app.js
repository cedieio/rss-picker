const express = require('express');
const redis = require('./lib/redis');
require('dotenv').config();

const app = new express();

app.get('/', async function (req, res){
  res.send('hello world');
});


app.listen(3000, async function(){
  await redis.connect();
  console.log('server started');
});