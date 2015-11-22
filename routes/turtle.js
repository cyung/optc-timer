var express = require('express');
var router = express.Router();
var moment = require('moment');
var TurtleDate = require('../db/TurtleDate');

router.get('/', function(req, res, next) {
  console.log('moment.utc().format() =', moment.utc().format());
  res.sendStatus(200);
});

router.post('/date', function(req, res, next) {
  var turtleDate = req.body.turtleDate;
  console.log('turtleDate =', turtleDate);
  console.log('moment.utc(+turtleDate) =', moment.utc(+turtleDate));
  console.log('new Date(+turtleDate) =', new Date(+turtleDate));
  res.sendStatus(200);

  return;
});

router.delete('/date', function(req, res, next) {
  console.log('req.body =', req.body);
  res.sendStatus(200);
  return;


});



module.exports = router;
