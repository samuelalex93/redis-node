const { Router } = require('express');
const { promisify } = require('util');
const Axios = require('axios');
const BullBoard = require('bull-board');
const Queue = require('./app/services/QueueService');
const UserController = require('./app/controllers/UserController');
const redis = require('redis');
const redisConfig = require('./app/config/redis');

const router = Router();


const queue = Queue.queues.map(queue => queue.bull)
BullBoard.setQueues(queue);

const client = redis.createClient(redisConfig);

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

router.post('/users', UserController.store);

router.get('/history', async (req, res) => {
  try {
    const reply = await GET_ASYNC('history')
    if(reply) {
      res.send(JSON.parse(reply))
      return
    }

    const response = await Axios.get('https://api.spacexdata.com/v3/history');
    await SET_ASYNC('history', JSON.stringify(response.data), 'EX', 5);

    res.send(response.data);
  } catch (err) {
    res.send(error.message);
  }
});

router.get('/history/:history_id', async (req, res) => {
  try {
    const { history_id } = req.params;
    const reply = await GET_ASYNC(history_id)
    if(reply) {
      res.send(JSON.parse(reply))
      return
    }

    const response = await Axios.get(`https://api.spacexdata.com/v3/history/${history_id}`);
    await SET_ASYNC(history_id, JSON.stringify(response.data), 'EX', 5);

    res.send(response.data);
  } catch (err) {
    res.send(error.message);
  }
});

router.use('/admin/queues', BullBoard.UI);

module.exports = router;