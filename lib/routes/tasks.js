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
    console.log('put it there!', req.user);
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
    const { title, description } = req.body
    Task
      .findOneAndUpdate(
        { _id: req.params.id, author: req.user.sub },
        { title, description },
        { new: true }
      )
      .then(task => joinUsers([task], 'author'))
      .then(([task]) => res.send(task))
      .catch(next);
  })

  .delete('/:id', ensureAuth(), (req, res, next) => {
    const _id = req.params.id;
    Task
      // .findOneAndDelete(req.params.id) // <-- works but w/o id
      .findByIdAndDelete(_id)
      // .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .then(result => res.send(result))
      .then(console.log('Task Deleted'))
      // .catch(err => {
      //   next(err);
      // })
      .catch(next);
  })

