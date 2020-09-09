const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const { getUser, setUser } = require('../../db/users');
const { get } = require('../../redis');
const TTL = 30; //30 minutes

function payload(userId, rssFeed) {
  return {
    userId: userId,
    uri: `/user/${userId}`,
    rssUri: rssFeed
  }
}

router.get('/', async function (req, res) {
  res.status(404).send(JSON.stringify({
    message: 'userId is required for this resource'
  }));
});

router.put('/', async function (req, res) {
  res.status(404).send(JSON.stringify({
    message: 'userId is required for this resource'
  }));
});

router.get('/:userId', async function (req, res) {
  try {
    let userData = await get(req.params.userId);
    if (!userData) {
      res.status(404).send(JSON.stringify({
        message: 'user data not found in the database'
      }));
    } else {
      res.status(200).send(JSON.parse(userData));
    }
  } catch (error) {

  }
});

router.post('/', async function (req, res) {
  try {
    let userId = uuid.v1();
    let respObj = payload(userId);
    await setUser(userId, respObj, TTL);
    res.status(201).send(JSON.stringify(respObj));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:userId', async function (req, res) {
  try {
    let userId = req.params.userId;
    let userValue = await get(userId);
    let jsonValue = JSON.parse(userValue);
    jsonValue.userId = userId;
    jsonValue.uri = `/user/${userId}`;
    await setUser(userId, jsonValue, TTL);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch('/*', async function (req, res) {
  if (req.params.userId) {
    res.status(404).send(JSON.stringify({ message: `patch not supported yet no updates for User: ${req.params.userId} done` }));
  } else {
    res.status(404).send(JSON.stringify({ message: `patch notß supported yet no updates done` }));
  }
});


module.exports = router;