var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var userSchema = new Schema({
  registrationId: String,
  digit: Number,
});

userSchema.plugin(timestamps);
var User = mongoose.model('User', userSchema);

module.exports = User;