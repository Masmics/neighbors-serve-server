const { Router } = require('express');
const Task = require('../models/Task');
const ensureAuth = require('../middleware/ensure-auth');
// const { joinUsers } = require('../services/auth');

module.exports = Router()
  // only routes with ensureAuth() require a token
  // (and components with withSession() in client App)
  .post('/', ensureAuth(), (req, res, next) => {
    const { title, description } = req.body;
    Task
      .create({ title, description}) //, creator: req.user.sub })
      .then(task => res.send(task))
      .catch(next);
  })
  // auth.js returns a promise, so 
  .get('/', (req, res, next) => {
    Task
      // use Task model to find tasks, send & catch errors
      .find()
      // .then(tasks => joinUsers(tasks, 'creator'))
      .then(tasks => res.send(tasks))
      .catch(next);
  });

