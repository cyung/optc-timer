var express = require('express');
var router = express.Router();
var User = require('../db/User');
var request = require('request');
var key = require('../config.json').GCM_KEY;

router.post('/', function(req, res, next) {
  var endpoint = req.body.endpoint;
  var registrationId = req.body.registrationId;
  
  // User.insert({
  //   endpoint: endpoint,
  //   registrationId: registrationId,
  //   digit: 0,
  // });

  var options = {
    url: endpoint,
    headers: {
      'Authorization': 'key=' + key,
    },
    json: {
      registration_ids: [registrationId],
    },
  };

  console.log('options =', options);

  request.post(options, function(err, response, body) {
    if (err) {
      console.log('err =', err);
      console.log('body =', body);
      return;
    }
    console.log('successfully sent notification');
    console.log('body =', body);
  })
});

module.exports = router;
