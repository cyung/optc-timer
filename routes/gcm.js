var express = require('express');
var router = express.Router();
var request = require('request');
var key = require('../config.json').GCM_KEY;

router.post('/', function(req, res, next) {
  var registrationId = req.body.registrationId;
  console.log('key =', key);

  request({
    url: 'https://gcm-http.googleapis.com/gcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': key,
    },
    json: {
      to: registrationId,
    },

  }, function(err, res, body) {
    if (err) {
      console.log('error posting to body');
      return res.status(400);
    }

    res.status(200);
  });
});

module.exports = router;
