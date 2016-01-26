var express = require('express');
var router = express.Router();
var request = require('request');
var key = require('../config.json').GCM_KEY;

router.post('/', function(req, res, next) {
  var registrationId = req.body.registrationId;

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
    if (err) {
      console.log('error posting to body');
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  });
});

module.exports = router;
