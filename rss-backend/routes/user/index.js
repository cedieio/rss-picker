const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const { getUser, setUser } = require('../../db/users');
const TTL = 30; //30 minutes

function payload(userId, rssFeed) {
  return {
    userId: userId,
    uri: `/user/${userId}`,
    rssUri: rssFeed
  }
}

router.get('/', async function (req, res) {
  res.status(404).send({
    message: 'userId is required for this resource'
  });
});

router.put('/', async function (req, res) {
  res.status(404).send({
    message: 'userId is required for this resource'
  });
});

router.get('/:userId', async function (req, res) {
  try {
    let userData = await getUser(req.params.userId);
    if (!userData) {
      res.status(404).send({
        message: 'user data not found in the database'
      });
    } else {
      res.status(200).send(userData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/', async function (req, res) {
  try {
    let userId = uuid.v1();
    let respObj = payload(userId);
    await setUser(userId, respObj, TTL);
    res.status(201).send(respObj);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/:userId', async function (req, res) {
  try {
    let userId = req.params.userId;
    let userValue = await getUser(userId);
    if (!userValue) {
      res.status(404).send({
        message: 'user data not found in the database'
      });
    } else {
      userValue.userId = userId;
      userValue.uri = `/user/${userId}`;
      await setUser(userId, userValue, TTL);
      res.status(201).send(userValue);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


router.patch('/*', async function (req, res) {
  if (req.params.userId) {
    res.status(404).send({ message: `patch not supported yet no updates for User: ${req.params.userId} done` });
  } else {
    res.status(404).send({ message: `patch notß supported yet no updates done` });
  }
});


module.exports = router;