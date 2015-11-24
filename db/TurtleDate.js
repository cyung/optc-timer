var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var turtleDateSchema = new Schema({
  turtleDate: Date,
  version: String,
});

var TurtleDate = mongoose.model('TurtleDate', turtleDateSchema);

module.exports = TurtleDate;