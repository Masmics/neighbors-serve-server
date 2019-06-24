const { Router } = require('express');
const Task = require('../models/Task');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, description } = req.body;
    Task
      .create({ title, description })
      .then(task => res.send(task))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Task
      // use Task model to find tasks, send & catch errors
      .find()
      .then(tasks => res.send(tasks))
      .catch(next);
  })

