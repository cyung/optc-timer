var express = require('express');
var router = express.Router();
var moment = require('moment');
var TurtleDate = require('../db/TurtleDate');

router.get('/', function(req, res, next) {
  console.log('moment.utc().format() =', moment.utc().format());
  res.sendStatus(200);
});

router.post('/date', function(req, res, next) {
  console.log('req.body =', req.body);
  res.sendStatus(200);

  return;
  var turtleDate = req.body.turtleDate;
  if (isNaN(turtleDate.getTime())) {
    console.log('Not a valid time');
    res.sendStatus(400);
    return;
  }

  // TurtleDate.find

});



module.exports = router;
