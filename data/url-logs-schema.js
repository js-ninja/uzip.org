var mongoose = require('mongoose');

// Create a new schema for our url data
var schema = new mongoose.Schema({
  code 		: String,
  date    : { type: Date, default: Date.now }
});

module.exports = mongoose.model('urls_logs', schema);