'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

const accounts = [
    {
        username: "aa",
        password: "aa"
    },
    {
        username: "bb",
        password: "bb"
    }
]

router.post('/login', (req, res, next) => {
    let isOk = false;
    console.log('WAS POST LOGIN')
    for (let i = 0; i < accounts.length; i++)
    {
        if (accounts[i]['username'] === req.body.username &&
            accounts[i]['password'] === req.body.password) {
            isOk = true;
        }
    }
    res.json({ok: isOk});
});

module.exports = router;
