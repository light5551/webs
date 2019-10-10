'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/:id', function (req, res) {
    fs.readFile(__dirname + '/pictures.json', function (err, data) {
        data = JSON.parse(data);
        let pictureId = req.params.id;
        console.log(req.params.id);
        var picture;
        for (let i = 0; i < data.length; i++)
        {
            if (data[i].id === pictureId)
                picture = data[i];
        }
        if (picture !== undefined)
            res.render('picture', {picture: picture});
        else
            res.send('No such picture');
    });
});

router.post('/:id', function (req, res) {
    //console.log(req.body);

    fs.readFile(__dirname + '/pictures.json', function (err, data) {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++)
        {
            if (data[i].id === req.body.id){
                data[i].url = req.body.url.replace('\\\\','\\');
                data[i].name = req.body.name;
                data[i].description= req.body.description;
                data[i].author = req.body.author;
                data[i].start_price = req.body.start_price;
                data[i].min_step = req.body.min_step;
                data[i].max_step = req.body.max_step;
                data[i].involved = (req.body.involved === 'true');
            }
        }
        console.log(data);
        fs.writeFile(__dirname+'/pictures.json', JSON.stringify(data), function (err) {
            if (err)
                console.log(err );
            else
                console.log('success')
        });

    });


    res.send('ok');

});

module.exports = router;