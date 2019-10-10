'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res) {
    fs.readFile(__dirname + '/../storage/options.json', function (err, data) {
        data = JSON.parse(data);
        res.render('options', {options: data});
    });
});

router.post('/', function (req, res) {
    //console.log(req.body);

    fs.readFile(__dirname + '/../storage/options.json', function (err, data) {
        data = JSON.parse(data);
        data.beginDate = req.body.beginDate;
        data.beginTime = req.body.beginTime;
        data.sellTimeout = req.body.sellTimeout;
        data.maxSellTimeout = req.body.maxSellTimeout;
        data.pauseTimeout = req.body.pauseTimeout;
        console.log(data);
        fs.writeFile(__dirname+'/../storage/options.json', JSON.stringify(data), function (err) {
            if (err)
                console.log(err );
            else
                console.log('success')
        });

    });
    res.send('ok')
});

module.exports = router;