const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 100,
    require: true
  },
  taskType: {
    type: Array,
    require: true
  },
  description: {
    type: String,
    maxlength: 1500,
    require: true
  },
  // a sub from auth0
  author: {
    type: Object, // String
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  date: {
    type: String,
    require: true
  },
  // location: {
  //   type: String,
  //   require: true
  // },
  location: {
    type: Array,
    require: true
  },
  streetAddr: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Task', taskSchema);

