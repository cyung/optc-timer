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

  // new User({
  //   endpoint: endpoint,
  //   registrationId: registrationId,
  //   digit: 0,
  // }).save(function(err) {
  //   if (err) throw err;

  //   console.log('successfully saved user');
  // })
  
  // User.insert({
  //   endpoint: endpoint,
  //   registrationId: registrationId,
  //   digit: 0,
  // });



  // var options = {
  //   url: endpoint,
  //   headers: {
  //     'Authorization': 'key=' + key,
  //   },
  //   json: {
  //     registration_ids: [registrationId],
  //   },
  // };

  // request.post(options, function(err, response, body) {
  //   if (err) {
  //     console.log('err =', err);
  //     console.log('body =', body);
  //     return;
  //   }
  //   // console.log('body =', body);
  // });
});

module.exports = router;
