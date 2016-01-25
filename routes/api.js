var express = require('express');
var router = express.Router();
var users = require('./users');
var turtle = require('./turtle');
var gcm = require('./gcm');

router.get('/', function(req, res, next) {
  res.send('This is the OPTC-Timer API.');
});

router.use('/users', users);
router.use('/turtle', turtle);
router.use('/gcm', gcm);

module.exports = router;
