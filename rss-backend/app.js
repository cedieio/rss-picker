const express = require('express');
const redis = require('./redis');
const body_parser = require('body-parser');
const userRoute = require('./routes/user');
const rssRoute = require('./routes/rss');

const app = new express();

app.use(express.json());

app.use('/user', userRoute);
app.use('/rss', rssRoute);


app.listen(3000, async function(){
  await redis.connect();
  console.log('server started');
});