const express = require('express');
const app = express();
// const jwt = require('express-jwt');
const ensureAuth = require('../lib/middleware/ensure-auth');

app.use(ensureAuth());
app.use(require('cors')());
app.use(express.json());

app.use('/api/v1/tasks', require('./routes/tasks'));


app.use(require('./middleware/error'));
app.use(require('./middleware/not-found'));

module.exports = app;
