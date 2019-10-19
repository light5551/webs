'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(__dirname);
    let pics_data = [];
    let mem_data = [];
    fs.readFile(__dirname + '/pictures.json', function (err, data) {
        pics_data = JSON.parse(data);
    });
    fs.readFile(__dirname + '/../storage/members.json', function (err, data) {
        mem_data = JSON.parse(data);
        res.render('auction', {title: 'Express', pictures: pics_data, members: mem_data});
    });
});

module.exports = router;
