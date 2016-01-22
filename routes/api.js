var express = require('express');
var router = express.Router();
var users = require('./users');
var turtle = require('./turtle');

router.get('/', function(req, res, next) {
  res.send('This is the OPTC-Timer API.');
});

router.use('/users', users);
router.use('/turtle', turtle);

module.exports = router;
