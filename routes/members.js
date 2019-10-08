'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');

let increase_rate = 500;

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(__dirname + '/members');
    var data = [];
    fs.readFile(__dirname + '/../storage/members.json', function (err, data) {
        data = JSON.parse(data);

        res.render('members', { title: 'Express', members: data});
    });
});

router.post('/edit', function(req, res, next) {
    console.log(__dirname + '/members/edit');
    fs.readFile(__dirname + '/../storage/members.json', function (err, data) {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++)
            if (data[i].id === req.body.id)
            {
                console.log("FOUND");
                if(req.body.command === "inc")
                {
                    console.log("INC");
                    data[i].money = parseInt(data[i].money) + increase_rate;
                } else if(req.body.command === "dec")
                {
                    let money = parseInt(data[i].money) - increase_rate;
                    if(money < 0)
                        data[i].money = 0;
                    else
                        data[i].money = money;
                } else if(req.body.command === "del")
                {
                    data.splice(i, 1);
                }
                break;
            }
        fs.writeFile(__dirname+'/../storage/members.json', JSON.stringify(data), function (err) {
            if (err)
                console.log(err );
            else
                console.log('success')
        });
    });

    res.send('ok');
})

router.post('/', function (req, res) {
    //console.log(req.body);
    fs.readFile(__dirname + '/../storage/members.json', function (err, data) {
        data = JSON.parse(data);
        let dict = {
          "id": req.body.id,
          "name": req.body.name,
          "money": req.body.money
        };
        data.push(dict)
        console.log(dict);
        fs.writeFile(__dirname+'/../storage/members.json', JSON.stringify(data), function (err) {
            if (err)
                console.log(err );
            else
                console.log('success')
        });
    });
    res.send('ok');
});

module.exports = router;