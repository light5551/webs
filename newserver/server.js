#!/usr/bin/env node

/**
 * Module dependencies.
 */
'use strict'
var app = require('./app');
var debug = require('debug')('lab6:server');
var http = require('http');
var https = require('https');
var fs = require('fs');
var cors = require('cors');

var options = {
};

/**
 * Get port from environment and store in Express.
 */
var MY_PORT = '4201';
var port = normalizePort(process.env.PORT || MY_PORT);
app.set('port', port);


    /*
    var originsWhitelist = 'http://localhost:4201';
    var options = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    };

    app.use(cors(options));
    */

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var sec_server = https.createServer(options, app).listen(4433);
var io = require('socket.io').listen(server);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

sec_server.on('error', onError);
sec_server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if(port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

let _socket;
const connections = [];
io.sockets.on('connection', function (socket) {
    _socket = socket
    console.log("Успешное соединение");
    connections.push(socket);

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключились");
    });

    socket.on('send mess', function (data) {
        if (data.mess == -1)
            data.mess = 'ALL IN'

        io.sockets.emit('add mess', {mess: data.mess, owner: data.owner.split("%")[0], className: data.className});
    });

    socket.on('start', (data) => {
        console.log('START');
        auction()
    })

    socket.on('change total', (data) => {
        io.sockets.emit('change_total', {value: data.value, winner: data.winner})
    })
});

var time = 5000;
var timer = setTimeout(function tick() {
    console.log('TIME OUT 145')
    changeData();
    io.sockets.emit('RELOAD');
    timer = setTimeout(tick, time); // (*)
}, time);

function changeData() {
let number = Math.floor(Math.random() * (10) + 1);

    fs.readFile(__dirname + '/storage/securities.json', function (err, data) {
      let json = JSON.parse(data);
      json.forEach((value) => {
          value.start_price += number;
      })
        fs.writeFile(__dirname + '/storage/securities.json', JSON.stringify(json), (err) => {
            console.log(err)
        });
    });
}

function auction() {
    let pictures;
    let options;

    fs.readFile(__dirname + '/../storage/options.json', function (err, data) {
        options = JSON.parse(data)
        let timeOut = parseInt(options.sellTimeout)
        let smallTimeOut = timeOut

        fs.readFile(__dirname + '/../routes/pictures.json', function (err, data) {
            pictures = JSON.parse(data)
            let lastPicture

            for (let i = 0, p = Promise.resolve(); i < pictures.length; i++) {
                p = p.then(_ => new Promise(resolve =>
                    setTimeout(function () {
                        update(pictures[i].url, pictures[i].name, smallTimeOut);
                        if (i === pictures.length - 1)
                            setTimeout(function () {io.sockets.emit('add mess', {mess: "Окончание аукциона!", owner: "Admin",
                                className: "danger"}); update(pictures[i].url, pictures[i].name,smallTimeOut) }, smallTimeOut)
                        resolve();
                    },  smallTimeOut)
                ));
            }
        });
    });


}

function next(src, name, time, smallTime) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            update(src, name, smallTime);
            resolve("ok")
        }, time, "ok")
    })
}

function update(src, name, time=0) {
    changePicture(src);
    send(name, time)
}

function send(name, time=3000, type="success") {
    io.sockets.emit('add mess', {mess: "Переход к следующей картине. Картина - " + name, owner: "Admin",
        className: type, time: "" + (time/1000)})
}

function changePicture(srcOfPicture) {
    io.sockets.emit('change picture', {src: srcOfPicture})
}

module.exports = app;
