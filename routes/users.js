var express = require('express');
var router = express.Router();
var User = require('../db/User');
var request = require('request');
var key = require('../config.json').GCM_KEY;

router.post('/', function(req, res, next) {
  var digit = req.body.digit;
  var registrationId = req.body.registrationId;

  var data = {
    digit: digit,
    registrationId: registrationId,
  };

  User.findOneAndUpdate({registrationId: registrationId}, 
    data, {upsert: true, new: true}, function(err, user) {
      if (err) {
        console.log('Error updating/creating user');
        return res.sendStatus(400);
      }

      console.log('added/updated user: ', user);
      res.sendStatus(200);
  });
});

router.delete('/', function(req, res, next) {
  User.remove({}, function(err) {
    if (err) {
      console.log('unable to remove users');
      return res.sendStatus(400);
    }

    console.log('removed users');
    res.sendStatus(200);
  })
});

module.exports = router;
