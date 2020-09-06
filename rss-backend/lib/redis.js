const redis = require('redis');
const { promisify } = require('util');

let redisClient = null;

function connect() {
  return new Promise((resolve, reject) => {
    setClient().on('error', reject);
    setClient().on('connect', () => {
      console.log('Connected to redis');
    });
    setClient().on('end', ()=>{
      console.log('Disconnected from redis');
    });
    setClient().on('ready', () =>{
      console.log('Redis ready for conection !');
      resolve();
    }); 
  });
}


function setClient() {
  if (!redisClient) {
    redisClient = redis.createClient({ 
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    });
  }

  return redisClient;
}

function get(key) {
  return new Promise((resolve, reject) => {
    if (typeof key !== 'string') {
      return reject(new Error('Key must be string !'));
    }
    if (redisClient === null) {
      return reject(new Error('Redis not instantiated !'));
    }

    redisClient.get(key, (error, value) => {
      if (error) {
        return reject(error);
      }

      return resolve(value);
    });
  });
}

module.exports = {
  connect,
  get
}