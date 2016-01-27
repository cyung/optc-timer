var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config.json');
var EMAIL_USERNAME = config.EMAIL_USERNAME;
var EMAIL_PASSWORD = config.EMAIL_PASSWORD;
var ADMINS = config.ADMINS;

var path = 'smtps://' + EMAIL_USERNAME + ':' + EMAIL_PASSWORD + '@smtp.gmail.com';

var transporter = nodemailer.createTransport(path);

router.post('/', function(req, res, next) {
  console.log('req.body =', req.body);
  var description = 'From: ' + req.body.name + ' <' + req.body.email + '>';
  description += '\n\nDescription:\n' + req.body.description;

  if (req.body.subject === 'Incorrect Turtle Time') {
    if ('correctBefore' in req.body)
      description += '\n\nWas it correct before? ' + req.body.correctBefore;
    if ('gameVersion' in req.body)
      description += '\nGame Version: ' + req.body.gameVersion;
    if ('browser' in req.body)
      description += '\nBrowser: ' + req.body.browser;
    if ('timeZone' in req.body)
      description += '\nTime Zone: ' + req.body.timeZone;
  }

  var options = {
    from: req.body.name + ' <' + req.body.email + '>',
    to: ADMINS,
    subject: req.body.subject,
    text: description,
  };

  transporter.sendMail(options, function(err, info) {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    console.log('Message sent: ' + info.response);
    res.sendStatus(200);
  });
});

module.exports = router;
