var express = require('express');
var router = express.Router();
var request = require('request');
var key = require('../config.json').GCM_KEY;

router.post('/', function(req, res, next) {
  var registrationId = req.body.registrationId;
  console.log('registrationId =', registrationId);

  request({
    url: 'https://android.googleapis.com/gcm/send',
    method: 'POST',
    headers: {
      'Authorization': 'key=' + key,
      'Content-Type': 'application/json',
    },
    json: {
      to: registrationId,
    },
  }, function(err, result, body) {
    console.log('body =', body);
    if (err) {
      console.log('error posting to body');
      return res.status(400).send(err);
    }

    res.status(200).send('sent');
  });
});

module.exports = router;
