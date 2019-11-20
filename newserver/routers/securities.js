'use strict';
var FSHelper = require('../fs_helper');

var express = require('express');
var fs = require('fs');
var TeorverHelper = require('../teorver_helper');

const router = express.Router();
const storage = __dirname + '/../storage/securities.json';


router.get('/price:id', (req, res) => {
    console.log(1)
    fs.readFile(storage, (err, data) => {
        const jsonData = JSON.parse(data.toString());
        for (let i = 0; i < jsonData.length; i++) {
            if (req.params.id == jsonData[i].id) {
                let dat = {price: jsonData[i].start_price};
                console.log("GOT PRICE: " + JSON.stringify(dat))
                res.send(JSON.stringify(dat));
                break;
            }
        }
    });
});

let time = 0
router.get('/', (req, res) => {
    console.log(2)
    let newTime = new Date().getMilliseconds()
    if (newTime - time > 2000)
        console.log('aaaa')
    time = parseInt(newTime.toString());
    fs.readFile(storage, (err, data) => {
        res.send(data.toString());
    });
});
router.post('/add', (req, res) => {
    console.log(3)
    fs.readFile(storage, (err, data) => {
        const jsonData = JSON.parse(data.toString());
        const dict = {
            id: FSHelper.newId(jsonData),
            company: req.body.company,
            number: req.body.number,
            distribution: req.body.distribution,
            start_price: req.body.start_price
        };
        jsonData.push(dict);
        jsonData.sort((a, b) => {
            return a.id - b.id;
        })
        FSHelper.saveToFile(storage, JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
});

router.post('/del', (req, res) => {
    console.log(4)
    fs.readFile(storage, (err, data) => {
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
        FSHelper.saveToFile(storage, JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
});

router.post('/edit', (req, res) => {
    console.log(5)
    fs.readFile(storage, (err, data) => {
        const jsonData = JSON.parse(data.toString());
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jsonData.length; i++) {
            if (req.body.id === jsonData[i].id) {
                jsonData[i].company = req.body.company;
                jsonData[i].number = req.body.number;
                jsonData[i].distribution = req.body.distribution;
                jsonData[i].start_price = req.body.start_price;
                break;
            }
        }
        FSHelper.saveToFile(storage, JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
});

router.post('/setprice', (req, res) => {
    console.log(6)
    fs.readFile(storage, (err, data) => {
        const jsonData = JSON.parse(data.toString());
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jsonData.length; i++) {
            if (req.body.id === jsonData[i].id) {
                jsonData[i].start_price = req.body.price;
                break;
            }
        }
        FSHelper.saveToFile(storage, JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
})

router.post('/setcount', (req, res) => {
    fs.readFile(storage, (err, data) => {
        const jsonData = JSON.parse(data.toString());
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < jsonData.length; i++) {
            if (req.body.id === jsonData[i].id) {
                jsonData[i].number += parseInt(req.body.number, 10);
                console.log('DEC by: ' + req.body.number)
                if (jsonData[i].distribution === "Normal") {
                    const newprice = TeorverHelper.NormalDistr(jsonData[i].number, Math.abs(parseInt(req.body.number)), jsonData[i].start_price);
                    console.log('NORMAL SUKA NEWPRICE: ' + newprice);
                    if (parseInt(req.body.number) > 0) {
                        jsonData[i].start_price = newprice;
                    } else {
                        jsonData[i].start_price += (jsonData[i].start_price - newprice);
                    }
                }
                if (jsonData[i].distribution === "Uniform") {
                    jsonData[i].start_price += -parseInt(req.body.number, 10);
                    console.log('UNIFORM BLYAT NEWPRICE: ' + jsonData[i].start_price);
                }
                console.log('JSONPRICE: ' + jsonData[i].start_price);
                break;
            }
        }
        FSHelper.saveToFile(storage, JSON.stringify(jsonData));
    });
    res.send('{ "status": 200 }');
});

module.exports = router;
