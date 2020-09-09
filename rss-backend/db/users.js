const {set, get}  = require('../redis');


async function getUser(userId){
  
  let user =  await get(userId);
  if(!user){
    return null;
  }

  return JSON.parse(user);
}

async function setUser(userId, userValue, TTL){
  await set(userId, JSON.stringify(userValue), TTL);
}


module.exports = {
  getUser,
  setUser
}