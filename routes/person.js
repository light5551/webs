'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var io = require('../bin/www');


router.get('/', function(req, res, next) {
console.log(req.query.name);
res.render('personinpart', {name: req.query.name, picture: "https://sun9-9.userapi.com/c604331/v604331269/3b5d2/e2JCAswJxk8.jpg"});
});

function changePicture(srcOfPicture){
    io.sockets.emit('change picture', {src: srcOfPicture})
}


module.exports = router;
