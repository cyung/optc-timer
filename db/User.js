var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  endpoint:  String,
  digit: Number,
});

var User = mongoose.model('User', userSchema);

module.exports = User;