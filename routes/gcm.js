var express = require('express');
var router = express.Router();
var request = require('request');
var key = require('../config.json').GCM_KEY;

router.post('/', function(req, res, next) {
  var registrationIds = req.body.registrationIds;

  request({
    url: 'https://android.googleapis.com/gcm/send',
    method: 'POST',
    headers: {
      'Authorization': 'key=' + key,
      'Content-Type': 'application/json',
    },
    json: {
      "registration_ids": registrationIds,
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
