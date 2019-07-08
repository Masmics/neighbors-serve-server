const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 100,
    require: true
  },
  description: {
    type: String,
    maxlength: 2000,
    require: true
  }//,

  // // a sub from auth0
  // creator: {
  //   type: String, 
  //   required: true
  // }

  //,
  // manual: {
  //   type: Boolean,
  //   require: false
  // },
  // trades: {
  //   type: Boolean,
  //   require: false
  // },
  // clerical: {
  //   type: Boolean,
  //   require: false
  // },
  // technical: {
  //   type: Boolean,
  //   require: false
  // },
  // person: {
  //   type: Boolean, 
  //   require: false
  // },
  // event: {
  //   type: Boolean,
  //   require: false
  // },
  // other: {
  //   type: Boolean,
  //   require: false
  // },
  // city: {
  //   type: String,
  //   require: true
  // },
  // email: {
  //   type: String,
  //   require: true
  // },
  // phone: {
  //   type: String,
  //   require: true
  // }
});

module.exports = mongoose.model('Task', taskSchema);

