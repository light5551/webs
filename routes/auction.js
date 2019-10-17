'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(__dirname);
  var data = [];
  fs.readFile(__dirname + '/pictures.json', function (err, data) {
      data = JSON.parse(data);
      res.render('auction', { title: 'Express', pictures: data});
  });
});

module.exports = router;
