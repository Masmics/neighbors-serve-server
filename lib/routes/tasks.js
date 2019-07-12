const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const { joinUsers } = require('../services/auth');
const Task = require('../models/Task');

module.exports = Router()
  // only routes with ensureAuth() require a token
  // (and components with withSession() in client App)
  .post('/', ensureAuth(), (req, res, next) => {
    const { title, description } = req.body;
    Task
      .create({ title, description, author: req.user.sub }) //, creator: req.user.sub })
      .then(task => res.send(task))
      .catch(next);
  })
  // auth.js returns a promise, so 
  .get('/', (req, res, next) => {
    Task
      // use Task model to find tasks, send & catch errors
      .find()

      .then(tasks => res.send(tasks))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Task
      .findById(req.params.id)

      .then(task => res.send(task))
      .catch(next);
  })

        // .then(tasks => joinUsers(tasks, 'author'))

        // .then(task => joinUsers([task], 'author'))
      // .then(([task]) => res.send(task))

