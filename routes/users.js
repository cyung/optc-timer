var express = require('express');
var router = express.Router();
var User = require('../db/User');
var request = require('request');
var key = require('../config.json').GCM_KEY;

router.post('/', function(req, res, next) {
  var endpoint = req.body.endpoint;
  var registrationId = req.body.registrationId;


  User.findOne({registrationId: registrationId}, function(err, user) {
    if (user) {
      console.log('existing user found');
      // update user digit
      res.sendStatus(200);
      return;
    }

    user = new User({
      endpoint: endpoint,
      registrationId: registrationId,
      digit: 0,
    });

    user.save(function(err) {
      if (err) throw err;

      console.log('Inserted new user into database');
      res.sendStatus(200);
    });
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
