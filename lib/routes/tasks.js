const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const { joinUsers } = require('../services/auth')
const Task = require('../models/Task');
;

module.exports = Router()
  // only routes with ensureAuth() require a token
  // (and components with withSession() in client App)
  .post('/', ensureAuth(), (req, res, next) => {
    // const { title, description } = req.body;
    const { title, description, creator } = req.body;
    Task

      // .create({ title, description, creator: req.user.sub })
      .create({ title, description, creator: req.body.creator.sub.id })
      // "message": "Task validation failed: creator: Path `creator` is required.",
      // "status": 500,
      // and when I also made creator not required in Task model, post test worked
      // result: cannot read property sub of undefined
      // .create({ title, description, creator: req.user.id })
      // result: cannot read property id of undefined
      // .create({ title, description, creator: req.user.user.id })
      // result: cannot read property user of undefined
      // .create({ title, description}) //, creator: req.user.sub })
      // original?

      // .create({ title, description, creator: req.user.user.id })
      // result: cannot read property user of undefined
      .then(task => res.send(task))
      .catch(next);
  })
  //  ensureAuth(),
  .get('/:id', (req, res, next) => {
    console.log(req.user);
    Task
      .findById(req.params.id)
      .then(task => joinUsers([task], 'creator'))
      .then(([task]) => res.send(task))
      .catch(next);
  }) 

  // auth.js returns a promise, so 
  .get('/', (req, res, next) => {
    Task
      // use Task model to find tasks, send & catch errors
      .find()
      .then(tasks => joinUsers(tasks, 'creator'))
      .then(tasks => res.send(tasks))
      .catch(next);
  })

  .put('/:id', ensureAuth(), (req, res, next) => {
    console.log(req.user);
    const { title, description } = req.body;
    Task
      .findOneAndUpdate(
        { _id: req.params.id, creator: req.user.sub },
        { title, description },
        { new: true })
      .then(task => joinUsers([task], 'creator'))
      .then(([task]) => res.send(task))
      .catch(next);
  });

