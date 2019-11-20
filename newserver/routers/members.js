'use strict';
var FSHelper = require('../fs_helper');

var express = require('express');
var fs = require('fs');
const router = express.Router();

const storage = __dirname + '/../storage/members.json';

router.get('/money:id', (req, res) => {
    fs.readFile(storage, (err, data) => {
        const jsonData = JSON.parse(data.toString());
        for (let i = 0; i < jsonData.length; i++) {
            console.log("ITER")
            if (req.params.id == jsonData[i].id) {
                let dat = {money: jsonData[i].money};
                console.log("GOT: " + JSON.stringify(dat))
                res.send(JSON.stringify(dat));
                break;
            }
        }
    });
});
router.get('/', (req, res) => {
    fs.readFile(storage, (err, data) => {
        res.send(data.toString());
    });
});
router.post('/add', (req, res) => {
    fs.readFile(storage, (err, data) => {
        const jsonData = JSON.parse(data.toString());
        // tslint:disable-next-line:prefer-for-of
        const dict = {
            id: FSHelper.newId(jsonData),
            name: req.body.name,
            money: req.body.money
        };
        jsonData.push(dict);
        jsonData.sort((a, b) => {
            return a.id - b.id;
        });
        FSHelper.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
});

router.post('/del', (req, res) => {
    fs.readFile(__dirname + '/../storage/members.json', (err, data) => {
        const jsonData = JSON.parse(data.toString());
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jsonData.length; i++) {
            if (req.body.id === jsonData[i].id) {
                jsonData.splice(i, 1);
                break;
            }
        }
        jsonData.sort((a, b) => {
            return a.id - b.id;
        })
        FSHelper.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
});

router.post('/edit', (req, res) => {
    fs.readFile(__dirname + '/../storage/members.json', (err, data) => {
        const jsonData = JSON.parse(data.toString());
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jsonData.length; i++) {
            if (req.body.id === jsonData[i].id) {
                jsonData[i].money = parseInt(jsonData[i].money, 10) + parseInt(req.body.money, 10);
                break;
            }
        }
        FSHelper.saveToFile(__dirname + '/../storage/members.json', JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
});

module.exports = router;
