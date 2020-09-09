const redis = require('redis');
const configs = require('../configs');

let redisClient = null;

function connect() {
  return new Promise((resolve, reject) => {
    setClient().on('error', reject);
    setClient().on('connect', () => {
      console.log('Connected to redis');
    });
    setClient().on('end', () => {
      console.log('Disconnected from redis');
    });
    setClient().on('ready', () => {
      console.log('Redis ready for conection !');
      resolve();
    });
  });
}


function setClient() {
  if (!redisClient) {
    redisClient = redis.createClient({
      host: configs.redis.host,
      port: configs.redis.port
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

function set(key, value, TTL) {
  return new Promise((resolve, reject) => {
    if (typeof key !== 'string') {
      return reject(new Error('Key must be string !'));
    }
    if (typeof value !== 'string') {
      return reject(new Error('Value must be string !'));
    }
    if (redisClient === null) {
      return reject(new Error('Redis not instantiated !'));
    }
    if (redisClient.set(key, value, 'EX', TTL * 60, function (error, value) {
      if (error) {
        return reject(error);
      }
      return resolve(value);
    }));
  });
}

module.exports = {
  connect,
  get,
  set
}