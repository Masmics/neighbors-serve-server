const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const { joinUsers } = require('../services/auth');
const Task = require('../models/Task');

module.exports = Router()
// only routes with ensureAuth() require a token
// (and components with withSession() in client App)

  .post('/', ensureAuth(), (req, res, next) => {
    const { title, taskType, location, contactName, contactPhone, contactEmail, streetAddr, description } = req.body;
    Task
      .create({ title, taskType, location, contactName, contactPhone, contactEmail, date: new Date(), streetAddr, description, author: req.user.sub })
      .then(task => res.send(task))
      .catch(next);
  })

  // auth.js returns a promise, so 
  .get('/', (req, res, next) => {
    Task
      // use Task model to find tasks, send & catch errors
      .find()
      .then(tasks => joinUsers(tasks, 'author'))
      .then(tasks => res.send(tasks))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Task
      .findById(req.params.id)
      .then(task => joinUsers([task], 'author'))
      .then(([task]) => res.send(task))
      .catch(next);
  })

  .put('/:id', ensureAuth(), (req, res, next) => {
    const { title, taskType, location, contactName, contactPhone, contactEmail, streetAddr, description } = req.body;
    Task
      .findOneAndUpdate(
        { _id: req.params.id, author: req.user.sub }, // , date: new Date() }, 
        { title, taskType, location, contactName, contactPhone, contactEmail, streetAddr, description }, // date,
        { new: true }
      )
      .then(task => joinUsers([task], 'author'))
      .then(([task]) => res.send(task))
      .catch(next);
  })

  .delete('/:id', ensureAuth(), (req, res, next) => {
    const _id = req.params.id;
    Task
      .findByIdAndDelete(_id)
      .select({
        _id: true
      })
      .then(result => res.send(result))
      .catch(err => {
        next(err);
      })
      .catch(next);
  });
