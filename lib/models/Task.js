const mongoose = require('mongoose');
const hoods = require('../utils/hoods');
const types = require('../utils/types');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  taskType: {
    type: String,
    required: true,
    enum: types()
  },
  description: {
    type: String,
    maxlength: 1500,
    required: true
  },
  // a sub from auth0
  author: {
    type: Object,
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
    required: true
  },
  location: {
    type: String,
    required: true,
    enum: hoods()
  },
  // location: {
  //   type: Array,
  //   required: true
  // },
  streetAddr: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Task', taskSchema);

