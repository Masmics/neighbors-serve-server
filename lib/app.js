const express = require('express');
const app = express();
const cors  = require('cors');

const whitelist = [
  '*'
  // 'http://localhost:7891/api/v1/*', 
  // 'http://localhost:7890/*', 
  // 'mongodb://localhost:27017/*', 
  // 'https://neighbors.netlify.com/*' 
]
const corsOptions = {
  origin: function (origin, callback) {
    if(whitelist.indexOf(origin)) { //!== -1) {
      callback(null, true)
    } else {
      callback(new Error('Prohibited by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use(express.json());
// app.use(require('cors'));

app.use('/api/v1/tasks', require('./routes/tasks'));


// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));

/////
// app.use(cors());

////
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(require('./middleware/error'));
app.use(require('./middleware/not-found'));

module.exports = app;
