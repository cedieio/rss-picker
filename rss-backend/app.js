const express = require('express');
const redis = require('./redis');
const rss_parser = require('rss-parser');
const body_parser = require('body-parser');
const userRoute = require('./routes/user');
const parser = new rss_parser();

const app = new express();

app.use(express.json());

app.use('/user', userRoute);


app.listen(3000, async function(){
  await redis.connect();
  console.log('server started');
});