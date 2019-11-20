'use strict';
var FSHelper = require('../fs_helper');

var express = require('express');
var fs = require('fs');

const router = express.Router();
const storage = __dirname + '/../storage/options.json';

router.get('/', (req, res) => {
    fs.readFile(storage, (err, data) => {
        res.send(data.toString());
    });
});

router.post('/edit', (req, res) => {
    console.log('pipka')
    fs.readFile(storage, (err, data) => {
        const jsonData = JSON.parse(data.toString());
        jsonData.cost_update_delay = req.body.cost_update_delay;
        jsonData.bidding_time_period = req.body.bidding_time_period;
        FSHelper.saveToFile(storage, JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
});

module.exports = router;
