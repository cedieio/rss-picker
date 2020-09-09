require('dotenv').config();

const configs = {
  redis : {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
}

module.exports = configs